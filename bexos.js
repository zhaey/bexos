
var isdown = false;

var x = 0;
var y = 0;
var w = 0;
var h = 0;

var img = new Image();

function begin() {
	var img_canvas = document.getElementById('image');
	var img_ctx = img_canvas.getContext('2d');

	var ui_canvas = document.getElementById('canvas');

	img.onload = function() {
		img_canvas.width = img.width;
		img_canvas.height = img.height;
		img_ctx.drawImage(img, 0, 0);
		
		ui_canvas.width = img.width;
		ui_canvas.height = img.height;
	}

	if (location.hash) {
		img.src = location.hash.substr(1);
	} else {
		img.src = 'https://picsum.photos/200/300.webp';
	}

	ui_canvas.addEventListener('pointerdown', function(event) {
		isdown = true;
		x = event.offsetX;
		y = event.offsetY;
		w = 0;
		h = 0;
	});

	ui_canvas.addEventListener('pointermove', function(event) {
		if (isdown === false) {
			return;
		}

		w = event.offsetX - x;
		h = event.offsetY - y;

		window.requestAnimationFrame(draw);
	});

	ui_canvas.addEventListener('pointerup', function(event) {
		if (isdown === false) {
			return;
		}
		isdown = false;
		
		window.requestAnimationFrame(draw);
		alert(x + ' ' + y + ' ' + w + ' ' + h);
	});

}

function draw() {
	var canvas = document.getElementById('canvas')
	var ctx = canvas.getContext('2d');

	ctx.globalCompositeOperation = 'destination-over';
	ctx.clearRect(0, 0, img.width, img.height);
	
	ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
	ctx.fillRect(x, y, w, h);
}
