// 相机初始值
window.near = 0.1
window.far = 50000
window.fov = 50

// 水文测点大小，修改 x 和 y
window.meshPoint = { x: 120, y: 120, z: 1 }

// 水文设备大小，修改 x 和 y
window.meshEquip = { x: 120, y: 120, z: 1 }

// 电法主机大小，修改 x 和 y
window.meshHost = { x: 120, y: 120, z: 1 }

// 取样点大小，修改 x 和 y
window.meshSample = { x: 120, y: 120, z: 1 }

// 微震大小比例，修改 x 和 y 和 z，以1为基准，0.5为正常大小的一半
window.quakeSample = { x: 0.5, y: 0.5, z: 0.5 }

// 跳转矿井大屏图标大小，修改 x 和 y
window.locationMesh = { x: 120, y: 120, z: 1 }


window.sysTitle = '隐蔽致灾信息透明化管控平台' // 登录页大标题
window.smallTitle = '隐蔽致灾信息透明化管控平台' // 登录页标签小标题
window.previewTitle = '隐蔽致灾信息透明化管控平台' // 预览页标签小标题
window.listTitle = '隐蔽致灾信息透明化管控平台' // 列表页标签小标题
window.configTitle = '隐蔽致灾信息透明化管控平台' // 配置页标签小标题
window.menuTitle = '隐蔽致灾信息透明化管控平台' // 左侧菜单小标题


// 子系统控件相关设置
window.sysName = {
  warnControl: '预警管控',
  waterWatch: '水文监测',
  waterBasic: '水文基础',
  rockWatch: '岩移监测',
  shakeWatch: '微震监测',
  eleWatch: '电法监测',
  qa: '水质水源',
  pressureWatch: '矿压监测',
  digitalScreen: '数智大屏',
  threeModel: '三维建模',
  docManage: '文档管理',
  sysManage: '系统管理',
  excQuake: '随掘地震',
  excElectrical: '随掘电法'
}

window.sysUrl = {
  // warnControl: ':8008/iotBgWeb/?token=',
  warnControl: ':8014/#/dashboard?token=',
  waterWatch: ':8002/KJ418/index.html?',
  waterBasic: ':8006/#/welcome?token=',
  rockWatch: ':8011/#/transfer/?outentrance&',
  shakeWatch: ':8008/microseism/index.html?',
  eleWatch: ':8003/waterRisk/main.html?outentrance&',
  qa: ':8004/waterPro/index.html?outentrance&',
  pressureWatch: ':8012/#/transfer/?outentrance&',
  digitalScreen: '数智大屏',
  threeModel: ':8009/#/transfer/?outentrance&',
  docManage: ':8010/?user/index&loginToken=',
  sysManage: ':8005/#/transfer/?outentrance&',
  excQuake: ':8015/#/transfer/?outentrance&',
  excElectrical: ':8016/#/transfer/?outentrance&'
}

window.chartPermission = {
  text: true,
  text1: true,
  text2: true,
  text3: true,
  text4: true,
  text5: true,
  image: true,
  image1: true,
  image2: true,
  table: true,
  table1: true,
  line: true,
  line1: true,
  line2: true,
  line3: true,
  line4: true,
  line5: true,
  line6: true,
  line7: true,
  line8: true,
  bar: true,
  bar1: true,
  bar2: true,
  bar3: true,
  bar4: true,
  bar5: true,
  bar6: true,
  bar7: true,
  bar8: true,
  bar9: true,
  bar10: true,
  bar11: true,
  bar12: true,
  bar13: true,
  bar14: true,
  bar15: true,
  pie: true,
  pie1: true,
  pie2: true,
  pie3: true,
  pie4: true,
  radar: true,
  radar1: true,
  radar2: true,
  funnel: true,
  funnel1: true,
  scatter: true,
  wordCloud: true,
  border: true,
  borderPublic: true,
  border1: true,
  border2: true,
  border3: true,
  border4: true,
  border4R: true,
  border5: true,
  border5R: true,
  border6: true,
  border7: true,
  border8: true,
  border8R: true,
  border9: true,
  border10: true,
  border11: true,
  border12: true,
  border13: true,
  other: true,
  screen: true,
  control: true,
  mixLineBar: true,
  guage: true,
  guage1: true,
  guage2: true,
  guage3: true,
  guage4: true,
  decoration: true,
  decoration1: true,
  decoration2: true,
  decoration2r: true,
  decoration3: true,
  decoration4: true,
  decoration4r: true,
  decoration5: true,
  decoration6: true,
  decoration8: true,
  decoration8r: true,
  decoration9: true,
  decoration10: true,
  decoration11: true
}