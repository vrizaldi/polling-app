import axios from "axios";

export function load(pollID) {
	return {
		type: "LOAD",
		payload: axios.get("/getpoll?pollID=" + pollID)
	};
}

export function reset() {
	return {
		type: "RESET"
	};
}

export function vote(pollID, optID) {
	return {
		type: "VOTE",
		payload: axios({
			method: "post",
			url: "/vote",
			data: {
				_id: pollID,
				optID
			},
			headers: {
				"content-type": "application/json"
			}
		})
	};
}