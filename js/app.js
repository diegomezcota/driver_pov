// npm install --save three

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, // Field of view (In Degrees)
  window.innerWidth / window.innerHeight, // Aspect Ratio
  0.1, // Near Clipping plane
  1000 // Far Clipping plane
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(); // Object that contains all vertices and faces of the cube
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material); // Mesh takes an object and applies a material to it.

scene.add(cube); // Adds cube to scene, on coordinates (0,0,0) by default.

camera.position.z = 5;

const animate = function() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
