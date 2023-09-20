import './style.css';
// import './wp.html'
import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const canvas = document.querySelector('canvas.webgl');
const cursorCircle = document.querySelector('.cursor-circle');

const navbarDetailsLink = document.querySelector('.navbar-right li:first-child a');
const detailsDiv = document.querySelector('.details');

navbarDetailsLink.addEventListener('click', () => {
    detailsDiv.classList.toggle('hidden');
});

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0.18, 0.145, 0.18);
scene.add(camera);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('draco/');
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const spotLight = new THREE.AmbientLight(0xffffff);
spotLight.position.set(1, 1, 0);
scene.add(spotLight);

const newSpotLight = new THREE.DirectionalLight(0xffffff);
newSpotLight.position.set(0, 1, 0);
scene.add(newSpotLight);

const groundGeometry = new THREE.PlaneGeometry(500, 500, 1, 1);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x4D4855,
    roughness: 0.1,
    metalness: 0.9
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = Math.PI * -0.5;
scene.add(ground);

const circularPlatformRadius = 0.22;
const circularPlatformHeight = 0.01;
const circularPlatformGeometry = new THREE.CylinderGeometry(
    circularPlatformRadius, circularPlatformRadius, circularPlatformHeight, 64
);
const circularPlatformMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff, 
    roughness: 0.5,
    metalness: 0.5
});
const circularPlatform = new THREE.Mesh(circularPlatformGeometry, circularPlatformMaterial);
circularPlatform.position.y = circularPlatformHeight / 2;
scene.add(circularPlatform);


let car;
gltfLoader.load('plane.glb', (gltf) => {
    car = gltf.scene;
    scene.add(car);
});

const cursor = { x: 0, y: 0 };
window.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    cursorCircle.style.left = `${x}px`;
    cursorCircle.style.top = `${y}px`;
});

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

const controls = new OrbitControls(camera, canvas);

window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const sphereMarkerMaterial = new THREE.MeshBasicMaterial({ color: 0x00aff00, opacity: 0.0, transparent: true });
const rectangleMarkerMaterial = new THREE.MeshBasicMaterial({ color: 0x000000,  opacity: 0.0, transparent: true});
const wheelMarkerMaterial = new THREE.MeshBasicMaterial({ color: 0x000000,  opacity: 0.0, transparent: true});
const doorMarkerMaterial = new THREE.MeshBasicMaterial({ color: 0xfff000,  opacity: 0.0, transparent: true});
const windowMarkerMaterial = new THREE.MeshBasicMaterial({ color: 0xffff0,  opacity: 0.0, transparent: true});

const sphereMarkerPosition = new THREE.Vector3(0.001, 0.03, 0.095);
const Headlight1MarkerPosition = new THREE.Vector3(0.045, 0.052, 0.129);
const Headlight2MarkerPosition = new THREE.Vector3(-0.045, 0.052, 0.129);
const Wheel1MarkerPosition = new THREE.Vector3(0.05, 0.04, 0.09);
const Wheel2MarkerPosition = new THREE.Vector3(-0.045, 0.04, 0.09);
const Wheel3MarkerPosition = new THREE.Vector3(0.045, 0.04, -0.1);
const Wheel4MarkerPosition = new THREE.Vector3(-0.045, 0.04, -0.1);
const door1MarkerPosition = new THREE.Vector3(0.062, 0.05, -0.01);
const door2MarkerPosition = new THREE.Vector3(-0.062, 0.05, -0.01);
const window1MarkerPosition = new THREE.Vector3(0.062, 0.085, -0.01);
const window2MarkerPosition = new THREE.Vector3(0, 0.085, 0.04);
const window3MarkerPosition = new THREE.Vector3(-0.062, 0.085, -0.01);



