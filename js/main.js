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

		// Hide Control buttons
		$('#btn-countPeople, #btn-cancel').hide();

		// Change text while processing data
		let processingMsg = [
			'Just a moment more, running calculations on your video...',
			'You can buy and sell data securely on Sentient.io’s blockchain network.',
			'Use utility microservices to save time during your app development.',
			'Have a microservice you\'re looking for but can\'t find? Write in to us <a style="text-decoration:underline"  href = "mailto: enquiry@sentient.io">enquiry@sentient.io</a>',
			"Need help with implementing the APIs? Click the 'Help' button at the bottom of the screen to reach out to our support team.",
			'The APIs on our platform are curated carefully to ensure reliability for deployment',
			'Usage discounts are automatically applied as the number of API calls made reaches the next tier',
			'Just a moment more, running calculations on your video...'
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
	// Reset result table container
	$('#result-table-body').empty();

	// Main Counting Result (Card with Number)
	$('#result-people-counter').html(result['counter']);
	$('#overestimationLikelyhood').html(result['likelihood of overestimation']);
	$('#underestimationLikelyHood').html(result['likelihood of underestimation']);
	$('#processing-info').hide();
	$('#result-container').show();

	// Render data for tables
	let people = result.people;
	for (index in people) {
		// Clean Up returned value
		let personIdVal = Object.keys(people[index])[0];
		let firstApperanceVal = Object.values(people[index])[0][0];
		let durationAppearedVal = Object.values(people[index])[0][1];
		let detectionConfVal = Object.values(people[index])[0][2];
		let assigningConfVal = Object.values(people[index])[0][3];

		// Create all required DOM elements
		let tr = document.createElement('tr');
		let personId = document.createElement('td');
		let firstApperance = document.createElement('td');
		//let detectionConf = document.createElement('div');
		let firstAppearedFrame = document.createElement('td');
		let video = document.createElement('video');
		let videoClip = document.createElement('source');
		let durationAppeared = document.createElement('td');
		//let assigningConf = document.createElement('div');

		// Render values to DOM elements
		$(personId).html(personIdVal.replace(/person id: /, ''));
		$(firstApperance).html(firstApperanceVal.replace(/first appearance: /, ''));
		$(durationAppeared).html(
			durationAppearedVal.replace(/duration appeared: /, '')
		);
		Object.assign(videoClip, {
			src: $('#uploadedVideo').attr('src'),
		});

		$(video).append(videoClip);
		$(firstAppearedFrame).append(video);
		video.currentTime = Number(
			firstApperanceVal.replace(/first appearance: /, '').replace(/s/, '')
		);
		// Render value for Confidence icon
		let iconContainer = document.createElement('div');
		iconContainer.setAttribute('class', 'hover-tool-tip');
		let icon = document.createElement('span');
		icon.innerHTML = 'info';
		icon.setAttribute('class', 'ml-1 material-icons hover-tool-tip-ico');
		icon.setAttribute('style', 'color: #757575; font-size:16px');
		//let confContent = document.createElement('div');
		//confContent.setAttribute('style','display:inline')
		//confContent.setAttribute('href', '#')
		//confContent.setAttribute('data-toggle', 'tooltip')
		//confContent.setAttribute('title', `${assigningConfVal}, ${detectionConfVal}`)

		//$(personId).append(confContent);
		//$(confContent).append(icon);
		//$(confContent).html(detectionConfVal + assigningConfVal);

		// Append DOM elements
		$(tr).append(personId);
		$(tr).append(firstApperance);
		$(tr).append(firstAppearedFrame);
		$(tr).append(durationAppeared);
		$('#result-table-body').append(tr);

		// Show restart button
	}
	$('#btn-restart').show();
};

handleCancel = () => {
	// Clear record of uploaded file
	$('#video-uploader-input').val('');
	$('#video-preview video').remove();
	$('#btn-countPeople, #btn-cancel').hide();
	$('#video-uploader').show();

	// Create and append new video element
	let video = document.createElement('video');
	Object.assign(video, {
		style: 'display:none; padding:0 !important; width: 100%;',
		controls: true,
	});
	$('#video-preview').append(video);
};

handleRestart = () => {
	$('#processing-info, #result-container').hide();
	$('#btn-restart').hide();
	$('#result-table-body').empty();
	handleCancel();
};
