
//
// pin_hex.js
//

import { Manifold, show, only } from 'manifold-3d/manifoldCAD';
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
  //balcyls.push(balcyl());
  for (let a = 30; a < 360; a = a + 60) {
    balcyls.push(
      balcyl().translate([ 0, r - br - 4 * o2, 0 ]).rotate([ 0, 0, a ]));
  }
  return hull(balls).subtract(union(balcyls));
};

//
// explosion

let explosion = function() {

  const r4 = r / 4;

  let point = function() { return cylinder(2 * h, 0.01, 0.01, csegs, true); };

  let pa = point().translate([ -r4, -2.1 * r4, 0 ]);
  let pb = point().translate([  r4, -2.1 * r4, 0 ]);

  let p1 = point().translate([ -2.4 * r4, 0.5 * r4, 0 ]);
  let p2 = point().translate([ -r4, 2.5 * r4, 0 ]);
  let p3 = point().translate([  r4, 2 * r4, 0 ]);
  let p4 = point().translate([ 2 * r4, 1 * r4, 0 ]);
  let p5 = point().translate([ 2.4 * r4, -0.5 * r4, 0 ]);

  return union(
    hull(pa, pb, p1),
    hull(pa, pb, p2),
    hull(pa, pb, p3),
    hull(pa, pb, p4),
    hull(pa, pb, p5)
      );
};

//
// that's all folks

export default hex().subtract(explosion());

