import * as THREE from "three";

// Scene
const scene = new THREE.Scene();

// Red box
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "red",
});
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// Camera
const sizes = {
  width: 800,
  height: 600,
};
const fov = 75;
const camera = new THREE.PerspectiveCamera(fov, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
