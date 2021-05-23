import { config } from "dotenv";
config();

const ws = "ws://localhost:8000/ws/twitch-events/";
ws.send({ "token": process.env.TWITCH_TOKEN });

ws.onmessage = (response) => {
    console.log('websocket message received!');
    var data = JSON.parse(response.data);

    switch (data.event) {
        case "chatmessage":
            renderChatMessage(data);
            break;
        case "teammemberjoin":
            console.log("Team member joined!!!");
            break;
        case "follow":
            console.log("We have a new follower!!!");
            break;
        case "yeetuser":
            console.log("User yeeted");
            break;
        case "cheer":
            console.log("someone cheered!");
            break;
        case "raid":
            console.log("we are being raided");
            break;
        case "sub":
            console.log("Subscriber!");
            break;
        default:
            console.log(data);
            break;
    }
}

const toe = document.getElementById("toe");
const toeImage = toe.getElementsByTagName("img")[0];

let activity = { image: "Toe_LookRight.gif", speed: 2 };
let direction = 1;

setSrc(activity.image);
function setSrc(src) {
    if (
        new URL(toe.getElementsByTagName("img")[0].src).pathname.substr(1) !== src
    ) {
        toe.getElementsByTagName("img")[0].src = src;
    }
}

function move() {
    setSrc(activity.image);

    const delta = activity.speed * direction;
    const position = parseInt(toe.style.left || "0");

    if (delta < 0) toe.style.transform = "scaleX(-1)";
    else toe.style.transform = "scale(1)";
    if (delta + position <= 0) direction = 1;
    if (delta + position + toe.clientWidth >= window.innerWidth) direction = -1;
    toe.style.left = position + delta + "px";
}

setInterval(move, 100);