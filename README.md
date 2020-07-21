# Woodcutter Bot using RobotJS

Source code for the Learn JavaScript by playing RuneScape series on the **Learn Code By Gaming** YouTube channel.

This bot is for educational purposes only.

Watch the tutorial here: https://www.youtube.com/playlist?list=PL1m2M8LQlzfJjTJrovnq2lBnov_g0ZpN3

### If your mouse is not moving to the correct coordinates

Check the output of `robot.getScreenSize()`. If the result you're given do not match what you expect, ie. `{ width: 1536, height: 864 }` when you were expecting 1920x1080, you can write a function to translate your coordinates:

```
function coordinate(x) {
    return x * (1536 / 1920);
}
```