const interactiveParts = [
    {
        name: 'Hood',
        description: 'Hood\n\nThis is the hinged cover over the engine of any motor vehicles. A hood may contain: \n\nHood ornament: Used to symbolize car companies\n Air dam: Used to allow airflow directly into the engine\n Windshield wipers: Used to remove rain, snow, dirt, etc. \n\nThe hood release system is common on most vehicles and usually consists of an interior hood latch handle, hood release cable and hood latch assembly. The hood latch handle is usually located below the steering wheel, beside the driver seat or set into the door frame. On race cars, the hood may be held down by hood pins.',
        marker: createSphereMarker(sphereMarkerMaterial, sphereMarkerPosition),
    },
    {
        name: 'Headlight1',
        description: 'Headlamp\n\nA headlamp is a lamp attached to the front of a vehicle to illuminate the road ahead. Headlamps are also often called headlights, however, headlamp is the term for the device itself and headlight is the term for the beam of light produced and distributed by the device.\n\nHeadlamps have steadily improved throughout the automobile age, and have made a big difference in daytime and night-time traffic fatalities. Excluding cars, vehicles such as trains and aircrafts are required to have headlamps. Bicycle headlamps are often used on bicycles, and can be powered by a battery or a small generator like a bottle or hub dynamo.',
        marker: createRectangleMarker(rectangleMarkerMaterial, Headlight1MarkerPosition),
    },
    {
        name: 'Headlight2',
        description: 'Headlamp\n\nA headlamp is a lamp attached to the front of a vehicle to illuminate the road ahead. Headlamps are also often called headlights, however, headlamp is the term for the device itself and headlight is the term for the beam of light produced and distributed by the device.\n\nHeadlamps have steadily improved throughout the automobile age, and have made a big difference in daytime and night-time traffic fatalities. Excluding cars, vehicles such as trains and aircrafts are required to have headlamps. Bicycle headlamps are often used on bicycles, and can be powered by a battery or a small generator like a bottle or hub dynamo.',
        marker: createRectangleMarker(rectangleMarkerMaterial, Headlight2MarkerPosition),
    },
    {
        name: 'Tire1',
        description: 'Tire/Tyre\n\n It is a ring-shaped component that surrounds a wheels rim to transfer a vehicles load from the axle through the wheel to the ground and to provide traction on the surface over which the wheel travels. \n\nModern pneumatic tires are made with synthetic rubber, natural rubber, fabric, and wire along with carbon black and other chemical compounds. Pneumatic tires are used in vehicles such as cars, motorcycles, bicycles, buses, aircrafts, etc, whereas Metal tires are used in trains and railcars. \n\nModern Tires are based on "Pacejka Magic Formula":\n\n1) Balance\n2) Centrifugal Growth\n3) Pneumatic trail\n4) Slip angle\n5) Relaxation length\n6) Spring rate\n7) Stopping distance',
        marker: createNewSphereMarker(wheelMarkerMaterial, Wheel1MarkerPosition),
    },
    {
        name: 'Tire2',
        description: 'Tire/Tyre\n\n It is a ring-shaped component that surrounds a wheels rim to transfer a vehicles load from the axle through the wheel to the ground and to provide traction on the surface over which the wheel travels. \n\nModern pneumatic tires are made with synthetic rubber, natural rubber, fabric, and wire along with carbon black and other chemical compounds. Pneumatic tires are used in vehicles such as cars, motorcycles, bicycles, buses, aircrafts, etc, whereas Metal tires are used in trains and railcars. \n\nModern Tires are based on "Pacejka Magic Formula":\n\n1) Balance\n2) Centrifugal Growth\n3) Pneumatic trail\n4) Slip angle\n5) Relaxation length\n6) Spring rate\n7) Stopping distance',
        marker: createNewSphereMarker(wheelMarkerMaterial, Wheel2MarkerPosition),
    },
    {
        name: 'Tire3',
        description: 'Tire/Tyre\n\n It is a ring-shaped component that surrounds a wheels rim to transfer a vehicles load from the axle through the wheel to the ground and to provide traction on the surface over which the wheel travels. \n\nModern pneumatic tires are made with synthetic rubber, natural rubber, fabric, and wire along with carbon black and other chemical compounds. Pneumatic tires are used in vehicles such as cars, motorcycles, bicycles, buses, aircrafts, etc, whereas Metal tires are used in trains and railcars. \n\nModern Tires are based on "Pacejka Magic Formula":\n\n1) Balance\n2) Centrifugal Growth\n3) Pneumatic trail\n4) Slip angle\n5) Relaxation length\n6) Spring rate\n7) Stopping distance',
        marker: createNewSphereMarker(wheelMarkerMaterial, Wheel3MarkerPosition),
    },
    {
        name: 'Tire4',
        description: 'Tire/Tyre\n\n It is a ring-shaped component that surrounds a wheels rim to transfer a vehicles load from the axle through the wheel to the ground and to provide traction on the surface over which the wheel travels. \n\nModern pneumatic tires are made with synthetic rubber, natural rubber, fabric, and wire along with carbon black and other chemical compounds. Pneumatic tires are used in vehicles such as cars, motorcycles, bicycles, buses, aircrafts, etc, whereas Metal tires are used in trains and railcars. \n\nModern Tires are based on "Pacejka Magic Formula":\n\n1) Balance\n2) Centrifugal Growth\n3) Pneumatic trail\n4) Slip angle\n5) Relaxation length\n6) Spring rate\n7) Stopping distance',
        marker: createNewSphereMarker(wheelMarkerMaterial, Wheel4MarkerPosition),
    },
    {
        name: 'Door1',
        description: 'Door\n\n A car door is a type of door opening, typically hinged on its front edge, but sometimes attached by other mechanisms such as tracks, for entering and exiting a vehicle. Doors most often integrate side windows for visibility from inside the car and can be locked to secure the vehicle. \n\nCar doors may be manually operated or with power assist supplied by the vehicle. Powered doors or power doors may be found on minivans, luxury vehicles, or modified cars. The different parts of a car door are: \n\nDoor panel: It is the exterior of the door which covers the internal components.\nDoor handle: It is a handle used to open or close a door.\nPower door locks: It allows the driver to lock/unlock a car door using a button or a switch.\nInterior storage components: It allows the driver or passengers to store different things.',
        marker: createBoxMaterialMarker(doorMarkerMaterial, door1MarkerPosition),
    },
    {
        name: 'Door2',
        description: 'Door\n\n A car door is a type of door opening, typically hinged on its front edge, but sometimes attached by other mechanisms such as tracks, for entering and exiting a vehicle. Doors most often integrate side windows for visibility from inside the car and can be locked to secure the vehicle. \n\nCar doors may be manually operated or with power assist supplied by the vehicle. Powered doors or power doors may be found on minivans, luxury vehicles, or modified cars. The different parts of a car door are: \n\nDoor panel: It is the exterior of the door which covers the internal components.\nDoor handle: It is a handle used to open or close a door.\nPower door locks: It allows the driver to lock/unlock a car door using a button or a switch.\nInterior storage components: It allows the driver or passengers to store different things.',
        marker: createBoxMaterialMarker(doorMarkerMaterial, door2MarkerPosition),
    },
    {
        name: 'Window1',
        description: 'Window\n\nVehicle window includes windscreens, side and rear windows, and glass panel roofs.\n\nWindscreen: It is the front window which provides visibility while protecting the driver and passengers from debris and other elements.\nSide and rear windows: They are the windows placed on the side and rear of a vehicle. They can be raised or lowered using a hand-turned crank(old vehicles) or a button or a switch(modern vehicles).\nGlass panel roof: It is placed at the top of a car, as a sunroof or a moonroof. In modern vehicles, the panel roof can be retracted to let sun rays enter the vehicle. ',
        marker: createWindow1MaterialMarker(windowMarkerMaterial, window1MarkerPosition),
    },
    {
        name: 'Window2',
        description: 'Window\n\nVehicle window includes windscreens, side and rear windows, and glass panel roofs.\n\nWindscreen: It is the front window which provides visibility while protecting the driver and passengers from debris and other elements.\nSide and rear windows: They are the windows placed on the side and rear of a vehicle. They can be raised or lowered using a hand-turned crank(old vehicles) or a button or a switch(modern vehicles).\nGlass panel roof: It is placed at the top of a car, as a sunroof or a moonroof. In modern vehicles, the panel roof can be retracted to let sun rays enter the vehicle. ',
        marker: createWindow2MaterialMarker(windowMarkerMaterial, window2MarkerPosition),
    },
    {
        name: 'Window3',
        description: 'Window\n\nVehicle window includes windscreens, side and rear windows, and glass panel roofs.\n\nWindscreen: It is the front window which provides visibility while protecting the driver and passengers from debris and other elements.\nSide and rear windows: They are the windows placed on the side and rear of a vehicle. They can be raised or lowered using a hand-turned crank(old vehicles) or a button or a switch(modern vehicles).\nGlass panel roof: It is placed at the top of a car, as a sunroof or a moonroof. In modern vehicles, the panel roof can be retracted to let sun rays enter the vehicle. ',
        marker: createWindow1MaterialMarker(windowMarkerMaterial, window3MarkerPosition),
    },
];

