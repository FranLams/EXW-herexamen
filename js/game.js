import Kiwi from './classes/Kiwi.js';
import Brainfood from './classes/Brainfood.js';

{
let scene,
WIDTH, HEIGHT,
camera, fieldOfView, aspectRatio, renderer, container,
hemisphereLight, shadowLight, ambientLight, isGamepadConnected = false, kiwi, brainfood, hasCollided,
worms = [], haveWormsDropped=[false,false,false,false,false],
data=JSON.parse(facts), sec = 0;;

const modalFact = document.getElementById("myModalFact");
const modalQuestion = document.getElementById("myModalQuestion");
const $world = document.getElementById('world');
const $height = document.getElementById('height');
const needJs = document.getElementById("hidden");
const $start = document.querySelector(`.start-container`);
 
const $fact = document.getElementById('fact');
const $question = document.getElementById('question');
const $answer1 = document.getElementById('answer1');
const $answer2 = document.getElementById('answer2');
const $answer3 = document.getElementById('answer3');
const $answer4 = document.getElementById('answer4');

const init = () => {
    createScene();
    createLights();
    createKiwi();
    createBrainfood();
    render();
  }

const createLights = () => {
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9);
    scene.add(hemisphereLight);
    hemisphereLight.position.set(0, 450, 450);

    shadowLight = new THREE.DirectionalLight(0xffffff, .7);
    scene.add(shadowLight);

    ambientLight = new THREE.AmbientLight(0x9ab5dc, .24);
    scene.add(ambientLight);
    shadowLight.position.set(0, 550, 350);
    
    shadowLight.castShadow = true;
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;
}
 
const createScene = () => {
    $height.innerHTML = 0;
    hasCollided = false;
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    scene = new THREE.Scene();

    let backgroundTexture = new THREE.TextureLoader().load("assets/img/background.svg");
    var geometry = new THREE.PlaneGeometry( 390, 3290, 1 );
    var material = new THREE.MeshLambertMaterial( {map: backgroundTexture} );
    let backgroundPlane = new THREE.Mesh( geometry, material );
    backgroundPlane.position.z -= 20;
    backgroundPlane.position.y += 1570;
    scene.add( backgroundPlane );

    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio
    );
    camera.position.x = 0;
    camera.position.y = 30;
    camera.position.z = 150;

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enable = true;

    needJs.classList.add("hide");

    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
};

const applyDeadzone = (number, threshold) => {  
    let percentage = (Math.abs(number) - threshold) / (1 - threshold);
    if(percentage < 0)
        percentage = 0;
    return percentage * (number > 0 ? 1 : -1);
}
 
window.addEventListener("gamepadconnected", (event) => {
    isGamepadConnected = true;
    console.log("A gamepad connected:");
    console.log(event.gamepad);
});
 
window.addEventListener("gamepaddisconnected", (event) => {
    isGamepadConnected = false;
    console.log("A gamepad disconnected:");
    console.log(event.gamepad);
});

const createKiwi = () => {
    kiwi = new Kiwi();
    kiwi.mesh.scale.set(.8,.8,.8);
    kiwi.mesh.position.x = -10;
    kiwi.mesh.position.y = 0;  
    scene.add(kiwi.mesh);
}

const createBrainfood = (dropHeight, wormName) => {
    brainfood = new Brainfood();
    brainfood.mesh.scale.set(.8,.8,.8);
    brainfood.mesh.name = wormName;

    let randomValueX = Math.round(Math.random() * (WIDTH/30));
    randomValueX = randomValueX *2;
    let isNegative = Math.round(Math.random() * (1 - 0));
    if(isNegative){
        randomValueX = -Math.abs(randomValueX);
    }

    brainfood.mesh.position.x = randomValueX;
    brainfood.mesh.position.y = dropHeight;
    brainfood.mesh.rotation.y += Math.random() * 3;  
    scene.add(brainfood.mesh);
    return brainfood;
}

const doAnimalLogic = () => {
    const animalPos = new THREE.Vector3();
    animalPos.setFromMatrixPosition(kiwi.mesh.matrixWorld);

    for(let i =0, l=worms.length; i < l;i++){
        if (animalPos.distanceTo(worms[i].mesh.position) <= 30) {
            handleCollision(worms[i]);
        }
    }
}

