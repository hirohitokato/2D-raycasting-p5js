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

  constructor(private p: p5) {
    this.pos = p.createVector(p.width / 2, p.height / 2);
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
    // 各壁の端になる座標のみ集める
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
        // 壁に当たった場合の座標が返る
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
  }

  show() {
    this.p.fill(255);
    this.p.ellipse(this.pos.x, this.pos.y, 4);
  }
}
