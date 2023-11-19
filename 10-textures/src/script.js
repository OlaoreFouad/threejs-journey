import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Textures
 */

const textureImageUrls = {
  fouad: "/textures/door/fouad.jpeg",
  ify: "/textures/door/ify.png",
  color: "/textures/door/color.jpg",
  height: "/textures/door/height.jpg",
  alpha: "/textures/door/alpha.jpg",
  ambientOcclusion: "/textures/door/ambientOcclusion.jpg",
  metalness: "/textures/door/metalness.jpg",
  normal: "/textures/door/normal.jpg",
  roughness: "/textures/door/roughness.jpg",
};

// manual way of loading textures.
// const image = new Image();
// const texture = new THREE.Texture(image);
// texture.colorSpace = THREE.SRGBColorSpace;
// image.onload = () => {
//   texture.needsUpdate = true;
// };
// image.src = textureImageUrls.door;

// loading managers.
// const loadingManager = new THREE.LoadingManager();
// loadingManager.onStart = () => {
//   console.log("start");
// };
// loadingManager.onLoad = () => {
//   console.log("loaded");
// };
// loadingManager.onError = () => {
//   console.log("start");
// };
// loadingManager.onProgress = () => {
//   console.log("start");
// };

// using texture loader.
const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load(textureImageUrls.color);
const alphaTexture = textureLoader.load(textureImageUrls.alpha);
const heightTexture = textureLoader.load(textureImageUrls.height);
const ambientOcclusionTexture = textureLoader.load(
  textureImageUrls.ambientOcclusion
);
const normalTexture = textureLoader.load(textureImageUrls.normal);
const metalnessTexture = textureLoader.load(textureImageUrls.metalness);
const roughnessTexture = textureLoader.load(textureImageUrls.roughness);
colorTexture.colorSpace = THREE.SRGBColorSpace;

colorTexture.repeat.x = 3;
colorTexture.repeat.y = 3;
colorTexture.wrapS = THREE.RepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(125, 255, 0);

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  map: colorTexture,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
camera.position.z = 1;
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
