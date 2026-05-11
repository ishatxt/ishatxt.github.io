const responsive = {
  xxs: 320,
  xs: 420,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
  xxxl: 1921,
};

function ifFunctionExist(functionName, ...args) {
  if (typeof window[functionName] === "function") {
    window[functionName](...args);
  } else {
    console.log(`Function ${functionName} does not exist.`);
  }
}
