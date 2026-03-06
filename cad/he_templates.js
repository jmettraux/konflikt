
//
// he_templates.js
//

import { Manifold, show } from 'manifold-3d/manifoldCAD';
const { cylinder, cube, sphere, hull, union } = Manifold;

const csegs = 36;

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

  let r0 = 0.5 * diameter * inch;
  let r1 = r0 + thickness;

  let cir = cylinder(height, r1, r1, csegs, true);

  let rl =
    diameter > 3 ? inch :
    diameter > 2 ? 0.5 * inch :
    0.25 * inch;
  let rl0 =
    0.5 * rl;

  let ray0 = cube([ thickness, rl0, height ], true)
  ray0 = ray0.translate([ 0, r0 - 0.5 * rl0, 0 ]);

  let ray = cube([ thickness, rl, height ], true)
  ray = ray.translate([ 0, r0 - 0.5 * rl, 0 ]);

  if (diameter <= 1) {
    ray0 = ray0.translate([ 0, 2.2 * rl0, 0 ]);
    ray = ray.translate([ 0, 1.5 * rl, 0 ]);
  }
  //ray0 = show(ray0);
  //ray = show(ray);

  cir = cir.subtract(cylinder(1.1 * height, r0, r0, csegs, true));
  cir = cir.add(ray0);
  cir = cir.add(ray.rotate([ 0, 0,  45 ]));
  cir = cir.add(ray.rotate([ 0, 0, -45 ]));
  cir = cir.add(ray.rotate([ 0, 0,  45 + 180 ]));
  cir = cir.add(ray.rotate([ 0, 0, -45 - 180 ]));

  return cir;
};

export default template(4);

