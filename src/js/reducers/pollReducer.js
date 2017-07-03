// for the currently shown poll
const initialStates = {
	loaded: false,
	fetching: "none",
	error: false,
	pollData: {
		opt: []
	}
};

export default function reducer(state=initialStates, action) {
	switch(action.type) {
		
	case "LOAD_PENDING":
		return {
			...state,
			fetching: "fetching"
		};

	case "LOAD_FULFILLED":
		return {
			...state,
			pollData: {
				opt: action.payload.data.opt
			},
			fetching: "success"
		};

	case "LOAD_REJECTED":
		return {
			...state,
			fetching: "none",
			error: true
		};

	case "VOTE":
		return state;
	}
	return state;
}
