import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.122.0/examples/jsm/controls/OrbitControls.js";
//import { OBJLoader } from "./loaders/obj_loader.js";
//import { MTLLoader } from "./loaders/mtl_loader.js";

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

// ORBIT CONTROLS
var controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 2;
controls.maxDistance = 500;
controls.update();

// WINDOW RESIZE
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});

// Lineas
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x8533ff });
const points = [];
points.push(new THREE.Vector3(-60, 0, 60));
points.push(new THREE.Vector3(0, 0, 0));
points.push(new THREE.Vector3(60, 0, 60));
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(lineGeometry, lineMaterial);
scene.add(line);

const skyboxGeo = new THREE.BoxGeometry(300, 300, 300);
var skyMaterials = [
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../textures/skybox2_nx.jpg"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../textures/skybox2_nx.jpg"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../textures/skybox2_nx.jpg"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../textures/skybox2_nx.jpg"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../textures/skybox2_nx.jpg"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../textures/skybox2_nx.jpg"),
    side: THREE.DoubleSide
  })
];
var skyMaterial = new THREE.MeshFaceMaterial(skyMaterials);
var skyCube = new THREE.Mesh(skyboxGeo, skyMaterial);
scene.add(skyCube);

/*
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
*/

// Volante
/*
const geometryVolante = new THREE.TorusGeometry(10, 1, 8, 50);
const materialVolante = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const torus = new THREE.Mesh(geometryVolante, materialVolante);
torus.position.x = -10;
torus.position.y = -15;
torus.position.z = 40;
const geometryVolante2 = new THREE.TorusGeometry(2, 2, 8, 50);
const torus2 = new THREE.Mesh(geometryVolante2, materialVolante);
torus2.position.set(-10, -15, 40);
const cubeGeometry5 = new THREE.BoxGeometry(20, 2, 2);
const cube5 = new THREE.Mesh(cubeGeometry5, materialVolante);
cube5.position.set(-10, -15, 40);
const cubeGeometry6 = new THREE.BoxGeometry(2, 10, 2);
const cube6 = new THREE.Mesh(cubeGeometry6, materialVolante);
cube6.position.set(-10, -20, 40);
const geometryAudi = new THREE.TorusGeometry(0.7, 0.1, 4, 50);
const materialAudi = new THREE.MeshBasicMaterial({ color: 0x000000 });
const audi1 = new THREE.Mesh(geometryAudi, materialAudi);
audi1.position.set(-10, -10.5, 50);
const audi2 = new THREE.Mesh(geometryAudi, materialAudi);
audi2.position.set(-9, -10.5, 50);
const audi3 = new THREE.Mesh(geometryAudi, materialAudi);
audi3.position.set(-8, -10.5, 50);
const audi4 = new THREE.Mesh(geometryAudi, materialAudi);
audi4.position.set(-7, -10.5, 50);
const volante = new THREE.Group();
volante.add(torus);
volante.add(torus2);
volante.add(cube5);
volante.add(cube6);
volante.add(audi1);
volante.add(audi2);
volante.add(audi3);
volante.add(audi4);
scene.add(volante);


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

*/
// Arbol
var stemGeometry = new THREE.BoxGeometry(10, 20, 10);
var stemMaterial = new THREE.MeshBasicMaterial({ color: 0x7d5a4f });
var stem = new THREE.Mesh(stemGeometry, stemMaterial);
stem.position.set(0, 0, 0);
var leafGeometry = new THREE.BoxGeometry(25, 15, 15);
var leafMaterial = new THREE.MeshBasicMaterial({ color: 0xa2ff7a });
var leaf1 = new THREE.Mesh(leafGeometry, leafMaterial);
leaf1.position.set(0, 10, 0);
var leaf2 = new THREE.Mesh(leafGeometry, leafMaterial);
leaf2.position.set(0, 25, 0);
var leaf3 = new THREE.Mesh(leafGeometry, leafMaterial);
leaf3.position.set(8, 15, 5);
var leaf4 = new THREE.Mesh(leafGeometry, leafMaterial);
leaf4.position.set(-8, 20, 5);
const tree = new THREE.Group();
tree.add(stem);
tree.add(leaf1);
tree.add(leaf2);
tree.add(leaf3);
tree.add(leaf4);
tree.scale.set(0.5, 0.5, 0.5);
tree.position.set(45, 2, 10);
tree.rotation.y = 50;
scene.add(tree);

