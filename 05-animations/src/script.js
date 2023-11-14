import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();

//   gsap.fromTo(mesh.position, { x: 2 }, { x: -2 });

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // update objects
  mesh.rotation.y += 0.02;

  //   mesh.position.y = Math.sin(elapsedTime);
  //   mesh.position.x = Math.cos(elapsedTime);

  //   mesh.rotation.y += 0.1;
  //   mesh.position.x -= 0.01;
  //   mesh.position.y += 0.01;

  // animating camera, looking at mesh.

  // rerender
  renderer.render(scene, camera);

  /**
   * requestAnimationFrame runs the function passed in on the next frame e.g. 60FPS
   */
  window.requestAnimationFrame(tick);
};

tick();
