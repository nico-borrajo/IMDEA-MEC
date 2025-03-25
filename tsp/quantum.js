
let quantumTime = 0;

const startQuantum = () => {
    quantumTime = 0;
};

new p5(s => {

    let bestPath;
    let bestDist = Infinity;
    let worstPath;
    let worstDist = 0;

    paths.forEach(path => {
        let d = pathDist(path);
        if (d < bestDist) {
            bestDist = d;
            bestPath = path;
        }

        if (d > worstDist) {
            worstDist = d;
            worstPath = path;
        }
    });

    const realWorstDist = realPathDist(worstPath);
    const realBestDist = realPathDist(bestPath);

    s.setup = function() {
        s.createCanvas(width, height);
    }

    s.draw = function() {
        s.background(255);

        if (start) {
            s.strokeWeight(s.lerp(4, 2, quantumTime / 240));
            s.stroke(45, 64, 89, 255 - quantumTime);
            // draw all paths
            for (let i = 0; i < numPoints; i++) {
                for (let j = i + 1; j < numPoints; j++) {
                    s.line(points[i].x, points[i].y, points[j].x, points[j].y);
                }
            }

            // draw best path
            s.strokeWeight(s.lerp(3, 5, quantumTime / 240));
            s.stroke(45, 64, 89, quantumTime);
            drawPath(bestPath, s);

            // update leaderboard
            update_leaderboard(s.lerp(realWorstDist, realBestDist, quantumTime / 240), 'quantum');

            // update time
            quantumTime = Math.min(quantumTime + 1, 240);
        }

        // draw points
        s.noStroke();
        s.fill('#ff1a8c');
        points.forEach(({ x, y }) => s.circle(x, y, pointRadius * 2));
    }
}, 'quantum');

