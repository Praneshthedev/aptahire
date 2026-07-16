import { useEffect, useRef } from "react";

export default function HyperSpeed() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // ===============================
    // CONFIG
    // ===============================
    const BALL_COUNT = 140;      // number of glow balls
    const SNOW_COUNT = 120;      // snow particles

    const balls = [];
    const snowflakes = [];

    const COLORS = [
      "236,72,153",  // pink
      "30,64,175",   // dark blue
    ];

    // ===============================
    // BALL PARTICLES (Glow Orbs)
    // ===============================
    class Ball {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 4 + 3;   // 🔥 BIGGER balls
        this.speed = Math.random() * 1.2 + 0.4;
        this.alpha = Math.random() * 0.5 + 0.35;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      }

      update() {
        this.y += this.speed;
        if (this.y > height) this.y = -10;
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
        ctx.shadowBlur = 18;
        ctx.shadowColor = `rgba(${this.color},0.6)`;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // ===============================
    // SNOW PARTICLES
    // ===============================
    class Snow {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.2 + 0.6;
        this.speedY = Math.random() * 0.6 + 0.2;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.alpha = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y > height) {
          this.y = -10;
          this.x = Math.random() * width;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ===============================
    // INIT
    // ===============================
    for (let i = 0; i < BALL_COUNT; i++) {
      balls.push(new Ball());
    }

    for (let i = 0; i < SNOW_COUNT; i++) {
      snowflakes.push(new Snow());
    }

    // ===============================
    // ANIMATE
    // ===============================
    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // glow balls (background)
      balls.forEach((b) => {
        b.update();
        b.draw();
      });

      // snow (foreground)
      snowflakes.forEach((s) => {
        s.update();
        s.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // ===============================
    // RESIZE
    // ===============================
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}
