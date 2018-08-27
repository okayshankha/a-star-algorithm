var canvasW = 600;
var canvasH = 600;
var rows = 100;
var cols = 100;

var current, currentIndex;
var start = [0, 0];
var end = [rows - 1, cols - 1];


var tentative_gScore;
var neighbour;
var grid = new Array(rows);
var OpenSet = new Array();
var ClosedSet = new Array();


function setup() {
    //frameRate(1);
    createCanvas(canvasW, canvasH);
    print('A*');
    for (var i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
    }

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = new cell(i, j);
        }
    }
    MakeObstracles(grid);

    /**
     * Each member of the grid will get the neighbour indices in an array
     */
    GetNeighbours(grid);
    GetHeuristics(grid);
    OpenSet.push(start);
}

function draw() {
    if (OpenSet.length === 0) {
        print('Finished!');
        alert('Impossible to reach!');
        noLoop();
    } else {
        Calc_All_fValue();
        currentIndex = MinimumFvalueElement();
        current = OpenSet[currentIndex];

        /*
         * Here the Compare function returns 0 in a match, otherwise the returns the difference
         */
        if (!OpenSet[currentIndex].Compare(end)) {
            reconstruct_path();
            print('Finished!');
            background(0);
            DrawGrids(grid);
            noLoop();
        }

        OpenSet.Remove(current);
        grid[current[0]][current[1]].isAnObstrucle = -99;
        ClosedSet.push(current);

        neighbour = grid[current[0]][current[1]].neighbour;
        for (var i = 0; i < neighbour.length; i++) {
            if (!searchForArray(ClosedSet, neighbour[i]) && (grid[neighbour[i][0]][neighbour[i][1]].isAnObstrucle != 1)) {

                tentative_gScore = 1 + grid[current[0]][current[1]].g;
                //print(tentative_gScore);

                if (!searchForArray(OpenSet, neighbour[i])) {
                    OpenSet.push(neighbour[i]);
                } else if (tentative_gScore >= grid[neighbour[i][0]][neighbour[i][1]]) {

                }

                grid[neighbour[i][0]][neighbour[i][1]].cameFrom = current;
                grid[neighbour[i][0]][neighbour[i][1]].g = tentative_gScore;
                grid[neighbour[i][0]][neighbour[i][1]].f = grid[neighbour[i][0]][neighbour[i][1]].g + grid[neighbour[i][0]][neighbour[i][1]].h;

            }
        }




    }

    background(0);
    DrawGrids(grid);

//    noLoop();
//    return 0;
}