function createSphereMarker(material, position) {
    const markerGeometry = new THREE.SphereGeometry(0.06, 64, 64, Math.PI, Math.PI);
    const marker = new THREE.Mesh(markerGeometry, material);
    marker.rotation.x = Math.PI / 2; 
    marker.position.copy(position);
    scene.add(marker);
    return marker;
}

function createRectangleMarker(material, position) {
    const markerGeometry = new THREE.SphereGeometry(0.01, 32, 32); 
    const marker = new THREE.Mesh(markerGeometry, material);
    marker.position.copy(position);
    scene.add(marker);
    return marker;
}

function createNewSphereMarker(material, position) {
    const markerGeometry = new THREE.SphereGeometry(0.024, 45, 45); 
    const marker = new THREE.Mesh(markerGeometry, material);
    marker.position.copy(position);
    scene.add(marker);
    return marker;
}

function createBoxMaterialMarker(material, position) {
    const markerGeometry = new THREE.BoxGeometry(0.09, 0.04, 0.005);
    const marker = new THREE.Mesh(markerGeometry, material);
    marker.rotateY(Math.PI / 2); 
    marker.position.copy(position);
    scene.add(marker);
    return marker;
}

function createWindow1MaterialMarker(material, position) {
    const markerGeometry = new THREE.BoxGeometry(0.06, 0.03, 0.004);
    const marker = new THREE.Mesh(markerGeometry, material);
    marker.rotateY(Math.PI / 2); 
    marker.position.copy(position);
    scene.add(marker);
    return marker;
}

