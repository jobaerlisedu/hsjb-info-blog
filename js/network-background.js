import * as THREE from 'three';

const canvas = document.getElementById('network-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Binary Flow Configuration
const columnCount = 50;
const digitsPerColumn = 15;
const binDigits = [];

// Create Dynamic Textures for 0 and 1
function createTextTexture(char, color) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.font = 'Bold 48px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(char, 32, 32);
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}


const tex0Blue = createTextTexture('0', '#2196f3');
const tex1Blue = createTextTexture('1', '#2196f3');
const tex0DarkBlue = createTextTexture('0', '#1976d2');
const tex1DarkBlue = createTextTexture('1', '#1976d2');

const textures = [tex0Blue, tex1Blue, tex0DarkBlue, tex1DarkBlue];

// Create streaming columns
for (let i = 0; i < columnCount; i++) {
    const x = (Math.random() - 0.5) * 40;
    const z = (Math.random() - 0.5) * 15;
    const speed = Math.random() * 0.05 + 0.02;

    for (let j = 0; j < digitsPerColumn; j++) {
        const texture = textures[Math.floor(Math.random() * textures.length)];
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.8 });
        const sprite = new THREE.Sprite(material);

        const y = (Math.random() - 0.5) * 20;
        sprite.position.set(x, y, z);
        sprite.scale.set(0.5, 0.5, 1);

        sprite.userData = {
            speed: speed,
            initialX: x,
            z: z,
            flipTimer: Math.random() * 2
        };

        scene.add(sprite);
        binDigits.push(sprite);
    }
}

// Mouse interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.002;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.002;
});

// Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

camera.position.z = 15;

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    binDigits.forEach(digit => {
        // Move downwards
        digit.position.y -= digit.userData.speed;

        // Wrap around
        if (digit.position.y < -12) {
            digit.position.y = 12;
        }

        // Randomly flip between 0 and 1
        digit.userData.flipTimer -= delta;
        if (digit.userData.flipTimer <= 0) {
            const isLightBlue = digit.material.map === tex0Blue || digit.material.map === tex1Blue;
            if (isLightBlue) {
                digit.material.map = Math.random() > 0.5 ? tex0Blue : tex1Blue;
            } else {
                digit.material.map = Math.random() > 0.5 ? tex0DarkBlue : tex1DarkBlue;
            }
            digit.userData.flipTimer = Math.random() * 2 + 1;
        }

        // Parallax effect
        digit.position.x = digit.userData.initialX + mouseX * (digit.userData.z * 0.5);
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
