const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

// Lineas
const scene = new THREE.Scene();
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push(new THREE.Vector3(-90, -25, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(90, -15, 0));
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

renderer.render(scene, camera);
