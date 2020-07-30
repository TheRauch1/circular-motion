// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

document.addEventListener('touchstart', event => {
    mouse.x = event.targetTouches[0].pageX
    mouse.y = event.targetTouches[0].pageY    
});

addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

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
function Particle(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radians = Math.random() * Math.PI * 2
    this.velocity = 0.02
    this.distanceFromCenter = randomIntFromRange(canvas.width/10, canvas.width/5)
    this.lastMouse = {
        x: this.x, 
        y: this.y
    }

    this.update = function () {
        const lastPoint = {
            x: this.x,
            y: this.y
        }
        // Move points over time
        this.radians += this.velocity

        // Drag effect
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.1
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.1

        // Circular Motion
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter

        // Draw
        this.draw(lastPoint)
    }

    this.draw = function (lastPoint) {
        c.beginPath()
        c.strokeStyle = this.color
        c.lineWidth = this.radius
        c.moveTo(lastPoint.x, lastPoint.y)
        c.lineTo(this.x, this.y)
        c.stroke()
        c.closePath()
    }
}

// Implementation
let particles
function init() {
    particles = []

    for (let i = 0; i < 50; i++) {
        const radius = randomIntFromRange(5, 10)
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
    }

    console.log(canvas.width / 2 + "and" + canvas.height / 2)
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle => {
        particle.update();
    });

   /*  c.beginPath();
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