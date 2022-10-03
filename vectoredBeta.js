/**
 * # Vectored - A JavaScript 2 and 3D vector math library
 */

/**
 * Constructor. Will also work without the `new` keyword
 *
 * @example
 *     let vec1 = new vec(10, 20, 5);
 *     let vec2 = vec(42, 1337);
 *
 * @param {Number} x Value of the x axis
 * @param {Number} y Value of the y axis
 * @param {Number} z Value of the z axis
 * @return {Vec}
 * @api public
 */
export function Vec(x, y, z) {
  if (!(this instanceof Vec)) {
    return new Vec(x, y, z);
  }

  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}

/**
 * Returns a vector that faces up
 *
 * @example
 *     let vector = new Vec.up();
 *     // => { x: 0, y: 1, z: 0 }
 *
 * @return {Vec} New Vec instance
 * @api public
 */
Vec.up = function () {
  return new Vec(0, 1, 0);
};

/**
 * Returns a vector that faces left
 *
 * @example
 *     let vector = new Vec.left();
 *     // => { x: -1, y: 0, z: 0 }
 *
 * @return {Vec} New Vec instance
 * @api public
 */
Vec.left = function () {
  return new Vec(-1, 0, 0);
};

/**
 * Returns a vector that faces down
 *
 * @example
 *     let vector = new Vec.down();
 *     // => { x: 0, y: -1, z: 0 }
 *
 * @return {Vec} New Vec instance
 * @api public
 */
Vec.down = function () {
  return new Vec(0, -1, 0);
};

/**
 * Returns a vector that faces right
 *
 * @example
 *     let vector = new Vec.right();
 *     // => { x: 1, y: 0, z: 0 }
 *
 * @return {Vec} New Vec instance
 * @api public
 */
Vec.right = function () {
  return new Vec(1, 0, 0);
};

/**
 * Returns a vector that faces forward
 *
 * @example
 *     let vector = new Vec.forward();
 *
 *     vector.toObject();
 *     // => { x: 0, y: 0, z: 1 }
 *
 * @return {Vec} New Vec instance
 * @api public
 */
Vec.forward = function () {
  return new Vec(0, 0, 1);
};

/**
 * Returns a vector that faces backwards
 *
 * @example
 *     let vector = new Vec.back();
 *     // => { x: 0, y: 0, z: -1 }
 *
 * @return {Vec} New Vec instance
 * @api public
 */
Vec.back = function () {
  return new Vec(0, 0, -1);
};

/**
 * Returns a vector containing all ones
 *
 * @example
 *     let vector = new Vec.one();
 *     // => { x: 1, y: 1, z: 1 }
 *
 * @return {Vec} New Vec instance
 * @api public
 */
Vec.one = function () {
  return new Vec(1, 1, 1);
};

/**
 * Returns a vector containing all zeros
 *
 * @example
 *     let vector = new Vec.zero();
 *     // => { x: 0, y: 0, z: 0 }
 *
 * @return {Vec} New Vec instance
 * @api public
 */
Vec.zero = function () {
  return new Vec(0, 0, 0);
};

/*
Create vector
*/

/**
 * Create a vector from an array
 *
 * @example
 *     let array = [10, 20, 0]
 *     let vector = new Vec.fromArray(array);
 *     // => { x: 10, y: 20, z: 0 }
 *
 * @name Vec.fromArray
 * @param {arr} arr Array containing x, y and z if not the value will be a 0
 * @return {Vec} New Vec instance
 * @api public
 */
Vec.fromArray = function (arr) {
  return new Vec(arr[0] || 0, arr[1] || 0, arr[2] || 0);
};

/**
 * Turn the x, y and z components of an object into a Vector
 *
 * @example
 *     let vector = new Vec({x: 10, y: 20, z:3});
 *     // => { x: 10, y: 20, z: 3 }
 *
 * @name Vec.formObject
 * @param {obj} obj Object containing x, y and z if not the value will be a 0
 * @return {Vec} New Vec instance
 * @api public
 */
Vec.formObject = function (obj) {
  return new Vec(obj.x || 0, obj.y || 0, obj.z || 0);
};

/**
 * Return an object representing the vector
 *
 * @example
 *     let vector = new Vec(10, 20);
 *
 *     vector.toObject();
 *     // => { x: 10, y: 20, z: 0 }
 *
 * @return {Object} Object representing the vector
 * @api public
 */
Vec.prototype.toObject = function () {
  return { x: this.x, y: this.y, z: this.z };
};

