/*
 * @Author: liaojp liaojp@citycloud.com.cn
 * @Date: 2024-07-25 17:17:02
 * @LastEditors: liaojp liaojp@citycloud.com.cn
 * @LastEditTime: 2024-07-25 17:42:52
 * @FilePath: /new_screen-master/src/pages/login/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader';
import * as THREE from 'three';


export default function ThreeBase() {
  let scene: { background: any; add: (arg0: any) => void; }, camera: { position: { set: (arg0: number, arg1: number, arg2: number) => void; }; }, renderer: { setSize: (arg0: number, arg1: number) => void; domElement: any; setClearColor: (arg0: number, arg1: number) => void; render: (arg0: { background: any; add: (arg0: any) => void; }, arg1: { position: { set: (arg0: number, arg1: number, arg2: number) => void; }; }) => void; };
  useEffect(() => {
    threeStart();
  }, []);

  const initThree = () => {
    const width: any = document.getElementById('threeMain')?.clientWidth;
    const height: any = document.getElementById('threeMain')?.clientHeight;
    renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(width, height);
    document.getElementById('threeMain')?.appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);
  };

  const initCamera = () => {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(26, - 40, 5);
  };

  const initScene = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfd1e5);
  };

  const initLight = () => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 6);
    directionalLight.position.set(0, 0, 2);
    scene.add(directionalLight);
  };

  const initObject = () => {
    THREE.Object3D.DEFAULT_UP.set(0, 0, 1);
    const loader = new Rhino3dmLoader();
    loader.setLibraryPath('libs/rhino3dm/');
    loader.load('test.3dm', function (object: any) {
      scene.add(object);
    },
      function () { },
      function (error: any) {
        console.log('3dm模型加载异常', error);
      });
  };

  function initControl() {
    new OrbitControls(camera, renderer.domElement);
  }

  function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initControl();
    initObject();
    animation();
  }
  function animation() {
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
  }
  return (
    <div id="threeMain" style={{ width: '100%', height: '100vh' }} />
  );
}