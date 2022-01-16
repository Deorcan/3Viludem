const ship = document.getElementById("player")
const Body = document.getElementById("body")
const enemyImgs = ['Test%20Drive/Ocean.png','Test%20Drive/Lava.png','Test%20Drive/Ice.png']
const Score = document.querySelector('#score span')
const HighScore = document.querySelector('#HighScore span')
const text = document.getElementById("text")
const text2 = document.getElementById("text2")
const Para = document.getElementById("Paragraph")
const GameOver = document.getElementById("gameover")
const Pause = document.getElementById("pause")
const Image = document.getElementById("space")
const Start = document.getElementById("start")
const Restart = document.getElementById("restart")
const Control = document.getElementById("control")
const Instructs = document.getElementById("instructions")
const TouchStart = document.getElementById("touchstart")
const PlsRotate = document.getElementById("plsrotate")
const Menu = document.getElementById("menu")
const CloseButton = document.getElementById("close")
const KeyboardMode = document.getElementById("keyboard")
const MouseMode = document.getElementById("mouse")
const TiltMode = document.getElementById("tilt")
const PenMode = document.getElementById("pen")
const DPadMode = document.getElementById("d-pad")
const TouchMode = document.getElementById("touch")
const Desktop = document.querySelectorAll(".desktop")
const Touchscreen = document.getElementById("touchscreen")
const Descript = document.getElementById("descript")
const PlayButton = document.getElementById("play")
const PauseButton = document.getElementById("pausebutton")
const ScoreT2 = document.getElementById("score2")
const HighScoreT2 = document.getElementById("HighScore2")
const Score2 = document.querySelector('#score2 span')
const HighScore2 = document.querySelector('#HighScore2 span')

let TF = true
let FT = true
let Music = new Audio ('Test%20Drive/sounds-from-space-soundroll-main-version-01-28-1884.mp3')
let EInterval
let L = { x: 0, y: 0, width: 0, height: 0}
let E = { x: 0, y: 0, width: 0, height: 0}
let Z = 2600
let z = 30
let Lasers
let IfMouse = false
let IfTouch = false
var Mode = 0
var landX
var landY
var port = window.matchMedia("(orientation: portrait)")
var land = window.matchMedia("(orientation: landscape)")

Image.onmousemove = function() {OnMouse()}
Image.onmouseout = function() {MouseOff()}

const userAgent = navigator.userAgent.toLowerCase();
var isMobile = /iPhone|Android|BlackBerry|BB|Nokia/i.test(navigator.userAgent);
const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
isTabletOrMobile()

land.addListener(function(l) {if (l.matches) {if (isTablet||isMobile) {Para.style.top = "120vh"}}else {Para.style.top = "110vh"}})
if (land.matches) {if (isTablet||isMobile) {Para.style.top = "120vh"}}

function IsTouch() {
    return ( 'ontouchstart' in window ) || 
           ( navigator.maxTouchPoints > 0 ) || 
           ( navigator.msMaxTouchPoints > 0 );
}


function isTabletOrMobile(){
	if (isMobile||isTablet){
		Image.style.left = "3vw"
		Image.style.right = "3vw"
		Image.style.top = "25vh"
		Image.style.maxWidth = "94%"
		Para.style.left = "3vw"
		Para.style.right = "3vw"
		Control.style.display = "none"
		text2.style.marginTop = "5vh"
		for (var i = 0; i < Desktop.length; i++) {Desktop[i].style.display = "none"}
		
	}else {	Touchscreen.style.marginLeft = "12%"}
	
}
	


if (IsTouch()){
	
	Image.innerHTML += TouchStart
	Image.innerHTML += PlsRotate
	Image.innerHTML += Menu
	TouchStart.style.display = "block"
	Image.ontouchstart = function() {OnTouch()}
	OnTouch()
}


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
	ship.style.left = "21.9vw";
	ship.style.top = "28.8vh";
	Image.style.top = "15vh";
	Control.style.top = "15vh";
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
	Score.innerText = 0

}

function RESTART(){
	window.removeEventListener("keydown", moving)
	TF = true
	FT = false
	clearInterval(EInterval)
	ship.style.left = "21.9vw";
	ship.style.top = "28.8vh";
	Image.style.top = "15vh";
	Control.style.top = "15vh";
	text.style.display = 'block'
	text2.style.display = 'block'
	Para.style.display = 'block'
	Pause.style.display = 'none'
	Start.style.display = 'none'
	Restart.style.display = 'none'
	if(IsTouch()){
		TouchStart.style.display = 'block'
	}
	let Enemies = document.querySelectorAll(".enemy")
	Enemies.forEach(e => e.remove())
	Lasers.remove()
	Music.pause()
	Score.innerText = 0
}

