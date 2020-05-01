import * as PIXI from 'pixi.js'

import './overlay.js'

let app = new PIXI.Application({ resizeTo: window, antialias: true }),
  loader = new PIXI.Loader(),
  resources = PIXI.Loader.resources,
  Sprite = PIXI.Sprite,
  // TODO: in the future, I want to be able to adapt to other screen sizes, so
  // we need to save the ratio of the sprites for some quick maths:
  alexDimensions = [],
  alexRatio = 0,
  cecilleDimensions = [],
  cecilleRatio = 0,
  alex,
  cecille,
  alexIsStepping = true,
  cecilleIsStepping = true

// TODO: these contact and pass heights are from a 1680×1050 display and will
// probably need tweaking on e.g. 720p / 1080p displays :/

const alexContactHeight = 1000,
  alexPassHeight = 950,
  cecilleContactHeight = 1199,
  cecillePassHeight = 1166

// Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view)

// make pixi full screen
app.renderer.view.style.position = 'absolute'
app.renderer.view.style.display = 'block'

// load in alex & cecille
loader
  .add('alex', 'img/alex_silhou.png')
  .add('cecille', 'img/cecille_silhou.png')
  .load(setup)

// called once per loaded file
loader.onLoad.add((loader, res) => {
  console.log(`${res.name}.${res.extension} loaded (${loader.progress}%)`)
})

// called once when the queued resources all load.
loader.onComplete.add(() => console.log('All done!'))

// This will run when the image has loaded
function setup(loader, resources) {
  console.log('All files loaded')

  // assign the Sprites the textures we loaded earlier
  alex = new Sprite.from(resources.alex.texture)
  cecille = new Sprite.from(resources.cecille.texture)

  // save ratios and orig. dimensions
  alexDimensions = [alex.height, alex.width]
  alexRatio = alexDimensions[0] / alexDimensions[1]
  cecilleDimensions = [cecille.height, cecille.width]
  cecilleRatio = cecilleDimensions[0] / cecilleDimensions[1]

  // the images are (intentionally) just a little bit too large. Let's scale
  // them down just a tad.
  alex.setTransform(0, 0, 0.75, 0.75)

  // cecillian is (a lot) smaller than alex is
  cecille.setTransform(0, 0, 0.45, 0.45)

  // move their anchor points so we can place them correctly:
  alex.anchor.set(0.5, 0.9)
  // FIXME: cecille's sprite legs are a bit longer than alex's
  cecille.anchor.set(0.5, 0.9)

  // place them
  alex.x = app.screen.width * 0.33
  alex.y = alexContactHeight
  cecille.x = app.screen.width * 0.3
  cecille.y = cecilleContactHeight

  // and finally: display them. Together at last 💑
  app.stage.addChild(alex)
  app.stage.addChild(cecille)

  app.ticker.add((delta) => gameLoop(delta))
}

function gameLoop(delta) {
  if (alexIsStepping) {
    alex.y--
  } else {
    alex.y++
  }

  if (cecilleIsStepping) {
    cecille.y = cecille.y - 3
  } else {
    cecille.y = cecille.y + 3
  }

  if (cecille.y < cecillePassHeight || cecille.y > cecilleContactHeight) {
    cecilleIsStepping = !cecilleIsStepping
  }

  if (alex.y === alexPassHeight || alex.y === alexContactHeight) {
    alexIsStepping = !alexIsStepping
  }
}
