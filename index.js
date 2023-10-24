import Matter from "matter-js";
// import Paper from "paper";
// console.log(Paper);

let Engine = Matter.Engine,
	Render = Matter.Render,
	Runner = Matter.Runner,
	MouseConstaint = Matter.MouseConstraint,
	Mouse = Matter.Mouse,
	Composite = Matter.Composite,
	Bodies = Matter.Bodies

class Sketch {
	constructor() {
		this.time = 0
		this.width = window.innerWidth
		this.height = window.innerHeight

		this.physics()
		this.addObjects()

		this.renderLoop()


	}

	physics() {
		this.engine = Engine.create()
		this.world = this.engine.world

		this.render = Render.create({
			element: document.querySelector('#container'),
			engine: this.engine,
			options: {
				width: this.width,
				height: this.height,
				showVelocity: true
			}
		
		})

		
		Render.run(this.render)

		this.runner = Runner.create()
		Runner.run(this.runner, this.engine)
	}

	addObjects() {
		Composite.add(this.world, [
			Bodies.rectangle(200, 100, 60, 60, {frictionAir: 0.001}),
			Bodies.rectangle(400, 100, 60, 60, {frictionAir: 0.05}),
			Bodies.rectangle(600, 100, 60, 60, {frictionAir: 0.1}),
		
			Bodies.rectangle(400, 0, 800, 50, {isStatic: true}),
			Bodies.rectangle(400, 600, 800, 50, {isStatic: true}),
			Bodies.rectangle(800, 300, 50, 600, {isStatic: true}),
			Bodies.rectangle(0, 300, 50, 600, {isStatic: true}),
		])
		
		this.mouse = Mouse.create(this.render.canvas),
		this.mouseConstraint = MouseConstaint.create(this.engine, {
			mouse: this.mouse,
			constraint: {
				stiffness: .2,
				 
			}
		})

		Composite.add(this.world, this.mouseConstraint)
		this.render.mouse = this.mouse

		Render.lookAt(this.render, {
			min: {x: 0, y: 0},
			max: {x: 800, y: 600}
		})

	}

	initPaper() {

	}


	renderLoop(){
		this.time += 0.05 
		window.requestAnimationFrame(this.renderLoop.bind(this))
	}
}

new Sketch()



 