/**
 * Returns an array representing the vector
 *
 * @example
 *     let vector = new Vec(10, 20);
 *
 *     vector.toArray();
 *     // => [10, 20, 0]
 *
 * @return {Array} Array representing the vector
 * @api public
 */
Vec.prototype.toArray = function () {
  return [this.x, this.y, this.z];
};

/**
 * Returns a string representing the vector
 *
 * @example
 *     let vector = new Vec(10, 20);
 *
 *     vector.toString();
 *     // => 'x:10 y:20 z:0'
 *
 * @return {String} String representing the vector
 * @api public
 */
Vec.prototype.toString = function () {
  return `x:${this.x} y:${this.y} z:${this.z}`;
};

/**
 * Returns a copy of a vector
 *
 * @example
 *     let vec1 = new Vec(10, 20);
 *
 *     let vec2 = vec.copy();
 *		 // => {x: 10, y: 20, z: 0}
 *
 * @return {String} String representing the vector
 * @api public
 */
Vec.prototype.copy = function () {
  return new Vec(this.x, this.y, this.z);
};

/*
Basic Math
*/

/**
 * Add two vectors together
 *
 * @example
 *  let vec1 = new Vec(1, 5, 2);
 *  let vec2 = new Vec(8, 3, 3);
 *
 *  vec1.add(vec2);
 *  // => {x: 9, y: 8, z: 5}
 *
 * @param {Vec | number} x Vector or scalar to add to the vector
 * @param {number} [y] The y component of the vector to be added
 * @param {number} [z] The z component of the vector to be added
 *
 * @return {Vec} New Vec instance
 * @api public
 * @chainable
 */
Vec.prototype.add = function (x, y, z) {
  if (x instanceof Vec) {
    return new Vec((this.x += x.x), (this.y += x.y), (this.z += x.z));
  } else if (arguments.length === 1 && typeof x === 'number') {
    return new Vec((this.x += x), (this.y += x), (this.z += x));
  } else {
    return new Vec((this.x += x || 0), (this.y += y || 0), (this.z += z || 0));
  }
};

/**
 * Subtract two vectors from one another
 *
 * @example
 *     let vec1 = new Vec(2, 5, 3);
 *     let vec2 = new Vec(1, 3, 2);
 *
 *     vec1.subtract(vec2);
 *     // => {x: 1, y: 2, z: 1}
 *
 * @param {Vec | number} x Vector or scalar to subtract from vector
 * @param {number} [y] The y component of the vector to be subtracted
 * @param {number} [z] The z component of the vector to be subtracted
 *
 * @return {Vec} `this` for chaining capabilities
 * @api public
 * @chainable
 */
Vec.prototype.subtract = function (x, y, z) {
  if (x instanceof Vec) {
    return new Vec((this.x -= x.x), (this.y -= x.y), (this.z -= x.z));
  } else if (arguments.length === 1 && typeof x === 'number') {
    return new Vec((this.x -= x), (this.y -= x), (this.z -= x));
  } else {
    return new Vec((this.x -= x || 0), (this.y -= y || 0), (this.z -= z || 0));
  }
};
// sub short for subract
Vec.prototype.sub = Vec.prototype.subtract;

/**
 * Multiply two vectors by one another
 *
 * @example
 *     let vec1 = new Vec(2, 8, 1);
 *     let vec2 = new Vec(4, 2, 3);
 *
 *     vec1.multiply(vec2);
 *     // => {x: 8, y: 16, z: 3}
 *
 * @param {Vec | number} x Vector or scalar to multiply the vector by
 * @param {number} [y] The y component of the vector to be multiplied with
 * @param {number} [z] The z component of the vector to be multiplied with
 *
 * @return {Vec} New Vec instance
 * @api public
 * @chainable
 */
Vec.prototype.multiply = function (x, y, z) {
  if (x instanceof Vec) {
    return new Vec((this.x *= x.x), (this.y *= x.y), (this.z *= x.z));
  } else if (arguments.length === 1 && typeof x === 'number') {
    return new Vec((this.x *= x), (this.y *= x), (this.z *= x));
  } else {
    return new Vec((this.x *= x || 1), (this.y *= y || 1), (this.z *= z || 1));
  }
};
// mult shorthand for multiply
Vec.prototype.mult = Vec.prototype.multiply;

