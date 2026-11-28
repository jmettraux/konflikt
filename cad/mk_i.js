
//
// mk_i.js
//

import { Manifold, show, only } from 'manifold-3d/manifoldCAD';
const { cylinder, cube, sphere, hull, union } = Manifold;

const inch = 25.4;

const thigh_length = 10;
const thigh_thickness = 1.4;
const hip_radius = 3.5;
const knee_radius = 4.0;
const small_rivet_radius = 0.6;
const large_rivet_radius = 0.8;

let thigh = function() {

  let a = [];

  let tl = thigh_length;

  let box0 = cube([ tl / 2, tl / 3, thigh_thickness ], true);
  let box1 = cube([ tl, tl / 4, thigh_thickness ], true);

  //a.push(box0);
  //a.push(box1);
  a.push(hull([ box0, box1 ]));

  return union(a);
};

export default thigh();

