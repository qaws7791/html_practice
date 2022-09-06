// Initial Setup
var neon = "#2ff40a";
var gravity = 0.1;
var friction = 0.7;
const dpr = window.devicePixelRatio;
var canvas;
var ctx;
var frame_count = 1;
var lines = [];
function load() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  canvas.height = 600 * dpr;
  canvas.width = 900 * dpr;
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.closePath();

  // for (let i = 0; i < 10; i++) {
  //   ctx.beginPath();
  //   ctx.moveTo(0, i * (canvas.height / 10));
  //   ctx.lineTo(canvas.width, i * (canvas.height / 10));
  //   ctx.lineWidth = 2;
  //   ctx.strokeStyle = neon;
  //   ctx.stroke();
  //   ctx.closePath();
  // }
  // for (let i = 0; i < 10; i++) {
  //   ctx.beginPath();
  //   ctx.moveTo(i * (canvas.width / 10), 0);
  //   ctx.lineTo(i * (canvas.width / 10), canvas.height);
  //   ctx.lineWidth = 2;
  //   ctx.strokeStyle = neon;
  //   ctx.stroke();
  //   ctx.closePath();
  // }
  init();
  animate();
}

class Line {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(canvas.width, this.y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = neon;
    ctx.stroke();
    ctx.closePath();
  }
  update() {
    this.speed *= 1.006;
    this.y += this.speed * 0.01;
    this.draw();
  }
}

function init() {
  let x = 1;
  for (let i = 0; i < x; i++) {
    lines.push(
      // new Line(0, (canvas.height / (2 * x)) * i + canvas.height / 2, 1)
      new Line(0, canvas.height / 2 + i * i, 1)
    );
  }
}

function animate() {
  frame_count += 1;
  if (frame_count % 40 === 0) {
    //console.log(frame_count);
    lines.push(new Line(0, canvas.height / 2, 1));
  }

  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.closePath();
  lines.forEach((line) => {
    // if (line.y > canvas.height) {
    //   line.y = canvas.height / 2;
    //   line.speed = 1;
    // }
    line.update();
  });
  if (lines[0].y > canvas.height) {
    lines.shift();
  }
  drawField();
}

// Variables
const mouse = {
  x: 500 / 2,
  y: 500 / 2,
};

function drawField() {
  // for (let i = 0; i < 4; i++) {
  //   ctx.beginPath();
  //   ctx.moveTo(canvas.width / 2, canvas.height / 2);
  //   ctx.lineTo((canvas.width / 3) * i, canvas.height);
  //   ctx.lineWidth = 2;
  //   ctx.strokeStyle = neon;
  //   ctx.stroke();
  //   ctx.closePath();
  // }
  let num_line = 5;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo((canvas.width / 3) * i, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = neon;
    ctx.stroke();
    ctx.closePath();
  }
  for (let i = 0; i < num_line; i++) {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(0, canvas.height - (canvas.height / 2) * graph(i / num_line));
    console.log(canvas.height - (canvas.height / 2) * graph(i / num_line));
    ctx.lineWidth = 2;
    ctx.strokeStyle = neon;
    ctx.stroke();
    ctx.closePath();
  }
  for (let i = 0; i < num_line; i++) {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(
      canvas.width,
      canvas.height - (canvas.height / 2) * graph(i / num_line)
    );
    ctx.lineWidth = 2;
    ctx.strokeStyle = neon;
    ctx.stroke();
    ctx.closePath();
  }
}

function graph(x) {
  return 2 * x - x * x;
}
graph();