/**
 * Divide two vectors by one another
 *
 * @example
 *     let vec1 = new Vec(5, 10, 9);
 *     let vec2 = new Vec(2, 5, 3);
 *
 *     vec1.divide(vec2);
 *     // => {x: 2.5, y: 2, z: 3}
 *
 * @param {Vec | number} x Vector or scalar to divide vector by
 * @param {number} [y] The y component of the vector to be divided by
 * @param {number} [z] The z component of the vector to be divided by
 *
 * @return {Vec} New Vec instance
 * @api public
 * @chainable
 */
Vec.prototype.divide = function (x, y, z) {
  if (x instanceof Vec) {
    return new Vec((this.x /= x.x), (this.y /= x.y), (this.z /= x.z));
  } else if (arguments.length === 1 && typeof x === 'number') {
    return new Vec((this.x /= x), (this.y /= x), (this.z /= x));
  } else {
    return new Vec((this.x /= x || 1), (this.y /= y || 1), (this.z /= z || 1));
  }
};
// div shorthand for divide
Vec.prototype.div = Vec.prototype.divide;

/**
 * Remainder when dividing two vectors
 *
 * @example
 *     let vec1 = new Vec(1, 3);
 *     let vec2 = new Vec(4, 2);
 *
 *     vec1.remainder(vec2);
 *     // => {x: 1, y: 1, z: 0}
 *
 * @param {Vector} v vector to divide by
 * @return {Vector} Remainder of the vector
 * @api public
 */
Vec.prototype.remainder = function (v) {
  if (v instanceof Vec) {
    return new Vec((this.x %= v.x), (this.y %= v.y), (this.z %= v.z));
  } else {
    return new Vec((this.x %= v), (this.y %= v), (this.z %= v));
  }
};
// rem shorthand for remainder
Vec.prototype.rem = Vec.prototype.remainder;

/**
 * Create a vector from a 2D radian angle
 *
 * @example
 *     let vector = new Vec().fromAngle(Math.PI / 2, 1);
 *     // => {x: 0, y: 1, z: 0}
 *
 * @param {Number} angle desired angle in radians
 * @param {Number} length length of the new vector (defaults to 1)
 * @return {Vec} `this` for chaining capabilities
 * @api public
 */
Vec.fromAngle = function fromAngle(angle, length) {
  if (typeof length === 'undefined') {
    length = 1;
  }
  return new Vec(length * Math.cos(angle), length * Math.sin(angle), 0);
};

/**
 * Create a vector from a pair of ISO spherical angles
 *
 * @example
 *     let vector = new Vec().fromAngles(1.5, 2, 5);
 *     // => {x: 4.535, y: -0.353, z: -2.075}
 *
 * @param {Number} theta polar angle, in radians (zero is up)
 * @param {Number} phi azimuthal angle, in radians
 * @param {Number} length length of the new vector (defaults to 1)
 * @return {Vec} `this` for chaining capabilities
 * @api public
 */
Vec.fromAngles = function (theta, phi, length) {
  if (typeof length === 'undefined') {
    length = 1;
  }
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);

  return new Vec(
    length * sinTheta * sinPhi,
    -length * cosTheta,
    length * sinTheta * cosPhi
  );
};

/**
 * Create a new 2D vector with a random angle
 *
 * @example
 *     let vector = Vec.random2D;
 *     // => {x: 0.616, y: 0.787, z: 0}
 *
 * @return {Vec} `this` for chaining capabilities
 * @api public
 */
Vec.random2D = function random2D() {
  return Vec.fromAngle(Math.random() * twoPi);
};

/**
 * Create a new 3D vector with a random angle
 *
 * @example
 *     let vector = new Vec.random3D;
 *     // => {x: 0.442, y: -0.800, z: -0.405}
 *
 * @return {Vec} New Vec instance
 * @api public
 */
Vec.random3D = function random3D() {
  const angle = Math.random() * twoPi;
  const vz = Math.random() * 2 - 1;
  const vzBase = Math.sqrt(1 - vz * vz);
  const vx = vzBase * Math.cos(angle);
  const vy = vzBase * Math.sin(angle);
  return new Vec(vx, vy, vz);
};

/**
 * Get the negative of a vector
 *
 * @example
 *     let vector = new Vec(2, -1, 5);
 *
 *     vector.negative();
 *     // => {x: -2, y: 1, z: -5}
 *
 * @return {Vec} `this` for chaining capabilities
 * @api public
 */
Vec.prototype.negative = function () {
  return new Vec(-this.x, -this.y, -this.z);
};

/**
 * Get the length / magnitude of a vector
 *
 * @example
 *     let vector = new Vec(3, 4, 0);
 *
 *     vector.length();
 *     // => 5
 *
 * @return {Number} Length / Magnitude
 * @api public
 */
