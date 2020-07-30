// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const device = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener("devicemotion", event => {
    device.x = event.alpha
    device.y = event.beta
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// Objects
function Stroke(x, y, radius, color, radians) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radians = radians
    this.velocity = 0.005;

    this.update = function () {
        this.radians += this.velocity
        this.distanceFromCenter = this.radius
        this.toX = x + Math.cos(this.radians) * this.distanceFromCenter
        this.toY = y + Math.sin(this.radians) * this.distanceFromCenter
        this.draw()
    }

    this.draw = function () {
        c.beginPath();
        c.moveTo(mouse.x, mouse.y);
        c.lineTo(this.toX, this.toY);
        c.strokeStyle = this.color
        c.stroke()
        
    }

}


// Implementation
let strokes
function init() {
    strokes = []

    for (let i = 0; i < 90; i++) {
        var radians = i*Math.PI/90*2
        strokes.push(new Stroke(canvas.width / 2, canvas.height / 2, 200, randomColor(colors), radians));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    strokes.forEach(stroke => {
        stroke.update();
    });

    /* c.beginPath();
   c.moveTo(canvas.width / 2, 0);
   c.lineTo(canvas.width / 2, canvas.height);
   c.stroke();

   c.beginPath();
   c.moveTo(0, canvas.height / 2);
   c.lineTo(canvas.width, canvas.height / 2);
   c.stroke(); */
}

init()
animate()