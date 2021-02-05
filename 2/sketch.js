const svg_mode = false;
const effect_type = 2; // 1 = creation of adam, 2 = interconnected

let squares = []

let mu = 0.1;
let dragC = 0.2;
let dragH = 400;
let dragW = 200;

function draw1(startx, starty, dim, mode) {
  for (var i = 0; i < dim; i++) {
    if (mode === 0) squares.push(new Square(i + startx, 0 + starty, random(1, 8), i));
    squares.push(new Square(0 + startx, i + starty, random(1, 8), i));
    squares.push(new Square(dim + startx, i + starty, random(1, 8), i));
    if (mode === 1) squares.push(new Square(i + startx, dim + starty, random(1, 8), i)); 
  }
}

function draw2(startx, starty, dim, mode) {
  for (var i = 0; i < dim; i++) {
    if (mode === 0) rect(i + startx, 0 + starty, 2, 2);
    rect(0 + startx, i + starty, 2, 2);
    rect(dim + startx, i + starty, 2, 2);
    if (mode === 1) rect(i + startx, dim + starty, 2, 2);
  }
}

function setup() {
  if (svg_mode)
    createCanvas(displayWidth, displayHeight, SVG)
  else
    createCanvas(displayWidth, displayHeight)

  background(27)

  let dim = 400;
  let dimin = 50;
  let n_iteration = 10;

  // translate(width / 2, 100)
  // noStroke();
  // fill(235, 255);

  for (var i = 0; i < n_iteration; i++) {
    draw1(i * dimin, i * dimin, dim - (i * dimin), i%2) // (i * dimin * 2)
  }
}

function draw() {
  // // squares animation

  for (let square of squares) {
    let gravity = createVector(0.2, 0.2);
    let weight = p5.Vector.mult(gravity, square.mass);

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
