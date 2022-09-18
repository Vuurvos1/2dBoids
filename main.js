import './style.css';
import Vector from 'vectored';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let secondsPassed = 0;
let oldTimeStamp = 0;
let movingSpeed = 50;

const maxForce = 1;
let maxSpeed = 4;
let minSpeed = 0.5;

let boidSpeed = 4;

let flock = [];

function setup() {
  for (let i = 0; i < 100; i++) {
    let radius = 5;

    // spawn randomly on canvas
    let x = Math.floor(Math.random() * (canvas.width - radius * 2) + radius);
    let y = Math.floor(Math.random() * (canvas.height - radius * 2) + radius);

    let vec = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1, 0);
    vec.normalize().mult(boidSpeed, boidSpeed, 1);

    flock.push(new Circle(x, y, vec.x, vec.y, radius));
  }
}

setup();

function animate() {
  draw();

  window.requestAnimationFrame(animate);
}
// start draw loop
window.requestAnimationFrame(animate);

setInterval(() => {
  // draw();
}, 1000);

function Circle(x, y, dx, dy, radius) {
  this.position = new Vector(x, y, 0);
  this.velocity = new Vector(dx, dy, 0);
  this.acceleration = new Vector();
  this.radius = radius;

  this.draw = () => {
    ctx.beginPath();
    ctx.strokeStyle = '#ff8080';
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
  };

  this.update = () => {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);

    // limit max speed
    if (this.velocity.length > maxSpeed) {
      this.velocity.normalize().mult(maxSpeed, maxSpeed, 0);
    }

    this.acceleration.mult(0, 0, 0);
  };

  this.align = (boids) => {
    let preceptionRadius = 50;
    let avg = new Vector();
    let total = 0;

    for (let other of boids) {
      if (other == this) continue;
      const dist = this.position.copy().distance(other.position);
      if (dist < preceptionRadius) {
        let diff = new Vector().sub(this.position, other.position);
        diff.divide(dist * dist);
        avg.add(diff);
        total++;
      }
    }

    if (total > 0) {
      avg.divide(new Vector(total, total, 1));
      avg.subtract(this.position);
      avg.setMag(maxSpeed);
      avg.sub(this.velocity);

      // limit force
      if (avg.length > maxForce) {
        avg = avg.setMag(4);
      }
    }
    return avg;
  };

  this.cohesion = (boids) => {
    let preceptionRadius = 100;
    let avg = new Vector();
    let total = 0;

    for (let other of boids) {
      if (other == this) continue;
      const dist = this.position.copy().distance(other.position);
      if (dist < preceptionRadius) {
        avg.add(other.position);
        total++;
      }
    }

    if (total > 0) {
      avg.divide(new Vector(total, total, 1));
      avg.subtract(this.position);
      avg.setMag(maxSpeed);

      // limit force
      if (avg.length > maxForce) {
        avg = avg.setMag(4);
      }
    }
    return avg;
  };

  this.separation = (boids) => {
    let preceptionRadius = 50;
    let avg = new Vector();
    let total = 0;

    for (let other of boids) {
      if (other == this) continue;
      const dist = this.position.copy().distance(other.position);
      if (dist < preceptionRadius) {
        let diff = this.position.copy().sub(other.position);
        diff.div(dist);
        avg.add(diff);
        total++;
      }
    }

    if (total > 0) {
      avg.divide(new Vector(total, total, 1));
      // avg.subtract(this.position);
      avg.setMag(maxSpeed);
      avg.sub(this.velocity);

      // limit force
      if (avg.length > maxForce) {
        avg = avg.setMag(4);
      }
    }
    return avg;
  };

  this.flock = (boids) => {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);

    // TODO influence values (by multiplying them [0-x])

    this.acceleration.add(separation);
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
  };

  this.edges = () => {
    // screen wrapping
    if (this.position.x > canvas.width) {
      this.position.x = 10;
    } else if (this.position.x < 0) {
      this.position.x = canvas.width - 10;
    }

    if (this.position.y > canvas.height) {
      this.position.y = 10;
    } else if (this.position.y < 0) {
      this.position.y = canvas.height - 10;
    }
  };
}

function draw() {
  // Clear canvas to animate
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    // boid.align(flock);
    // boid.cohesion(flock);
    boid.update();
    boid.draw();
  }
}