function createWindow2MaterialMarker(material, position) {
    const markerGeometry = new THREE.BoxGeometry(0.05, 0.03, 0.005);
    const marker = new THREE.Mesh(markerGeometry, material);
    // marker.rotateY(Math.PI / 2); 
    marker.position.copy(position);
    scene.add(marker);
    return marker;
}

window.addEventListener('click', onClick);

function onClick(event) {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(
        interactiveParts.map((part) => part.marker)
    );

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        const clickedPart = interactiveParts.find(
            (part) => part.marker === clickedObject
        );

        if (clickedPart) {
            showInformation(clickedPart.description);
        }
    }
}

let isUIVisible = false;

function showInformation(text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);

    window.addEventListener('click', () => {
        document.body.removeChild(tooltip);

    });
    
}

const detailLines = [];

const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 10 });

const points1 = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 1, 1), 
    new THREE.Vector3(0.1, 0.1, 0.05),
];

const points2 = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 0, 0), 
];

points1.forEach((point) => {
    point.y -= 0; 
});

points2.forEach((point) => {
    point.y -= 0.2;
});

const lineGeometry1 = new THREE.BufferGeometry().setFromPoints(points1);
const lineGeometry2 = new THREE.BufferGeometry().setFromPoints(points2);

const line1 = new THREE.Line(lineGeometry1, lineMaterial);
line1.visible = false;
scene.add(line1);
detailLines.push(line1);

