import { Container } from 'pixi.js'
import { WIDTH, HEIGHT } from '..'
import dragonBones from '../lib/dragonBones'

export abstract class BaseDemo extends Container {
  protected readonly _resources: string[] = []

  public constructor() {
    super()
    dragonBones.PixiFactory.factory.clear()

    this.x = 0
    this.y = 0
  }

  public get stageWidth(): number {
    return WIDTH
  }

  public get stageHeight(): number {
    return HEIGHT
  }
}