const handleCollision = (currentWorm) => {
    hasCollided = true;

    let currentWormIndex = worms.indexOf(currentWorm);
    if(currentWormIndex > -1){
        worms.splice(currentWormIndex, 1)
        scene.remove(currentWorm.mesh);
    }

    setModalFact(data[currentWorm.mesh.name]);

    modalFact.style.display = "block";
}

const setModalFact = (atmosphereLayer) => {
    $fact.innerHTML = atmosphereLayer.facts[0];
}

const setModalQuestion = () => {
    $question.innerHTML = data.question.facts[0].fact;
    $answer1.innerHTML = data.question.facts[0].answers[0];
    $answer2.innerHTML = data.question.facts[0].answers[1];
    $answer3.innerHTML = data.question.facts[0].answers[2];
    $answer4.innerHTML = data.question.facts[0].answers[3];

    if(isGamepadConnected){
        const gamepad = navigator.getGamepads()[0];
        
        const cross = gamepad.buttons[0];
        const circle = gamepad.buttons[1];
        const square = gamepad.buttons[2];
        const triangle = gamepad.buttons[3];

        const $game = document.querySelector(`.game-container`);
        const $certificate = document.querySelector(`.certificate-container`);
        const $lost = document.querySelector(`.lost-container`);
        
        if(square.pressed){
            console.log("square pressed");
            if(data.question.facts[0].answers[0] == data.question.facts[0].correctAnswer){
                $game.classList.remove(`active`);
                $certificate.classList.add(`active`);
            } else {
                $game.classList.remove(`active`);
                $lost.classList.add(`active`);
            }
        }

        if(triangle.pressed){
            console.log("triangle pressed");
            if(data.question.facts[0].answers[1] == data.question.facts[0].correctAnswer){
                $game.classList.remove(`active`);
                $certificate.classList.add(`active`);
            } else {
                $game.classList.remove(`active`);
                $lost.classList.add(`active`);
            }
        }

        if(circle.pressed){
            console.log("circle pressed");
            if(data.question.facts[0].answers[2] == data.question.facts[0].correctAnswer){
                $game.classList.remove(`active`);
                $certificate.classList.add(`active`);
            } else {
                $game.classList.remove(`active`);
                $lost.classList.add(`active`);
            }
        }

        if(cross.pressed){
            console.log("cross pressed");
            if(data.question.facts[0].answers[3] == data.question.facts[0].correctAnswer){
                $game.classList.remove(`active`);
                $certificate.classList.add(`active`);
            } else {
                $game.classList.remove(`active`);
                $lost.classList.add(`active`);
            }
        }

    }
}

const pad = ( val ) => { 
    return val > 9 ? val : "0" + val; 
}

const timer = setInterval ( function(){
    if($world.classList.contains('active')){
        document.getElementById("seconds").innerHTML=pad(++sec%60);
        document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
    }
}, 1000 );

