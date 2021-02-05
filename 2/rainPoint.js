class RainPoint {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = m;

    this.opacity = 100;
    this.start_c = 0;
  }

  drag(c) {
    let drag = this.vel.copy();

    drag.normalize();
    drag.mult(-1);

    let speedSq = this.vel.magSq();
    drag.setMag(c * speedSq);

    this.applyForce(drag);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  stop() {
    if (effect_type === 1 && (this.start_c >= 147)) noLoop(); // creation of Adam
    else if (effect_type === 2 && (this.start_c >= 250)) noLoop(); // interconnected
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    if (effect_type === 1) { // creation of Adam
      if (this.start_c < 50) {
        this.opacity += 0.2;
      } else if (this.start_c > 80) {
        this.opacity += 1.2;
      } else if (this.start_c > 50) {
        this.opacity += 0.8;
      }
    } else if (effect_type === 2) { // interconnected
      if (this.start_c < 50) {
        this.opacity += 0.2;
      } else if (this.start_c > 150) {
        this.opacity -= 4;
      } else if (this.start_c > 80) {
        this.opacity += 2;
      } else if (this.start_c > 50) {
        this.opacity += 0.8;
      }
    }

    this.start_c += 1;
  }

  show(transx, transy, angle) {
    // go to isonometry mode
    push();
    translate(transx, transy);
    scale(1, 0.5);
    rotate(angle * Math.PI / 180);

    noStroke();
    fill(235, this.opacity)
    rect(this.pos.x, this.pos.y, 2, 2)

    pop();
  }
}