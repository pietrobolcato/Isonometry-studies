const svg_mode = false;
const effect_type = 2; // 1 = creation of adam, 2 = interconnected

let circles = [];
let circlesBottom = []
let rain = []
let rainBottom = []

let mu = 0.1;
let dragC = 0.2;
let dragH = 400;
let dragW = 200;

function setup() {
  if (svg_mode)
    createCanvas(displayWidth, displayHeight, SVG)
  else
    createCanvas(displayWidth, displayHeight)
  
  background(27)

  // circles

  let x0 = 50;
  let y0 = 50;
  let x0_bottom = height+100;
  let y0_bottom = height+100;
  let r = 100

  for (var i = 0; i < 360; i++) {
    noStroke();
    fill(235, 100)

    let x = x0 + r * cos(radians(i));
    let y = y0 + r * sin(radians(i));

    let x_bottom = x0_bottom + r * cos(radians(i));
    let y_bottom = y0_bottom + r * sin(radians(i));

    circles[i] = new Circle(x, y, random(1, 8), i, 1);
    circlesBottom[i] = new Circle(x_bottom, y_bottom, random(1, 8), i, 2);
  }

  // rain points

  for (var i = 0; i < 100; i++) {
    noStroke();
    fill(235, 255)
    rain[i] = new RainPoint(i, 0, random(1, 8));
    rainBottom[i] = new RainPoint(i, 0, random(1, 8));
  }

  // show them

  circles.map(m => { m.show() })
  circlesBottom.map(m => { m.show() })

  rain.map(r => { r.show(width/2 - 35, 65, 45) })
  rainBottom.map(r => { r.show(width/2 - 35, 100 + 800, -45) })
}

function draw() {
  // circles animation

  for (let circle of circles) {
    let gravity = createVector(0.2, 0.2);
    let weight = p5.Vector.mult(gravity, circle.mass);

    circle.applyForce(weight);
    circle.update();
    circle.stop();
    circle.show();
  }

  for (let circle of circlesBottom) {
    let gravity = createVector(-0.2, -0.2);
    let weight = p5.Vector.mult(gravity, circle.mass);

    circle.applyForce(weight);
    circle.update();
    circle.stop();
    circle.show();
  }

  // rain animation
  
  for (let r of rain) {
    let gravity = createVector(0.5, 0.5);
    let weight = p5.Vector.mult(gravity, r.mass);
    r.applyForce(weight);

    r.drag(dragC);
    
    r.update();
    r.stop();
    r.show(width/2 - 35, 65, 45);
  }

  for (let r of rainBottom) {
    let gravity = createVector(0.5, -0.5);
    let weight = p5.Vector.mult(gravity, r.mass);
    r.applyForce(weight);

    r.drag(dragC);

    r.update();
    r.stop();
    r.show(width/2 - 35, 100 + 800, -45);
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
