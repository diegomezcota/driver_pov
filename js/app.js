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
camera.position.set(0, 11, 72);
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
points.push(new THREE.Vector3(-40, 0, 60));
points.push(new THREE.Vector3(0, 0, -100));
points.push(new THREE.Vector3(40, 0, 60));
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(lineGeometry, lineMaterial);
scene.add(line);

const skyboxGeo = new THREE.BoxGeometry(500, 500, 500);
var skyMaterials = [
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../textures/TropicalSunnyDay_nx.jpg"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../textures/TropicalSunnyDay_px.jpg"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../textures/TropicalSunnyDay_py.jpg"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../textures/TropicalSunnyDay_ny.jpg"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../textures/TropicalSunnyDay_nz.jpg"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../textures/TropicalSunnyDay_pz.jpg"),
    side: THREE.DoubleSide
  })
];
var skyMaterial = new THREE.MeshFaceMaterial(skyMaterials);
var skyCube = new THREE.Mesh(skyboxGeo, skyMaterial);
scene.add(skyCube);

const roadGeometry = new THREE.BoxGeometry(400, 0, 500);
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x444447 });
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.position.y = -10;
scene.add(road);

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

// Luz volante
const luz_volante = new THREE.PointLight(0xffffff, 0.4);
luz_volante.position.set(-10, 17, 60);
scene.add(luz_volante);

// DRIVING WHEEL
var driving_wheel;

var mtlLoader = new THREE.MTLLoader();
mtlLoader.load("../Objects/Steering_Wheel/Steering_Wheel.mtl", function(
  materials
) {
  materials.preload();
  // Load the object
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load("../Objects/Steering_Wheel/Steering_Wheel.obj", function(
    object
  ) {
    scene.add(object);
    object.position.x = 0;
    object.position.y = 5;
    object.position.z = 59;

    object.rotation.x = 0;
    object.rotation.y = 0;
    object.rotation.z = 0;
    driving_wheel = object;
  });
});

// Car
var car;
var car_velocity = 1;
var mtlLoader = new THREE.MTLLoader();
mtlLoader.load("../Objects/Car/Car.mtl", function(materials) {
  materials.preload();
  // Load the object
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load("../Objects/Car/Car.obj", function(object) {
    scene.add(object);

    object.position.x = -3;
    object.position.y = 0;
    object.position.z = 60;

    object.rotation.x = 0;
    object.rotation.y = 0;
    object.rotation.z = 0;
    car = object;
  });
});

// Street lines
const geometrySL = new THREE.BoxGeometry(1, 1, 20);
const materialSL = new THREE.MeshBasicMaterial({ color: 0xfaed27 });
const streetLine = new THREE.Mesh(geometrySL, materialSL);
streetLine.position.set(0, 0, -170);
scene.add(streetLine);

// TRAFFIC LAMP LIGHTS
const light1 = new THREE.PointLight(0x1f51ff, 0.7);
light1.position.set(10, 10, 10);
scene.add(light1);

const light2 = new THREE.PointLight(0xfff9d8, 0.7);
light2.position.set(-10, 10, 10);
scene.add(light2);

var lampReferences = {};
const LEFT_LAMP_ROTATION = 600;
// TRAFFIC LAMP
var createTrafficLamp = (x, z, rotation, id) => {
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.load("../Objects/Lamp/Lamp.mtl", materials => {
    materials.preload();
    // Load traffic lamp
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load("../Objects/Lamp/Lamp.obj", object => {
      scene.add(object);

      object.position.x = x;
      object.position.y = 0;
      object.position.z = z;

      object.rotation.x = 0;
      object.rotation.y = rotation;
      object.rotation.z = 0;

      lampReferences[id] = object;
    });
  });
};

