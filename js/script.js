const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = 960;
canvas.height = 500;

let rectX = 0;
let rectY = 0;

let secondsPassed = 0;
let oldTimeStamp = 0;
let movingSpeed = 50;

let flock = [];

function setup() {
    for (let i = 0; i < 25; i++) {
        let radius = 30;

        // let x = Math.floor(Math.random() * (canvas.width - radius * 2) + radius);
        // let y = Math.floor(Math.random() * (canvas.height - radius * 2) + radius);
        let x = canvas.width / 2;
        let y = canvas.height / 2;

        let vec = new Victor();

        vec = vec.randomize(new Victor(-4, 4), new Victor(4, -4));
        vec.normalize();

        // console.log(vec);

        let dx = vec.x * 4;
        let dy = vec.y * 4;

        flock.push(new Circle(x, y, dx, dy, radius));
    }
}

setup();

function animate() {
    // console.log('gameLoop');

    // align(flock);
    draw();
    // update();

    // window.requestAnimationFrame(animate);
}
// jump start gameLoop
window.requestAnimationFrame(animate);



function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius

    this.draw = () => {
        ctx.beginPath();
        ctx.strokeStyle = '#ff8080'
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
    }

    this.update = () => {
        // if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        //     this.dx = -this.dx;
        // }

        // if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        //     this.dy = -this.dy
        // }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }

    this.align = (boids) => {
        // console.log('boid align');
        let preceptionRadius = 50;
        let avg = Victor();
        let total = 0;

        for (let other of boids) {
            // console.log(this);
            // console.log(other);
            // let d = dist(this.position.x, this.position.y, other.position.x, other.position.y)

            let vec1 = new Victor(this.x, this.y);
            let vec2 = new Victor(other.x, other.y);

            let d = vec1.distance(vec2);
            // console.log(d);

            if (other != this && d < preceptionRadius) {
                avg.add(other);
                total++;
            }
        }

        if (total > 0) {
            // console.log(avg);
            // avg.divide(total);
            // console.log(avg.divide(total))
            // console.log(avg);
            // console.log(this.velocity);
            this.velocity = avg;
        }

        // console.log(avg);
        // return avg;
    }
}

function draw() {
    // Clear canvas to animate
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let boid of flock) {
        boid.align(flock);
        boid.update();
    }

    // circle.update;
}


/*
function align(boids) {
    let preceptionRadius = 50;
    let avg = Victor();
    let total = 0;

    for (let other of boids) {
        // let d = dist(this.position.x, this.position.y, other.position.x, other.position.y)

        let vec1 = new Victor(this.position.x, this.position.y);
        let vec2 = new Victor(other.position.x, other.position.y);

        let d = vec1.distance(vec2);
        console.log(d);

        if (other != this && d < preceptionRadius) {
            avg.add(other);
            total++;
        }
    }

    if (total > 0) {
        avg.div(totla);
        this.velocity = avg;
    }

    console.log(avg);
    return avg;
}
*/