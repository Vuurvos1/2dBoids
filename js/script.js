const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1200;
canvas.height = 600;

let secondsPassed = 0;
let oldTimeStamp = 0;
let movingSpeed = 50;

let maxSpeed = 4;
let minSpeed = .5;

let boidSpeed = 4;

let flock = [];

function setup() {
    for (let i = 0; i < 100; i++) {
        let radius = 5;

        // spawn random
        let x = Math.floor(Math.random() * (canvas.width - radius * 2) + radius);
        let y = Math.floor(Math.random() * (canvas.height - radius * 2) + radius);

        // spawn center
        // let x = canvas.width / 2;
        // let y = canvas.height / 2;

        let vec = new Victor();

        vec = vec.randomize(new Victor(-4, 4), new Victor(4, -4));
        vec.normalize();

        let dx = vec.x * boidSpeed;
        let dy = vec.y * boidSpeed;

        flock.push(new Circle(x, y, dx, dy, radius));
    }
}

setup();

function animate() {
    draw();

    window.requestAnimationFrame(animate);
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
        // Bounce of the canvas sides
        // if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        //     this.dx = -this.dx;
        // }

        // if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        //     this.dy = -this.dy
        // }

        this.x += this.dx;
        this.y += this.dy;
    }

    this.align = (boids) => {
        let preceptionRadius = 100;
        let avg = new Victor();
        let total = 0;

        for (let other of boids) {
            let vec1 = new Victor(this.x, this.y);
            let vec2 = new Victor(other.x, other.y);

            let d = vec1.distance(vec2);

            if (other != this && d < preceptionRadius) {
                avg.add(vec2);
                total++;
            }
        }

        if (total > 0) {
            avg.divide(new Victor(total, total));
            avg.normalize();

            let velocity = new Victor(this.dx, this.dy).normalize();

            avg.subtract(velocity);

            this.dx = avg.x * boidSpeed;
            this.dy = avg.y * boidSpeed;
        }
    }

    this.edges = () => {
        // screen wrapping
        if (this.x > canvas.width) {
            this.x = 10;
        } else if (this.x < 0) {
            this.x = canvas.width;
        }

        if (this.y > canvas.height) {
            this.y = 10;
        } else if (this.y < 0) {
            this.y = canvas.height;
        }
    }
}

function draw() {
    // Clear canvas to animate
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let boid of flock) {
        boid.edges();
        boid.align(flock);
        boid.update();
        boid.draw();
    }

}