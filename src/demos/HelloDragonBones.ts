import { BaseDemo } from './BaseDemo'
import dragonBones from '../lib/dragonBones'
import { Loader } from 'pixi.js'
import { HEIGHT, WIDTH } from '../index'

/**
 * How to use
 * 1. Load data.
 *
 * 2. Parse data.
 *    factory.parseDragonBonesData();
 *    factory.parseTextureAtlasData();
 *
 * 3. Build armature.
 *    armatureDisplay = factory.buildArmatureDisplay("armatureName");
 *
 * 4. Play animation.
 *    armatureDisplay.animation.play("animationName");
 *
 * 5. Add armature to stage.
 *    addChild(armatureDisplay);
 */
export class HelloDragonBones extends BaseDemo {
  public constructor() {
    super()

    const factory = dragonBones.PixiFactory.factory

    factory.parseDragonBonesData(
      Loader.shared.resources[
        'cecille-puppet/export-dragonbones/cecille-puppet_ske.json'
      ].data
    )

    factory.parseTextureAtlasData(
      Loader.shared.resources[
        'cecille-puppet/export-dragonbones/cecille-puppet_tex.json'
      ].data,
      Loader.shared.resources[
        'cecille-puppet/export-dragonbones/cecille-puppet_tex.png'
      ].texture
    )

    const armatureDisplay = factory.buildArmatureDisplay(
      'Armature',
      'cecille-puppet'
    )
    armatureDisplay.animation.play('New_Animation')

    // set anchors and place
    armatureDisplay.anchor.set(0.5, 1)
    armatureDisplay.x = WIDTH * 0.2
    armatureDisplay.y = HEIGHT * 0.733

    // scale down
    armatureDisplay.scale.x = 0.2
    armatureDisplay.scale.y = 0.2

    this.addChild(armatureDisplay)
  }
}
