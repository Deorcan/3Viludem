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
const ControlMenu = document.getElementById("controlmenu")
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
const FireButton = document.getElementById("fire")

let TF = true
let FT = true
let Music = new Audio ('Test%20Drive/sounds-from-space-soundroll-main-version-01-28-1884.mp3')
let EInterval
let L = { x: 0, y: 0, width: 0, height: 0}
let E = { x: 0, y: 0, width: 0, height: 0}
let Z = 2600
let z = 30
var Lasers
let IfMouse = false
let IfTouch = false
var Mode = 0
var starting = 0
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
	window.removeEventListener("click", fire)
	window.removeEventListener("touchstart", fire)
	TF = true
	IfMouse = false
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
	FireButton.style.display = 'none'
	if(starting === -1){
		text.style.display = 'none'
		text2.style.display = 'none'
		Para.style.display = 'none'
		isTabletOrMobile()
		Landing()
		IfTouch = false
		Pause.style.display = 'none'
		Start.style.display = 'none'
		Restart.style.display = 'none'
		ControlMenu.style.display = 'none'
		PlayButton.src = 'Test%20Drive/Playbutton.PNG'
		starting = 0
		TF = false
		FT = true
	}
	let Enemies = document.querySelectorAll(".enemy")
	Enemies.forEach(e => e.remove())
	Music.pause()
	if (HighScore.innerText < Score.innerText) {
		HighScore.innerText = Score.innerText
	}
	if (HighScore2.innerText < Score2.innerText) {
		HighScore2.innerText = Score2.innerText
	}
	Score.innerText = 0
	Score2.innerText = 0

}

function RESTART(){
	window.removeEventListener("keydown", moving)
	window.removeEventListener("click", fire)
	window.removeEventListener("touchstart", fire)
	TF = true
	FT = false
	IfMouse = false
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
	ControlMenu.style.display = 'none'
	FireButton.style.display = 'none'
	if(IsTouch()){TouchStart.style.display = 'block'}
	if(starting === -1){
		isTabletOrMobile()
		Landing()
		IfTouch = false
		Pause.style.display = 'none'
		Start.style.display = 'none'
		Restart.style.display = 'none'
		ControlMenu.style.display = 'none'
		starting = 0
		PlayButton.src = 'Test%20Drive/Playbutton.PNG'
		Menu.style.marginTop = '27%'
		TouchStart.style.top = '60%'
		Para.style.display = 'none'
		TF = false
		FT = true
		
	}
	let Enemies = document.querySelectorAll(".enemy")
	Enemies.forEach(e => e.remove())
	Lasers.remove()
	Music.pause()
	Score.innerText = 0
	Score2.innerText = 0
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
	}else if (IfTouch === true && Mode === 4){
		var X = event.touches[0].clientX
		var Y = event.touches[0].clientY
		ship.style.display = 'block'
		ship.style.left = `${X}px`
		ship.style.top = `${Y}px`
		Image.style.maxWidth = `${window.innerWidth-5}px`
		Image.style.maxHeight = `${window.innerHeight-5}px`
		setTimeout(function(){ window.scrollTo(0,1), 0})
		
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
				Score2.innerText= parseInt(Score2.innerText) + 1
				
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
		var Displaytouch =  window.getComputedStyle(TouchStart).getPropertyValue('display')
		var Displaygo =  window.getComputedStyle(GameOver).getPropertyValue('display')
		PlsRotate.style.display = 'block'
		if (Displaytouch === 'block' || Displaygo === 'block'){PlsRotate.style.display = 'none'}
		
		Menu.style.display = 'none'
			Image.style.top = "25vh"
			Image.style.left = "3vw"
			Image.style.maxWidth = "94%"
			Image.style.maxHeight = "94%"
				
			PauseButton.style.display = 'none'
			ScoreT2.style.display = 'none'
			HighScoreT2.style.display = 'none'
			Pause.style.display = 'none'
			Start.style.display = 'none'
			Restart.style.display = 'none'
			ControlMenu.style.display = 'none'
			text.style.display = 'block'
			text2.style.display = 'block'
			Para.style.display = 'block'
			GameOver.style.marginTop = '50%'
			FireButton.style.display = 'none'
			TF = true
			FT = false
			let Enemies = document.querySelectorAll(".enemy")
			Enemies.forEach(e => e.style.display = 'none')
			Lasers.style.display = 'none'
			clearInterval(EInterval)
			Music.pause()
			window.removeEventListener("touchstart", fire)
			window.removeEventListener("keydown", moving)
			window.removeEventListener("click", fire)
		
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
			text.style.display = 'none'
			text2.style.display = 'none'
			Para.style.display = 'none'
			Menu.style.display = 'none'
			PauseButton.src = "Test%20Drive/PauseButton1.png"
			if (starting === -1){
				Pause.style.display = 'block'
				Start.style.display = 'block'
				Restart.style.display = 'block'
				ControlMenu.style.display = 'block'
				Start.onclick = function(){START()}
				Restart.onclick = function(){RESTART()}
				ControlMenu.onclick = function(){
				Menu.style.display = 'block'
				FireButton.style.display = 'none'}
			}else { Menu.style.display = 'block'
			       Menu.style.marginTop = '27%'}
			var Displaygo =  window.getComputedStyle(GameOver).getPropertyValue('display')
			var Displaytouch =  window.getComputedStyle(TouchStart).getPropertyValue('display')
			if (Displaytouch === 'block' || Displaygo === 'block'){Menu.style.display = 'none'}
			GameOver.style.marginTop = '25%'
			setTimeout(function(){ window.scrollTo(0,1), 0})
			let Enemies = document.querySelectorAll(".enemy")
			Enemies.forEach(e => e.style.display = 'block')
			Lasers.style.display = 'block'
		}
	}
}
PlayTouch = function(){
	isTabletOrMobile()
	Menu.style.display = 'none'
	PlayButton.src = 'Test%20Drive/Donebutton.PNG'
	Image.style.top = "0vh"
	Image.style.left = "0vw"
	Image.style.maxWidth = `${window.innerWidth-5}px`
	Image.style.maxHeight = `${window.innerHeight-5}px`
	landX = `${window.innerWidth-5}px`
	landY = `${window.innerHeight-5}px`
	Pause.style.fontSize = '225%'
	Start.style.fontSize = '160%'
	Start.style.backgroundColor = 'white'
	Restart.style.fontSize = '160%'
	Restart.style.backgroundColor = 'white'
	
	PauseButton.style.display = 'block'
	ScoreT2.style.display = 'block'
	HighScoreT2.style.display = 'block'
	if(Mode === 1 || Mode === 2 || Mode === 3){FireButton.style.display = 'block'}
	else{FireButton.style.display = 'none'}
	setTimeout(function(){ window.scrollTo(0,1), 0})
	if (PauseButton.src.indexOf('Test%20Drive/PauseButton1.png') != -1){
		Pause.style.display = 'block'
		Start.style.display = 'block'
		Restart.style.display = 'block'
		ControlMenu.style.display = 'block'
		FireButton.style.display = 'none'
	}
	starting = -1
	TF = false
	FT = true
	playgame()
}

