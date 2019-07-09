import Kiwi from './classes/Kiwi.js';
import Brainfood from './classes/Brainfood.js';

{
let scene,
WIDTH, HEIGHT,
camera, fieldOfView, aspectRatio, renderer, container,
hemisphereLight, shadowLight, ambientLight, isGamepadConnected = false, kiwi, brainfood, hasCollided,
worms = [], haveWormsDropped=[false,false,false,false,false],
data=JSON.parse(facts);

const modal = document.getElementById("myModal");
const $world = document.getElementById('world');
const $height = document.getElementById('height');
 
const $fact = document.getElementById('fact');
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
    hasCollided = false;
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    scene = new THREE.Scene();

    let backgroundTexture = new THREE.TextureLoader().load("assets/img/background.jpg");
    var geometry = new THREE.PlaneGeometry( WIDTH/4, 3100, 1 );
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
    camera.position.x = -5;
    camera.position.y = 0;
    camera.position.z = 150;

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enable = true;

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

    setModal(data[currentWorm.mesh.name]);

    modal.style.display = "block";
}

const setModal = (atmosphereLayer) => {
    $fact.innerHTML = atmosphereLayer.facts[0];
    //$answer1.innerHTML = atmosphereLayer.questions[0].answers[0];
    //$answer2.innerHTML = atmosphereLayer.questions[0].answers[1];
    //$answer3.innerHTML = atmosphereLayer.questions[0].answers[2];
    //$answer4.innerHTML = atmosphereLayer.questions[0].answers[3];
}

//wordt 60 keer per seconde uitgevoerd
const render = () => {
    doAnimalLogic();
    requestAnimationFrame( render );
 
    //Stel de aangesloten gamepad in
    if(isGamepadConnected){
        const gamepad = navigator.getGamepads()[0];
 
        //const joystickLeftX = applyDeadzone(gamepad.axes[0], 0.25);
        const joystickLeftY = applyDeadzone(gamepad.axes[1], 0.25);
        //const joystickRightX = applyDeadzone(gamepad.axes[2], 0.25);
        const joystickRightY = applyDeadzone(gamepad.axes[3], 0.25);
   
        const cross = gamepad.buttons[0];
        const circle = gamepad.buttons[1];
        const square = gamepad.buttons[2];
        const triangle = gamepad.buttons[3];
   
        //const arrowUp = gamepad.buttons[12];
        //const arrowDown = gamepad.buttons[13];
        //const triggerLeft = gamepad.buttons[6];
        //const triggerRight = gamepad.buttons[7];

        if(Math.round(kiwi.mesh.position.y*100) > 0){
            $height.innerHTML = Math.round(kiwi.mesh.position.y*100);
        }else{
            $height.innerHTML = 0;
        }
   
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
            worms[i].mesh.position.y -= 0.2;
        }

        kiwi.reset()

        if(!hasCollided){
            camera.position.y = kiwi.mesh.position.y +30;
            if(joystickRightY > 0){   
                kiwi.mesh.position.y += joystickRightY;
                kiwi.mesh.position.x -= joystickRightY/0.6;
                kiwi.fireRight();
            } else if(kiwi.mesh.position.y > 0){
                kiwi.mesh.position.y -= 0.3;
            }
    
            if(joystickLeftY > 0 ){
                kiwi.mesh.position.y += joystickLeftY;
                kiwi.mesh.position.x += joystickLeftY/0.6;
                kiwi.fireLeft();
            } else if(kiwi.mesh.position.y > 0) {
                kiwi.mesh.position.y -= 0.3;
            }
    
            if(kiwi.mesh.position.y > 0){
                let fallDownAmount = 0.3;
                if(joystickRightY === 0  && joystickLeftY === 0){
                    fallDownAmount = 1;
                }
                kiwi.mesh.position.y -= fallDownAmount;
            }
        }

        if(kiwi.mesh.position.y > 2920){
            hasCollided = true;
            console.log("FINISHED");
        }   
   
        if(circle.pressed && hasCollided){
            modal.style.display = "none";
            hasCollided = false;
        }
    }
   
    renderer.render(scene, camera);
};
 
init();
}