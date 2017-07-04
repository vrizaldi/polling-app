const initialStates = {
	loggedIn: false,
	fetching: "none",
	error: false,
	userData: {
		username: "",
		password: "",
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
					password: action.payload.data.password,
					bio: action.payload.data.bio,
					adminPolls: action.payload.data.adminPolls,
					participatePolls: []
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

	case "CREATE_POLL_PENDING":
		return {
			...state,
			fetching: "fetching"
		};

	case "CREATE_POLL_FULFILLED":
		var adminPolls = state.userData.adminPolls.splice(0);
			// clone it
		adminPolls.push({
			_id: action.payload.data._id,
			question: action.payload.data.question
		});
		console.log("success adding poll");
		return {
			...state,
			userData: {
				...state.userData,
				adminPolls,	
			},
			fetching: "success"
		};

	case "CREATE_POLL_REJECTED":
		return {
			...state,
			fetching: "failed"
		};

	case "DELETE_POLL_PENDING":
		return {
			...state,
			fetching: "fetching"
		};

	case "DELETE_POLL_FULFILLED": 
		return {
			...state,
			userData: {
				...state.userData,
				adminPolls: action.payload.data.adminPolls
			},
			fetching: "success"
		};

	case "DELETE_POLL_REJECTED":
		return {
			...state,
			fetching: "failed",
			error: true
		};
	}
	return state;
}