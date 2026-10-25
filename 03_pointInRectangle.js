const r = require("raylib");

function setup() {
  const window = {
    width: 800,
    height: 600,
    title: "A random point in a rectangle",
    FPS: 60,
  };

  const points = getRandomPoints(window.width, window.height);

  r.SetTraceLogLevel(r.LOG_NONE);
  r.SetConfigFlags(r.FLAG_WINDOW_HIGHDPI);
  r.InitWindow(window.width, window.height, window.title);
  r.SetTargetFPS(window.FPS);

  return {
    window,
    points,
  };
}

function getRandomPoints(width, height) {
  const points = [];

  for (let i = 0; i < 300; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const point = { x, y };

    if (!points.includes(point)) {
      points.push(point);
    }
  }

  return points;
}

function update(world) {
  //
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.DARKBLUE);

  const points = world.points;
  const color = { r: 255, g: 255, b: 255, a: 100 };

  for (const point of points) {
    r.DrawCircleV(point, 15, color);
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
