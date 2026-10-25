const r = require("raylib");

function setup() {
  const window = {
    width: 1000,
    height: 600,
    title: "A random point in any rectangle",
    FPS: 60,
  };

  const rectObj = getRectangleObj(
    250,
    100,
    window.width / 2,
    window.height / 2,
    r.BLUE,
  );

  const points = getRandomPoints(rectObj.rect);

  r.SetTraceLogLevel(r.LOG_NONE);
  r.SetConfigFlags(r.FLAG_WINDOW_HIGHDPI);
  r.InitWindow(window.width, window.height, window.title);
  r.SetTargetFPS(window.FPS);

  return {
    window,
    rectObj,
    points,
  };
}

function getRectangleObj(x, y, width, height, color) {
  return {
    rect: { x, y, width, height },
    color,
  };
}

function getRandomPoints(rectObj) {
  const points = [];

  for (let i = 0; i < 300; i++) {
    const x = rectObj.x + Math.random() * rectObj.width;
    const y = rectObj.y + Math.random() * rectObj.height;
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

  const rect = world.rectObj.rect;
  const circlePoints = world.points;
  const radius = 10;
  const color = { r: 255, g: 255, b: 255, a: 100 };

  for (const point of circlePoints) {
    r.DrawRectangleLines(
      rect.x - radius,
      rect.y - radius,
      rect.width + 2 * radius,
      rect.height + 2 * radius,
      r.WHITE,
    );
    r.DrawCircleV(point, radius, color);
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
