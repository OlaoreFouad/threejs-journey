import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui";

/**
 * Debug UI
 */
const GUI_TOGGLE_KEY = "h";
const gui = new GUI({
  width: 340,
  closeFolders: false,
});
gui.hide();
const debugObj = {};

window.addEventListener("keydown", (evt) => {
  if (evt.key == GUI_TOGGLE_KEY) {
    gui.show(gui._hidden);
  }
});

const cubeSettings = gui.addFolder("Cube Settings");

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

debugObj.color = "#4400ff";

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: debugObj.color,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

cubeSettings
  .add(mesh.position, "y")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("elevation");
cubeSettings.addColor(debugObj, "color").onChange(() => {
  material.color.set(debugObj.color);
});
cubeSettings.add(mesh, "visible");
cubeSettings.add(material, "wireframe");

debugObj.spin = () => {
  gsap.to(mesh.rotation, {
    y: mesh.rotation.y + Math.PI * 2,
  });
};
cubeSettings.add(debugObj, "spin").name("turn on e own");

debugObj.subdivision = 2;
cubeSettings
  .add(debugObj, "subdivision")
  .min(1)
  .max(20)
  .step(1)
  .name("Segments")
  .onFinishChange((newSubdivision) => {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      newSubdivision,
      newSubdivision,
      newSubdivision
    );
  });

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
