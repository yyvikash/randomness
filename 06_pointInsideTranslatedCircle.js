const r = require("raylib");

function setup() {
  const window = {
    width: 800,
    height: 600,
    title: "A random point in a translated circle",
    FPS: 60,
  };

  const circleObj = getcircleObj(400, 250, 200, r.BLUE);

  const points = getRandomPoints(circleObj.center, circleObj.radius);

  r.SetTraceLogLevel(r.LOG_NONE);
  r.SetConfigFlags(r.FLAG_WINDOW_HIGHDPI);
  r.InitWindow(window.width, window.height, window.title);
  r.SetTargetFPS(window.FPS);

  return {
    window,
    circleObj,
    points,
  };
}

function getcircleObj(x, y, radius, color) {
  return {
    center: { x, y },
    radius,
    color,
  };
}

function getPoints(center, radius, angle) {
  const diameter = 2 * radius;
  const x = center.x + radius * Math.random() * Math.cos(angle);
  const y = center.y + radius * Math.random() * Math.sin(angle);

  return { x, y };
}

function getRandomPoints(center, radius) {
  const points = [];

  for (let i = 0; i < 360; i++) {
    const point = getPoints(center, radius, i);

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

  const circle = world.circleObj;
  const circlePoints = world.points;
  const pointRadius = 10;
  const color = { r: 255, g: 255, b: 0, a: 100 };

  for (const point of circlePoints) {
    r.DrawCircleLines(
      circle.center.x,
      circle.center.y,
      circle.radius + pointRadius,
      r.WHITE,
    );
    r.DrawCircleV(point, pointRadius, color);
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
