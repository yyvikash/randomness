const r = require("raylib");

function setup() {
  const window = {
    width: 600,
    height: 400,
    title: "Random Numbers Between 0 and x",
    FPS: 60,
  };

  const coordX = getRandomCoordX(window.width);

  r.SetTraceLogLevel(r.LOG_NONE);
  r.SetConfigFlags(r.FLAG_WINDOW_HIGHDPI);
  r.InitWindow(window.width, window.height, window.title);
  r.SetTargetFPS(window.FPS);

  return {
    window,
    coordX,
  };
}

function getRandomCoordX(windowWidth) {
  const coordX = [];

  for (let i = 0; i < 150; i++) {
    if (!coordX.includes(Math.random() * windowWidth)) {
      coordX.push(Math.random() * windowWidth);
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

  for (const x of coordX) {
    r.DrawRectangle(x, 0, 2, height, r.RED);
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
