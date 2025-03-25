let clasicalBestPath;
let clasicalBestDist;
let clasicalIndex = 0;

const startClasical = () => {
    clasicalIndex = 0;
    clasicalBestPath = points;
    clasicalBestDist = pathDist(clasicalBestPath);
};

new p5(s => {

    s.setup = function() {
        s.createCanvas(width, height);
        s.frameRate(60);
    }
    
    s.draw = function () {
        s.background(255);

        if (start) {
            // Update best path
            const currentDist = pathDist(paths[clasicalIndex]);
            if (currentDist < clasicalBestDist) {
                clasicalBestPath = paths[clasicalIndex];
                clasicalBestDist = currentDist;
                update_leaderboard(realPathDist(clasicalBestPath), 'clasical');
            }
    
            // Draw current path and best path
            s.strokeWeight(2);
            s.stroke(45, 64, 89, 150);
            drawPath(paths[clasicalIndex], s);
            s.strokeWeight(5);
            s.stroke(45, 64, 89);
            drawPath(clasicalBestPath, s);
    
            // update current path
            clasicalIndex = (clasicalIndex + 1) % paths.length;
        }

        // draw points
        s.fill('#00FA9A');
        s.noStroke(),
        points.forEach(({x, y}) => s.circle(x, y, pointRadius*2));
    }

}, 'clasical');