Vec.prototype.length = function () {
  return Math.sqrt(this.lengthSq());
};
Vec.prototype.magnitude = Vec.prototype.length;

/**
 * Return the distance between 2 vectors if they where points
 *
 * @example
 *     let vec1 = new Vec(3, 5, 0);
 *     let vec2 = new Vec(2, 1, 0);
 *
 *     vec1.distance(vec2);
 *     // => 4.1231056
 *
 * @param {Vector} v other vector point
 * @return {Number} length between two points
 * @api public
 */
Vec.prototype.distance = function (v) {
  return this.sub(v).magnitude();
};

/**
 * Get the squared lenght / magnitude of a Vector
 *
 * @example
 *     let vector = new Vec(3, 4, 0);
 *
 *     vector.lengthSq();
 *     // => 25
 *
 * @return {Number} Squared lenght / magnitude of the vector
 * @api public
 */
Vec.prototype.lengthSq = function () {
  const x = this.x;
  const y = this.y;
  const z = this.z;
  return x * x + y * y + z * z;
};
Vec.prototype.magnitudeSq = Vec.prototype.lengthSq;
Vec.prototype.magsq = Vec.prototype.lengthSq;

/**
 * Normalize the vector lenght to 1
 *
 * @example
 *     let vector = new Vec(4, 6, 5);
 *
 *     vector.normalize();
 *     // => {x: 0.455, y: 0.683, z: 0.569}
 *
 * @return {Vec} `this` for chaining capabilities
 * @api public
 */
Vec.prototype.normalize = function () {
  const length = this.length();

  if (length !== 0) {
    this.divide(length);
  }
  return this;
};

/**
 * Set the magnitude of the vector
 *
 * @example
 *     let vector = new Vec(4, 6, 5);
 *
 *     vector.setMag(4);
 *     // => {x: 1.823, y: 2.735, z: 2.279}
 *
 * @param {n} n The length you want the vector to be
 * @return {Vec} `this` for chaining capabilities
 * @api public
 */
Vec.prototype.setMag = function (n) {
  return this.normalize().multiply(n);
};

/**
 * Calculates the dot product of the vector and another
 * @example
 *     let vec1 = new Vec(100, 50);
 *     let vec2 = new Vec(200, 60);
 *
 *     vec1.dot(vec2);
 *     // => 23000
 *
 * @param {Number|Vector} x x component of vector or Vector object
 * @param {Number} y y component of vector
 * @param {Number} z z component of vector
 * @return {Number} Dot product
 * @api public
 */
Vec.prototype.dot = function (x, y, z) {
  if (x instanceof Vec) {
    return this.x * x.x + this.y * x.y + this.z * x.z;
  }

  return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
};

/**
 * Calculates the cross product of the vector and another
 *
 * @example
 *     let vec1 = new Vec(10, 20, 5);
 *     let vec2 = new Vec(5, 15, 10);
 *
 *     vec1.cross(vec2);
 *     // => {x: 125, y: -75, z:50}
 *
 * @param {Vector} v The second vector
 * @return {Number} Cross product
 * @api public
 */
Vec.prototype.cross = function (v) {
  return new Vec(
    this.y * v.z - this.z * v.y,
    this.z * v.x - this.x * v.z,
    this.x * v.y - this.y * v.x
  );
};

/**
 * Return a vector that is made from the largest components of two vectors
 *
 * @example
 *     let vec1 = new Vec(100, 50);
 *     let vec2 = new Vec(200, 60);
 *
 *     vec1.max(vec2);
 *     // => {200, 60}
 *
 * @param {Vector} v The second vector
 * @return {Vector} Maximum values of the 2 vectors
 * @api public
 */
Vec.prototype.max = function (v) {
  return new Vec(
    Math.max(this.x, v.x),
    Math.max(this.y, v.y),
    Math.max(this.z, v.z)
  );
};

/**
 * Returns a vector that is made from the smallest components of two vectors
 *
 * @example
 *     let vec1 = new Vec(100, 50);
 *     let vec2 = new Vec(200, 60);
 *
 *     vec1.min(vec2);
 *     // => {100, 50, 0}
 *
 * @param {Vector} v The second vector
 * @return {Vector} Minimum of vector
 * @api public
 */
Vec.prototype.min = function (v) {
  return new Vec(
    Math.min(this.x, v.x),
    Math.min(this.y, v.y),
    Math.min(this.z, v.z)
  );
};

