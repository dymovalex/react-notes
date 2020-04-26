export const removeTags = text => {
  return text.replace(/<[^>]*>?/gm, '');
};

export const debounce = (fn, time) => {
  let timeout;
  let lastCall;
  return function (args) {
    let prevCall = lastCall;
    lastCall = Date.now();

    if (prevCall && (lastCall - prevCall < time)) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => fn(args), time);
  }
};