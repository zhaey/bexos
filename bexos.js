let Point = class {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

let Selection = class {
    constructor(p1 = new Point(), p2 = new Point()) {
        this.p1 = p1;
        this.p2 = p2;
    }

    get xMin() {
        return Math.min(this.p1.x, this.p2.x);
    }

    get xMax() {
        return Math.max(this.p1.x, this.p2.x);
    }

    get yMin() {
        return Math.min(this.p1.y, this.p2.y);
    }

    get yMax() {
        return Math.max(this.p1.y, this.p2.y);
    }

    get width() {
        return Math.abs(this.p1.x - this.p2.x);
    }

    get height() {
        return Math.abs(this.p1.y - this.p2.y);
    }

    get midPoint() {
        return new Point(
            (this.p1.x + this.p2.x) / 2,
            (this.p1.y + this.p2.y) / 2
        );
    }

    shift(x = 0, y = 0) {
        this.p1.x += x;
        this.p2.x += x;
        this.p1.y += y;
        this.p2.y += y;
    }

}

let box = new Selection();

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

        box.p1 = new Point(
            img.width / 2,
            img.height / 2
        );

        box.p2 = new Point(
            img.width / 2,
            img.height / 2
        );

        window.requestAnimationFrame(draw);
    }

    if (location.hash) {
        img.src = location.hash.substr(1);
    } else {
        img.src = 'https://picsum.photos/1080/720.webp';
    }

    ui_canvas.addEventListener('pointerdown', function (event) {
        if (!event.shiftKey) {
            box.p1.x = event.offsetX;
            box.p1.y = event.offsetY;
            box.p2.x = event.offsetX;
            box.p2.y = event.offsetY;
        }

        window.requestAnimationFrame(draw);
    });

    ui_canvas.addEventListener('pointermove', function (event) {
        if (event.buttons === 1) {

            if (event.shiftKey) {
                box.shift(event.movementX, event.movementY);
            } else if (event.ctrlKey) {
                let r = Math.max(Math.abs(box.p1.x - event.offsetX), Math.abs(box.p1.y - event.offsetY));
                box.p2.x = box.p1.x + r * Math.sign(event.offsetX - box.p1.x);
                box.p2.y = box.p1.y + r * Math.sign(event.offsetY - box.p1.y);


                // if (Math.abs(box.p1.x - event.offsetX) > Math.abs(box.p1.y - event.offsetY)) {
                //     box.p2.x = event.offsetX;
                //     box.p2.y = box.p1.y + box.width * Math.sign(event.offsetY - box.p1.y);
                // } else {
                //     box.p2.y = event.offsetY;
                //     box.p2.x = box.p1.x + box.height * Math.sign(event.offsetX - box.p1.x);
                // }
            } else {
                box.p2.x = event.offsetX;
                box.p2.y = event.offsetY;
            }

            window.requestAnimationFrame(draw);
        }
    });

    ui_canvas.addEventListener('pointerup', function (event) {
        // lol
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

    if (box.p1.x !== box.p2.x || box.p1.y !== box.p2.y) {
        ctx.fillRect(0, 0, img.width, img.height);
        ctx.clearRect(box.xMin, box.yMin, box.width, box.height);
    }


    ctx.beginPath();

    ctx.moveTo(0, box.yMin);
    ctx.lineTo(img.width, box.yMin);
    ctx.moveTo(0, box.yMax);
    ctx.lineTo(img.width, box.yMax);

    ctx.moveTo(box.xMin, 0);
    ctx.lineTo(box.xMin, img.height);
    ctx.moveTo(box.xMax, 0);
    ctx.lineTo(box.xMax, img.height);

    ctx.moveTo(0, box.midPoint.y);
    ctx.lineTo(img.width, box.midPoint.y);
    ctx.moveTo(box.midPoint.x, 0);
    ctx.lineTo(box.midPoint.x, img.height);

    ctx.stroke();

    text.value = box.xMin + ' ' + box.yMin + ' ' + box.width + ' ' + box.height;
}
