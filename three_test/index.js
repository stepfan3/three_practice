import './style.css'
import * as THREE from 'three'
import Sphere from './modules/_sphere';

import resize from './modules/_resize';

const canvas = document.querySelector(".canvas");

const scene = new THREE.Scene();
const sphere = new Sphere(scene);
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / innerHeight,
  0.1,
  1000
);
camera.position.set(0,0,500);

//平行光源
let directionalLight = new THREE.DirectionalLight(0xffffff,2);
directionalLight.position.set(1,1,1);
scene.add(directionalLight);

//レンダリング
const renderer = new THREE.WebGLRenderer({
  canvas:canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene,camera);

window.addEventListener('resize',_ =>{
  resize(scene,camera,renderer);
});

const mouse = new THREE.Vector2();
canvas.addEventListener('mousemove',handleMouseMove);
function handleMouseMove(event) {
  const element = event.currentTarget;
  const x = event.clientX - element.offsetLeft;
  const y = event.clientY - element.offsetTop;
  const w = element.offsetWidth;
  const h = element.offsetHeight;

  mouse.x = (x/w) * 2 - 1;
  mouse.y = (y/h) * 2 - 1;
}
const raycaster = new THREE.Raycaster();

tick();

function tick() {
  raycaster.setFromCamera(mouse,camera);

  const intersects = raycaster.intersectObjects(scene.children);
  if(intersects.length > 0) {
    canvas.style.cursor = 'pointer';
  }else {
    canvas.style.cursor = 'default';
  }
  renderer.render(scene,camera);
  requestAnimationFrame(tick)
}