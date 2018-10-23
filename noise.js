import createStyleSheet from './stylesheep.js';

/*
 * Checking localStorage for cached dataURL to use else it generate
 * one. In this version it also add the noise to the body tag.
 */
export default function createNoise() {
	createCSS(localStorage.noise || generateNoise());
}

/*
 * Generete the noice and returns the data-url.
 * @return {String} data-url
 */
function generateNoise() {
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	var canvasHeight = canvas.height = 50;
	var canvasWidth = canvas.width = 50;
	var html = document.querySelector('html');

	html.appendChild(canvas);

	// Drawing noise on the canvas.
	for (var i = 0; i < canvasWidth; i++) {
		for (var j = 0; j < canvasHeight; j++) {
			var num = Math.floor(Math.random() * 255);

			context.fillStyle = "rgba(" + num + "," + num + "," + num + "," + .02 + ")";
			context.fillRect(i, j, 1, 1);
		}
	}

	localStorage.noise = canvas.toDataURL();

	canvas = html.removeChild(canvas);

	return canvas.toDataURL();
}

function createCSS (dataURL) {
	createStyleSheet().addRule({
		selector: '.noise',
		rules: 'background-image: url(' + dataURL + ');'
	});
}