Buttons = function(){
	if (IfTouch === false && IfMouse === false){
		KeyboardMode.style.border = "solid yellow 2px"
		MouseMode.style.border = "none"
		TiltMode.style.border = "none"
		PenMode.style.border = "none"
		DPadMode.style.border = "none"
		TouchMode.style.border = "none"
		
	}else if (IfTouch === false && IfMouse === true){
		KeyboardMode.style.border = "none"
		MouseMode.style.border =  "solid yellow 2px"
		TiltMode.style.border = "none"
		PenMode.style.border = "none"
		DPadMode.style.border = "none"
		TouchMode.style.border = "none"
	
	}else if (IfTouch === true && Mode === 1){
		KeyboardMode.style.border = "none"
		MouseMode.style.border =  "none"
		TiltMode.style.border = "solid yellow 2px"
		PenMode.style.border = "none"
		DPadMode.style.border = "none"
		TouchMode.style.border = "none"
		
	}else if (IfTouch === true && Mode === 2){
		KeyboardMode.style.border = "none"
		MouseMode.style.border =  "none"
		TiltMode.style.border = "none"
		PenMode.style.border = "solid yellow 2px"
		DPadMode.style.border = "none"
		TouchMode.style.border = "none"
		
	}else if (IfTouch === true && Mode === 3){
		KeyboardMode.style.border = "none"
		MouseMode.style.border =  "none"
		TiltMode.style.border = "none"
		PenMode.style.border = "none"
		DPadMode.style.border = "solid yellow 2px"
		TouchMode.style.border = "none"
		
	}else if (IfTouch === true && Mode === 4){
		KeyboardMode.style.border = "none"
		MouseMode.style.border =  "none"
		TiltMode.style.border = "none"
		PenMode.style.border = "none"
		DPadMode.style.border = "none"
		TouchMode.style.border = "solid yellow 2px"
	}else{
		KeyboardMode.style.border = "none"
		MouseMode.style.border =  "none"
		TiltMode.style.border = "none"
		PenMode.style.border = "none"
		DPadMode.style.border = "none"
		TouchMode.style.border = "none"
	}
}

