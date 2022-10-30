/**
 * Daniel Shiffman
 * * https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html
 * * https://youtu.be/TOEi6T2mtHo
 */
import type p5 from "p5";
import { Vector } from "p5";
import { Boundary } from "./boundary";

export class Ray {
  pos: p5.Vector;
  dir: p5.Vector;

  constructor(private p: p5, position: p5.Vector, angle: number) {
    this.pos = position;
    this.dir = Vector.fromAngle(angle);
  }

  static fromTwoPoints(p: p5, fromPosition: p5.Vector, toPosition: p5.Vector): Ray {
    let v = new Ray(p, fromPosition.copy(), 0);
    v.dir = fromPosition.sub(toPosition).copy();
    return v;
  }

  lookAt(x: number, y: number) {
    this.dir.x = x - this.pos.x;
    this.dir.y = y - this.pos.y;
    // 単位ベクトル化
    this.dir.normalize();
  }

  /**
   * レイ(単位ベクトル)を描画
   */
  show() {
    this.p.stroke(255);
    this.p.push();
    this.p.translate(this.pos.x, this.pos.y);
    this.p.line(0, 0, this.dir.x * 10, this.dir.y * 10);
    this.p.pop();
  }

  /**
   * 指定した壁に対してレイを飛ばしたときに交差するかどうかを判定し
   * 交差する場合はその交点座標、しない場合はundefinedを返す
   * @param wall 対象となる壁
   * @returns 壁とレイとの交点座標
   */
  cast(wall: Boundary): p5.Vector | undefined {
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    // 注：オリジナルではここを足し算で求めていたが引き算に変更。
    // レイの方向を逆にするため(と意図しているが理解しきれていない...)
    const x4 = this.pos.x - this.dir.x;
    const y4 = this.pos.y - this.dir.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den == 0) {
      return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (t > 0.001 && t < 0.999 && u > 0.001) {
      const pt = this.p.createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    } else {
      return;
    }
  }
}
