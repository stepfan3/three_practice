import * as THREE from 'three'

export default class test {
  constructor(scene) {
    this.scene = scene;
    this.sphere();
  }
  sphere(){
    let ballGeometry = new THREE.SphereGeometry(100,64,32);
    let ballMaterial = new THREE.MeshPhysicalMaterial();
    let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
    this.scene.add(ballMesh);
  }
}