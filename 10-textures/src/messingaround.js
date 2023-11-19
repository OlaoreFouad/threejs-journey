import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

const textureImageUrls = {
  fouad: {
    name: "Fouad",
    image: "/textures/door/fouad.jpeg",
  },
  ify: {
    name: "Ify",
    image: "/textures/door/ify.png",
  },
};
const dNames = Object.keys(textureImageUrls).map(
  (urlKey) => textureImageUrls[urlKey].name
);
const textureLoader = new THREE.TextureLoader();
const imageTexture = textureLoader.load(textureImageUrls.fouad.image);
imageTexture.colorSpace = THREE.SRGBColorSpace;

// repeating.
imageTexture.repeat.x = 2;
imageTexture.repeat.y = 3;
imageTexture.wrapS = THREE.RepeatWrapping;
imageTexture.wrapT = THREE.RepeatWrapping;

const scene = new THREE.Scene();

const gui = new GUI();
const repeatMetricsGui = gui.addFolder("Repeat Metrics");
const repeatMetrics = {
  countX: 2,
  countY: 3,
  selectedTexture: textureImageUrls.fouad.name,
};

repeatMetricsGui
  .add(repeatMetrics, "countX")
  .min(1)
  .max(5)
  .step(1)
  .name("Count X")
  .onFinishChange((newCountX) => {
    material.map.repeat.x = newCountX;
  });

repeatMetricsGui
  .add(repeatMetrics, "countY")
  .min(1)
  .max(10)
  .step(1)
  .name("Count Y")
  .onFinishChange((newCountY) => {
    material.map.repeat.y = newCountY;
  });

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  map: imageTexture,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

repeatMetricsGui
  .add(repeatMetrics, "selectedTexture", dNames)
  .onFinishChange((newName) => {
    const selectedTextureKey = Object.keys(textureImageUrls).find(
      (key) => textureImageUrls[key].name === newName
    );
    const selectedTexture = textureImageUrls[selectedTextureKey];
    const newTexture = textureLoader.load(selectedTexture.image);
    newTexture.colorSpace = THREE.SRGBColorSpace;
    newTexture.repeat.x = repeatMetrics.countX;
    newTexture.repeat.y = repeatMetrics.countY;
    newTexture.wrapS = THREE.RepeatWrapping;
    newTexture.wrapT = THREE.RepeatWrapping;

    material.map = newTexture;
  });

const fov = 75;
const camera = new THREE.PerspectiveCamera(
  fov,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// orbit controls.
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// resizing.
window.addEventListener("resize", (evt) => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
});

const tick = () => {
  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