//wordt 60 keer per seconde uitgevoerd
const render = () => {
    doAnimalLogic();
    requestAnimationFrame( render );
 
    //Stel de aangesloten gamepad in
    if(isGamepadConnected){
        const gamepad = navigator.getGamepads()[0];
 
        const joystickLeftX = applyDeadzone(gamepad.axes[0], 0.25);
        const joystickLeftY = applyDeadzone(gamepad.axes[1], 0.25);
        const joystickRightX = applyDeadzone(gamepad.axes[2], 0.25);
        const joystickRightY = applyDeadzone(gamepad.axes[3], 0.25);
   
        const cross = gamepad.buttons[0];
        const circle = gamepad.buttons[1];
        const square = gamepad.buttons[2];
        const triangle = gamepad.buttons[3];

        if(Math.round(kiwi.mesh.position.y) > 2400){
            $height.innerHTML = Math.round((kiwi.mesh.position.y)*3.33);
        } else if(Math.round(kiwi.mesh.position.y) > 1800) {
            $height.innerHTML = Math.round((kiwi.mesh.position.y)*0.417);
        } else if(Math.round(kiwi.mesh.position.y) > 1170) {
            $height.innerHTML = Math.round((kiwi.mesh.position.y)/21.9);
        } else if(Math.round(kiwi.mesh.position.y) > 650) {
            $height.innerHTML = Math.round((kiwi.mesh.position.y)*0.044);
        }else if(Math.round(kiwi.mesh.position.y) > 0) {
            $height.innerHTML = Math.round((kiwi.mesh.position.y)/32.6);
        }
        else{
            $height.innerHTML = 0;
        }

        /*if(Math.round(kiwi.mesh.position.y*100) > 260000){
            $height.innerHTML = Math.round((kiwi.mesh.position.y*100)*33.3);
        } else if(Math.round(kiwi.mesh.position.y*100) > 195000) {
            $height.innerHTML = Math.round((kiwi.mesh.position.y*100)*4.17);
        } else if(Math.round(kiwi.mesh.position.y*100) > 117000) {
            $height.innerHTML = Math.round((kiwi.mesh.position.y*100)/2.19);
        } else if(Math.round(kiwi.mesh.position.y*100) > 58000) {
            $height.innerHTML = Math.round((kiwi.mesh.position.y*100)*0.44);
        }else if(Math.round(kiwi.mesh.position.y*100) > 0) {
            $height.innerHTML = Math.round((kiwi.mesh.position.y*100)/3.26);
        }
        else{
            $height.innerHTML = 0;
        }*/

   
        if(kiwi.mesh.position.y > 100 && !haveWormsDropped[0]) {
            worms.push(createBrainfood(350, 'troposfeer'));
            haveWormsDropped[0] = true;
        }
        if(kiwi.mesh.position.y > 850 && !haveWormsDropped[1]) {
            worms.push(createBrainfood(1000, 'stratosfeer'));
            haveWormsDropped[1]=true;
        }
        if(kiwi.mesh.position.y > 1400 && !haveWormsDropped[2]) {
            worms.push(createBrainfood(1600, 'mesosfeer'));
            haveWormsDropped[2]=true;
        }
        if(kiwi.mesh.position.y > 1900 && !haveWormsDropped[3]) {
            worms.push(createBrainfood(2150, 'thermosfeer'));
            haveWormsDropped[3]=true;
        }
        if(kiwi.mesh.position.y > 2400 && !haveWormsDropped[4]) {
            worms.push(createBrainfood(2750, 'exosfeer'));
            haveWormsDropped[4]=true;
        }

        for(let i = 0, l = worms.length; i < l; i++){
            worms[i].mesh.position.y -= 0.7;
        }

        kiwi.reset()

        if(!hasCollided){
            camera.position.y = kiwi.mesh.position.y +30;

           if(joystickRightY > 0 && joystickLeftY > 0){
                kiwi.mesh.position.y += 1.7; 
                kiwi.fireLeft();
                kiwi.fireRight();    
            } else if(joystickRightY > 0 && joystickLeftY <= 0){
                kiwi.mesh.position.y += 1.2;
                kiwi.mesh.position.x -= .8; 
                kiwi.fireRight(); 
            } else if(joystickLeftY > 0 && joystickRightY <= 0){
                kiwi.mesh.position.y += 1.2;
                kiwi.mesh.position.x += .8; 
                kiwi.fireLeft(); 
            } else if(kiwi.mesh.position.y > 0) {
                kiwi.mesh.position.y -= 0.2;
            }
    
            if(kiwi.mesh.position.y > 0){
                let fallDownAmount = 0.3;
                if(joystickRightY === 0  && joystickLeftY === 0){
                    fallDownAmount = 0.8;
                }
                kiwi.mesh.position.y -= fallDownAmount;
            }
        }

        if(kiwi.mesh.position.y > 3050){
            hasCollided = true;
            setModalQuestion();

            clearInterval ( timer );
            modalQuestion.style.display = "block";
        }
           
   
        if(circle.pressed && hasCollided){
            modalFact.style.display = "none";
            hasCollided = false;
        }
    }
   
    renderer.render(scene, camera);
};
 
init();
}