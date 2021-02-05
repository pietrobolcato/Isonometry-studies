const svg_mode = false;

let squares;
let squares_top;

function draw1(startx, starty, dim, angle, arr, arrtop, minus1 = 1, minus2 = 2, mode) {
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

    if (mode !== 1) arr.push(new Square2(c1[0], c1[1], random(1, 8), i, minus1, minus2));
    if (mode !== 1) arr.push(new Square2(c2[0], c2[1], random(1, 8), i, minus1, minus2));
    arr.push(new Square2(c3[0], c3[1], random(1, 8), i, minus1, minus2));
    arr.push(new Square2(c4[0], c4[1], random(1, 8), i, minus1, minus2));

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

  let dim = 350;
  squares = []
  squares_top = []

  draw1(0, 0, dim, 0, squares, squares_top, 0.8, 1.4)
}

function draw() {
  // squares animation

  squares_top.map((square, i) => {
    let mult;

    if (i % 2 === 0)
      mult = 1;
    else
      mult = -1;

    let gravity = createVector(mult * 0.08, 0);
    let weight = p5.Vector.mult(gravity, square.mass);

    square.applyForce(weight);
    square.update();
    square.stop();
    square.show(45);
  })

  for (let square of squares) {
    let gravity = createVector(0.08, 0.08);
    let weight = p5.Vector.mult(gravity, square.mass);

    square.applyForce(weight);
    square.update();
    square.stop();
    square.show(45);
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
