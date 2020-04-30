import * as PIXI from 'pixi.js'

let app = new PIXI.Application({ resizeTo: window })

// Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view)

// make pixi full screen
app.renderer.view.style.position = 'absolute'
app.renderer.view.style.display = 'block'

// load in alex
const alex = PIXI.Sprite.from('img/alex_silhou.png')

// the image is (intentionally) just a little bit too large. Let's scale him
// down just a tad.
// alex.setTransform(0, 0, 0.5, 0.5)

// move his anchor point so we can place him correctly
alex.anchor.set(0.5, 0.85)

// place him
alex.x = app.screen.width * 0.25
alex.y = app.screen.height

app.stage.addChild(alex)

// TODO: add event listener to reshuffle sizes on window resize

console.log('💀')
