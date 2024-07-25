/*
 * @Description: 轮循屏幕
 * @Author: liaojingping
 * @Date: 2024-01-17 14:12:04
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-01-23 13:50:08
 */
let currentIndex = 0;
let timeoutId = null;
let list = null;
let time = null;
let done = null;

function pollArray() {
  // 检查索引是否超出数组长度
  if (!list || currentIndex >= list.length) {
    // 在这里执行轮询结束后的操作
    console.log('轮询结束');
    clearTimeout(timeoutId);
    startNextPoll(list, time, done);
    return;
  }

  const currentItem = list[currentIndex];
  // 在这里执行每个数组元素的逻辑处理
  done(currentItem);

  // 递增索引
  currentIndex++;

  // 设置定时器，以开始下一个元素的处理
  timeoutId = setTimeout(pollArray, time);
}

function startNextPoll(newList, newTime, callback) {
  // 设置新的轮询参数
  list = newList;
  time = newTime;
  done = callback;

  // 重置索引
  currentIndex = 0;

  // 设置定时器，以开始第一次轮询
  timeoutId = setTimeout(pollArray, time);
}

function stopPoll() {
  clearTimeout(timeoutId);
}

export {
  startNextPoll,
  stopPoll
};