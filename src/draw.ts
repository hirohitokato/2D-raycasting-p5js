import type p5 from "p5";
import { particle, walls } from "./setup";

let xoff = 0;
let yoff = 10000;

/** This is a draw function. */
export const draw = (p: p5): void => {
  p.background(20);
  for (const wall of walls) {
    wall.show();
  }

  particle.update(p.mouseX, p.mouseY);
  particle.show();
  particle.look(walls);

  xoff += 0.01;
  yoff += 0.01;
};
