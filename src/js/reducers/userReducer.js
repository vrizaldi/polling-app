const initialStates = {
	loggedIn: false,
	fetching: "none",
	error: false,
	userData: {
		username: "",
		bio: "",
		adminPolls: [],
		participatePolls: []
	}
};
export default function reducer(state=initialStates, action) {
	switch(action.type) {
	case "RESET":
		// reset the fetching and error flags
		return {
			...state,
			fetching: "none",
			error: false
		};

	// login cases ------------------
	case "LOG_IN_PENDING":
		// tell the UI that it's fetching
		return {
			...state, 
			fetching: "fetching"
		};
	case "LOG_IN_FULFILLED":
		if(action.payload.data.success !== false) {
			// login success
			return {
				...state,
				userData: {
					username: action.payload.data.username,
					bio: action.payload.data.bio
				},
				loggedIn: true,
				fetching: "none"
			};

		} else {
			// login failed
			return {
				...state,
				fetching: "failed"
			};
		}
		
	case "LOG_IN_REJECTED":
		return {
			...state, 
			error: true
		};

	// sign up cases --------------------
	case "SIGN_UP_PENDING":
		return {
			...state,
			fetching: "fetching"
		};

	case "SIGN_UP_FULFILLED":
		if(action.payload.data.success == true) {
			// sign up success
			return {
				...state,
				fetching: "success"
			};

		} else {
			// sign up failed
			return {
				...state,
				fetching: "failed"
			};
		}

	case "SIGN_UP_REJECTED":
		return {
			...state,
			error: true
		};

	// voting cases ----------------
	case "VOTE_PENDING":
		return {
			...state,
			fetching: "fetching"
		};

	case "VOTE_FULFILLED":
		var participatePolls = state.participatePolls.splice(0);
		participatePolls.push({
			pollID: action.payload.data.pollID,
			selectedOpt: action.payload.data.selectedOpt
		});

		return {
			...state,
			participatePolls,
			fetching: "success"
		};
	}

	return state;
}