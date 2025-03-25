new p5(s => {
    const currentPath = [];
    let currentDist = 0;

    s.setup = function() {
        s.createCanvas(width, height);
    }
    
    s.draw = function() {
        s.background(255);

        // draw current path
        s.strokeWeight(5);
        s.stroke('#2D4059');
        drawPath(currentPath, s);

        if (currentPath.length > 0 && currentPath.length < numPoints) {
            s.line(currentPath.at(-1).x, currentPath.at(-1).y,
                   s.mouseX, s.mouseY);
        }

        s.noStroke();
        s.fill('#F07B3F');
        points.forEach(({x, y}) => {
            const d = (s.dist(x, y, s.mouseX, s.mouseY) < pointRadius*2) ? 30 : pointRadius*2;
            s.circle(x, y, d);
        });
    }

    s.mouseReleased = function() {
        if (currentPath.length == numPoints &&
            s.mouseX > 0 && s.mouseX < width &&
            s.mouseY > 0 && s.mouseY < height) {
            currentPath.length = 0;
            currentDist = 0;
            document.getElementById('distance').innerText = '0';
        }

        points.forEach(point => {
            if (s.dist(point.x, point.y, s.mouseX, s.mouseY) < 15) {
                if (!currentPath.includes(point)) {
                    if (currentPath.length > 0) {
                        currentDist += s.dist(currentPath.at(-1).x, currentPath.at(-1).y, point.x, point.y);
                        document.getElementById('distance').innerText = currentDist.toFixed(1);
                    }
                    currentPath.push(point);

                    if (currentPath.length == numPoints) {
                        add_to_leaderboard(currentDist, 'draw');
                    }
                } else if (currentPath.at(-1) == point) {
                    currentPath.pop();
                }
            }
        });
    }
}, 'draw');
