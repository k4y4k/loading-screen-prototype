/* eslint-disable new-cap, no-irregular-whitespace */

import * as PIXI from 'pixi.js'

import './overlay'

const app = new PIXI.Application({ resizeTo: window, antialias: true })
const loader = new PIXI.Loader()
const { Sprite } = PIXI
let alex
let cecille
let alexIsStepping = true
let cecilleIsStepping = true

// TODO: in the future, I want to be able to adapt to other screen sizes

// TODO: these contact and pass heights are from a 1680×1050 display and will
// probably need tweaking on e.g. 720p / 1080p displays :/

const alexContactHeight = 1000
const alexPassHeight = 950
const cecilleContactHeight = 1199
const cecillePassHeight = 1166

// Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view)

// make pixi full screen
app.renderer.view.style.position = 'absolute'
app.renderer.view.style.display = 'block'

function gameLoop() {
  if (alexIsStepping) {
    alex.y -= 1
  } else {
    alex.y += 1
  }

  if (cecilleIsStepping) {
    cecille.y -= 3
  } else {
    cecille.y += 3
  }

  if (cecille.y < cecillePassHeight || cecille.y > cecilleContactHeight) {
    cecilleIsStepping = !cecilleIsStepping
  }

  if (alex.y === alexPassHeight || alex.y === alexContactHeight) {
    alexIsStepping = !alexIsStepping
  }
}

// This will run when the image has loaded
// eslint-disable-next-line no-shadow
function setup(loader, resources) {
  // assign the Sprites the textures we loaded earlier

  alex = new Sprite.from(resources.alex.texture)
  cecille = new Sprite.from(resources.cecille.texture)

  // the images are (intentionally) just a little bit too large. Let's scale
  // them down just a tad.
  alex.setTransform(0, 0, 0.75, 0.75)

  // cecillian is (a lot) smaller than alex is
  cecille.setTransform(0, 0, 0.45, 0.45)

  // move their anchor points so we can place them correctly:
  alex.anchor.set(0.5, 0.9)
  // FIXME: cecille's sprite legs are a bit longer than alex's
  cecille.anchor.set(0.5, 0.9)

  // place them onscreen
  alex.x = app.screen.width * 0.33
  alex.y = alexContactHeight
  cecille.x = app.screen.width * 0.3
  cecille.y = cecilleContactHeight

  // and finally: display them. Together at last 💑
  app.stage.addChild(alex)
  app.stage.addChild(cecille)

  app.ticker.add((delta) => gameLoop(delta))
}

// load in alex & cecille
loader
  .add('alex', 'img/alex_silhou.png')
  .add('cecille', 'img/cecille_silhou.png')
  .load(setup)

// called once per loaded file
// eslint-disable-next-line no-shadow
loader.onLoad.add((loader, res) => {
  // eslint-disable-next-line no-console
  console.log(`${res.name}.${res.extension} loaded (${loader.progress}%)`)
})
