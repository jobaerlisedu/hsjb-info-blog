import * as THREE from 'three';

const canvas = document.getElementById('network-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 100; // Adjust for density
const posArray = new Float32Array(particlesCount * 3);
const velocityArray = new Float32Array(particlesCount * 3); // For movement

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15; // Spread
    velocityArray[i] = (Math.random() - 0.5) * 0.005; // Speed
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const material = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x1ba0d7,
    transparent: true,
    opacity: 0.8,
});

const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

// Lines
const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x7000ff,
    transparent: true,
    opacity: 0.15
});

const linesGeometry = new THREE.BufferGeometry();
const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
scene.add(linesMesh);

// Mouse interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

camera.position.z = 5;

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    const elapsedTime = clock.getElapsedTime();

    // Rotate entire system slightly based on mouse
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.0005;

    particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
    particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

    // Update particles position
    const positions = particlesGeometry.attributes.position.array;

    // Line connections
    const connectDistance = 2.5;
    const linePositions = [];

    // Update individual particle positions
    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;

        // Move particles
        positions[i3] += velocityArray[i3];
        positions[i3 + 1] += velocityArray[i3 + 1];
        positions[i3 + 2] += velocityArray[i3 + 2];

        // Boundary check (bounce back)
        if (positions[i3] > 7 || positions[i3] < -7) velocityArray[i3] = -velocityArray[i3];
        if (positions[i3 + 1] > 7 || positions[i3 + 1] < -7) velocityArray[i3 + 1] = -velocityArray[i3 + 1];
        if (positions[i3 + 2] > 7 || positions[i3 + 2] < -7) velocityArray[i3 + 2] = -velocityArray[i3 + 2];

        // Check connections
        for (let j = i + 1; j < particlesCount; j++) {
            const j3 = j * 3;
            const dx = positions[i3] - positions[j3];
            const dy = positions[i3 + 1] - positions[j3 + 1];
            const dz = positions[i3 + 2] - positions[j3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < connectDistance) {
                linePositions.push(
                    positions[i3], positions[i3 + 1], positions[i3 + 2],
                    positions[j3], positions[j3 + 1], positions[j3 + 2]
                );
            }
        }
    }

    particlesGeometry.attributes.position.needsUpdate = true;

    // Update lines
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));


    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
