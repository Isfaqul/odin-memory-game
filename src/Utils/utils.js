import clickSound from "../assets/click.mp3";
import gameOver from "../assets/game-over.mp3";

const audioGameOver = new Audio(gameOver);
const audioClick = new Audio(clickSound);
audioGameOver.load();
audioClick.load();

export function CleanupCharArray(data) {
  return data.map((char) => {
    let obj = {};
    obj.id = char.id;
    obj.name = char.name;
    obj.image = char.images[0];
    obj.isClicked = false;

    return obj;
  });
}

export function playClick() {
  audioClick.currentTime = 0;
  audioClick.play();
}

export function playGameOver() {
  audioGameOver.currentTime = 0;
  audioGameOver.play();
}
