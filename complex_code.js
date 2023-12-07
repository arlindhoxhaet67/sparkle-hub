/* complex_code.js */

// This code generates a Mandelbrot fractal image using the HTML5 canvas element.
// It allows zooming and panning interactions, and renders the fractal in high detail.

// Initialize constants
const WIDTH = 800;   // Width of the canvas
const HEIGHT = 800;  // Height of the canvas
const MAX_ITER = 100;  // Maximum number of iterations for escape-checking

// Initialize canvas and context
const canvas = document.createElement('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Initialize variables
let zoom = 0.5;    // Zoom level
let offsetX = 0;   // X-axis offset for panning
let offsetY = 0;   // Y-axis offset for panning

// Define complex number class
class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  square() {
    const real = this.real * this.real - this.imaginary * this.imaginary;
    const imaginary = 2 * this.real * this.imaginary;
    return new ComplexNumber(real, imaginary);
  }

  add(c) {
    const real = this.real + c.real;
    const imaginary = this.imaginary + c.imaginary;
    return new ComplexNumber(real, imaginary);
  }

  modulus() {
    return Math.sqrt(this.real * this.real + this.imaginary * this.imaginary);
  }
}

// Function to map pixel coordinates to complex plane coordinates
function mapToComplexPlane(x, y) {
  const real = (x - WIDTH / 2) / (0.5 * zoom * WIDTH) + offsetX;
  const imaginary = (y - HEIGHT / 2) / (0.5 * zoom * HEIGHT) + offsetY;
  return new ComplexNumber(real, imaginary);
}

// Function to check if a complex number is in the Mandelbrot set
function isInMandelbrotSet(c) {
  let z = new ComplexNumber(0, 0);
  let i = 0;

  while (i < MAX_ITER && z.modulus() < 2) {
    z = z.square().add(c);
    i++;
  }

  return i === MAX_ITER;
}

// Function to render the Mandelbrot set on the canvas
function renderMandelbrotSet() {
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      const c = mapToComplexPlane(x, y);

      if (isInMandelbrotSet(c)) {
        const hue = 360 * (1 - (MAX_ITER / (MAX_ITER + 1)));
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}

// Function to handle mouse wheel event for zooming
function handleMouseWheel(event) {
  const zoomFactor = event.deltaY > 0 ? 1.1 : 1 / 1.1;
  const cursorX = event.clientX - canvas.offsetLeft;
  const cursorY = event.clientY - canvas.offsetTop;
  const newOffsetX = (cursorX / WIDTH - 0.5) / zoom + offsetX;
  const newOffsetY = (cursorY / HEIGHT - 0.5) / zoom + offsetY;
  offsetX = newOffsetX - (newOffsetX - offsetX) * zoomFactor;
  offsetY = newOffsetY - (newOffsetY - offsetY) * zoomFactor;
  zoom *= zoomFactor;

  renderMandelbrotSet();
}

// Function to handle mouse move event for panning
function handleMouseMove(event) {
  if (event.buttons === 1) {
    const deltaX = event.movementX / zoom;
    const deltaY = event.movementY / zoom;
    offsetX -= deltaX;
    offsetY -= deltaY;

    renderMandelbrotSet();
  }
}

// Function to handle touch move event for panning
function handleTouchMove(event) {
  event.preventDefault();
  const touches = event.changedTouches;

  if (touches.length === 1) {
    const touch = touches[0];
    const deltaX = touch.clientX - touch.target.offsetLeft;
    const deltaY = touch.clientY - touch.target.offsetTop;
    const movementX = touch.movementX !== undefined ? touch.movementX : deltaX - lastX;
    const movementY = touch.movementY !== undefined ? touch.movementY : deltaY - lastY;
    offsetX -= movementX / zoom;
    offsetY -= movementY / zoom;
    lastX = deltaX;
    lastY = deltaY;

    renderMandelbrotSet();
  }
}

// Function to handle touch pinch event for zooming
function handleTouchPinch(event) {
  event.preventDefault();
  const touches = event.touches;
  const finger1 = touches[0];
  const finger2 = touches[1];

  const touchDistance = Math.sqrt(
    Math.pow(finger1.clientX - finger2.clientX, 2) +
    Math.pow(finger1.clientY - finger2.clientY, 2)
  );
  
  if (initialTouchDistance !== null) {
    const touchRatio = touchDistance / initialTouchDistance;
    const cursorX = (finger1.clientX + finger2.clientX) / 2 - canvas.offsetLeft;
    const cursorY = (finger1.clientY + finger2.clientY) / 2 - canvas.offsetTop;
    const newOffsetX = (cursorX / WIDTH - 0.5) / zoom + offsetX;
    const newOffsetY = (cursorY / HEIGHT - 0.5) / zoom + offsetY;
    offsetX = newOffsetX - (newOffsetX - offsetX) * touchRatio;
    offsetY = newOffsetY - (newOffsetY - offsetY) * touchRatio;
    zoom *= touchRatio;

    renderMandelbrotSet();
  }
}

// Attach event listeners
canvas.addEventListener('wheel', handleMouseWheel);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchstart', function () {
  initialTouchDistance = null;
});
canvas.addEventListener('touchmove', handleTouchPinch);

// Render the Mandelbrot set initially
renderMandelbrotSet();