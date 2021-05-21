let isdown = false;

let x = 0;
let y = 0;
let x_ = 0;
let y_ = 0;

const img = new Image();

function begin() {
    let img_canvas = document.getElementById('image');
    let img_ctx = img_canvas.getContext('2d');

    let ui_canvas = document.getElementById('canvas');

    img.onload = function () {
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

    ui_canvas.addEventListener('pointerdown', function (event) {
        isdown = true;
        if (!event.shiftKey) {
            x = event.offsetX;
            y = event.offsetY;
            x_ = x;
            y_ = y;
        }
    });

    ui_canvas.addEventListener('pointermove', function (event) {
        if (isdown === false) {
            return;
        }

        if (event.shiftKey) {
            x += event.movementX;
            x_ += event.movementX;
            y += event.movementY;
            y_ += event.movementY;
        } else if (event.ctrlKey) {
            x_ = event.offsetX;
            y_ = y + x_ - x;
        } else {
            x_ = event.offsetX;
            y_ = event.offsetY;
        }

        window.requestAnimationFrame(draw);
    });

    ui_canvas.addEventListener('pointerup', function (event) {
        if (isdown === false) {
            return;
        }
        isdown = false;

        window.requestAnimationFrame(draw);
    });

}

function draw() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let text = document.getElementById('text');

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, img.width, img.height);

    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 1.0)';
    ctx.fillRect(x, y, x_ - x, y_ - y);
    ctx.strokeRect(x, y, x_ - x, y_ - y);

    let x_min = Math.min(x, x_);
    let x_max = Math.max(x, x_);
    let y_min = Math.min(y, y_);
    let y_max = Math.max(y, y_);

    ctx.beginPath();
    ctx.moveTo(x_min, (y_min + y_max) / 2);
    ctx.lineTo(x_max, (y_min + y_max) / 2);
    ctx.moveTo((x_min + x_max) / 2, y_min);
    ctx.lineTo((x_min + x_max) / 2, y_max);
    ctx.stroke();

    text.value = x_min + ' ' + y_min + ' ' + (x_max - x_min) + ' ' + (y_max - y_min);
}
