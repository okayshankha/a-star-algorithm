class cell {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbour = new Array();
        this.isAnObstrucle = 0;
        this.cameFrom = -1;
    }

    show() {
        if (this.isAnObstrucle == 1) {
            fill(0);
        } else {
            fill(100);
        }
        var v = new Array(this.posX, this.posY);
        if (searchForArray(OpenSet, v)) {
            fill('#2CDA78');
        }
        if (this.isAnObstrucle == -99) {
            fill('#74399F');
        }
        if (!v.Compare(current)) {
            fill('#FF9300');
        }
        if (this.isAnObstrucle == 9999) {
            fill('#FF9300');
        }
        rect(this.posX * (canvasW / rows), this.posY * (canvasH / cols), (canvasW / rows), (canvasH / cols));
    }

}



function DrawGrids(grid) {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j].show();
        }
    }
}

function MakeObstracles(grid) {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j].isAnObstrucle = random([0, 1, 2]);
            grid[i][j].h = dist(grid[i][j].posX, grid[i][j].posY, grid[rows - 1][cols - 1].posX, grid[rows - 1][cols - 1].posY);
        }
    }
    grid[0][0].isAnObstrucle = 0;
    grid[rows - 1][cols - 1].isAnObstrucle = 0;
}

function GetHeuristics(grid) {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (grid[i][j].isAnObstrucle != 1)
                grid[i][j].h = dist(i, j, end[0], end[1]);
        }
    }
}

function GetNeighbours(grid) {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (grid[i][j].isAnObstrucle != 1) {
                if (i - 1 >= 0) {
                    grid[i][j].neighbour.push(new Array(i - 1, j));
                    if (j - 1 >= 0) {
                        grid[i][j].neighbour.push(new Array(i - 1, j - 1));
                    }
                    if (j + 1 < cols) {
                        grid[i][j].neighbour.push(new Array(i - 1, j + 1));
                    }
                }

                if (i + 1 < rows) {
                    grid[i][j].neighbour.push([i + 1, j]);
                    if (j - 1 >= 0) {
                        grid[i][j].neighbour.push(new Array(i + 1, j - 1));
                    }
                    if (j + 1 < cols) {
                        grid[i][j].neighbour.push(new Array(i + 1, j + 1));
                    }
                }

                if (j - 1 >= 0) {
                    grid[i][j].neighbour.push(new Array(i, j - 1));
                }
                if (j + 1 < cols) {
                    grid[i][j].neighbour.push(new Array(i, j + 1));
                }
            }
        }
    }
}

function Calc_All_fValue() {
    for (i = 0; i < OpenSet.length; i++) {
        grid[OpenSet[i][0]][OpenSet[i][1]].f = grid[OpenSet[i][0]][OpenSet[i][1]].g + grid[OpenSet[i][0]][OpenSet[i][1]].h;
    }
}

function MinimumFvalueElement() {
    let winner = 0;
    for (i = 1; i < OpenSet.length; i++) {
        if (grid[OpenSet[i][0]][OpenSet[i][1]].f < grid[OpenSet[winner][0]][OpenSet[winner][1]].f) {
            winner = i;
        }
    }
    return winner;
}

Array.prototype.Remove = function (object) {
    for (i = this.length; i >= 0; i--) {
        if (this[i] == object) {
            this.splice(i, 1);
        }
    }
}

Array.prototype.Compare = function (obj) {
    if (this.length == obj.length) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] != obj[i]) {
                return (this[i] - obj[i]);
            }
        }
        return 0;
    }
    return -1;
}

var HasElement = function (array, object) {
    for (var i = 0; i < array.length; i++) {
        var result = ((array[i].posX == object.posX) && (array[i].poxY == object.posX));
        //print(array[i]);
        if (result) {
            return true;
        }
    }
    return false;
}

function searchForArray(haystack, needle) {
    var i, j, current;
    for (i = 0; i < haystack.length; ++i) {
        if (needle.length === haystack[i].length) {
            current = haystack[i];
            for (j = 0; j < needle.length && needle[j] === current[j]; ++j)
                ;
            if (j === needle.length)
                return 1;
        }
    }
    return 0;
}

function reconstruct_path() {
    path = end;

    while (path.Compare(start)) {
        grid[path[0]][path[1]].isAnObstrucle = 9999;
        path = grid[path[0]][path[1]].cameFrom;
    }

    grid[path[0]][path[1]].isAnObstrucle = 9999;

}