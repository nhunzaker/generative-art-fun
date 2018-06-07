import SimplexNoise from 'simplex-noise'
import loop from 'raf-loop'
import { Particle } from './particle'
import vec2 from 'gl-vec2'

let simplex = new SimplexNoise()
let canvas = document.getElementById('canvas')
let dpr = window.devicePixelRatio
let width = window.innerWidth
let height = window.innerHeight
let ctx = canvas.getContext('2d')
let particles = []
let rotation = 0.01

canvas.width = width * dpr
canvas.height = height * dpr
canvas.style.width = width + 'px'
canvas.style.height = height + 'px'

while (particles.length < 1000) {
  let x = width / 2 - Math.random() * 10
  let y = height / 2 - Math.random() * 10

  particles.push(new Particle(x, y))
}

ctx.scale(dpr, dpr)

let render = loop(() => {
  rotation += 0.01

  ctx.fillStyle = 'rgba(255, 255, 255, 0.07)'
  ctx.fillRect(0, 0, width, height)
  ctx.save()
  particles.forEach(pixel => {
    let noise = simplex.noise3D(pixel.x, pixel.y, rotation)
    let angle = noise * Math.PI * 2

    ctx.strokeStyle = '#33f'
    ctx.lineWidth = 1.1 + Math.cos(pixel.age)
    ctx.beginPath()
    ctx.moveTo(pixel.x, pixel.y)

    pixel.push(Math.cos(angle), Math.sin(angle))
    pixel.tick()

    ctx.lineTo(pixel.x, pixel.y)

    ctx.stroke()
    ctx.closePath()

    if (pixel.dead) {
      pixel.reset(width, height)
    }
  })
  ctx.restore()
})

render.start()

if (module.hot) {
  module.hot.dispose(() => render.stop())
}