// DIEGOMEZ
// SIGNO CALLE
const ROAD_SIGN_Z = -30;
// Cuadro verde 1
for (let i = 0; i < 3; i++) {
  const signoGeometry = new THREE.BoxGeometry(25 / 1.8, 10, 1);
  const signoMaterial = new THREE.MeshBasicMaterial({ color: 0x008f39 });
  const signo = new THREE.Mesh(signoGeometry, signoMaterial);
  signo.position.set(-15 + 15 * i, 20, ROAD_SIGN_Z + 0.5);
  //cuadrosVerdes.push(signo)
  scene.add(signo);
}
// Poste izquierdo
const POSTE_IZQUIERDO_COORDS = [-22.1, 12.5, ROAD_SIGN_Z];
const signoPosteIzquierdoGeometry = new THREE.BoxGeometry(1, 28, 1);
const signoPosteIzquierdoMaterial = new THREE.MeshBasicMaterial({
  color: "rgb(222, 255, 234)"
});
const signoPosteIzquierdo = new THREE.Mesh(
  signoPosteIzquierdoGeometry,
  signoPosteIzquierdoMaterial
);
signoPosteIzquierdo.position.set(
  POSTE_IZQUIERDO_COORDS[0],
  POSTE_IZQUIERDO_COORDS[1],
  POSTE_IZQUIERDO_COORDS[2]
);
scene.add(signoPosteIzquierdo);
// Poste derecho
const POSTE_DERECHO_COORDS = [22.1, 12.5, ROAD_SIGN_Z];
const signoPosteDerechoGeometry = new THREE.BoxGeometry(1, 28, 1);
const signoPosteDerechoMaterial = new THREE.MeshBasicMaterial({
  color: "rgb(222, 255, 234)"
});
const signoPosteDerecho = new THREE.Mesh(
  signoPosteDerechoGeometry,
  signoPosteDerechoMaterial
);
signoPosteDerecho.position.set(
  POSTE_DERECHO_COORDS[0],
  POSTE_DERECHO_COORDS[1],
  POSTE_DERECHO_COORDS[2]
);
scene.add(signoPosteDerecho);
// Poste abajo
const POSTE_ABAJO_COORDS = [0, 15, ROAD_SIGN_Z];
const signoPosteAbajoGeometry = new THREE.BoxGeometry(45, 1, 1);
const signoPosteAbajoMaterial = new THREE.MeshBasicMaterial({
  color: "rgb(222, 255, 234)"
});
const signoPosteAbajo = new THREE.Mesh(
  signoPosteAbajoGeometry,
  signoPosteAbajoMaterial
);
signoPosteAbajo.position.set(
  POSTE_ABAJO_COORDS[0],
  POSTE_ABAJO_COORDS[1],
  POSTE_ABAJO_COORDS[2]
);
scene.add(signoPosteAbajo);
// Poste arriba
const POSTE_ARRIBA_COORDS = [0, 25, ROAD_SIGN_Z];
const signoPosteArribaGeometry = new THREE.BoxGeometry(45, 1, 1);
const signoPosteArribaMaterial = new THREE.MeshBasicMaterial({
  color: "rgb(222, 255, 234)"
});
const signoPosteArriba = new THREE.Mesh(
  signoPosteArribaGeometry,
  signoPosteArribaMaterial
);
signoPosteArriba.position.set(
  POSTE_ARRIBA_COORDS[0],
  POSTE_ARRIBA_COORDS[1],
  POSTE_ARRIBA_COORDS[2]
);
scene.add(signoPosteArriba);
// NUBES
const NUBE_RADIUS = 4;
// NUBE IZQUIERDA
const NUBE_IZQUIERDA_INITIAL_COORDS = [-40, 20, 0];
for (let i = 0; i < 15; i++) {
  const nubeIzquierdaGeometry = new THREE.SphereGeometry(
    NUBE_RADIUS * Math.random() + 0.3,
    32,
    16
  );
  const nubeIzquierdaMaterial = new THREE.MeshBasicMaterial({
    color: "rgb(217, 215, 210)"
  });
  const nubeIzquierdaSphere = new THREE.Mesh(
    nubeIzquierdaGeometry,
    nubeIzquierdaMaterial
  );
  nubeIzquierdaSphere.position.set(
    NUBE_IZQUIERDA_INITIAL_COORDS[0] + NUBE_RADIUS * 2 * Math.random(),
    NUBE_IZQUIERDA_INITIAL_COORDS[1] + NUBE_RADIUS * 2 * Math.random(),
    NUBE_IZQUIERDA_INITIAL_COORDS[2]
  );
  scene.add(nubeIzquierdaSphere);
}
// NUBE DERECHA
const NUBE_DERECHA_INITIAL_COORDS = [40, 20, 0];
for (let i = 0; i < 15; i++) {
  const nubeDerechaGeometry = new THREE.SphereGeometry(
    NUBE_RADIUS * Math.random() + 0.3,
    32,
    16
  );
  const nubeDerechaMaterial = new THREE.MeshBasicMaterial({
    color: "rgb(217, 215, 210)"
  });
  const nubeDerechaSphere = new THREE.Mesh(
    nubeDerechaGeometry,
    nubeDerechaMaterial
  );
  nubeDerechaSphere.position.set(
    NUBE_DERECHA_INITIAL_COORDS[0] + NUBE_RADIUS * 2 * Math.random(),
    NUBE_DERECHA_INITIAL_COORDS[1] + NUBE_RADIUS * 2 * Math.random(),
    NUBE_DERECHA_INITIAL_COORDS[2]
  );
  scene.add(nubeDerechaSphere);
}

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

// Luz volante
const luz_volante = new THREE.PointLight(0xffffff, 1);
luz_volante.position.set(-10, -17, 40);
scene.add(luz_volante);

// DRIVING WHEEL
var driving_wheel;

var mtlLoader = new THREE.MTLLoader();
mtlLoader.load("../Objects/Driving_Wheel/Driving_Wheel.mtl", function(
  materials
) {
  materials.preload();
  // Load the object
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath("/Objects/Driving_Wheel/");
  objLoader.load("Driving_Wheel.obj", function(object) {
    scene.add(object);
    object.position.x = -10;
    object.position.y = -17;
    object.position.z = 35;

    object.rotation.x = -5;
    object.rotation.y = 5.2;
    object.rotation.z = 0;
    driving_wheel = object;
  });
});

// Car
var car;
var mtlLoader = new THREE.MTLLoader();
mtlLoader.load("../Objects/Convertible/Convertible.mtl", function(materials) {
  materials.preload();
  // Load the object
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load("../Objects/Convertible/Convertible.obj", function(object) {
    scene.add(object);

    object.position.x = 17;
    object.position.y = -40;
    object.position.z = 47;

    object.rotation.x = 0;
    object.rotation.y = 0;
    object.rotation.z = 0;
    car = object;
  });
});

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

// Animate
const animate = function() {
  requestAnimationFrame(animate);

  animateLines(dashedLine1);

  animateLight(light1, -1);
  animateLight(light2, 1);

  renderer.render(scene, camera);
};

animate();
