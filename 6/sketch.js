const svg_mode = false;

let squares = [];
let squares2 = [];
let squares3 = [];

let attractor;

function draw1(startx, starty, dim, angle, arr, arrtop, minus1 = 1, minus2 = 2, mode = 0) {
  let calc_rot = (x, y) => {
    let new_x = x * cos(radians(angle)) - y * sin(radians(angle));
    let new_y = y * cos(radians(angle)) + x * sin(radians(angle));

    return [new_x, new_y];
  }

  for (var i = 0; i < dim; i++) {
    let c1 = calc_rot(i + startx, 0 + starty);
    let c2 = calc_rot(0 + startx, i + starty);
    let c3 = calc_rot(dim + startx, i + starty);
    let c4 = calc_rot(i + startx, dim + starty);

    if ( mode === 0 ) {
      arr.push(new Square(c1[0], c1[1], random(1, 8), i, minus1, minus2));
      arr.push(new Square(c2[0], c2[1], random(1, 8), i, minus1, minus2));
    } else if ( mode === 1 && i > 270) {
      arr.push(new Square(c1[0], c1[1], random(1, 8), i, minus1, minus2));
      arr.push(new Square(c2[0], c2[1], random(1, 8), i, minus1, minus2));
    }
    
    arr.push(new Square(c3[0], c3[1], random(1, 8), i, minus1, minus2));
    arr.push(new Square(c4[0], c4[1], random(1, 8), i, minus1, minus2));

    // top
    if (arrtop !== false) {
      if (mode !== 1) arrtop.push(new Square(c2[0], c2[1], random(1, 8), i, minus1, minus2));
      if (mode !== 1) arrtop.push(new Square(c3[0], c3[1], random(1, 8), i, minus1, minus2));
    }
  }
}

function setup() {
  if (svg_mode)
    createCanvas(displayWidth, displayHeight, SVG)
  else
    createCanvas(displayWidth, displayHeight)
  
  background(27)

  attractor = createVector(width/2 - 200 + 400, height/2 + 200 + 400)

  let dim = 300
  
  draw1(0, 0, dim, 0, squares, false, 1, 2, 0)
  draw1(100, 100, dim, 0, squares2, false, 0.7, 1.5, 1)
  draw1(200, 200, dim, 0, squares3, false, 0.5, 1, 1)
}

function draw() {
  // animation

  for (let square of squares) {
    let f = p5.Vector.sub(square.pos, attractor);
    f.setMag(- 0.2)
    let weight = p5.Vector.mult(f, square.mass);

    square.applyForce(weight);
    square.update();
    square.stop();
    square.show();
  }

  for (let square of squares2) {
    let f = p5.Vector.sub(square.pos, attractor);
    f.setMag(- 0.1)
    let weight = p5.Vector.mult(f, square.mass);

    square.applyForce(weight);
    square.update();
    square.stop();
    square.show();
  }

  for (let square of squares3) {
    let f = p5.Vector.sub(square.pos, attractor);
    f.setMag(- 0.055)
    let weight = p5.Vector.mult(f, square.mass);

    square.applyForce(weight);
    square.update();
    square.stop();
    square.show();
  }
}

function keyPressed() {
  if (key === 'x') { // stop
    noLoop()
  } else if (key === 's') { // save
    let ext = svg_mode ? "svg" : "png";
    saveCanvas("run", ext);
  }
}