const line2 = new THREE.Line(lineGeometry2, lineMaterial);
line2.visible = false;
scene.add(line2);
detailLines.push(line2);

function toggleDetailLines() {
    const isVisible = detailLines[0].visible;

    detailLines.forEach((line) => {
        line.visible = !isVisible;
    });
}

// const detailsButton = document.querySelector('.navbar-right li:first-child a');

// detailsButton.addEventListener('click', () => {
//     toggleDetailLines();
// });

// STARS

const starPositions = [];

const numStars = 1000; 

for (let i = 0; i < numStars; i++) {
    
    const x = Math.random() * 2000 - 1000; 
    const y = Math.random() * 2000 - 1000;
    const z = Math.random() * 2000 - 1000;

    starPositions.push({ x, y, z });
}

const starSpheres = [];

const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); 

for (const position of starPositions) {
    const starGeometry = new THREE.SphereGeometry(1, 16, 16); 
    const starSphere = new THREE.Mesh(starGeometry, starMaterial);

    starSphere.position.set(position.x, position.y, position.z);

    starSpheres.push(starSphere);
    scene.add(starSphere);
}

starSpheres.forEach((starSphere) => {
    starSphere.renderOrder = -1;
});

// CONTROLS

const keyboard = {
    ArrowUp: false,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowDown: false
};

const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') keyboard.w = true;
    if (event.key === 'ArrowLeft') keyboard.a = true;
    if (event.key === 'ArrowRight') keyboard.d = true;
    if (event.key === 'ArrowDown') keyboard.s = true;
};

const handleKeyUp = (event) => {
    if (event.key === 'ArrowUp') keyboard.w = false;
    if (event.key === 'ArrowLeft') keyboard.a = false;
    if (event.key === 'ArrowRight') keyboard.d = false;
    if (event.key === 'ArrowDown') keyboard.s = false;
};

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

window.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        resetCameraPosition();
    }
});

function resetCameraPosition() {
    camera.position.set(0.18, 0.145, 0.18);
}

const animate = () => {
    const rotationSpeed = 0.00043;
    const time = Date.now() * rotationSpeed;

    const cameraDistance = 0.31;
    camera.position.x = Math.cos(time) * cameraDistance;
    camera.position.z = Math.sin(time) * cameraDistance;
    camera.position.y = circularPlatformHeight + 0.12;
    camera.lookAt(circularPlatform.position);

    if (keyboard.w) {
        camera.position.copy(car.position);
        camera.position.y += 0.31; 
        camera.lookAt(car.position);
        car.rotation.y += Math.PI * 2; 
    } 
    if (keyboard.a) {
        camera.position.copy(car.position);
        camera.position.x += 0.31; 
        camera.position.y = 0.12; 
        camera.lookAt(car.position); 
    }
    if (keyboard.d) {
        camera.position.copy(car.position);
        camera.position.x -= 0.31; 
        camera.position.y = 0.12; 
        camera.lookAt(car.position); 
    }
    if (keyboard.s) {
        camera.position.copy(car.position);
        camera.lookAt(car.position);
        camera.position.y = 0.1; 
        camera.position.z += 0.37; 
    }

    renderer.render(scene, camera);
    controls.update();

    requestAnimationFrame(animate);
}

animate();

const glowLight = new THREE.AmbientLight(0x1F2022); 
scene.add(glowLight);

window.addEventListener('keydown', (event) => {
    if (event.key === 'c' || event.key === 'C') {

        const randomColor = Math.random() * 0xffffff;

        glowLight.color.set(randomColor);
    }
});

// Define initial car exterior color
// let currentCarExteriorColor = 0xff0000; // Red

// Event listener for 'C' key press
window.addEventListener('keydown', (event) => {
    if (event.key === 'r' || event.key === 'R') {

        const randomColor = 0x1F2022;

        glowLight.color.set(randomColor);

    }
});
