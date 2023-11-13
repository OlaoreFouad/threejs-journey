import * as THREE from "three";

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const group = new THREE.Group();
scene.add(group);

// create boxes.
const box1 = createBox(0xff0000);
group.add(box1);

const box2 = createBox(0x00ff00);
box2.position.x = -1.25;
group.add(box2);

const box3 = createBox(0x0000ff);
box3.position.x = 1.25;
group.add(box3);

group.scale.y = 2;
group.rotation.x = Math.PI * 0.25;
group.rotation.y = Math.PI * 0.25;

const sizes = {
  width: 800,
  height: 600,
};
const fov = 75;
const camera = new THREE.PerspectiveCamera(fov, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGL1Renderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

function createBox(color) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color,
  });

  return new THREE.Mesh(geometry, material);
}
