/**
 * 计算微震事件传感器大屏展示尺寸
 * @param {*} argu 能量
 * @returns
 */
function getSize(argu) {
  if (argu >= 10000) {
    return 100
  }
  if (argu >= 100 || argu < 10000) {
    return Math.ceil(Math.ceil(argu) / 100)
  }
  if (argu < 100) {
    return 10
  }
}

/**
 * 计算微震事件传感器大屏展示颜色
 * @param {*} argu 震级
 * @returns
 */
function getColor(argu) {
  if (argu <= 1) {
    return { r: 0, g: 0, b: 255 }
  }
  if (argu > 1 && argu <= 2) {
    // 每个区间颜色取值分为100份
    const r = Math.ceil(Math.ceil((argu - 1).toFixed(2) * 100) * (255 / 100))
    const g = Math.ceil(Math.ceil((argu - 1).toFixed(2) * 100) * (255 / 100))
    const b = Math.ceil(
      255 - Math.ceil(Math.ceil((argu - 1).toFixed(2) * 100)) * (255 / 100)
    )
    return { r, g, b }
  }
  if (argu > 2 && argu <= 3) {
    const r = 255
    const g = Math.ceil(255 - Math.ceil((argu - 2).toFixed(2) * 100) * ((255 - 165) / 100))
    const b = 0
    return { r, g, b }
  }
  if (argu > 3 && argu <= 4) {
    const r = 255
    const g = Math.ceil(165 - Math.ceil((argu - 3).toFixed(2) * 100) * (165 / 100))
    const b = 0
    return { r, g, b }
  }
  if (argu > 4) {
    return { r: 255, g: 0, b: 0 }
  }
}

export { getSize, getColor }
