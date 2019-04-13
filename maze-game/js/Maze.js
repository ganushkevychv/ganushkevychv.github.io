"use strict"

const maze = [
    '#########',
    '#.....#.#',
    '#.###..T#',
    '#..#..#.#',
    '#.#######',
    '#..#..P.#',
    '#.##.##.#',
    '#.....#.#',
    '#########',
];

const maze2 = [
    '#########',
    '#......T#',
    '#.###E###',
    '#.......#',
    '#######.#',
    '#.......#',
    '#.#######',
    '#......P#',
    '#########',
];

const mazeBoard = document.createElement('div');

document.body.appendChild(mazeBoard);

maze.forEach(function(arrItem) {
    let row = document.createElement('div');
    row.classList.add('row');

    let cells = arrItem.split('');

    cells.forEach(function(cellItem) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        if (cellItem === '#') {
            cell.classList.add('wall');
        } else if (cellItem === '.') {
            cell.classList.add('path');
        } else if (cellItem === 'T') {
            cell.classList.add('treasure');
        } else if (cellItem === 'P') {
            cell.classList.add('player');
        } 
        row.appendChild(cell)
    });

    mazeBoard.appendChild(row);
});

function nextMaze() {
    mazeBoard.innerHTML = '';
    maze2.forEach(function(arrItem) {
        let row = document.createElement('div');
        row.classList.add('row');

        let cells = arrItem.split('');

        cells.forEach(function(cellItem) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            if (cellItem === '#') {
                cell.classList.add('wall');
            } else if (cellItem === '.') {
                cell.classList.add('path');
            } else if (cellItem === 'T') {
                cell.classList.add('treasure');
            } else if (cellItem === 'P') {
                cell.classList.add('player');
            } else if (cellItem === 'E') {
                cell.classList.add('easterEgg');
            }
            row.appendChild(cell)
        });

        mazeBoard.appendChild(row);
    });
}


function getIndex(target) {
    return Array.from(target.parentElement.children).indexOf(target);
};
function getIndex(target) {
    return Array.from(target.parentElement.children).indexOf(target);
};


window.addEventListener('keydown', function(event) {
    const playerNode = document.querySelector('.player');
    if (event.code === 'KeyD') {
        const targetNode = playerNode.nextElementSibling;
        if (targetNode === null || targetNode.classList.contains('wall')) {
            return;
        };
        targetNode.classList.add('player');
        playerNode.classList.remove('player');
        treasureFound(targetNode)
    };
    if (event.code === 'KeyA') {
        const targetNode = playerNode.previousElementSibling;
        if (targetNode === null || targetNode.classList.contains('wall')) {
            return;
        };
        targetNode.classList.add('player');
        playerNode.classList.remove('player');
        treasureFound(targetNode)
    };
    if (event.code === 'KeyW') {
        const row = playerNode.parentElement.previousElementSibling;
        const index = getIndex(playerNode);
        if (row === null || row.children[index].classList.contains('wall')) {
            return;
        };
        row.children[index].classList.add('player');
        playerNode.classList.remove('player');
        treasureFound(row.children[index])
    };
    if (event.code === 'KeyS') {
        const row = playerNode.parentElement.nextElementSibling;
        const index = getIndex(playerNode);
        if (row === null || row.children[index].classList.contains('wall')) {
            return;
        }
        row.children[index].classList.add('player');
        playerNode.classList.remove('player');
        treasureFound(row.children[index])

    };
});
function treasureFound(targetNode) {
    if (targetNode === null || targetNode.classList.contains('treasure')) {
        swal('YES! You made it!');
        nextMaze();
    } else if (targetNode === null || targetNode.classList.contains('easterEgg')){
swal("Thanks for playing my game! Basically im looking for my first job on position of Junior Front-end Developer! My LinkedIn: www.linkedin.com/in/vladyslav-ganushkevych")
    };
    
   
};