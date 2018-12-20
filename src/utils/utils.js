/* Created by cridequegerWorkBase at 2018/12/17 */

const debounce = (func, delay) => {
  let timeout = null;
  return function() {
    const _this = this;
    const args = arguments;
    if(timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(_this, args)
    }, delay)
  }
};

export { debounce }
