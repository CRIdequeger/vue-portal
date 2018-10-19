/*
 *
 * Created by cridequegerWorkBase at 2018/7/17
 *
 */

import Mock from 'mockjs';

const musicList = [];
for (let i = 0; i < 88; i += 1) {
  musicList.push(Mock.mock({
    id: Mock.Random.guid(),
    title: Mock.Random.title(),
    cover: Mock.Random.dataImage(),
  }));
}
const music = {
  content: Mock.Random.cparagraph(35, 40),
};
export { musicList, music };
