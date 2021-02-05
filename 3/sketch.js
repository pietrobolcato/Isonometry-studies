const svg_mode = false;

let squares = []

function draw1(startx, starty, dim, angle, mode) {
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

    squares.push(new Square(c1[0], c1[1], random(1, 8), i));
    squares.push(new Square(c2[0], c2[1], random(1, 8), i));
    squares.push(new Square(c3[0], c3[1], random(1, 8), i));
    squares.push(new Square(c4[0], c4[1], random(1, 8), i));
  }
}

function setup() {
  if (svg_mode)
    createCanvas(displayWidth, displayHeight, SVG)
  else
    createCanvas(displayWidth, displayHeight)

  background(27)

  let dim = 300;
  let intersect = 173;

  translate(width / 2, 550)
  noStroke();
  fill(235, 255);

  draw1(0, 0, dim, 0)
  draw1(- intersect, dim - intersect, dim, -0)
  draw1(- intersect / 2, dim - intersect / 2, dim, 0)

  draw1(0, 0, dim, 90)
  draw1(- intersect, dim - intersect, dim, 90)
  draw1(- intersect / 2, dim - intersect / 2, dim, 90)
  
  draw1(0, 0, dim, 180)
  draw1(- intersect, dim - intersect, dim, 180)
  draw1(- intersect / 2, dim - intersect / 2, dim, 180)
  
  draw1(0, 0, dim, 270) 
  draw1(- intersect, dim - intersect, dim, 270)
  draw1(- intersect / 2, dim - intersect / 2, dim, 270)

  draw1(0, 0, dim / 6, 0)

  draw1( 2, - 512, 82, 0)

  draw1( - 514, - 172, 86, 0)
}

function draw() {
  // squares animation

  for (let square of squares) {
    let gravity = createVector(0.08, 0.08);
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
