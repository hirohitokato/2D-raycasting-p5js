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

  /**
   * 自己位置を指定座標に更新
   * @param x X座標
   * @param y Y座標
   */
  update(x: number, y: number) {
    this.pos.set(x, y);
  }

  /**
   * レイを飛ばして壁までの線を描画する
   * @param walls 壁の一覧
   */
  look(walls: Boundary[]) {
    let points: p5.Vector[] = [];
    for (const wall of walls) {
      points.push(wall.a.copy(), wall.b.copy());
    }

    let rays: Ray[] = [];
    for (const point of points) {
      // this.posとのrayを作成、cast()
      // rayはraysに保存
      const ray = new Ray(this.p, this.pos, 0);
      // const ray = Ray.fromTwoPoints(this.p, this.pos, point);
      ray.lookAt(point.x, point.y);

      let closest: p5.Vector | null = null;
      let record = Infinity;

      // すべての壁に対してレイを飛ばして、交点までの距離がもっとも短い箇所を採用する
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
        this.p.stroke(255, 100);
        this.p.line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }

    // for (let i = 0; i < this.rays.length; i++) {
    //   const ray = this.rays[i]!;
    //   let closest: p5.Vector | null = null;
    //   let record = Infinity;

    //   // すべての壁に対してレイを飛ばして、交点までの距離が
    //   // もっとも短い箇所を採用する
    //   for (const wall of walls) {
    //     const pt = ray.cast(wall);
    //     if (pt) {
    //       const d = Vector.dist(this.pos, pt);
    //       if (d < record) {
    //         record = d;
    //         closest = pt;
    //       }
    //     }
    //   }

    //   if (closest) {
    //     // Coloful ray
    //     // this.p.colorMode(this.p.HSB);
    //     // this.p.stroke((i + this.p.frameCount * 2) % 360, 255, 255, 50);
    //     // or monochrome ray
    //     this.p.stroke(255, 100);
    //     this.p.line(this.pos.x, this.pos.y, closest.x, closest.y);
    //   }
    // }
  }

  show() {
    this.p.fill(255);
    this.p.ellipse(this.pos.x, this.pos.y, 4);
    // for (const ray of this.rays) {
    //   ray.show();
    // }
  }
}
