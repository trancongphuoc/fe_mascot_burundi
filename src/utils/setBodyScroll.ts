type STATE_SCROLL = "hidden" | "scroll";

const setOverflow = (state: STATE_SCROLL) => {
  if (state != document.body.style.overflow) {
    document.body.style.overflow = state;
  }
};

export default setOverflow;
