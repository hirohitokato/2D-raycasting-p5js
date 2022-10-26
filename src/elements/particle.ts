/**
 * Daniel Shiffman
 * * https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html
 * * https://youtu.be/TOEi6T2mtHo
 */
import type p5 from "p5";
import { Vector } from "p5";
import { Boundary } from "./boundary";
import { Ray } from "./ray";

export class Particle {
  pos: p5.Vector;
  rays: Ray[] = [];

  constructor(private p: p5) {
    this.pos = p.createVector(p.width / 2, p.height / 2);
    for (let i = 0; i < 360; i++) {
      this.rays.push(new Ray(p, this.pos, p.radians(i)));
    }
  }

  update(x: number, y: number) {
    this.pos.set(x, y);
  }

  look(walls: Boundary[]) {
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i]!;
      let closest: p5.Vector | null = null;
      let record = Infinity;

      for (const wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          const d = Vector.dist(this.pos, pt);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }

      if (closest) {
        // this.p.colorMode(this.p.HSB);
        // this.p.stroke((i + this.p.frameCount * 2) % 360, 255, 255, 50);
        this.p.stroke(255, 100);
        this.p.line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }

  show() {
    this.p.fill(255);
    this.p.ellipse(this.pos.x, this.pos.y, 4);
    for (const ray of this.rays) {
      ray.show();
    }
  }
}