/**
 * Rounds the vector so all values are integers
 *
 * @example
 *     let vec = new Vec(5.6, 8.362, 3);
 *
 *     vec.round();
 *     // => {x: 6, y: 8, z:3}
 *
 * @return {Vector} Rounded vector
 * @api public
 */
Vec.prototype.round = function () {
  return new Vec(Math.round(this.x), Math.round(this.y), Math.round(this.z));
};

/**
 * Lerp between two vectors
 *
 * @example
 *     let vec1 = new Vec(1, 3);
 *     let vec2 = new Vec(4, 2);
 *
 *     vec1.lerp(vec2, 0.5);
 *     // => {x: 2.5, y: 2.5, z: 0}
 *
 * @param {Vector} v Other vector to lerp between
 * @param {Number} t Value used to interpolate between a and b
 * @return {Vector} Lerped vector
 * @api public
 */
Vec.prototype.lerp = function (v, t) {
  // a * (1-t) + b*t)
  const i = v.multiply(t);
  return this.multiply(1 - t).add(i);
};

/**
 * Set vector values
 *
 * @example
 *     let vec = new Vec(1, 3, 2);
 *
 *     vec.set(4, 5, 0);
 *     // => {x: 4, y: 5, z: 0}
 *
 * @param {Number} x New x
 * @param {Number} y New y
 * @param {Number} z New z
 * @return {Vector} New vector
 * @api public
 */
Vec.prototype.set = function (x, y, z) {
  return new Vec(x ? x : this.x, y ? y : this.y, z ? z : this.z);
};

/**
 * Clamp the length of a vector
 *
 * @example
 *     let vec = new Vec(2, 4);
 *
 *     vec.clamp(1, 3);
 *     // => {x: 4, y: 5, z: 0}
 *
 * @param {Number} min Minimum length of the vector
 * @param {Number} max Maximim length of the vector
 * @return {Vector} Clamped vector
 * @api public
 */
Vec.prototype.clamp = function (min, max) {
  const length = this.length();

  if (length > max) {
    return this.setMag(max);
  } else if (length < min) {
    return this.setMag(min);
  } else {
    return this;
  }
};

/**
 * Clone a vector
 *
 * @example
 *     let vec1 = new Vec(2, 4);
 *     let vec2 = vec1.clone
 *     // => {x: 2, y: 4, z: 0}
 *
 * @return {Vector} New vector instance
 * @api public
 */
Vec.prototype.clone = function () {
  return new Vec(this.x, this.y, this.z);
};

/*
transform vector
*/

/**
 * Set the angle of a 2D vector
 *
 * @example
 *     let vec = new Vec(100, 0);
 *
 *     vec.rotateTo2D(-Math.PI);
 *     // => {x: -100, y: 0, z: 0}
 *
 * @param {Number} rad Radians to set vector to
 * @return {Vector} Rotated vector
 * @api public
 */
Vec.prototype.rotateTo2D = function (rad) {
  this.x = this.x * Math.cos(rad) - this.y * Math.sin(rad);
  this.y = this.x * Math.sin(rad) + this.y * Math.cos(rad);
  return this;
};

/**
 * Rotate 2D vector by certain angle
 *
 * @example
 *     let vec = new Vec(100, 0);
 *
 *     vec.rotate(Math.PI / 2);
 *     // => {x: 0, y: 100, z: 0}
 *
 * @param {Number} rad Radians to ratate vector by
 * @return {Vector} Rotated vector
 * @api public
 */
Vec.prototype.rotate2D = function (rad) {
  const a = Math.atan2(this.x, this.y);
  return this.rotateTo2D(rad + a);
};

/*
  logic
*/

/**
 * Check if two vectors are equal
 *
 * @example
 *     let vec = new Vec(100, 0);
 *
 *     vec.equal(new Vec(100, 0));
 *     // => True
 *
 * @param {Vec} v Other vector you want to compare to
 * @return {Boolean} result of vector comparison
 * @api public
 */
Vec.prototype.equals = function (v) {
  return this.x == v.x && this.y == v.y && this.z == v.z;
};

/**
 * Check if two vectors are NOT equal
 *
 * @example
 *     let vec = new Vec(100, 0);
 *
 *     vec.equal(new Vec(100, 0));
 *     // => False
 *
 * @param {Vec} v Other vector you want to compare to
 * @return {Boolean} result of vector comparison
 * @api public
 */
Vec.prototype.notEqual = function (v) {
  return !this.equals(v);
};

/*
Helpers
*/

const twoPi = Math.PI * 2;

export default Vec;
