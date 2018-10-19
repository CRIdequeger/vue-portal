/* Created by cridequegerWorkBase at 2018/7/23 */

import Mock from 'mockjs';
/* cards储存器 */
const cards = [];
/* 按列排列的cards储存器 */
const groupCards = [];
/* 随机按钮类型的池 */
const resTypeArr = ['imgButton', 'iconButton'];
/* 随机资源宽度的池 */
const showSizeArr = [2, 4, 6, 8, 12];
/* 每个card的tab数量 */
let tabSize = 0;
/* 每个card的内容数量 */
let contentSize = 0;

/* 计数器说明
 * i: 每个card
 * j: 每个card随机个内容
 */

for (let i = 0; i < 9; i += 1) {
  cards.push(Mock.mock({
    panelId: Mock.Random.guid(),
    panelTitle: Mock.Random.title(),
    panelIcon: Mock.Random.image(),
    /* 0: 允许, 1: 不允许 */
    enableRefresh: Mock.Random.integer(0, 1),
    refreshUrl: '',
    /* 0: 允许, 1: 不允许 */
    enableMax: Mock.Random.integer(0, 1),
    panelContent: {
      /* 0: 有TAB, 1: 没有TAB */
      showInTab: Mock.Random.integer(0, 1),
      /* 0: 圆点, 1: 文字 */
      tabStyle: Mock.Random.integer(0, 1),
      content: [],
    },
  }));
  /* 装载card内部(是否有tab, tab的样式) */
  if (cards[i].panelContent.showInTab === 0) {
    /* 在tab中显示 */
    tabSize = Mock.Random.integer(1, 4);
  } else {
    /* 不在tab中显示 */
    tabSize = 1;
  }

  const panelContent = cards[i].panelContent;
  for (let k = 0; k < tabSize; k += 1) {
    contentSize = Mock.Random.integer(1, 5);
    let showSize = 0;
    const resType = resTypeArr[Mock.Random.integer(0, 1)];
    if (i < 3 || i > 5) {
      showSize = 12;
    } else {
      showSize = 8;
    }
    const data = [];
    for (let j = 0; j < contentSize; j += 1) {
      /* 开始生成card的资源 */
      data.push({
        resId: Mock.Random.guid(),
        // resCode : ,
        resName: Mock.Random.title(2, 5),
        resType,
        showSize,
      /* requestUrl : ,
      enable : ,
      enableTodo : ,
      todoUrl : ,
      resIconType : ,
      resFontIcon : ,
      detailId : ,
      panelCode : ,
      tabId : ,
      enableCustom : ,
      showSize : */
      });
    }
    let tabName;
    if (panelContent.showInTab === 0 && panelContent.tabStyle === 1) {
      tabName = Mock.Random.title();
    } else {
      tabName = '';
    }
    /* 将最内层数据装载到card内部 */
    panelContent.content.push({
      tabName,
      data,
    });
  }
}

for (let i = 0, j = -1; i < cards.length; i += 1) {
  if (i % 3 === 0) {
    groupCards.push([]);
    j += 1;
  }
  groupCards[j].push(cards[i]);
}

export default groupCards;