function moveUp(){
	let TOP = window.getComputedStyle(ship).getPropertyValue('top')
	let TOP1 = window.getComputedStyle(Image).getPropertyValue('top')
	if (parseFloat(TOP) < parseFloat(TOP1)){
		return
	} else {
		let pos = parseFloat(TOP)
		pos -=8

		ship.style.top = `${pos}px`
	}
}

function moveDown(){
	let TOP = window.getComputedStyle(ship).getPropertyValue('top')
	let TOP1 = window.getComputedStyle(Image).getPropertyValue('top')
	let HEIGHT = window.getComputedStyle(ship).getPropertyValue('height')
	let HEIGHT1 = window.getComputedStyle(Image).getPropertyValue('height')
	if (parseFloat(TOP)+parseFloat(HEIGHT) > parseFloat(TOP1)+parseFloat(HEIGHT1)){
		return
	} else {
		let pos = parseFloat(TOP)
		pos +=8

		ship.style.top = `${pos}px`
	}
}

function moveLeft(){
	let LEFT = window.getComputedStyle(ship).getPropertyValue('left')
	let LEFT1 = window.getComputedStyle(Image).getPropertyValue('left')
	if (parseFloat(LEFT) < parseFloat(LEFT1)){
		return
	} else {
		let pos = parseFloat(LEFT)
		pos -=8
	
		ship.style.left = `${pos}px`
	}
}

function moveRight(){
	let LEFT = window.getComputedStyle(ship).getPropertyValue('left')
	let LEFT1 = window.getComputedStyle(Image).getPropertyValue('left')
	let WIDTH = window.getComputedStyle(ship).getPropertyValue('width')
	let WIDTH1 = window.getComputedStyle(Image).getPropertyValue('width')
	if (parseFloat(LEFT)+parseFloat(WIDTH) > parseFloat(LEFT1)+parseFloat(WIDTH1)){
		return
	} else {
		let pos = parseFloat(LEFT)
		pos +=8
	
		ship.style.left = `${pos}px`
	}
}

function IsCollision(laser,enemy){
	
	 L = { x: parseFloat(laser.style.left) 
	 	, y: parseFloat(laser.style.top)
	 	, width: 20, height: 50}
	 E = { x: parseFloat(enemy.style.left), y: parseFloat(enemy.style.top), width: 30, height: 30}

	if (L.x < E.x + E.width &&
   L.x + L.width > E.x &&
   L.y < E.y + E.height &&
   L.y + L.height > E.y) {
	
return true
}
else {return false} 
}

function CreateLaser(){
		
	if (IfMouse === true){
		var X = event.clientX
		var Y = event.clientY
	}else{
		
		var X = parseFloat(window.getComputedStyle(ship).getPropertyValue('left'))
		var Y = parseFloat(window.getComputedStyle(ship).getPropertyValue('top'))
		Y = Y - 20

		
	}
	
	let newlaser = document.createElement('img')
	newlaser.src = 'Pictures/Laser.png'
	newlaser.classList.add('laser')
	newlaser.style.left = `${X}px`
	newlaser.style.top = `${Y}px`
	Lasers = newlaser
	return newlaser
}

function movelaser(laser){
	let interval = setInterval(() => {
		let X = parseFloat(laser.style.left)
		let enemies = document.querySelectorAll(".enemy")
		enemies.forEach(enemy => {
			if (IsCollision(laser,enemy)&& !(Array.from(enemy.classList).includes("dead"))){
				enemy.src = "Test%20Drive/Helium.png"
				laser.remove()
				enemy.classList.add("dead")
				clearInterval(interval)
				Score.innerText= parseInt(Score.innerText) + 1
				
			}
		})
		if (X >= parseFloat(window.getComputedStyle(Image).getPropertyValue('left'))+parseFloat(window.getComputedStyle(Image).getPropertyValue('width'))){
			laser.remove()
			clearInterval(interval)
		} else {
			if (FT === true){laser.style.left = `${X+4}px`}else {laser.style.left = `${X}`}
		}
	}, 0)

}

function fire(){
	let laser = CreateLaser()
	Body.appendChild(laser)
	let Laser = new Audio ('Test%20Drive/Laser.mp3')
	Laser.play()
	movelaser(laser)

}

