import { Container, Loader } from 'pixi.js'
import dragonBones from '../lib/dragonBones'
import { WIDTH, HEIGHT } from '..'

export class Preloader extends Container {
  private _armatureDisplay: dragonBones.PixiArmatureDisplay

  private preloader: Loader

  private allDragonBonesFiles = [
    // for HelloDragonBones
    'cecille-puppet/export-dragonbones/cecille-puppet_ske.json',
    'cecille-puppet/export-dragonbones/cecille-puppet_tex.json',
    'cecille-puppet/export-dragonbones/cecille-puppet_tex.png',
    'alex-puppet/export-dragonbones/alex-puppet_ske.json',
    'alex-puppet/export-dragonbones/alex-puppet_tex.json',
    'alex-puppet/export-dragonbones/alex-puppet_tex.png',
  ]
  private onComplete: Function

  public constructor(onComplete: Function) {
    super()

    this.onComplete = onComplete

    this.preloader = new Loader()
    this.preloader.add([
      'dragon/progress_bar/progress_bar_ske.json',
      'dragon/progress_bar/progress_bar_tex.json',
      'dragon/progress_bar/progress_bar_tex.png',
    ])
    this.preloader.onComplete.once(this.buildPreloader, this)
    this.preloader.load()
  }

  protected buildPreloader(): void {
    console.log('loaded')
    const factory = dragonBones.PixiFactory.factory
    factory.parseDragonBonesData(
      this.preloader.resources['dragon/progress_bar/progress_bar_ske.json'].data
    )
    factory.parseTextureAtlasData(
      this.preloader.resources['dragon/progress_bar/progress_bar_tex.json']
        .data,
      this.preloader.resources['dragon/progress_bar/progress_bar_tex.png']
        .texture
    )
    //
    this._armatureDisplay = factory.buildArmatureDisplay('progress_bar')
    this._armatureDisplay.x = 0.0
    this._armatureDisplay.y = 0.0
    this.addChild(this._armatureDisplay)
    // Add animation event listener.
    this._armatureDisplay.animation.gotoAndStopByProgress('idle', 0)
    this._armatureDisplay.x = WIDTH / 2
    this._armatureDisplay.y = HEIGHT / 2

    //Preloader built. Loading real assets...
    Loader.shared.add(this.allDragonBonesFiles)
    const detach = Loader.shared.onProgress.add(this.onProgress, this)
    Loader.shared.onComplete.once(() => {
      Loader.shared.onProgress.detach(detach)

      this.onComplete()
    })

    Loader.shared.load()
    this._armatureDisplay.animation.play('idle')
  }
  onProgress(loader: Loader) {
    this._armatureDisplay.animation.gotoAndStopByProgress(
      'idle',
      loader.progress / 100
    )
  }
}
