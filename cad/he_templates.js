
//
// he_templates.js
//

import { Manifold, show } from 'manifold-3d/manifoldCAD';
const { cylinder, cube, sphere, hull, union } = Manifold;

const csegs = 36;

// manowar.js
// 2b7a2fb321a4557b3613c9581958c5a5910bc46a
// Sun Nov  2 18:53:23 JST 2025
var Manowar = (function() {
  "use strict";
  let self = this;
  let slicedCylinder = function(
    height, radiusLo, radiusHi, angle, circularSegments, center
  ) {
    let h1 = 1.5 * height;
    let rr = Math.max(radiusLo, radiusHi) + 0.2;
    let cyl = Manifold.cylinder(
      height, radiusLo, radiusHi, circularSegments, center);
    let cub = Manifold.cube([ rr, rr, h1 ], true)
      .translate([ rr / 2, rr / 2, 0 ]);
    let qua = Manifold.intersection(cyl, cub);
    let sli = angle % 90;
    let ang = angle - sli;
    let pieces = [];
    let a = 0;
    for (; a < ang; a += 90) {
      pieces.push(qua.rotate([ 0, 0, a ]));
    }
    if (sli > 0) {
      let slc = qua.subtract(cub.rotate([ 0, 0, sli ]));
      pieces.push(slc.rotate([ 0, 0, a ]));
    }
    return Manifold.union(pieces);
  };
  this.slicedCylinder = slicedCylinder;
  return this;
}).apply({}); // end Manowar

// unit is mm

const inch = 25.4;
const height = 5;
const thickness = 5;

// Blasts Diameters
//
// 1" HE (small)
// 2" HE (medium)
// 3" HE (heavy)
// 4" HE (very heavy)

let template = function(diameter=4) {

  let r1 = 0.5 * diameter * inch + thickness;
  let r0 = 0.5 * (diameter - 1) * inch + thickness;

  let sc1 = Manowar.slicedCylinder(height, r1, r1, 90, csegs, true);
  let sc0 = Manowar.slicedCylinder(height, r0, r0, 90, csegs, true);

  let ir0 = r0 - thickness;
  let ic0 = cylinder(1.1 * height, ir0, ir0, csegs, true);

  let ir1 =
    r1 - thickness;
  let ic1 =
    Manowar.slicedCylinder(1.1 * height, ir1, ir1, 80, csegs, true)
      .rotate([ 0, 0, 5 ]);

  return union(
    sc1,
    sc1.rotate([ 0, 0, 180 ]),
    sc0.rotate([ 0, 0, 90 ]),
    sc0.rotate([ 0, 0, 180 + 90 ]))
      .subtract(ic0)
      .subtract(ic1)
      .subtract(ic1.rotate([ 0, 0, 180 ]));
};


export default template(4);

