/* +--------------------------+ */
/* | Call People Counting API | */
/* +--------------------------+ */
//console.log('People Counting API Functions Loaded');

peopleCounting = (e) => {
	let base64;
	String(e).includes('base64,')
		? (base64 = e.split('base64,')[1])
		: (base64 = e);

	// Calling Wikipedia Retieval API
	return new Promise((resolve, reject) => {
		//console.log('Start calling people counting API');
		$.ajax({
			method: 'POST',
			url:
				'https://apis.sentient.io/microservices/cv/peoplecounting/v0.1/getpredictions',
			headers: {
				accept: 'application/json',
				'x-api-key': apikey,
				'Content-Type': 'application/json',
			},
			data: JSON.stringify({
				video_base64: base64,
			}),
			success: (response) => {
				//console.log('Success');
				resolve(response);
			},
			error: (err) => {
				//console.log('Error');
				reject(err);
			},
		});
	});
};