const LAMP_STARTING_X = 30;
createTrafficLamp(LAMP_STARTING_X, -150, 0, "lamp1");
createTrafficLamp(-LAMP_STARTING_X, -200, LEFT_LAMP_ROTATION, "lamp2");
createTrafficLamp(LAMP_STARTING_X, -250, 0, "lamp3");
createTrafficLamp(-LAMP_STARTING_X, -300, LEFT_LAMP_ROTATION, "lamp4");
createTrafficLamp(LAMP_STARTING_X, -350, 0, "lamp5");
createTrafficLamp(-LAMP_STARTING_X, -400, LEFT_LAMP_ROTATION, "lamp6");
createTrafficLamp(LAMP_STARTING_X, -450, 0, "lamp7");
createTrafficLamp(-LAMP_STARTING_X, -500, LEFT_LAMP_ROTATION, "lamp8");
createTrafficLamp(LAMP_STARTING_X, -550, 0, "lamp9");
createTrafficLamp(-LAMP_STARTING_X, -600, LEFT_LAMP_ROTATION, "lamp10");

var treeReferences = {};
// TREE
const createTree = (x, z, id) => {
  var treeObj;
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.load("../Objects/Tree_1/Tree_1.mtl", function(materials) {
    materials.preload();
    // Load the object
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load("../Objects/Tree_1/Tree_1.obj", function(object) {
      scene.add(object);

      object.position.x = x;
      object.position.y = 0;
      object.position.z = z;

      object.rotation.x = 0;
      object.rotation.y = 0;
      object.rotation.z = 0;
      treeReferences[id] = object;
      treeObj = object;
    });
  });

  return treeObj;
};

// STREET TEXTURE
const streetTexture = new THREE.TextureLoader().load("textures/road.jpeg");
streetTexture.wrapS = THREE.RepeatWrapping;
streetTexture.wrapT = THREE.RepeatWrapping;
streetTexture.repeat.set(2, 2);
const streetSideTexture = new THREE.TextureLoader().load(
  "textures/pasto_soccer_2.jpg"
);
streetSideTexture.wrapS = THREE.RepeatWrapping;
streetSideTexture.wrapT = THREE.RepeatWrapping;
streetSideTexture.repeat.set(20, 25);

// STREET CREATION
const streetGeometry2 = new THREE.BoxGeometry(50, 0, 1000);
console.log(streetTexture);
const streetMaterial2 = new THREE.MeshBasicMaterial({ map: streetTexture });
const streetPlane2 = new THREE.Mesh(streetGeometry2, streetMaterial2);
streetPlane2.position.y = -2.35;
scene.add(streetPlane2);

// STREET RIGHT SIDE
const rightSideGeometry = new THREE.BoxGeometry(100, 4.5, 1000);
const rightSideMaterial = new THREE.MeshBasicMaterial({
  map: streetSideTexture
});
const rightSidePlane = new THREE.Mesh(rightSideGeometry, rightSideMaterial);
rightSidePlane.position.x = 75;
rightSidePlane.position.y = -2.35;
scene.add(rightSidePlane);

// STREET LEFT SIDE
const leftSideGeometry = new THREE.BoxGeometry(100, 4.5, 1000);
const leftSideMaterial = new THREE.MeshBasicMaterial({
  map: streetSideTexture
});
const leftSidePlane = new THREE.Mesh(leftSideGeometry, leftSideMaterial);
leftSidePlane.position.x = -75;
leftSidePlane.position.y = -2.35;
scene.add(leftSidePlane);

const THREE_STARTING_POINT = 50;
createTree(-THREE_STARTING_POINT, -150, "arbol1");
createTree(THREE_STARTING_POINT, -200, "arbol2");
createTree(-THREE_STARTING_POINT, -250, "arbol3");
createTree(THREE_STARTING_POINT, -300, "arbol4");
createTree(-THREE_STARTING_POINT, -350, "arbol5");
createTree(THREE_STARTING_POINT, -400, "arbol6");
createTree(-THREE_STARTING_POINT, -450, "arbol7");
createTree(THREE_STARTING_POINT, -500, "arbol8");
createTree(-THREE_STARTING_POINT, -550, "arbol9");
createTree(THREE_STARTING_POINT, -600, "arbol10");

// ANIMATE TRAFFIC LINES
const animateLines = line => {
  if (line.position.z >= 20) {
    line.position.y = 0;
    line.position.z = 0;
  } else {
    line.position.z += 0.07 * car_velocity;
  }
};

