namespace SpriteKind {
    export const Collectible = SpriteKind.create()
    export const Squeaker = SpriteKind.create()
}
// Game over code
info.onCountdownEnd(function () {
    game.over(true, effects.confetti)
})
// Overlap code for Ezra and balloon
sprites.onOverlap(SpriteKind.Player, SpriteKind.Collectible, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    tiles.placeOnRandomTile(balloons, assets.tile`Spawn`)
    info.startCountdown(15)
    rubyspeed += 2
    if (!(squeaker)) {
        ruby = sprites.create(assets.image`Ruby`, SpriteKind.Enemy)
        tiles.placeOnRandomTile(ruby, assets.tile`Start`)
        ruby.follow(mySprite, rubyspeed)
        ruby.setBounceOnWall(true)
        football = sprites.create(assets.image`Football`, SpriteKind.Squeaker)
        randrug = tiles.getTileLocation(randint(3, 10), randint(3, 10))
        while (tiles.tileAtLocationIsWall(randrug)) {
            randrug = tiles.getTileLocation(randint(3, 10), randint(3, 10))
        }
        tiles.placeOnTile(football, randrug)
        squeaker = true
        distraction = false
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    tiles.placeOnRandomTile(mySprite, assets.tile`Start`)
    sprites.destroyAllSpritesOfKind(SpriteKind.Squeaker)
    distraction = false
    squeaker = false
    info.changeLifeBy(-1)
    rubyspeed = 20
})
info.onLifeZero(function () {
    game.over(true, effects.confetti)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Squeaker, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
    distraction = false
    squeaker = false
    info.changeScoreBy(5)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Squeaker, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    distraction = true
    rubyspeed += 2
})
let distraction = false
let randrug: tiles.Location = null
let football: Sprite = null
let ruby: Sprite = null
let squeaker = false
let rubyspeed = 0
let balloons: Sprite = null
let mySprite: Sprite = null
// Main Game Setup
scene.setBackgroundColor(12)
tiles.setCurrentTilemap(tilemap`Arena Demo`)
mySprite = sprites.create(assets.image`Ezra`, SpriteKind.Player)
tiles.placeOnRandomTile(mySprite, assets.tile`Start`)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(false)
scene.cameraFollowSprite(mySprite)
balloons = sprites.create(assets.image`Balloons`, SpriteKind.Collectible)
tiles.placeOnRandomTile(balloons, assets.tile`Spawn`)
info.startCountdown(15)
rubyspeed = 20
forever(function () {
    if (squeaker) {
        if (distraction) {
            ruby.follow(football, rubyspeed)
        } else {
            ruby.follow(mySprite, rubyspeed)
        }
    }
})
