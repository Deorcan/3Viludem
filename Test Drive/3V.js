const ship = document.getElementById("player")
const gamescreen = document.getElementById("game-screen")
const enemyImgs = ['Test Drive/Ocean.png','Test Drive/Lava.png','Test Drive/Ice.png']
const Score = document.querySelector('#score span')
const HighScore = document.querySelector('#HighScore span')
const text = document.getElementById("text")
const text2 = document.getElementById("text2")
const Para = document.getElementById("Paragraph")
const GameOver = document.getElementById("gameover")

var screen = window.getComputedStyle(gamescreen)

let TF = false
let Music = new Audio ('Test Drive/sounds-from-space-soundroll-main-version-01-28-1884.mp3')
let EInterval
let L = { x: 0, y: 0, width: 0, height: 0}
let E = { x: 0, y: 0, width: 0, height: 0}
let Z = 2600
let z = 30


if (typeof Music.loop == 'boolean')
{
    Music.loop = true;
}
else
{
    Music.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}

function gameover(){
	window.removeEventListener("keydown", moving)
	TF = true
	clearInterval(EInterval)
	ship.style.top ="38.8vh"
	ship.style.left ="18.46vw"
	text.style.display = 'block'
	text2.style.display = 'block'
	Para.style.display = 'block'
	GameOver.style.display = 'block'
	ship.style.display = 'none'
	let Enemies = document.querySelectorAll(".enemy")
	Enemies.forEach(e => e.remove())
	Music.pause()
	if (HighScore.innerText < Score.innerText) {
		HighScore.innerText = Score.innerText
	}
	Z = Z*2
	z+=5

}

function moveUp(){
	let TOP = window.getComputedStyle(ship).getPropertyValue('top')
	if (ship.style.top <= "1%"){
		return
	} else {
		let pos = parseInt(TOP)
		pos -=8

		ship.style.top = `${pos}px`
	}
}

function moveDown(){
	let TOP = window.getComputedStyle(ship).getPropertyValue('top')
	if (ship.style.top >= "45%"){
		return
	} else {
		let pos = parseInt(TOP)
		pos +=8

		ship.style.top = `${pos}px`
	}
}

function moveLeft(){
	let LEFT = window.getComputedStyle(ship).getPropertyValue('left')
	if (ship.style.left === "24vw"){
		return
	} else {
		let pos = parseInt(LEFT)
		pos -=8
	
		ship.style.left = `${pos}px`
	}
}

function moveRight(){
	let LEFT = window.getComputedStyle(ship).getPropertyValue('left')
	if (ship.style.left === "1000px"){
		return
	} else {
		let pos = parseInt(LEFT)
		pos +=8
	
		ship.style.left = `${pos}px`
	}
}

function IsCollision(laser,enemy){
	
	 L = { x: parseInt(laser.style.left) 
	 	, y: parseInt(laser.style.top)
	 	, width: 20, height: 30}
	 E = { x: parseInt(enemy.style.left), y: parseInt(enemy.style.top), width: 30, height: 30}

	if (L.x < E.x + E.width &&
   L.x + L.width > E.x &&
   L.y < E.y + E.height &&
   L.y + L.height > E.y) {
    // collision detected!
	
return true
}
else {return false} 
}

function CreateLaser(){
	let X = parseInt(window.getComputedStyle(ship).getPropertyValue('left'))
	let Y = parseInt(window.getComputedStyle(ship).getPropertyValue('top'))
	let newlaser = document.createElement('img')
	newlaser.src = 'Pictures//Laser.png'
	newlaser.classList.add('laser')
	newlaser.style.left = `${X-200}px`
	newlaser.style.top = `${Y - 4}px`
	return newlaser
}

function movelaser(laser){
	let interval = setInterval(() => {
		let X = parseInt(laser.style.left)
		let enemies = document.querySelectorAll(".enemy")
		enemies.forEach(enemy => {
			if (IsCollision(laser,enemy)){
				enemy.src = "Test Drive/Helium.png"
				laser.remove()
				enemy.classList.add("dead")
				clearInterval(interval)
				Score.innerText= parseInt(Score.innerText) + 1
				
			}
		})
		if (X >= 900){
			laser.remove()
			clearInterval(interval)
		} else {
			laser.style.left = `${X+4}px`
			
		}
	}, 0)

}

function fire(){
	let laser = CreateLaser()
	gamescreen.appendChild(laser)
	let Laser = new Audio ('Test Drive/Laser.mp3')
	Laser.play()
	movelaser(laser)

}

function moveEnemy(enemy){
	let interval = setInterval(() => {
		let X = parseInt(window.getComputedStyle(enemy).getPropertyValue('left'))
		if (X <= 0){
			if (Array.from(enemy.classList).includes("dead")){
				let Whoosh = new Audio ('Test Drive/Whoosh.mp3')
				Whoosh.play()
				enemy.remove()
				clearInterval(interval)
				process.exit()
			} else {
				enemy.remove()
				clearInterval(interval)
				let Thunder = new Audio ('Test Drive/Thunder.mp3')
				Thunder.play()
				gameover()

			}
			
		} else {
			enemy.style.left = `${X - 4}px`
		}
	}, z)

}

function CreateEnemy(){
if (TF === false){
	let newenemy = document.createElement('img')
	let sprite = enemyImgs[Math.floor(Math.random()*enemyImgs.length)]
	newenemy.src = sprite
	newenemy.classList.add('enemy')
	newenemy.classList.add('transition')
	newenemy.style.left = "94%"
	newenemy.style.top = `${Math.floor(Math.random()* 530) + 50 }px`
	gamescreen.appendChild(newenemy)
	moveEnemy(newenemy)
}
	else{
		process.exit()
	}
}

function moving(event){
	if (event.key === "ArrowUp"){
		event.preventDefault()
		moveUp()
	} else if (event.key === "ArrowDown"){
		event.preventDefault()
		moveDown()
	} else if (event.key === "ArrowLeft"){
		event.preventDefault()
		moveLeft()
	} else if (event.key === "ArrowRight"){
		event.preventDefault()
		moveRight()
	} else if (event.key === " "){
		event.preventDefault()
		fire()
	}
	
}


function playgame(){
	text.style.display = 'none'
	text2.style.display = 'none'
	Para.style.display = 'none'
	GameOver.style.display = 'none'
	ship.style.display = 'block'
	window.addEventListener("keydown", moving)
	Music.loop = true
	Music.play()
	// Einterval = setInterval(() => {CreateEnemy()}, Z)
}

window.addEventListener("keydown", (event) => {

	if (event.key === "Enter"){
		Score.innerText = ship.style.top
		
		TF = false
		playgame()
	}
})
window.addEventListener("touchend", playgame);