// ANIMATE STREET LIGHTS
const animateLight = (light, side) => {
  if (light.position.z > 100) {
    if (side < 0) {
      light.position.y = 10;
      light.position.x = 10;
      light.position.z = -20;
    } else {
      light.position.y = 10;
      light.position.x = -10;
      light.position.z = -20;
    }
  } else {
    if (side < 0) {
      light.position.z += 0.05 * car_velocity;
    } else {
      light.position.z += 0.05 * car_velocity;
    }
  }
};

// TREE ANIMATION
function animateTree(t, side) {
  if (t === undefined) {
    return;
  }
  // Check if already passed car
  if (t.position.z > 60) {
    // t.position.x = THREE_STARTING_POINT * side;
    t.position.z = -400;
  }
  // LEFT SIDE TREE
  // if (side == -1) {
  //   t.position.x -= 0.09;
  // }
  // // RIGHT SIDE TREE
  // if (side == 1) {
  //   t.position.x += 0.09;
  // }
  t.position.z += 0.5 * car_velocity;
}

// LAMP ANIMATION
function animateStreetLamp(lamp, side) {
  if (lamp === undefined) {
    return;
  }
  if (lamp.position.z > 60) {
    // lamp.position.x = LAMP_STARTING_X * side;
    lamp.position.z = -400;
  }
  // // left side lamp
  // if (side == -1) {
  //   lamp.position.x -= 0.09;
  // }
  // // right side lamp
  // if (side == 1) {
  //   lamp.position.x += 0.09;
  // }
  lamp.position.z += 0.5 * car_velocity;
}

function animateStreetLines(line) {
  line.position.z += 1;
}

// ANIMATE
const animate = function() {
  requestAnimationFrame(animate);

  animateLines(dashedLine1);

  animateLight(light1, -1);
  animateLight(light2, 1);
  // Trees
  animateTree(treeReferences["arbol1"], -1);
  animateTree(treeReferences["arbol2"], 1);
  animateTree(treeReferences["arbol3"], -1);
  animateTree(treeReferences["arbol4"], 1);
  animateTree(treeReferences["arbol5"], -1);
  animateTree(treeReferences["arbol6"], 1);
  animateTree(treeReferences["arbol7"], -1);
  animateTree(treeReferences["arbol8"], 1);
  animateTree(treeReferences["arbol9"], -1);
  animateTree(treeReferences["arbol10"], 1);
  // Street lamps
  animateStreetLamp(lampReferences["lamp1"], 1);
  animateStreetLamp(lampReferences["lamp2"], -1);
  animateStreetLamp(lampReferences["lamp3"], 1);
  animateStreetLamp(lampReferences["lamp4"], -1);
  animateStreetLamp(lampReferences["lamp5"], 1);
  animateStreetLamp(lampReferences["lamp6"], -1);
  animateStreetLamp(lampReferences["lamp7"], 1);
  animateStreetLamp(lampReferences["lamp8"], -1);
  animateStreetLamp(lampReferences["lamp9"], 1);
  animateStreetLamp(lampReferences["lamp10"], -1);

  animateLines(streetLine);
  renderer.render(scene, camera);
};

animate();

// DRIVING WHEEL MOVEMENT
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  var keyCode = event.which;
  if (keyCode == 37) {
    driving_wheel.rotation.z += 0.05;
  } else if (keyCode == 39) {
    driving_wheel.rotation.z -= 0.05;
  }
}

// ACCELERATION
document.addEventListener("keyup", event => {
  var keyCode = event.code;
  if (keyCode === "ArrowUp") {
    car_velocity *= 1.1;
  }
});

// DESACCELERATION
document.addEventListener("keyup", event => {
  var keyCode = event.code;
  if (keyCode === "ArrowDown") {
    console.log("b selected");
    car_velocity /= 1.1;
  }
});

// MUSIC
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener);

// create a global audio source
const sound = new THREE.Audio(listener);

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load("sounds/cancion2.mp3", function(buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
  sound.play();
});
