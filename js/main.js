handlePeopleCounting = () => {
	// Handel if no API key
	if (apikey == 'ENTER YOUR API KEY') {
		// Toggle popup window
		$('#warning-title').html('Missing API Key');
		$('#warning-text').html(
			'For security purpose, we removed the API key <br> Please place your api key in app.js file'
		);
		$('#warning-popup').modal('toggle');
	} else {
		// Return base64 string as data
		let data = $('#uploadedVideo').attr('src').split('base64,')[1];
		$('#processing-info').show();
		peopleCounting(data);

		// Change text while processing data
		let processingMsg = [
			'We are trying hrad to process video <br> Longer video may takes longer to load',
			'We are still processing your video ... ',
			'Did you know? Sentient.io has a demo app to recognize face!',
			'At Sentient.io we have more than 50 microservices to make your system intelligent.',
			"You can go to our api documentation platfrom to see the complete detail of all Sentient.io's microservices",
			'Did you know? Sentient.io provide corporate solution as well as trying to help individual developers to use AI easily',
			"Thanks for waiting, we are still processing your vidoe, it's almost there!",
		];

		let msgIndex = 0;

		window.setInterval(function () {
			$('#loading-msg-1').html(processingMsg[msgIndex]);
			if (msgIndex < processingMsg.length) {
				msgIndex += 1;
			}
        }, 8000);
        
	}
};

dispyCountingResult = (result) => {
	// Main Counting Result (Card with Number)
	$('#result-people-counter').html(result["counter"])
	$('#overestimationLikelyhood').html(result["likelihood of overestimation"])
	$('#underestimationLikelyHood').html(result["likelihood of underestimation"])
	$('#processing-info').hide()
	$('#result-container').show()

	// Render data for tables
	let people = result.people
	for (index in people){
		// Clean Up returned value
		let personIdVal = Object.keys(people[index])[0]
		let firstApperanceVal = Object.values(people[index])[0][0]
		let durationAppearedVal = Object.values(people[index])[0][1]
		let detectionConfVal = Object.values(people[index])[0][2]
		let assigningConfVal = Object.values(people[index])[0][3]

		// Create all required DOM elements
		let tr = document.createElement('tr')
		let personId = document.createElement('td')
		let firstApperance = document.createElement('td')
		let detectionConf = document.createElement('div')
		let firstAppearedFrame = document.createElement('td')
		let video = document.createElement('video')
		let videoClip = document.createElement('source')
		let durationAppeared = document.createElement('td')
		let assigningConf = document.createElement('div')

		// Render values to DOM elements
		$(personId).html(personIdVal.replace(/person id: /, ''))
		$(firstApperance).html(firstApperanceVal.replace(/first appearance: /, ''))
		$(durationAppeared).html(durationAppearedVal.replace(/duration appeared: /, ''))
		Object.assign(videoClip, {
			src: $('#uploadedVideo').attr('src')
		})

		$(video).append(videoClip)
		$(firstAppearedFrame).append(video)
		video.currentTime = Number(firstApperanceVal.replace(/first appearance: /, '').replace(/s/, ''))

		console.log(Number(firstApperanceVal.replace(/first appearance: /, '').replace(/s/, '')))

		// Append DOM elements
		$(tr).append(personId)
		$(tr).append(firstApperance)
		$(tr).append(firstAppearedFrame)
		$(tr).append(durationAppeared)
		$('#result-table-body').append(tr)
	}
}