function moveEnemy(enemy){
	let interval = setInterval(() => {
		let X = parseFloat(window.getComputedStyle(enemy).getPropertyValue('left'))
		if (X <= parseFloat(window.getComputedStyle(Image).getPropertyValue('left'))){
			if (Array.from(enemy.classList).includes("dead")){
				let Whoosh = new Audio ('Test%20Drive/Whoosh.mp3')
				Whoosh.play()
				enemy.remove()
				clearInterval(interval)
				process.exit()
			} else {
				enemy.remove()
				clearInterval(interval)
				let Thunder = new Audio ('Test%20Drive/Thunder.mp3')
				Thunder.play()
				gameover()

			}
			
		} else {
			if (FT === true){enemy.style.left = `${X-4}px`}else {enemy.style.left = `${X}`}
		}
	}, z)

}

function CreateEnemy(){

	let TOP1 = window.getComputedStyle(Image).getPropertyValue('top')
	let HEIGHT1 = window.getComputedStyle(Image).getPropertyValue('height')
	let LEFT1 = window.getComputedStyle(Image).getPropertyValue('left')
	let WIDTH1 = window.getComputedStyle(Image).getPropertyValue('width')
	let newenemy = document.createElement('img')
	let sprite = enemyImgs[Math.floor(Math.random()*enemyImgs.length)]
	newenemy.style.left = `${parseFloat(LEFT1)+parseFloat(WIDTH1)}px`
	newenemy.style.top = `${Math.floor(Math.random()* parseFloat(HEIGHT1)-32) + 30}px`
	newenemy.src = sprite
	newenemy.classList.add('enemy')
	newenemy.classList.add('transition')
	Body.appendChild(newenemy)
	moveEnemy(newenemy)


}

