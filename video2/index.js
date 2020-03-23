// import the robotjs library
var robot = require('robotjs');

function main() {
    console.log("Starting...");
    sleep(4000);

    // basic infinite loop
    while (true) {
        robot.moveMouse(764, 557);
        robot.mouseClick();
        sleep(8000);
    }
}

function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

main();
