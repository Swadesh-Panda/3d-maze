import EventEmitter from "./EventEmitter";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { TextureLoader } from "three";
import { CubeTextureLoader } from "three";

export default class Resources extends EventEmitter{

    constructor(sources)
    {
        super()

        // Options
        this.sources = sources

        // Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.fbxLoader = new FBXLoader()
        this.loaders.textureLoader = new TextureLoader()
        this.loaders.cubeTextureLoader = new CubeTextureLoader()
    }

    startLoading()
    {
        // Load each source
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(source.path, (file) => {
                    this.sourceLoaded(source,file);
                })
            }

            else if(source.type === 'fbxModel')
            {
                this.loaders.fbxLoader.load(source.path, (file) => {
                    this.sourceLoaded(source,file);
                })
            }

            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(source.path, (file) => {
                    this.sourceLoaded(source,file);
                })
            }

            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(source.path, (file) => {
                    this.sourceLoaded(source,file);
                })
            }
        }
    }

    sourceLoaded(source,file)
    {
        this.items[source.name] = file
        this.loaded ++

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }
}