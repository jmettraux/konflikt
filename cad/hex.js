
//
// hex.js
//

import { Manifold, show } from 'manifold-3d/manifoldCAD';
const { cylinder, cube, sphere, hull, union } = Manifold;

const csegs = 12;

// unit is mm

const inch = 25.4;
const h = 5; // height unit, 5mm
const o2 = 0.2;
//const br = 3 / 2; // ball radius
const br = 1.7;
const bd = 2 * br;

const r = inch / 2;
const t = r / Math.cos(30 / 180 * Math.PI);
const rr = r / 10;

let sphe = function() { return sphere(rr, csegs, true); }

let balcyl = function() {

  let r = br + 2 * o2;

  return cylinder(bd + o2, r, r, csegs, true);
};

//console.log({ h, r, t, rr, br, bd });
console.log({ r, t });

let hex = function() {

  let h2 = 0.5 * h;
  let balls = [];

  for (let a = 0; a < 360; a = a + 60) {
    balls.push(
      sphe().translate([ 0, t - rr,   h2 - rr ]).rotate([ 0, 0, a ]));
    balls.push(
      sphe().translate([ 0, t - rr, - h2 + rr ]).rotate([ 0, 0, a ]));
  }

  return hull(balls);
};

//module hex(height=1) {
//
//  hei = h * height;
//
//  difference() {
//    translate([ 0, 0, hei * -0.5 ])
//      hull()
//        for (a = [ 0 : 60 : 300 ]) {
//          rotate([ 0, 0, a ]) {
//            //translate([ 0, t - rr, 0 ]) cylinder(r=rr, h=h, $fn=12);
//            translate([ 0, t - rr, hei - rr ]) sphe();
//            translate([ 0, t - rr, rr ]) sphe();
//          }
//        }
//
//    h0 = hei / 2 - h / 2;
//    h1 = -hei / 2 + h / 2;
//
//    #translate([ 0, 0, h0 ]) balcyl(deeper = height > 1);
//      // comment out for hexvar
//    for (a = [ 30 : 60 : 330 ]) {
//      #rotate([ 0, 0, a ])
//        translate([ 0, r - br - 4 * o2, h0 ])
//          balcyl(deeper = height > 1);
//    }
//
//    if (height > 1) {
//      #translate([ 0, 0, h1 ]) balcyl(); // center ball
//      for (a = [ 30 : 60 : 330 ]) {
//        #rotate([ 0, 0, a ])
//          translate([ 0, r - br - 4 * o2, h1 ])
//            balcyl();
//      }
//    }
//
//    if (height > 5) {
//      h2 = (h0 + h1) / 2;
//      //#translate([ 0, 0, h2 ]) balcyl(deeper=true); // center ball // no need
//      for (a = [ 30 : 60 : 330 ]) {
//        #rotate([ 0, 0, a ])
//          translate([ 0, r - br - 4 * o2, h2 ])
//            balcyl(deeper=true);
//      }
//    }
//  }
//}

export default hex();

