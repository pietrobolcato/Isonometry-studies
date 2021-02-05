class Circle {
  constructor(x, y, m, i, type) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = m;

    this.opacity = 100;
    this.maxVel = 14.14
    this.index = i;
    this.stopMotion = false;

    this.type = type; // 1 = top, 2 = bottom

    if (type === 1) {
      this.showLimitMin = 90;
      this.showLimitMax = 360;
    } else {
      this.showLimitMin = 273;
      this.showLimitMax = 182;
    }
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  stop() {
    if (this.opacity <= 0) {
      this.stopMotion = true;
    }
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.vel.limit(this.maxVel)
    
    this.opacity -= 2;
  }

  show() {
    let isonometry_show = () => {
      // go to isonometry mode
      push();
      translate(width / 2, 50);
      scale(1, 0.5);
      rotate(45 * Math.PI / 180);

      noStroke();
      fill(235, this.opacity)
      rect(this.pos.x, this.pos.y, 2, 2)

      pop();
    };
    
    if (this.type === 1) {
      if (!this.stopMotion && this.index >= this.showLimitMin && this.index <= this.showLimitMax) {
        isonometry_show();
      }
    } else if (this.type === 2) {
      if (!this.stopMotion && this.index >= this.showLimitMin || this.index <= this.showLimitMax) {
        isonometry_show();
      }
    }
  }
}