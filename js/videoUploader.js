/* +------------------+ */
/* |  Video Uploader  | */
/* +------------------+ */
//console.log('Video Uploader Loaded');

// 1MB is 1048576
let fileSizeLimit = 1048576 * 10;

let dropArea = document.getElementById('s-video-uploader');
// Prevent default behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
	dropArea.addEventListener(eventName, preventDefaults, false);
});
function preventDefaults(e) {
	e.preventDefault();
	e.stopPropagation();
}

// Highlight effect when drag files over
['dragenter', 'dragover'].forEach((eventName) => {
	dropArea.addEventListener(eventName, highlight, false);
});
['dragleave', 'drop'].forEach((eventName) => {
	dropArea.addEventListener(eventName, unhighlight, false);
});
function highlight(e) {
	dropArea.classList.add('highlight');
}
function unhighlight(e) {
	dropArea.classList.remove('highlight');
}

//Get the data for the files that were dropped
dropArea.addEventListener('drop', handleDrop, false);
function handleDrop(e) {
	let dt = e.dataTransfer;
	let files = dt.files;
	uploadVideo(files);
}

// Handle picture preview
uploadVideo = (files) => {
	if (files[0].size >= fileSizeLimit) {
		// File size too large
		let errTitle = 'File Size Too Big';
		let errMsg = `For demp purpose, we are limiting file size to ${
			fileSizeLimit / 1048576
		}MB. <br>Please compress your file or try another video.`;
		togglePopUpAlert(errTitle, errMsg);
		// Clear record of uploaded file
		$('#s-video-uploader-input').val('');
		//console.log('Error, file size too large');
	} else if (!files[0].type.includes('video')) {
		// Wrong file format
		let errTitle = 'Wrong File Format';
		let errMsg = `Only video files are accepted.`;
		togglePopUpAlert(errTitle, errMsg);
		// Clear record of uploaded file
		$('#s-video-uploader-input').val('');
		//console.log('Error, wrong file format');
	} else {
		//console.log('Video successfully uploaded');
		// Preview uploaded file
		let reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onloadend = () => {
			state.selectedVideo = 'uploadedVideo';
			data.uploadedVideo = { base64: reader.result };
			// Remove selection on preview videos
			$('#video-1, #video-2').removeClass('selected');

			previewVideo({ base64: reader.result, controls: true });
		};
		$('#btn-countPeople').show();

		// Clear record of uploaded file
		$('#s-video-uploader-input').val('');
	}
};

previewVideo = (e) => {
	let base64 = e.base64;
	let id = e.id ? e.id : '#s-video-preview';
	let controls = e.controls ? true : false;
	// Clean existing previewing video
	$(id).empty();
	//console.log('Creating preview video');
	let video = document.createElement('video');
	let source = document.createElement('source');
	controls ? $(video).attr('controls', true) : '';
	$(video).attr('muted', true);
	$(video).attr('playsinline', true);
	$(video).attr('preload', 'metadata');

	source.src = base64;

	$(video).append(source);
	$(id).append(video);

	// Display [Analyse Video] Button
	$('#mainFunction').show();
	$('#to-start-test').hide();

	// Scroll window to video preview area
	$('html, body').animate(
		{
			scrollTop: $('#s-video-uploader').offset().top - 150,
		},
		500
	);
};
