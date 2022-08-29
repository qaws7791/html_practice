var canvas, ctx, mx, my;
var color = "#000";
var poly1, poly2;
var sec = 0;
const dpr = window.devicePixelRatio;
var balls = [];
var whereHover = -1;
function load() {
  canvas = document.getElementById("canvas");

  resize();
  ctx = canvas.getContext("2d");
  initBall(canvas.width / 2, canvas.height / 2);
  setInterval(draw, 50);
}

function resize() {
  canvas.height = 400 * dpr;
  canvas.width = 400 * dpr;
}

window.addEventListener("mousemove", function (event) {
  mx = event.offsetX;
  my = event.offsetY;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  poly1 = polygon(canvas.width / 2, canvas.height / 2, 100, 8, true);
  poly2 = polygon(mx, my, 20, 3, false);
  var result = collide(poly1, poly2);
  if (result) {
    console.log(result);
    whereHover = result;
    ctx.beginPath();
    ctx.moveTo(result[0].x, result[0].y);
    ctx.lineTo(result[1].x, result[1].y);
    ctx.closePath();
    ctx.strokeStyle = "#f00";
    ctx.lineWidth = 4;
    ctx.stroke();
  } else {
    whereHover = -1;
  }
  for (var i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].draw_cricle();
  }
  sec += 1;
}

function polygon(x, y, r, s, rotate) {
  var a = Math.PI / 2;
  if (rotate) {
    a += (180 / Math.PI) * sec;
  }
  var points = [];
  var sides = [];
  ctx.beginPath();
  for (var i = 0; i <= s; i++) {
    var px = x + r * Math.cos(a),
      py = y + r * Math.sin(a);
    if (whereHover == i) {
      console.log("#");
      color = "#f00";
    } else {
      color = "#000";
    }
    if (i == 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
      sides.push([
        { x: points[i - 1].x, y: points[i - 1].y },
        { x: px, y: py },
      ]);
    }

    points.push({ x: px, y: py });
    a += (Math.PI * 2) / s;
  }
  ctx.closePath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.fillStyle = "rgba(255,0,0,0.3)";
  ctx.fill();

  ctx.stroke();
  return { p: points, s: sides };
}

function collide(p1, p2) {
  for (var i in p1.s) {
    for (var j in p2.s) {
      var t = intersect(p1.s[i], p2.s[j]);
      if (t === "collinear") {
        continue;
      }
      if (t[0] <= 1 && t[0] >= 0 && t[1] <= 1 && t[1] >= 0) {
        return p1.s[i];
      }
    }
  }
  return false;
}

function intersect(s1, s2) {
  if (
    (s2[1].x - s2[0].x) * (s1[0].y - s1[1].y) -
      (s1[0].x - s1[1].x) * (s2[1].y - s2[0].y) ===
    0
  ) {
    return "collinear";
  }
  var tA =
      ((s2[0].y - s2[1].y) * (s1[0].x - s2[0].x) +
        (s2[1].x - s2[0].x) * (s1[0].y - s2[0].y)) /
      ((s2[1].x - s2[0].x) * (s1[0].y - s1[1].y) -
        (s1[0].x - s1[1].x) * (s2[1].y - s2[0].y)),
    tB =
      ((s1[0].y - s1[1].y) * (s1[0].x - s2[0].x) +
        (s1[1].x - s1[0].x) * (s1[0].y - s2[0].y)) /
      ((s2[1].x - s2[0].x) * (s1[0].y - s1[1].y) -
        (s1[0].x - s1[1].x) * (s2[1].y - s2[0].y));
  return [tA, tB];
}

//-----------------balls-----------------

function createBall(x, y, vx, vy, radius, color) {
  console.log("createBall");
  return {
    x: x,
    y: y,
    vx: vx,
    vy: vy,
    width: radius,
    height: radius,
    radius: radius,
    color: color,
    draw_cricle: function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    },
    move: function () {
      this.x += this.vx;
      this.y += this.vy;
    },
  };
}

function initBall(x, y) {
  balls = [];
  for (var i = 0; i < 16; i++) {
    balls.push(
      createBall(
        canvas.width / 2 - 30 + (i % 4) * 25,
        canvas.height / 2 - 30 + parseInt(i / 4) * 25,
        0,
        1,
        10,
        "#000"
      )
    );
  }
}
function move(ball) {}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
