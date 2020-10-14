// API Call with jQuery
/*
peopleCounting = (data) => {;
	// Calling Wikipedia Retieval API
	$.ajax({
		method: 'POST',
		url:
			'https://apis.sentient.io/microservices/cv/peoplecounting/v0.1/getpredictions',
		headers: {
			'accept': 'application/json',
			'x-api-key': apikey,
			'Content-Type': 'application/json'
		},
		data: JSON.stringify({
			'video_base64': data
		}),
		success: (response) => {
            console.log(response)
		},
		error: (err) => {
            console.log(err)
		},
	});
}
*/
// -END- API Call with jQuery

// API Call with XMLHttpRequest
let request = new XMLHttpRequest();
peopleCounting = (data) => {
	request.open(
		'POST',
		'https://apis.sentient.io/microservices/cv/peoplecounting/v0.1/getpredictions'
	);
	request.setRequestHeader('accept', 'application/json');
	request.setRequestHeader('x-api-key', apikey);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(JSON.stringify({'video_base64': data}));
	request.onload = () => {

		// Parse the returned JSON object to Javascript Object
		let result = JSON.parse(request.response)
		console.log(result);
		dispyCountingResult(result)
	};
	request.onerror = () => {
		console.log('Network Error')
	};
	request.onprogress = (event) => {
	}	
}
// -END- API Call with XMLHttpRequest