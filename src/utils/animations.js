
export class OrbController {
  constructor() {
    this.elements = document.querySelectorAll(".orb-canvas");
    if (this.elements.length === 0) return;
    this.init();
  }

  init() {
    this.elements.forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = -(x - centerX) / 20;

        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });

      el.addEventListener("mouseleave", () => {
        el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
      });
    });
  }
}

export class BackgroundController {
  constructor() {
    this.shapes = document.querySelectorAll(".shape")
  }
}

export class ButtonController {
  constructor() {
    this.buttons = document.querySelectorAll(".btn")
    this.init()
  }

  init() {
    this.buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        btn.style.transform = "translateY(-2px) scale(1.02)"
      })

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translateY(0) scale(1)"
      })
    })
  }
}
