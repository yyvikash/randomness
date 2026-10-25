const r = require("raylib");

function setup() {
  const window = {
    width: 600,
    height: 400,
    title: "A random number between x₁ and x₂",
    FPS: 60,
  };

  const offSet = window.width / 4;
  const coordX = getRandomCoordX(offSet, window.width);

  r.SetTraceLogLevel(r.LOG_NONE);
  r.SetConfigFlags(r.FLAG_WINDOW_HIGHDPI);
  r.InitWindow(window.width, window.height, window.title);
  r.SetTargetFPS(window.FPS);

  return {
    window,
    coordX,
    offSet,
  };
}

function getRandomCoordX(offSet, windowWidth) {
  const coordX = [];

  for (let i = 0; i < 100; i++) {
    if (!coordX.includes(Math.random() * windowWidth)) {
      const coordXInLimit = Math.random() * (windowWidth - 2 * offSet);
      coordX.push(coordXInLimit);
    }
  }

  return coordX;
}

function update(world) {
  //
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  const coordX = world.coordX;
  const height = world.window.height;
  const offSet = world.offSet;

  for (const x of coordX) {
    r.DrawRectangle(offSet + x, 0, 2, height, r.RED);
  }

  r.EndDrawing();
}

function loop(world) {
  while (!r.WindowShouldClose()) {
    update(world);
    draw(world);
  }
}

function main() {
  const world = setup();
  loop(world);
  r.CloseWindow();
}

main();
