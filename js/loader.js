// +----------------------+ //
// |  Full Screen Loader  | //
// +----------------------+ //
let loadingMsg = [
	'Just a moment more, processing your file...',
	'You can buy and sell data securely on Sentient.io’s blockchain network.',
	'Use utility microservices to save time during your app development.',
	'Have a microservice you\'re looking for but can\'t find? Write in to us <a style="text-decoration:underline"  href = "mailto: enquiry@sentient.io">enquiry@sentient.io</a>',
	"Need help with implementing the APIs? Click the 'Help' button at the bottom of the screen to reach out to our support team.",
	'The APIs on our platform are curated carefully to ensure reliability for deployment',
	'Usage discounts are automatically applied as the number of API calls made reaches the next tier',
	'Just a moment more, processing your file...',
];
let loading;
loadingStart = () => {
	$('#loader').show();

	let msgIndex = 0;
	loading = window.setInterval(() => {
		$('#loader-text').html(loadingMsg[msgIndex]);
		if (msgIndex < loadingMsg.length) {
			msgIndex += 1;
		} else {
			msgIndex = 1;
		}
	}, 4000);
};
loadingEnd = () => {
	$('#loader').hide();
	window.clearInterval(loading);
};

// +-----------------+ //
// |  Inline Lodaer  | //
// +-----------------+ //
inlineLoader = (param) => {
	let id = param.id;
	let msg = param.message;
	return new Promise((resolve, reject) => {
		let inlineLoaderContainer = document.createElement('div');
		$(inlineLoaderContainer).addClass('m-auto pt-5 text-center');
		$(inlineLoaderContainer).attr('id', `${id}`);

		let loaderIcon = document.createElement('img');
		$(loaderIcon).addClass('mr-3');
		Object.assign(loaderIcon, {
			src: 'img/loading.gif',
			width: '24',
		});
		$(inlineLoaderContainer).append(loaderIcon);

		let loaderMsg = document.createElement('span');
		$(loaderMsg).html(`${msg}`);
		$(inlineLoaderContainer).append(loaderMsg);

		resolve(inlineLoaderContainer);
	});
};
