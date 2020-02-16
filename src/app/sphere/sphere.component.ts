import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
import ThreeGlobe from 'three-globe';
import {countriesData} from 'src/assets/counties'; 

// declare const THREE: any;
@Component({
  selector: 'app-sphere',
  templateUrl: './sphere.component.html',
  styleUrls: ['./sphere.component.scss'],
})
export class SphereComponent implements OnInit {
  // @ViewChild('rendererContainer', { 'static': false }) rendererContainer: ElementRef;

  // renderer = new THREE.WebGLRenderer({ alpha: true });
  // scene = null;
  // camera = null;
  // mesh = null;
  // controls = null;

  constructor() {
    // this.scene = new THREE.Scene();
    // this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // window.addEventListener('resize', () => {
    //   this.renderer.setSize(window.innerWidth, window.innerHeight);
    //   // this.camera.aspect = window.innerWidth / window.innerHeight;
    //   this.createMesh();
    // })
  }

  ngOnInit() {
    const gData = countriesData.map((data) => ({
      lat: data.latlng[0],
      lng: data.latlng[1],
      name: data.name,
      color: '#8b9ca3'
    }));
    // console.log()
    // `(${Math.round(d.lat * 1e2) / 1e2}, ${Math.round(d.lng * 1e2) / 1e2})`
// https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg
    const Globe = new ThreeGlobe()
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
      .labelsData(gData)
      .labelText(d => d.name)
      .labelSize(0.5)
      .labelDotRadius(d => 1 / 5)
      .labelColor('color');

    // Setup renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('globeViz').appendChild(renderer.domElement);

    // Setup scene
    const scene = new THREE.Scene();
    scene.add(Globe);
    scene.add(new THREE.AmbientLight(0xbbbbbb));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

    // Setup camera
    const camera = new THREE.PerspectiveCamera();
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    camera.position.z = 500;

    // Add camera controls
    const tbControls = new OrbitControls(camera, renderer.domElement);
    tbControls.minDistance = 101;
    tbControls.rotateSpeed = 5;
    tbControls.zoomSpeed = 0.8;

    // Kick-off renderer
    (function animate() { // IIFE
      // Frame cycle
      tbControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    })();
   }


  // ngAfterViewInit() {
  //   this.configCamera();
  //   this.configRenderer();
  //   this.configControls();

  //   this.createMesh();

  //   this.animate();
  // }

  // configCamera() {
  //   this.camera.position.set(200, 300, 1);
  // }

  // configRenderer() {
  //   this.renderer.setPixelRatio(window.devicePixelRatio);
  //   this.renderer.setClearColor(new THREE.Color("hsl(0, 0%, 10%)"));
  //   this.renderer.setSize(window.innerWidth, window.innerHeight);
  //   this.renderer.domElement.style.display = "block";
  //   this.renderer.domElement.style.margin = "auto";
  //   this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  // }

  // configControls() {
  //   this.controls.autoRotate = true;
  //   this.controls.enableZoom = false;
  //   this.controls.enablePan = false;
  //   this.controls.update();
  // }

  // createMesh() {
  //   // const geometry = new THREE.BoxGeometry(200, 200, 200);
  //   // const material = new THREE.MeshBasicMaterial({ color: 0xff7f50 });
  //   // this.mesh = new THREE.Mesh(geometry, material);

  //   // this.scene.add(this.mesh);
  //   // console.log(window.innerWidth)
  //   // var geometry = new THREE.SphereBufferGeometry(window.innerWidth/4,32,32,0,6.3,6,6.3);
  //   // var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  //   // var sphere = new THREE.Mesh(geometry, material);
  //   // this.scene.add(sphere);

  //   const myGlobe = new ThreeGlobe();
  //     // .globeImageUrl(<imageUrl>)
  //     // .pointsData(<myData>);

  //   // const myScene = new THREE.Scene();
  //   this.scene.add(myGlobe);
  // }

  // animate() {
  //   window.requestAnimationFrame(() => this.animate());
  //   this.controls.update();
  //   this.renderer.render(this.scene, this.camera);
  // }

}
