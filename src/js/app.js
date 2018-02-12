import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);


var camera, controls, scene, renderer, mesh, geometry, dots;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  // scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

  renderer = new THREE.WebGLRenderer();



  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerWidth);

  var container = document.getElementById('container');
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    1,
    3000
  );
  camera.position.z = 200;

  controls = new OrbitControls(camera, renderer.domElement);

  const loader = new THREE.TextureLoader();
  loader.load('img/flower.jpg', function(texture) {
    
    let material = new THREE.PointsMaterial({
      size: 20,
      map: texture,
      alphaTest: 0.5
    });

    geometry = new THREE.Geometry();

    for (let i = 0; i < 50; i++) {
      geometry.vertices.push(new THREE.Vector3(Math.random() * 100, Math.random() * 100, Math.random() * 100));
      
    }

    let pointCloud = new THREE.Points(geometry, material);

    scene.add(pointCloud);

  });

  // do something

}



function render() {
  renderer.render(scene, camera);
}

function animate() {
  render();
  requestAnimationFrame(animate);
}


init();
animate();
