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

/*
var controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 2;
controls.maxDistance = 500;
controls.update();
*/

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
const cubeGeometry2 = new THREE.BoxGeometry(50, 40, 10);
const subeMaterial2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube2 = new THREE.Mesh(cubeGeometry2, subeMaterial2);
cube2.rotation.y = 11;
cube2.position.x = -60;
cube2.position.y = -38;
cube2.position.z = 10;
scene.add(cube2);

// cubo azul
const cubeGeometry3 = new THREE.BoxGeometry(80, 8, 8);
const subeMaterial3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cube3 = new THREE.Mesh(cubeGeometry3, subeMaterial3);
cube3.rotation.y = 5;
cube3.rotation.x = 2;
cube3.position.x = -60;
scene.add(cube3);

// cubo verde fuerte
const cubeGeometry4 = new THREE.BoxGeometry(50, 10, 5);
const subeMaterial4 = new THREE.MeshBasicMaterial({ color: 0x008f39 });
const cube4 = new THREE.Mesh(cubeGeometry4, subeMaterial4);
cube4.position.x = -10;
cube4.position.y = -15;
cube4.position.z = 30;
scene.add(cube4);

// Volante
const geometryVolante = new THREE.TorusGeometry(10, 1, 8, 50);
const materialVolante = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const torus = new THREE.Mesh(geometryVolante, materialVolante);
torus.position.x = -10;
torus.position.y = -15;
torus.position.z = 40;
scene.add(torus);

// Brazo izquierdo
const geometryBI = new THREE.CylinderGeometry(3, 2, 30, 32);
const materialBI = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
const cylinderBI = new THREE.Mesh(geometryBI, materialBI);
cylinderBI.position.x = -20;
cylinderBI.position.y = -10;
cylinderBI.position.z = 60;
cylinderBI.rotation.x = -30;
scene.add(cylinderBI);

// Mano izquierda
const geometryMI = new THREE.SphereGeometry(3, 32, 16);
const materialMI = new THREE.MeshBasicMaterial({ color: 0xfdddca });
const sphereMI = new THREE.Mesh(geometryMI, materialMI);
sphereMI.position.x = -20;
sphereMI.position.y = -13;
sphereMI.position.z = 40;
scene.add(sphereMI);

// Brazo derecho
const geometryBD = new THREE.CylinderGeometry(2, 3, 30, 32);
const materialBD = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
const cylinderBD = new THREE.Mesh(geometryBD, materialBD);
cylinderBD.position.x = 9;
cylinderBD.position.y = -10;
cylinderBD.position.z = 60;
cylinderBD.rotation.x = -30;
cylinderBD.rotation.z = -10;
scene.add(cylinderBD);

// Mano derecha
const geometryMD = new THREE.SphereGeometry(3, 32, 16);
const materialMD = new THREE.MeshBasicMaterial({ color: 0xfdddca });
const sphereMD = new THREE.Mesh(geometryMD, materialMD);
sphereMD.position.x = -1;
sphereMD.position.y = -14;
sphereMD.position.z = 40;
scene.add(sphereMD);

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
