/*
 * @Description: 控制器扩展，修改缩放中心
 * @Author: liaojingping
 * @Date: 2024-06-28 09:37:09
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-28 10:34:27
 */
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

class Controls extends TrackballControls {
  constructor(object, domElement) {
    super(object, domElement);
    domElement.addEventListener('wheel', this.onMouseWheel.bind(this), false);
  }

  dispose() {
    this.domElement.removeEventListener('wheel', this.onMouseWheel.bind(this), false);
    super.dispose();
  }

  onMouseWheel(event) {}
}

export { Controls };


