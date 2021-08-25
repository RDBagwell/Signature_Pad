const saveSig = document.getElementById('saveSig');
const clearBTN = document.getElementById('clear')
const by = document.getElementById('by')
const sigDiv = document.getElementById('sigDiv');
const currentSize = 1;
const bucketColor = '#FFFFFF';
const currentColor = '#000000';
const canvasHeight = 100;

let isMouseDown = false;



// Global Variables
const canvas = document.createElement('canvas');
canvas.id = 'canvas'
const context = canvas.getContext('2d');

function createCanvas() {
    canvas.height = canvasHeight;
    context.fillStyle = bucketColor;
    context.fillRect(0,0, canvas.width, canvas.height);
    sigDiv.appendChild(canvas);
}

// Get Mouse Position
function getMousePosition(event) {
    const boundaries = canvas.getBoundingClientRect();
    return {
        x: event.clientX - boundaries.left,
        y: event.clientY - boundaries.top,
    };
}

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
    const rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

// Mouse Down
canvas.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    const currentPosition = getMousePosition(event);
    context.moveTo(currentPosition.x, currentPosition.y);
    context.beginPath();
    context.lineWidth = currentSize;
    context.lineCap = 'round';
    context.strokeStyle = currentColor;
});

canvas.addEventListener("touchstart", function (event) {
    if (event.target == canvas) {
        event.preventDefault();
    }
    mousePos = getTouchPos(canvas, event);
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

// Mouse Move
canvas.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        const currentPosition = getMousePosition(event);
        context.lineTo(currentPosition.x, currentPosition.y);
        context.stroke();

    }
});

canvas.addEventListener("touchmove", function (event) {
    if (event.target == canvas) {
        event.preventDefault();
    }
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

// Mouse Up
canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
});

canvas.addEventListener("touchend", function (event) {
    if (event.target == canvas) {
        event.preventDefault();
    }
    const mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
}, false);

clearBTN.addEventListener('click', ()=>{
    createCanvas();
});

// save signature
saveSig.addEventListener('click', () => {
    const imageURI = canvas.toDataURL();
    const imgSig = document.getElementById("preview");
    imgSig.src = imageURI;
    imgSig.style.display = "block";
    canvas.style.display = "none";
    saveSig.style.display = "none";
    clearBTN.style.display = "none";
    by.value = imageURI;
});
createCanvas()