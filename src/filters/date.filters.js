/* Created by cridequegerWorkBase at 2018/7/24 */

export function originalDate(value) {
  if(value) {
    const date = new Date(value);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  } else {
    return ''
  }
};