function moving(){
	
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



function OnMouse(){
	Image.style.cursor = "url('https://deorcan.github.io/3Viludem/Pictures/Cursor.png'), default"
	ship.style.display = 'none'
	IfMouse = true
	Instructs.src = "Test%20Drive/Instructions2.png"
	


	window.addEventListener("contextmenu", (event) => {
		event.preventDefault()
		
		if (TF === true){
			TF = false
			FT = true
			playgame()
		}
		else if (TF === false){
		  
			TF = true
			FT = false
			Pause.style.display = 'block'
			Start.style.display = 'block'
			Restart.style.display = 'block'
			clearInterval(EInterval)
			Music.pause()
			window.removeEventListener("click", fire)
			Start.onclick = function(){START()}
			Restart.onclick = function(){RESTART()}
		}
	})

}

function MouseOff(){
	ship.style.display = 'block'
	Instructs.src = "Test%20Drive/Instructions1.png"
	IfMouse = false

}

Porting = function (){
	if (port.matches){
		if (Mode === 0){
			PlsRotate.style.display = 'block'
			Menu.style.display = 'none'
		}else{
			Image.style.top = "25vh"
			Image.style.left = "3vw"
			Image.style.maxWidth = "94%"
			Image.style.maxHeight = "94%"
				
			PauseButton.style.display = 'none'
			ScoreT2.style.display = 'none'
			HighScoreT2.style.display = 'none'
			PlsRotate.style.display = 'block'
		}
	}
}
Landing = function (){
	if (land.matches){
		if (Mode === 0){
			PlsRotate.style.display = 'none'
			Menu.style.display = 'block'
		}else{
			Image.style.top = "0vh"
			Image.style.left = "0vw"
			Image.style.maxWidth = landX
			Image.style.maxHeight = landY			

			PauseButton.style.display = 'block'
			ScoreT2.style.display = 'block'
			HighScoreT2.style.display = 'block'
			PlsRotate.style.display = 'none'
			Menu.style.display = 'none'
		}
	}
}
PlayTouch = function(){
	Menu.style.display = 'none'
	Image.style.top = "0vh"
	Image.style.left = "0vw"
	Image.style.maxWidth = `${window.innerWidth}px`
	Image.style.maxHeight = `${window.innerHeight}px`
	landX = `${window.innerWidth}px`
	landY = `${window.innerHeight}px`
	
	PauseButton.style.display = 'block'
	ScoreT2.style.display = 'block'
	HighScoreT2.style.display = 'block'
}

function OnTouch(){
//	event.preventDefault()
	TouchStart.style.display = "none"
	IfTouch = true
	let Display =  window.getComputedStyle(Menu).getPropertyValue('display')
	if (Mode === 0){
		if (port.matches) {
			PlsRotate.style.display = 'block'
			Menu.style.display = 'none'
		}

		if (land.matches) {
			PlsRotate.style.display = 'none'
			Menu.style.display = 'block'
		}
	}
	
	port.addListener(Porting)
	land.addListener(Landing)
	
	if (!isMobile && !isTablet){
		
		KeyboardMode.onclick = function (){
			KeyboardMode.style.border = "solid yellow 2px"
			MouseMode.style.border = "none"
			TiltMode.style.border = "none"
			PenMode.style.border = "none"
			DPadMode.style.border = "none"
			TouchMode.style.border = "none"
			Descript.innerHTML = "In this mode, you move cursor via arrowkeys and shoot via the spacebar"
			PlayButton.onclick = function (){
				Menu.style.display = 'none'
				Mode = 5
			}
		}
		MouseMode.onclick = function (){
			KeyboardMode.style.border = "none"
			MouseMode.style.border = "solid yellow 2px"
			TiltMode.style.border = "none"
			PenMode.style.border = "none"
			DPadMode.style.border = "none"
			TouchMode.style.border = "none"
			Descript.innerHTML = "In this mode, you drag the cursor around screen and shoot via the left button"
			PlayButton.onclick = function (){
				Menu.style.display = 'none'
				Mode = 6
			}
		}
	}else{ 
		KeyboardMode.style.display = "none"
		MouseMode.style.display = "none"
	     }
	TiltMode.onclick = function (){
		KeyboardMode.style.border = "none"
		MouseMode.style.border = "none"
		TiltMode.style.border = "solid yellow 2px"
		PenMode.style.border = "none"
		DPadMode.style.border = "none"
		TouchMode.style.border = "none"
		Descript.innerHTML = "In this mode, you tilt the screen to move the cursor and shoot via the fire button"
		PlayButton.ontouchstart = function (){
			PlayTouch()
			Mode = 1
		}
	}
	PenMode.onclick = function (){
		KeyboardMode.style.border = "none"
		MouseMode.style.border = "none"
		TiltMode.style.border = "none"
		PenMode.style.border = "solid yellow 2px"
		DPadMode.style.border = "none"
		TouchMode.style.border = "none"
		Descript.innerHTML = "In this mode, you drag the cursor around screen and shoot via the fire button"
		PlayButton.ontouchstart = function (){
			PlayTouch()
			Mode = 2
		}
	}
	DPadMode.onclick = function (){
		KeyboardMode.style.border = "none"
		MouseMode.style.border = "none"
		TiltMode.style.border = "none"
		PenMode.style.border = "none"
		DPadMode.style.border = "solid yellow 2px"
		TouchMode.style.border = "none"
		Descript.innerHTML = "In this mode, you move cursor via a D-Pad and shoot via the fire button"
		PlayButton.ontouchstart = function (){
			PlayTouch()
			Mode = 3
		}
	}
	TouchMode.onclick = function (){
		KeyboardMode.style.border = "none"
		MouseMode.style.border = "none"
		TiltMode.style.border = "none"
		PenMode.style.border = "none"
		DPadMode.style.border = "none"
		TouchMode.style.border = "solid yellow 2px"
		Descript.innerHTML = "In this mode, you touch the screen and a laser shoots"
		PlayButton.ontouchstart = function (){
			PlayTouch()
			Mode = 4
		}
	}
	
	
	CloseButton.onclick = function (){ Menu.style.display = 'none'}
	if (Display === 'block' && land.matches && Mode === 0){
		if(!Menu.onclick){ Menu.style.display = 'none'}	
	}else if (Display === 'none' && land.matches && Mode === 0){
		if(!Menu.onclick){Menu.style.display = 'block'}
	}
	
	
}

function playgame(){
	text.style.display = 'none'
	text2.style.display = 'none'
	Para.style.display = 'none'
	Image.style.top = "0vh"
	Control.style.top = "0vh"
	GameOver.style.display = 'none'
	Pause.style.display = 'none'
	Start.style.display = 'none'
	Restart.style.display = 'none'
	TouchStart.style.display = "none"
	if (IfMouse === true){
		ship.style.display = 'none'
		window.addEventListener("click", fire)
	}
	else {
		ship.style.display = 'block'
		window.addEventListener("keydown", moving)
	}
	
	Music.loop = true
	Music.play()
	EInterval = setInterval(() => {CreateEnemy()}, Z)
}

function START(){
	FT = true
	TF = false
	playgame()
}

if (IfMouse === false){

	window.addEventListener("keydown", (event) => {

		if (event.key === "Enter" && TF === true){ 
			TF = false
			FT = true
			playgame()
		}
		else if (event.key === "Enter" && TF === false){
		  
			TF = true
			FT = false
			Pause.style.display = 'block'
			Start.style.display = 'block'
			Restart.style.display = 'block'
			clearInterval(EInterval)
			window.removeEventListener("keydown", moving)
			Music.pause()
			Start.onclick = function(){START()}
			Restart.onclick = function(){RESTART()}
		}
	})
}
window.addEventListener("resize", (event) =>{
	ship.style.left = "21.9vw";
	ship.style.top = "28.8vh";
	let Enemies = document.querySelectorAll(".enemy")
	Enemies.forEach(e => e.remove())
	Lasers.remove()
})
