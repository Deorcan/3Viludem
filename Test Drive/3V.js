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

Image.onmousemove = function() {OnMouse()}
Image.onmouseout = function() {MouseOff()}

 function isMobileOrTablet() {
    const userAgent = navigator.userAgent.toLowerCase();
    var isMobile = /iPhone|Android/i.test(navigator.userAgent);
    const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
    var check = false;
   (function(x){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(x)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(x.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
   
   if (isMobile||isTablet||check === true {
       return true
       }
	 
	 
 }
function IsTouch() {
    return ( 'ontouchstart' in window ) || 
           ( navigator.maxTouchPoints > 0 ) || 
           ( navigator.msMaxTouchPoints > 0 );
}
if (isMobileOrTablet){
	Image.style.left = "3vw"
	Image.style.right = "3vw"
	Image.style.top = "25vh"
	Image.style.maxWidth = "94%"
	Para.style.marginLeft = "0vw"
	Para.style.marginRight = "0vw"
	Control.style.display = "none"
	if (window.matchMedia("(orientation: landscape)").matches) {
		Para.style.marginTop = "85vh"
		TouchStart.style.marginTop = "15%"
 
	} else if (window.matchMedia("(orientation: portrait)").matches) {
		Para.style.marginTop = "80vh"
		text2.style.marginTop = "5vh"
		TouchStart.style.marginTop = "50%"
	}
}
	
	
//if (IsTouch()){
	Image.ontouchstart = function() {OnTouch()}
//}

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
	Para.style.top = "20vh"
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
	Para.style.top = "20vh"
	text.style.display = 'block'
	text2.style.display = 'block'
	Para.style.display = 'block'
	Pause.style.display = 'none'
	Start.style.display = 'none'
	Restart.style.display = 'none'
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
	Para.style.top = "20vh"
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
	Para.style.top = "20vh"
	Instructs.src = "Test%20Drive/Instructions1.png"
	IfMouse = false

}

function OnTouch(){
	
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
