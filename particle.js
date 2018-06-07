import Vec from 'vecmath'

const { Vector2 } = Vec

export class Particle {
  constructor(x, y, vx, vy) {
    this.age = 0
    this.lifespan = Math.random() * 6
    this.position = new Vector2(x, y)
    this.velocity = new Vector2(vx, vy)
    this.speed = new Vector2(this.lifespan, this.lifespan)
  }

  push(x, y) {
    this.velocity.add(new Vector2(x, y))
    this.velocity.normalize()
  }

  tick() {
    let speed = this.velocity.clone().multiply(this.speed)
    this.position.add(speed)
    this.age += this.lifespan
  }

  reset(width, height) {
    let x = width / 2 - Math.random() * 10
    let y = height / 2 - Math.random() * 10

    this.age = 0
    this.lifespan = Math.random() * 5
    this.velocity.set(0, 0)
    this.position.set(x, y)
  }

  get dead() {
    return this.age > 50
  }

  get x() {
    return this.position.x
  }

  get y() {
    return this.position.y
  }
}
