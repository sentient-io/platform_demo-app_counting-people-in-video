// 1MB is 1048576
let fileSizeLimit = 1048576*10;

let dropArea = document.getElementById('video-uploader');
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
uploadVideo= (files) => {
	if (files[0].size >= fileSizeLimit) {
		// Toggle popup window
		$('#warning-title').html('File size if over 10MB')
		$('#warning-text').html('For demo purpose, file size is limited to 10MB and below, please compress your video before upload')
		$('#warning-popup').modal('toggle');

		// Clear record of uploaded file
		$('#video-uploader-input').val('');
	} else if (!files[0].type.includes('video')) {
		// Check if file type contains "video" keywords
		// Toggle popup window
		$('#warning-title').html('File type not supported')
		$('#warning-text').html('Please upload a video format file <br>e.g. .mp4 ')
		$('#warning-popup').modal('toggle');

		// Clear record of uploaded file
		$('#video-uploader-input').val('');
	} else {
		// Preview uploaded file
		let reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onloadend = () => {
            let video = $('#video-preview video');
            let source = document.createElement('source')
			source.setAttribute('id', 'uploadedVideo');
            source.src = reader.result;
            $(video).show().append(source)
        };
		$('#video-uploader').hide()
		$('#btn-countPeople').show()
	}
};
