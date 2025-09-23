import cairo, math, random

WIDTH, HEIGHT = 600, 400
surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, WIDTH, HEIGHT)
ctx = cairo.Context(surface)

ctx.set_source_rgb(1, 1, 1)
ctx.rectangle(0, 0, WIDTH, HEIGHT)
ctx.fill()

x0, y0, w, h = 150, 150, 300, 100
points = []

for i in range(0, w+1, 20):
    offset = random.uniform(-5, 5)
    points.append((x0+i, y0+offset))

for i in range(0, h+1, 20):
    offset = random.uniform(-5, 5)
    points.append((x0+w+offset, y0+i))

for i in range(0, w+1, 20):
    offset = random.uniform(-5, 5)
    points.append((x0+w-i, y0+h+offset))

for i in range(0, h+1, 20):
    offset = random.uniform(-5, 5)
    points.append((x0+offset, y0+h-i))

ctx.move_to(*points[0])
for p in points[1:]:
    ctx.line_to(*p)
ctx.close_path()

gradient = cairo.LinearGradient(x0, y0, x0+w, y0+h)
gradient.add_color_stop_rgb(0, 0.2, 0.05, 0.05)
gradient.add_color_stop_rgb(0.5, 0.4, 0.1, 0.1)
gradient.add_color_stop_rgb(1, 0.25, 0.08, 0.05)
ctx.set_source(gradient)
ctx.fill_preserve()

ctx.set_source_rgb(0.05, 0.02, 0.02)
ctx.set_line_width(2)
ctx.stroke()

ctx.set_line_width(1.0)
for i in range(25):
    y = random.uniform(y0+10, y0+h-10)
    ctx.move_to(x0+10, y)
    for x in range(x0+20, x0+w-20, 30):
        offset = random.uniform(-6, 6)
        ctx.curve_to(x, y+offset, x+15, y-offset, x+30, y)
    ctx.set_source_rgba(0.1, 0.05, 0.05, 0.35)
    ctx.stroke()

for _ in range(300):
    x = random.uniform(x0+10, x0+w-10)
    y = random.uniform(y0+10, y0+h-10)
    r = random.uniform(0.3, 1.0)
    ctx.arc(x, y, r, 0, 2*math.pi)
    ctx.set_source_rgba(0, 0, 0, 0.25)
    ctx.fill()

ctx.arc(x0+40, y0+h-15, 12, 0, 2*math.pi)
ctx.set_source_rgb(0.3, 0.15, 0.15)
ctx.fill()

surface.write_to_png("Grafkom.png")
