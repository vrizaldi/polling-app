// for the currently shown poll
const initialStates = {
	loaded: false,
	fetching: "none",
	pollData: {
		_id: "",
		question: "",
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
				_id: action.payload.data._id,
				opt: action.payload.data.opt,
				question: action.payload.data.question
			},
			fetching: "success"
		};

	case "LOAD_REJECTED":
		return {
			...state,
			fetching: "none",
			error: true
		};

	case "VOTE_PENDING":
		return {
			...state,
			fetching: "fetching"
		};

	case "VOTE_FULFILLED":
		return {
			...state,
			fetching: "success",
			pollData: {
				_id: action.payload.data._id,
				opt: action.payload.data.opt,
				question: action.payload.data.question
			}
		};
	}
	return state;
}
