import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.122.0/examples/jsm/controls/OrbitControls.js";

// Create scene
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio); //
document.body.appendChild(renderer.domElement);

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 10, 100);
camera.lookAt(0, 0, 0);

// Axes helper
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);
// X -> RED
// Y -> GREEN
// Z -> BLUE

var controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 2;
controls.maxDistance = 500;
controls.update();

// Lineas
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x8533ff });
const points = [];
points.push(new THREE.Vector3(-60, 0, 60));
points.push(new THREE.Vector3(0, 0, 0));
points.push(new THREE.Vector3(60, 0, 60));
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(lineGeometry, lineMaterial);
scene.add(line);

// cubo verde neon
const cubeGeometry = new THREE.BoxGeometry(150, 40, 10);
const subeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, subeMaterial);
cube.position.x = 20;
cube.position.y = -35;
scene.add(cube);

// cubo rojo
const cubeGeometry2 = new THREE.BoxGeometry(40, 40, 10);
const subeMaterial2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube2 = new THREE.Mesh(cubeGeometry2, subeMaterial2);
cube2.rotation.y = 11;
cube2.position.x = -60;
cube2.position.y = -37;
scene.add(cube2);

// cubo azul
const cubeGeometry3 = new THREE.BoxGeometry(80, 8, 8);
const subeMaterial3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cube3 = new THREE.Mesh(cubeGeometry3, subeMaterial3);
cube3.rotation.y = 5;
cube3.rotation.x = 2;
cube3.position.x = -60;
scene.add(cube3);

// Calle
const streetMaterial = new THREE.MeshBasicMaterial({
  // Phong
  color: 0x006666,
  side: THREE.DoubleSide
});

var streetPoints = [
  new THREE.Vector3(-60, 0, 30),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(60, 0, 30)
];
const streetGeo = new THREE.ShapeBufferGeometry(new THREE.Shape(streetPoints));
const street = new THREE.Mesh(streetGeo, streetMaterial);
scene.add(street);

// Lineas trafico
const dashedLineMaterial = new THREE.LineDashedMaterial({
  color: 0xffffff,
  linewidth: 10,
  scale: 4,
  dashSize: 20,
  gapSize: 10
});

const dashedPoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 25)];
const dashedLineGeometry = new THREE.BufferGeometry().setFromPoints(
  dashedPoints
);
const dashedLine1 = new THREE.Line(dashedLineGeometry, dashedLineMaterial);

dashedLine1.computeLineDistances();
scene.add(dashedLine1);

// Luz faro
const light1 = new THREE.PointLight(0x1f51ff, 0.7);
light1.position.set(10, 10, 10);
scene.add(light1);

const light2 = new THREE.PointLight(0xfff9d8, 0.7);
light2.position.set(-10, 10, 10);
scene.add(light2);

// DRIVING WHEEL

// Animate
const animate = function() {
  requestAnimationFrame(animate);

  animateLines(dashedLine1);

  animateLight(light1, -1);
  animateLight(light2, 1);

  renderer.render(scene, camera);
};

const animateLines = line => {
  if (line.position.z >= 20) {
    line.position.y = 0;
    line.position.z = 0;
  } else {
    line.position.z += 0.07;
  }
};

const animateLight = (light, side) => {
  if (light.position.y <= -35) {
    if (side < 0) {
      light.position.y = 10;
      light.position.x = 10;
    } else {
      light.position.y = 10;
      light.position.x = -10;
    }
  } else {
    if (side < 0) {
      light.position.y -= 0.05;
      light.position.x += 0.05;
    } else {
      light.position.y -= 0.05;
      light.position.x -= 0.05;
    }
  }
};

animate();
