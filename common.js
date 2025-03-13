const randInt = (n) => Math.floor(Math.random() * n);

const sDist = (p1, p2) => (p1.x - p2.x)**2 + (p1.y - p2.y)**2;
const pathDist = points => points.reduce((acc, _, i) => 
    i < points.length-1 ? acc + sDist(points[i], points[i+1]) : acc, 0);

const realPathDist = points => points.reduce((acc, _, i) => 
    i < points.length-1 ? acc + Math.sqrt(sDist(points[i], points[i+1])) : acc, 0);

const permutations = (arr) => {
    const result = [];

    const perm = (current, remaining) => {
        if (remaining.length === 0) {
            result.push(current.slice());
            return;
        }

        for (let i = 0; i < remaining.length; i++) {
            const next = remaining[i];
            current.push(next);
            remaining.splice(i, 1); // Remove the element from the remaining array
            perm(current, remaining);
            current.pop();
            remaining.splice(i, 0, next); // Restore the removed element for the next iteration
        }
    }

    perm([], arr);
    return result;
}

const width = 800;
const height = 600;
const pointRadius = 10;

const numPoints = 10;
const points = Array.from({length: numPoints}, () => ({
    x: randInt(width - pointRadius*2) + pointRadius,
    y: randInt(height - pointRadius*2) + pointRadius,
}));

const paths = permutations(points);

const drawPath = (path, sketch) => {
    sketch.noFill();
    sketch.beginShape();
    path.forEach(({x, y}) => sketch.vertex(x, y));
    sketch.endShape();
};

const leaderboard = [];

const add_to_leaderboard = (dist, type) => {
    sorted_insert(leaderboard, {dist, type});
    if (leaderboard.length === 10)
        leaderboard.pop();
    show_leaderboard(leaderboard);
}

const sorted_insert = (arr, elem) => {
    let index = arr.findIndex(e => e.dist > elem.dist);
    if (index === -1)
        arr.push(elem);
    else
        arr.splice(index, 0, elem);
};

const update_leaderboard = (dist, typ) => {
    remove_leaderboard_type(typ);
    add_to_leaderboard(dist, typ);
}

const remove_leaderboard_type = typ => {
    const index = leaderboard.findIndex(({type}) => typ == type);
    if (index != -1) leaderboard.splice(index, 1);
}

const show_leaderboard = () => {
    let leaderboard_elem = document.querySelector('.leaderboard ul');
    leaderboard_elem.innerHTML = '';
    leaderboard.forEach(({dist, type}, i) => {
        const pos = document.createElement('span');
        pos.classList.add('number');
        pos.innerText = i+1+'.';

        const distElem = document.createElement('span');
        distElem.classList.add('distance')
        distElem.innerText = dist.toFixed(1) + 'm';

        const li = document.createElement('li');
        li.classList.add(type);
        li.appendChild(pos);
        li.appendChild(distElem);

        leaderboard_elem.appendChild(li);
    });
};

let start = false;

const factorial = n => {
    if (n <= 1) return n;
    return n * factorial(n-1);
};

document.addEventListener('DOMContentLoaded', () => {

    const startButton = document.querySelector('.auto button');
    startButton.addEventListener('click', () => {
        if (start) {
            remove_leaderboard_type('clasical');
            remove_leaderboard_type('quantum');
            show_leaderboard();
            startButton.innerText = 'Empezar';
        } else {
            startClasical();
            startQuantum();
            startButton.innerText = 'Reiniciar';
        }

        start = !start;
    });

    let table = document.querySelector('.draw .right');
    for (let i = 4; i < 21; i++) {
        let elem = document.createElement('div');
        let point = document.createElement('span');
        point.innerText = i;
        let comb = document.createElement('span');
        comb.innerText = factorial(i).toLocaleString();
        elem.appendChild(point);
        elem.appendChild(comb);
        table.appendChild(elem);
    }
});
