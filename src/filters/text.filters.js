/* eslint-disable import/prefer-default-export */
/* Created by cridequegerWorkBase at 2018/7/24 */

let titleLength = 17;
export function shorterTitle(val, len) {
  let result;
  if (len !== undefined) titleLength = len;
  if (val.length > titleLength) {
    result = `${val.substring(0, titleLength - 1)}...`;
  } else {
    result = val;
  }
  return result;
}
