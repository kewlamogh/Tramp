function startGaem() {
    currentLevel = parse(levels[levelNumber.toString()]);
    try {
        main();
    } catch {
        cancelAnimationFrame(main);
        levelNumber++;
        main();
    }
}

let keysDown = {};
addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
});
addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];
});
function input() {
    if (65 in keysDown) {
        if (getTile((player.x - player.speed) + 1, player.y + 16) != "1") {
            player.x -= 3;
        }
    }

    if (68 in keysDown) {
        if (getTile(((player.x + player.width) + player.speed) - 1, player.y + 16) != "1") {

            player.x += 3;
        }
    }
    if (getTile(player.x, player.y) === "5") {
        player.yke += 15;
        if (32 in keysDown) {
            player.yke += 10;
        }
    }
    if (getTile(player.x, player.y) === "6") {
        player.x -= 5;
    }

    if (getTile(player.x, player.y) === "7") {
        player.x += 5;
    }

}
function getTile(x, y) {
    return (currentLevel[Math.floor(y / 32)][Math.floor(x / 32)]);
}
const c = document.getElementById("canvas").getContext("2d");
let levels = {}
let levelNumber = 1;
let currentLevel = '';
const player = {
    x: 256,
    y: 276,
    width: 15,
    height: 15,
    speed: 3,
    mass: 64,
    yke: 0,
    gpe: 0
}
function calcGPE(obj) {
    return obj.mass * (9.8 / 1000000) * ((canvas.height - obj.height) - (obj.y / 32));
}
function gravity(obj) {
    obj.y -= obj.yke;
    obj.yke -= obj.gpe;
    obj.gpe = calcGPE(obj);

    if (getTile(obj.x, obj.y) == "1" || getTile(obj.x + 32, obj.y) == "1") {
        if (obj.yke >= 0) {
            obj.yke = -0.5;
            obj.y += 1;
        }
    } else {
        if (getTile(obj.x + 32, (obj.y + 32)) == "1" || getTile(obj.x, (obj.y + 32)) == "1") {
            if (obj.yke <= 0) {
                obj.yke = 0;
                obj.y -= (obj.y % 32);
            }
        }
    }
}
levels["1"] = `1111111111111111111111111
0100000000010000
0100000000010000
0100000000010000
0100000000010000
0100000000010000
0100000000010000
0100000000010000
0100005550010000
0100001110010000
0100000000010000
0100000000010000
0100000000010000
0100000000010000
0155555555510000
0111111111110000`;
levels["2"] = `0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000110000000
000000011000000
`
function parse(lvl) {
    const lines = lvl.split("\n");
    const characters = lines.map(l => l.split(""));
    return characters;
}
function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "blue";
    c.fillRect(player.x, player.y, player.width, player.height);
    c.fillStyle = "black";
    for (let row = 0; row < currentLevel.length; row++) {
        for (let col = 0; col < currentLevel[0].length; col++) {
            if (currentLevel[row][col] === "1") {
                c.fillRect(col * 32, row * 32, 32, 32);
            }
            else if (currentLevel[row][col] === "5") {
                c.fillStyle = 'red';
                c.fillRect(c * 32, row * 32, 32, 32);
                c.fillStyle = 'black';
            }
        }
    }
}
//lol
function main() {
    draw();
    input();
    gravity(player);
    requestAnimationFrame(main);
}