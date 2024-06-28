type STATE = 'hidden' | 'scroll';


const setOverflow = (state: STATE) => {
      document.body.style.overflow = state;
};

export default setOverflow;