let groupofpeoplerunning = {
	video: {
		mime: 'video/mp4',
		data:
	},
};

//console.log('Test video 2 : group of people running loaded');

data.groupofpeoplerunning = {
	base64: groupofpeoplerunning.video.data,
};

$('#video-2 .test-video-loader').hide();
$('#video-2-preview').show();