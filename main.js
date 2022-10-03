import './style.css';
import Vector from './vectoredBeta';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let flock = [];

function drawBoid(x, y, rotation) {
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#fff';

  ctx.beginPath();
  ctx.save(); // why is this?
  ctx.translate(x, y);
  ctx.scale(0.5, 0.5);
  ctx.rotate(rotation);

  ctx.beginPath();
  ctx.moveTo(0, -14);

  ctx.lineTo(11, 14);
  ctx.lineTo(0, 7);
  ctx.lineTo(-11, 14);
  ctx.lineTo(0, -14);

  ctx.restore();
  ctx.closePath();
  ctx.stroke();
}

function setup() {
  for (let i = 0; i < 100; i++) {
    // spawn boids randomly on canvas
    let x = Math.floor(Math.random() * (canvas.width * 2));
    let y = Math.floor(Math.random() * (canvas.height * 2));

    let vec = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
    vec.setMag(Math.random() * 2 + 2);

    flock.push(new Circle(x, y, vec.x, vec.y));
  }
}

setup();

function animate() {
  window.requestAnimationFrame(animate);
  draw();
}
// start draw loop
window.requestAnimationFrame(animate);

// testing interval
setInterval(() => {
  // draw();
}, 1000);

function Circle(x, y, dx, dy, radius) {
  this.position = new Vector(x, y);
  this.velocity = new Vector(dx, dy);
  this.acceleration = new Vector();
  this.maxForce = 0.2;
  this.maxSpeed = 5;

  this.draw = () => {
    // get velocity angle
    let ang = Math.atan2(this.velocity.y, this.velocity.x);
    ang += Math.PI / 2;
    drawBoid(this.position.x, this.position.y, ang);

    // ctx.beginPath();
    // ctx.strokeStyle = '#ff8080';
    // ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
    // ctx.stroke();
    // ctx.fill();
  };

  this.update = () => {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);

    // limit max speed
    if (this.velocity.length > this.maxSpeed) {
      this.velocity.setMag(this.maxSpeed);
    }

    this.acceleration.mult(0, 0, 0);
  };

  this.align = (boids) => {
    let preceptionRadius = 24;
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
      avg.setMag(this.maxSpeed);
      avg.sub(this.velocity);

      // limit force
      if (avg.length > this.maxForce) {
        avg = avg.setMag(this.maxForce);
      }
    }
    return avg;
  };

  this.cohesion = (boids) => {
    let preceptionRadius = 50;
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
      avg.setMag(this.maxSpeed);
      avg.subtract(this.velocity);

      // limit force
      if (avg.length > this.maxForce) {
        avg = avg.setMag(this.maxForce);
      }
    }
    return avg;
  };

  this.separation = (boids) => {
    let preceptionRadius = 24;
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
      avg.subtract(this.position);
      avg.setMag(this.maxSpeed);
      avg.sub(this.velocity);

      // limit force
      if (avg.length > this.maxForce) {
        avg = avg.setMag(this.maxForce);
      }
    }
    return avg;
  };

  this.flock = (boids) => {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);
    // TODO influence values (by multiplying them [0-x])
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
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
    boid.update();
    boid.draw();
  }
}
