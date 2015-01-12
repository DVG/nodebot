var five = require("johnny-five");
var board = new five.Board();

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();

board.on("ready", function () {
  var flipper = {
    left_contrl: new five.Servo({pin:11, startAt: 90}),
    right_contrl: new five.Servo({pin:6, startAt: 120}),
    stop:function(){
      console.log("Flipper stop");
    },
    flip: function(){
      flipper.right_contrl.step(25);
      flipper.left_contrl.step(-25);
      console.log("Start Flip");
    },
    lowerFlipper: function(){
      console.log("Flipper Lower")
      flipper.right_contrl.step(-25);
      flipper.left_contrl.step(25);

    }
  }
  var wheels = {
    left: new five.Servo({ pin: 9, type: 'continuous' }),
    right: new five.Servo({ pin: 10, type: 'continuous' }),
    stop: function () {
      wheels.left.center();
      wheels.right.center();
    },
    forward: function () {
      wheels.left.ccw();
      wheels.right.cw();
      console.log("goForward");
    },
    pivotLeft: function () {
      wheels.left.cw();
      wheels.right.cw();
      console.log("turnLeft");
    },
    pivotRight: function () {
      wheels.left.ccw();
      wheels.right.ccw();
      console.log("turnRight");
    },
    back: function () {
      wheels.left.cw();
      wheels.right.ccw();
    }
  };

  wheels.stop();
  console.log("Use the cursor keys or ASWD to move your bot. Hit escape or the spacebar to stop.");

  stdin.on("keypress", function(chunk, key) {

    console.log("Keypress: " + key.name);
    if (!key) return;

    switch (key.name) {
      case 'up':
      case 'w':
        wheels.forward();
        break;

      case 'down':
      case 's':
        wheels.back();
        break;

      case 'left':
      case 'a':
        wheels.pivotLeft();
        break;

      case 'right':
      case 'd':
        wheels.pivotRight();
        break;

      case 'space':
      case 'escape':
        wheels.stop();
        break;

      case 'f':
        console.log("FLIP GODDAMN YOU");
        flipper.flip();
        break;

      case 'g':
        flipper.lowerFlipper();
        break;

      }
  });
});
