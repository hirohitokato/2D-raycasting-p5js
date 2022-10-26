import type p5 from "p5";
import { Boundary } from "./elements/boundary";
import { Particle } from "./elements/particle";

export let walls: Boundary[] = [];
// export let ray;
export let particle: Particle;

/** This is a setup function. */
export const setup = (p: p5): void => {
  p.createCanvas(400, 400);

  // Create walls
  for (let i = 0; i < 15; i++) {
    // randomly located walls
    let x1 = p.random(p.width);
    let x2 = p.random(p.width);
    let y1 = p.random(p.height);
    let y2 = p.random(p.height);
    walls.push(new Boundary(p, x1, y1, x2, y2));
  }
  // outsides
  walls.push(new Boundary(p, -1, -1, p.width, -1));
  walls.push(new Boundary(p, p.width, -1, p.width, p.height));
  walls.push(new Boundary(p, p.width, p.height, -1, p.height));
  walls.push(new Boundary(p, -1, p.height, -1, -1));

  // Actor(particle)
  particle = new Particle(p);
};
