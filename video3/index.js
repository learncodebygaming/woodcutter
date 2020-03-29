// import the robotjs library
var robot = require('robotjs');

function main() {
    console.log("Starting...");
    sleep(4000);

    // infinite loop. use ctrl+c in terminal to stop the program
    while (true) {
        // find a tree to click on
        var tree = findTree();
        // if we can't find a tree, try rotating the camera
        if (tree == false) {
            rotateCamera();
            continue;
        }

        // chop down the tree we found
        robot.moveMouse(tree.x, tree.y);
        robot.mouseClick();
        // wait for walking and chopping to complete
        sleep(8000);

        dropLogs();
    }
}

function dropLogs() {
    var inventory_x = 1882;
    var inventory_y = 830;
    // drop logs from the inventory
    robot.moveMouse(inventory_x, inventory_y);
    robot.mouseClick('right');
    robot.moveMouse(inventory_x, inventory_y + 70);
    robot.mouseClick();
    sleep(1000);
}

function testScreenCapture() {
    // taking a screenshot
    var img = robot.screen.capture(0, 0, 1920, 1080);

    // testing: the pixel at 30, 18 when I screen capture VSCode should be that bright blue:
    // RBG of 35, 170, 242 which we convert into hex color #23aaf2
    var pixel_color = img.colorAt(30, 18);
    console.log(pixel_color);
    // when I test this I get 23a9f2, which is very close to what we expect.
}

function findTree() {
    // take a screenshot from just the middle of our screen.
    // I have the upper left corner of the image starting at x = 300, y = 300, and size of
    // the image at width = 1300, height = 400.
    // you should adjust this to your own screen size. you might also try reducing the size
    // if this is running slow for you.
    var x = 300, y = 300, width = 1300, height = 400;
    var img = robot.screen.capture(x, y, width, height);

    // make an array that contains colors of the trees we want to click on.
    // I'm targeting the brown colors of the trunks.
    var tree_colors = ["5b462a", "60492c", "6a5130", "705634", "6d5432", "574328"];

    // sample up to 500 random pixels inside our screenshot until we find one that matches
    // a tree color.
    for (var i = 0; i < 500; i++) {
        var random_x = getRandomInt(0, width-1);
        var random_y = getRandomInt(0, height-1);
        var sample_color = img.colorAt(random_x, random_y);

        if (tree_colors.includes(sample_color)) {
            // because we took a cropped screenshot, and we want to return the pixel position
            // on the entire screen, we can account for that by adding the relative crop x and y
            // to the pixel position found in the screenshot;
            var screen_x = random_x + x;
            var screen_y = random_y + y;

            console.log("Found a tree at: " + screen_x + ", " + screen_y + " color " + sample_color);
            return {x: screen_x, y: screen_y};
        }
    }
    
    // did not find the color in our screenshot
    return false;
}

function rotateCamera() {
    console.log("Rotating camera");
    robot.keyToggle('right', 'down');
    sleep(1000);
    robot.keyToggle('right', 'up');
}

function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    // inclusive of min and max
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

main();
