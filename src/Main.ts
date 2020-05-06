import { Container } from 'pixi.js'
import { Preloader } from './demos/Preloader'
import { HelloDragonBones } from './demos/HelloDragonBones'
import './js/overlay'

export class Main extends Container {
  private preloader: Preloader
  private currentDemo: Container
  constructor() {
    super()
    this.preloader = new Preloader(this.onAssetsLoaded.bind(this))
    this.addChild(this.preloader)
  }

  private onAssetsLoaded() {
    this.removeChild(this.preloader)
    this.preloader.destroy({ children: true })

    this.currentDemo = new HelloDragonBones()
    this.addChild(this.currentDemo)
  }

  public helloDragonBones() {
    this.removeChild(this.currentDemo)
    this.currentDemo.destroy({ children: true })
    this.currentDemo = new HelloDragonBones()
    this.addChild(this.currentDemo)
  }
}
