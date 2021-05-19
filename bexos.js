
var isdown = false;

var x = 0;
var y = 0;
var x_ = 0;
var y_ = 0;

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
		img.src = 'https://picsum.photos/600/400.webp';
	}

	ui_canvas.addEventListener('pointerdown', function(event) {
		isdown = true;
		x = event.offsetX;
		y = event.offsetY;
		x_ = x;
		y_ = y;
	});

	ui_canvas.addEventListener('pointermove', function(event) {
		if (isdown === false) {
			return;
		}

		x_ = event.offsetX;
		y_ = event.offsetY;

		window.requestAnimationFrame(draw);
	});

	ui_canvas.addEventListener('pointerup', function(event) {
		if (isdown === false) {
			return;
		}
		isdown = false;
		
		window.requestAnimationFrame(draw);
		//alert(x + ' ' + y + ' ' + w + ' ' + h);
	});

}

function draw() {
	var canvas = document.getElementById('canvas')
	var ctx = canvas.getContext('2d');
	var text = document.getElementById('text');

	ctx.globalCompositeOperation = 'destination-over';
	ctx.clearRect(0, 0, img.width, img.height);
	
	ctx.lineWidth = 1;
	ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
	ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
	ctx.fillRect(x, y, x_ - x, y_ - y);
	ctx.strokeRect(x, y, x_ - x, y_ - y);

	text.textContent = Math.min(x, x_) + ' ' + Math.min(y, y_) + ' ' + Math.max(x, x_) + ' ' + Math.max(y, y_);
}
