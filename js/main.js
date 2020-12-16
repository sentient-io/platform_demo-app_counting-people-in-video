let data;
let state;

initialize = () => {
	data = {};
	state = {
		selectedVideo: 'video-1',
		'video-1': 'businesspeopleentermeetingroom',
		'video-2': 'groupofpeoplerunning',
		uploadedVideo: 'uploadedVideo',
	};
	//console.log('Data and state initialized');
};

initialize();
//console.log('Main JS Loaded');

/* +-----------------------------+ */
/* | Check if user is on mobile  | */
/* +-----------------------------+ */
detectMob = () => {
	const toMatch = [/iPhone/i, /iPad/i, /iPod/i];

	return toMatch.some((toMatchItem) => {
		return navigator.userAgent.match(toMatchItem);
	});
};

state.isMob = detectMob();

/* +---------------------+ */
/* | Toggle Popup Alert  | */
/* +---------------------+ */
togglePopUpAlert = (alertTitle, alertMsg) => {
	$('#alertContent').html(alertMsg);
	$('#alertTitle').html(alertTitle);
	$('#alert').modal('toggle');
	loadingEnd();
};

/* +----------------------+ */
/* | Select Preview Video | */
/* +----------------------+ */
selectPreviewVideo = (e) => {
	//console.log(e);
	let id = e;
	$(`#${state.selectedVideo}`).removeClass('selected');
	$(`#${id}`).addClass('selected');
	state.selectedVideo = id;
	let video = state[id];
	//console.log();
	previewVideo({ base64: data[video].base64, controls: true });

	// Remove uploaded video from data
	if (data.uploadedVideo) {
		delete data.uploadedVideo;
	}
};

/* +-------------------------------------------+ */
/* | App Main Function - Count people in video | */
/* +-------------------------------------------+ */
useAnalyseVideo = () => {
	loadingStart();
	//console.log();
	// Get full name of selected video
	let selectedVideoName = state[state.selectedVideo];
	//console.log(data[selectedVideoName]);
	//console.log('Start Analyse Video');
	let base64 = data[selectedVideoName].base64;
	peopleCounting(base64)
		.then((result) => {
			loadingEnd();
			//console.log('Success : Counting people');
			displayCountingResult(result);
			$('#mainFunction, #video-selection-container').hide();
			$('#btn-restart').show();
		})
		.catch((err) => {
			let errTitle = `Error ${err.status}`;
			let errMsg = `${JSON.parse(err.responseText).message}`;
			togglePopUpAlert(errTitle, errMsg);
			//console.log(`Error ${err.status}`);
		});
};

displayCountingResult = (e) => {
	// Reset result table container
	$('#result-table-body').empty();

	// On large screen, display 2 columns
	$('#s-video-preview').addClass('col-lg-6');

	let peopleCount = e['counter'];
	let overEstim = e['likelihood of overestimation'];
	let underEstim = e['likelihood of underestimation'];
	//console.log(e['counter'] == '0 people');
	//console.log(e['likelihood of underestimation']);

	$('#people-count').html(peopleCount);
	$('#overEstim').html(overEstim);
	$('#underEstim').html(underEstim);

	if (e['counter'] != '0 people') {
		$('#result-table').show();

		if (state.isMob) {
			// Hide first appeared frame on mobile device, it is not displaying well
			$('#first-appeared-frame').hide();
		}

		let people = e['people'];
		for (index in people) {
			// Clean Up returned value
			let personIdVal = Object.keys(people[index])[0];
			let firstApperanceVal = Object.values(people[index])[0][0];
			let durationAppearedVal = Object.values(people[index])[0][1];

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
			$(firstApperance).html(
				firstApperanceVal.replace(/first appearance: /, '')
			);
			$(durationAppeared).html(
				durationAppearedVal.replace(/duration appeared: /, '')
			);
			Object.assign(videoClip, {
				src: $('#s-video-preview video source').attr('src'),
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

			// Append DOM elements
			$(tr).append(personId);
			$(tr).append(firstApperance);
			if (!state.isMob) {
				// Hide first appeared frame on mobile device, it is not displaying well
				$(tr).append(firstAppearedFrame);
			}
			$(tr).append(durationAppeared);
			$('#result-table-body').append(tr);
		}
	} else {
		$('#result-table').hide();
	}

	$('#resultContainer').show();
};

/* +---------+ */
/* | Restart | */
/* +---------+ */
handleRestart = () => {
	$('#resultContainer, #btn-restart, #mainFunction').hide();
	$('#video-selection-container, #to-start-test').show();
	// On preview, display 1 column
	$('#s-video-preview').removeClass('col-lg-6');

	$('#s-video-preview').empty();
	$('#video-2, #video-1').removeClass('selected');

	selectPreviewVideo('video-1');
};
