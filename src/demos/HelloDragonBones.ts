import { BaseDemo } from './BaseDemo'
import dragonBones from '../lib/dragonBones'
import { Loader } from 'pixi.js'
import { HEIGHT, WIDTH, LANDSCAPE } from '../index'

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

    const cecille = factory.buildArmatureDisplay('Armature', 'cecille-puppet')

    factory.parseDragonBonesData(
      Loader.shared.resources[
        'alex-puppet/export-dragonbones/alex-puppet_ske.json'
      ].data
    )

    factory.parseTextureAtlasData(
      Loader.shared.resources[
        'alex-puppet/export-dragonbones/alex-puppet_tex.json'
      ].data,
      Loader.shared.resources[
        'alex-puppet/export-dragonbones/alex-puppet_tex.png'
      ].texture
    )

    const alex = factory.buildArmatureDisplay('Armature', 'alex-puppet')

    cecille.animation.play('New_Animation')
    cecille.animation.timeScale = 1.33
    alex.animation.play('walk_anim')

    // set anchors and place
    alex.anchor.set(0.25, 1)

    // if the aspect ratio isn't 16:9, we need to make sure Alex isn't
    // face-planting into the edge of the screen
    if (LANDSCAPE) {
      alex.x = WIDTH * 0.3
    } else {
      alex.x = WIDTH * 0.5
    }

    alex.y = HEIGHT * 0.55
    cecille.anchor.set(0.5, 1)
    cecille.x = WIDTH * 0.2
    cecille.y = HEIGHT * 0.8

    // scale down
    alex.scale.x = 0.29
    alex.scale.y = 0.29
    cecille.scale.x = 0.18
    cecille.scale.y = 0.18

    this.addChild(alex)
    this.addChild(cecille)
  }
}
