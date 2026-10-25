const r = require("raylib");

function setup() {
  const window = {
    width: 1000,
    height: 600,
    title: "A random point in a parallelogram",
    FPS: 60,
  };

  const parallelogramObj = {
    x: 300,
    y: 100,
    width: 400,
    height: 300,
    shift: 100,
    color: r.WHITE,
  };

  const points = getRandomPoints(parallelogramObj);

  r.SetTraceLogLevel(r.LOG_NONE);
  r.SetConfigFlags(r.FLAG_WINDOW_HIGHDPI);
  r.InitWindow(window.width, window.height, window.title);
  r.SetTargetFPS(window.FPS);

  return {
    window,
    parallelogramObj,
    points,
  };
}

function getRandomPoints(p) {
  const points = [];

  for (let i = 0; i < 300; i++) {
    const coordY = p.y + Math.random() * p.height;
    const coordX =
      p.x + Math.random() * p.width + p.shift * (1 - (coordY - p.y) / p.height);

    points.push({ x: coordX, y: coordY });
  }

  return points;
}

function update(world) {
  //
}

function drawParallelogram(p) {
  const A = { x: p.x + p.shift, y: p.y };
  const B = { x: p.x + p.shift + p.width, y: p.y };
  const C = { x: p.x + p.width, y: p.y + p.height };
  const D = { x: p.x, y: p.y + p.height };

  r.DrawLineV(A, B, p.color);
  r.DrawLineV(B, C, p.color);
  r.DrawLineV(C, D, p.color);
  r.DrawLineV(D, A, p.color);
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.DARKBLUE);
  const color = { r: 255, g: 255, b: 0, a: 100 };

  drawParallelogram(world.parallelogramObj);

  for (const point of world.points) {
    r.DrawCircleV(point, 10, color);
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
