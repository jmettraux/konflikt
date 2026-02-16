
//
// action_hex.js
//

import { Manifold, show } from 'manifold-3d/manifoldCAD';
const { cylinder, cube, sphere, hull, union } = Manifold;

const csegs = 12;

// unit is mm

//
// hex

const inch = 25.4;
const h = 5; // height unit, 5mm
const o2 = 0.2;
//const br = 3 / 2; // ball radius
const br = 1.7;
const bd = 2 * br;

const r = inch / 2;
const t = r / Math.cos(30 / 180 * Math.PI);
const rr = r / 10;

let sphe = function() {
  return sphere(rr, csegs, true); }

let balcyl = function() {
  let r = br + 2 * o2; return cylinder(bd + o2, r, r, csegs, true); };

let hex = function() {
  let h2 = 0.5 * h - rr;
  let balls = [];
  let balcyls = [];
  for (let a = 0; a < 360; a = a + 60) {
    balls.push(
      sphe().translate([ 0, t - rr,  h2 ]).rotate([ 0, 0, a ]));
    balls.push(
      sphe().translate([ 0, t - rr, -h2 ]).rotate([ 0, 0, a ]));
  }
  balcyls.push(balcyl());
  for (let a = 30; a < 360; a = a + 60) {
    balcyls.push(
      balcyl().translate([ 0, r - br - 4 * o2, 0 ]).rotate([ 0, 0, a ]));
  }
  return hull(balls).subtract(union(balcyls));
};

//
// dice box

const dice_side = 16 + 2 * o2;

let box =
  cube([ dice_side, dice_side, dice_side ], true)
    .translate([ 0, 0, 2 + 0.5 * dice_side ]);

//let hex1 = hull(
//  hex(),
//  hex().translate([ 0, 0, 0.56 * dice_side ]));
let hex1 = hull(
  hex(),
  sphe().translate([ 0, 0, 3.1 * h ]),
  sphe().translate([ 0, t - rr, 2.1 * h ]),
    );

export default hex1.subtract(box);

