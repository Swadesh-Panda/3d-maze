import { PCFSoftShadowMap } from "three";
import { ReinhardToneMapping } from "three";
import { sRGBEncoding } from "three";
import { WebGLRenderer } from "three";
import Maze from "./Maze";

export default class Renderer{
    constructor()
    {
        this.maze = new Maze()
        this.canvas = this.maze.canvas
        this.screen = this.maze.screen
        this.scene = this.maze.scene
        this.camera = this.maze.camera

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new WebGLRenderer({
            canvas : this.canvas,
            antialias : true
        })

        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = sRGBEncoding
        this.instance.toneMapping = ReinhardToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = PCFSoftShadowMap
        this.instance.setClearColor('#211d20')
        this.instance.setSize(this.screen.width, this.screen.height)
        this.instance.setPixelRatio(this.screen.pixelRatio)

        
    }

    resize()
    {
        this.instance.setSize(this.screen.width, this.screen.height)
        this.instance.setPixelRatio(this.screen.pixelRatio)
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }
}