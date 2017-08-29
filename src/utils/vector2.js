export default class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDirection(other) {
    return new Vector2(other.x - this.x, other.y - this.y);
  }

  equals(other) {
    return (
      Math.round(this.x * 1000) / 1000 === Math.round(other.x * 1000) / 1000 &&
      Math.round(this.y * 1000) / 1000 === Math.round(other.y * 1000) / 1000
    );
  }

  angle(other) {
    var dot = this.dotProduct(other),
      l1 = this.length(),
      l2 = other.length();
    return Math.acos(dot / (l1 * l2));
  }

  add(other) {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  subtract(other) {
    return new Vector2(this.x - other.x, this.y - other.y);
  }

  dotProduct(other) {
    return this.x * other.x + this.y * other.y;
  }

  normalize() {
    var l = this.length();
    return new Vector2(this.x / l, this.y / l);
  }

  length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
