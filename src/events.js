import { debugMessage } from "./debug";

const setText = (id, text) => {
  document.getElementById(id).innerHTML = text;
};

const handler = (id, message, fn) => {
  document
    .getElementById(id)
    .addEventListener("click", () => debugMessage(message)(fn));
};

const PLAY = "▶";
const PAUSE = "▮▮";

export const init = (document, actions, doInit) => {
  let inited = false;
  setText("toggle", PLAY);
  handler("new", "new scene", actions.newScene);
  handler("toggle", "toggle", () => {
    if (inited) {
      const isPlaying = actions.toggle();
      setText("toggle", isPlaying ? PAUSE : PLAY);
    } else {
      doInit();
      setText("toggle", PAUSE);
      inited = true;
    }
  });
};