function OnTouch(){
	event.preventDefault()
	TouchStart.style.display = "none"
	GameOver.style.display = 'none'
	IfTouch = true
	let Display =  window.getComputedStyle(Menu).getPropertyValue('display')
	if (Mode === 0){
		if (land.matches) {
			PlsRotate.style.display = 'none'
			Menu.style.display = 'block'
		}
	}
	
	if (port.matches) {
			PlsRotate.style.display = 'block'
			Menu.style.display = 'none'
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
				Menu.style.marginTop = '18%'
				Image.style.left = "18vw"
				Image.style.right = "18vw"
				Image.style.top = "15vh"
				Image.style.maxWidth = "64%"
				Para.style.left = "18vw"
				Para.style.right = "18vw"
				Control.style.display = "block"
				text2.style.marginTop = "0vh"
				PauseButton.style.display = 'none'
				ScoreT2.style.display = 'none'
				HighScoreT2.style.display = 'none'
				Pause.style.display = 'none'
				Start.style.display = 'none'
				Restart.style.display = 'none'
				ControlMenu.style.display = 'none'
				IfTouch = false
				playgame()
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
				Menu.style.marginTop = '18%'
				Image.style.left = "18vw"
				Image.style.right = "18vw"
				Image.style.top = "15vh"
				Image.style.maxWidth = "64%"
				Para.style.left = "18vw"
				Para.style.right = "18vw"
				Control.style.display = "block"
				text2.style.marginTop = "0vh"
				PauseButton.style.display = 'none'
				ScoreT2.style.display = 'none'
				HighScoreT2.style.display = 'none'
				Pause.style.display = 'none'
				Start.style.display = 'none'
				Restart.style.display = 'none'
				ControlMenu.style.display = 'none'
				IfTouch = false
				OnMouse()
				
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
		PlayButton.onclick = function (){
		
			Mode = 1
			PlayTouch()
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
		PlayButton.onclick = function (){
		
			Mode = 2
			PlayTouch()
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
		PlayButton.onclick = function (){
		
			Mode = 3
			PlayTouch()
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
		PlayButton.onclick = function (){
		
			Mode = 4
			PlayTouch()
		}
	}
	
	CloseButton.onclick = function (){ 
		Menu.style.display = 'none'
		Buttons()}
	
	if (Display === 'block' && land.matches){
		if(!Menu.onclick){ 
			Menu.style.display = 'none'
			Buttons()}	
	}else if (Display === 'none' && land.matches && starting === 0){
		if(!Menu.onclick){Menu.style.display = 'block'}
	}
	
	PauseButton.onclick = function (){
		if (PauseButton.src.indexOf('Test%20Drive/PauseButton.png') != -1 && starting === -1){
			PauseButton.src = 'Test%20Drive/PauseButton1.png'
			TF = true
			FT = false
			Pause.style.display = 'block'
			Start.style.display = 'block'
			Restart.style.display = 'block'
			ControlMenu.style.display = 'block'
			clearInterval(EInterval)
			Music.pause()
			Start.onclick = function(){START()}
			Restart.onclick = function(){RESTART()}
			ControlMenu.onclick = function(){Menu.style.display = 'block'}
			window.removeEventListener("touchstart", fire)
			FireButton.style.display = 'none'
			
			
		}else if (PauseButton.src.indexOf('Test%20Drive/PauseButton1.png') != -1){
			PauseButton.src = 'Test%20Drive/PauseButton.png'
			TF = false
			FT = true
			Pause.style.display = 'none'
			Start.style.display = 'none'
			Restart.style.display = 'none'
			ControlMenu.style.display = 'none'
			Menu.style.display = 'none'
			starting = -1
			playgame()
		}
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
	ControlMenu.style.display = 'none'
	TouchStart.style.display = "none"
	PauseButton.src = 'Test%20Drive/PauseButton.png'
	if (IfMouse === true){
		ship.style.display = 'none'
		window.addEventListener("click", fire)
	}else if (IfTouch === true){
		if (Mode === 4){ window.addEventListener("touchstart", fire)}
		else if (Mode === 1 || Mode === 2 || Mode === 3){
			FireButton.style.display = 'block'
			FireButton.onclick = function(){fire()}
			if (Mode === 1){}
			else if(Mode === 2){
				Image.onpointermove = function(){
					event.preventDefault()
					var X = event.clientX
					var Y = event.clientY
					ship.style.display = 'block'
					ship.style.left = `${X}px`
					ship.style.top = `${Y}px`
				}
			}
			else if(Mode === 3){}
								}
	}else {
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
