class Square {
  constructor(x, y, m, i, minus1 = 1, minus2 = 2) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = m;

    this.opacity = 100;
    this.maxVel = random(1, 25)
    this.index = i;
    this.stopMotion = false;

    this.c = 0;

    this.minus1 = minus1;
    this.minus2 = minus2;
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
    
    this.opacity -= random(this.minus1, this.minus2);
  }

  show(angle = 45) {
    let isonometry_show = () => {
      // go to isonometry mode
      push();
      translate(width / 2, 100);
      scale(1, 0.5);
      rotate(angle * Math.PI / 180);

      noStroke();
      fill(235, this.opacity)
      rect(this.pos.x, this.pos.y, 2, 2)

      pop();
    };
    
    if (!this.stopMotion) {
      isonometry_show();
    }
  }
}