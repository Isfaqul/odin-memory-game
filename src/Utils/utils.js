import clickSound from "../assets/click.mp3";
import gameOver from "../assets/game-over.mp3";

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
  const audio = new Audio(clickSound);
  audio.currentTime = 0;
  audio.play();
}

export function playGameOver() {
  const audio = new Audio(gameOver);
  audio.currentTime = 0;
  audio.play();
}
