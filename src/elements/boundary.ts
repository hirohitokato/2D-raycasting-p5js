/**
 * Daniel Shiffman
 * * https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html
 * * https://youtu.be/TOEi6T2mtHo
 */
import type p5 from "p5";

export class Boundary {
  a: p5.Vector;
  b: p5.Vector;

  constructor(private p: p5, x1: number, x2: number, y1: number, y2: number) {
    this.a = p.createVector(x1, y1);
    this.b = p.createVector(x2, y2);
  }

  show() {
    this.p.stroke(255);
    this.p.line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
