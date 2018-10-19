/*
 *
 * Created by cridequegerWorkBase at 2018/7/17
 *
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import cards from './data/cards';

const cardsList = cards;

export default {
  bootstrap() {
    const mock = new MockAdapter(axios);
    /* 获取卡片列表api */
    mock.onGet('getCards').reply(() => new Promise((resolve) => {
      setTimeout(() => {
        resolve([200, {
          cards: cardsList,
        }]);
      }, 1000);
    }),
    );

    /* 生成音乐列表api */

    /* mock.onGet('music-list').reply((config) => {
      const num = config.params.num;
      let size = config.params.size;
      const total = musicListCopy.length;
      if (size === undefined) size = 20;
      musicListCopy = musicListCopy.filter(
        (item, index) => index < size * num && index >= size * (num - 1));
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, {
            musicList: musicListCopy,
            page: { total, size, num },
          }]);
        }, 1000);
      });
    }); */
  },
};
