let canvas;
let ctx;
let player;
const dpr = window.devicePixelRatio;
let frameCount = 0;
let enemys = [];
let score = 0;
let isRunning = false;
let isGameOver = false;
let raf;
const CYCLE_CREATE_ENEMY = 10;
const playerImage = new Image();
playerImage.src = "./player.png";
const appleImage = new Image();
appleImage.src = "./Plants.png";

let load = function () {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  canvas.height = 500 * dpr;
  canvas.width = 400 * dpr;
  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", (e) => {
    startGame();
    e.target.style.display = "none";
  });
  const reStartButton = document.getElementById("reStartButton");
  reStartButton.addEventListener("click", (e) => {
    resetGame();
    startGame();
    e.target.style.display = "none";
  });
};

let startGame = function () {
  isRunning = true;
  player = new Player({
    position: {
      x: canvas.width / 3,
      y: canvas.height - 50,
    },
    image: playerImage,
  });
  raf = window.requestAnimationFrame(update);
};

let resetGame = function () {
  enemys = [];
  score = 0;
  frameCount = 0;
  isGameOver = false;
};

//Class
class Player {
  constructor({ position, image }) {
    this.position = position;
    this.image = image;
    this.width = 16;
    this.height = 16;
    this.numSprite = 1;
    this.frameCurrent = 1;
    this.frameMax = 4;
    this.elapsed = 0;
  }

  draw() {
    ctx.drawImage(
      this.image,
      16 + (this.frameCurrent - 1) * 48,
      64,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width * 2,
      this.height * 2
    );
  }

  move() {
    // if (keys.w.pressed) player.position.y -= 2;
    if (keys.a.pressed && this.position.x > 0) player.position.x -= 2;
    else if (keys.d.pressed && this.position.x + this.width * 2 < canvas.width)
      player.position.x += 2;
    // else if (keys.s.pressed) player.position.y += 2;
  }

  updateFrame() {
    if (this.frameCurrent === this.frameMax) {
      this.frameCurrent = 1;
    } else {
      this.frameCurrent += 1;
    }
  }
}

class Enemy {
  constructor({ position, image, velocity }) {
    this.position = position;
    this.image = image;
    this.velocity = velocity;
    this.width = this.image.width / 6;
    this.height = this.image.height / 2;
  }
  draw() {
    ctx.drawImage(
      this.image,
      80,
      this.image.height / 2,
      this.image.width / 6,
      this.image.height / 2,
      this.position.x,
      this.position.y,
      (this.image.width / 6) * 2,
      (this.image.height / 2) * 2
    );
  }
  move() {
    this.position.y += this.velocity;
    this.velocity *= 1.01;
  }
}
//

//Key Event
const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      console.log("keydown w key");
      keys.w.pressed = true;
      break;
    case "a":
      console.log("keydown a key");
      keys.a.pressed = true;
      break;
    case "s":
      console.log("keydown s key");
      keys.s.pressed = true;
      break;
    case "d":
      console.log("keydown d key");
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      console.log("keyup w key");
      keys.w.pressed = false;
      break;
    case "a":
      console.log("keyup a key");
      keys.a.pressed = false;
      break;
    case "s":
      console.log("keyup s key");
      keys.s.pressed = false;
      break;
    case "d":
      console.log("keyup d key");
      keys.d.pressed = false;
      break;
  }
});
//

//utils
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
//

// drawing on canvas
function draw() {
  clearCanvas();
  player.draw();
  player.elapsed += 1;
  if (player.elapsed % 100 === 0) {
    player.updateFrame();
    player.elapsed = 0;
  }

  enemys.forEach((enemy, index, object) => {
    enemy.draw();
    // if (enemy.position.y > canvas.height) {
    //   object.splice(index, 1);
    // }
  });
  drawScore(score);
}

function drawScore(score) {
  ctx.font = "24px sans-serif";
  ctx.fillStyle = "black";
  ctx.textAlign = "left";
  ctx.fillText(score, canvas.width - 100, 50);
}

function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
//

// moving objects
function moveObjects() {
  player.move();
  checkBoundary(player);
  enemys.forEach((enemy, index, object) => {
    enemy.move();
    if (checkExitEnemy(enemy)) {
      object.splice(index, 1);
    }
    if (checkCollision(player, enemy)) {
      isGameOver = true;
      window.cancelAnimationFrame(raf);
      reStartButton.style.display = "block";
    }
  });
}

function checkExitEnemy(item) {
  if (item.position.y > canvas.height) {
    score += 50;
    return true;
  }
  return false;
}

function checkCollision(rect1, rect2) {
  return (
    rect1.position.x < rect2.position.x + rect2.width &&
    rect1.position.x + rect1.width > rect2.position.x &&
    rect1.position.y < rect2.position.y + rect2.height &&
    rect1.position.y + rect1.height > rect2.position.y
  );
}
//

function checkBoundary(object) {
  if (object.position.x + object.width > canvas.width) {
    console.log("right exit");
    return true;
  }
  if (object.position.x < 0) {
    console.log("left exit");
    return true;
  }
}

//update
function update() {
  raf = window.requestAnimationFrame(update);
  if (isRunning === true) {
    frameCount += 1;

    //console.log(frameCount);
    if (frameCount % CYCLE_CREATE_ENEMY === 0) {
      createEnemy();
    }
    if (!isGameOver) {
      moveObjects();
    }
  }
  draw();
}

function createEnemy() {
  enemys.push(
    new Enemy({
      position: {
        x: getRandomArbitrary(0, canvas.width),
        y: -50,
      },
      image: appleImage,
      velocity: getRandomArbitrary(0.05, 0.2),
    })
  );
}
//
