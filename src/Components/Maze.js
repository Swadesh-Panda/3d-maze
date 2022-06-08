import { Scene } from "three"
import Camera from "./Camera"
import Renderer from "./Renderer"
import Resources from "./Utils/Resources"
import Screen from "./Utils/Screen"
import Time from "./Utils/Time"
import World from "./World/World"
import sources from "./sources"

let instance = null

export default class Maze {

    constructor(canvas)
    {
        if(instance)
            return instance

        instance = this

        // Options
        this.canvas = canvas

        // Setup
        this.screen = new Screen()
        this.time = new Time()
        this.scene = new Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        
        this.renderer = new Renderer()
        this.world = new World()
        
        // Resize event
        this.screen.on('resize', () => {
            this.resize()
        })

        // Update event
        this.time.on('update', () => {
            this.update()
        })
    }

    
    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }
}