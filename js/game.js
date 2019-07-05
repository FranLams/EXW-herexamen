import Kiwi from './classes/Kiwi.js';
import Brainfood from './classes/Brainfood.js';

{
let scene,
WIDTH, HEIGHT,
camera, fieldOfView, aspectRatio, renderer, container,
hemisphereLight, shadowLight, ambientLight, isGamepadConnected = false, kiwi, brainfood, hasCollided; 
 
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
    //renderer.setClearColor(0xDAE3F0);

    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
};
 
//Functie voor de deadzone op de joysticks
const applyDeadzone = (number, threshold) => {  
    let percentage = (Math.abs(number) - threshold) / (1 - threshold);
    if(percentage < 0)
        percentage = 0;
    return percentage * (number > 0 ? 1 : -1);
}
 
//Wordt uitgevoerd als de gamepad is aangesloten en als er op een willekeurige knop geduwt is
window.addEventListener("gamepadconnected", (event) => {
    isGamepadConnected = true;
    console.log("A gamepad connected:");
    console.log(event.gamepad);
});
 
//Wordt uitgevoerd als de gamepad niet meer aangesloten is
window.addEventListener("gamepaddisconnected", (event) => {
    isGamepadConnected = false;
    console.log("A gamepad disconnected:");
    console.log(event.gamepad);
});

const createKiwi = () => {
    kiwi = new Kiwi();
    kiwi.mesh.scale.set(.8,.8,.8);
    kiwi.mesh.position.x = -10;
    kiwi.mesh.position.y = -30;
    //kiwi.mesh.rotation.y += 1;  
    scene.add(kiwi.mesh);
}

const createBrainfood = () => {
    brainfood = new Brainfood();
    brainfood.mesh.scale.set(.8,.8,.8);
    brainfood.mesh.position.x = 40;
    brainfood.mesh.rotation.y += .5;  
    scene.add(brainfood.mesh);
}

/*const doAnimalLogic = () => {
    let brainfood;
    const animalPos = new THREE.Vector3();
    //const animalsToRemove = [];

    animalPos.setFromMatrixPosition(brainfood.matrixWorld);

    //check collision
    if (animalPos.distanceTo(kiwi.position) <= .5) {
        console.log("hit");
        hasCollided = true;
        //handleCollision();
    }
}*/
  
    /*let fromWhere;
    animalsToRemove.forEach((element, index) => {
      oneAnimal = animalsToRemove[index];
      fromWhere = animalsInPath.indexOf(oneAnimal);
      animalsInPath.splice(fromWhere, 1);
      animalsPool.push(oneAnimal);
      oneAnimal.visible = false;
      console.log("remove animal");
    });*/

const $world = document.getElementById('world');
$world.style.backgroundPositionY = '800px';

//wordt 60 keer per seconde uitgevoerd
const render = () => {
    //doAnimalLogic();
    requestAnimationFrame( render );
 
    //Stel de aangesloten gamepad in
    if(isGamepadConnected){
        var gamepad = navigator.getGamepads()[0];
 
        var joystickLeftX = applyDeadzone(gamepad.axes[0], 0.25);
        var joystickLeftY = applyDeadzone(gamepad.axes[1], 0.25);
        var joystickRightX = applyDeadzone(gamepad.axes[2], 0.25);
        var joystickRightY = applyDeadzone(gamepad.axes[3], 0.25);
   
        var cross = gamepad.buttons[0];
        var circle = gamepad.buttons[1];
        var square = gamepad.buttons[2];
        var triangle = gamepad.buttons[3];
   
        var arrowUp = gamepad.buttons[12];
        var arrowDown = gamepad.buttons[13];
        var triggerLeft = gamepad.buttons[6];
        var triggerRight = gamepad.buttons[7];
   
        if(Number($world.style.backgroundPositionY.slice(0, -2)) >500){
            let fallDownAmount = 1;
            if(joystickRightY === 0  && joystickLeftY === 0){
                fallDownAmount = 4;
            }
            $world.style.backgroundPositionY = `${Number($world.style.backgroundPositionY.slice(0, -2))-fallDownAmount}px`;

        }

        kiwi.reset()
   
        if(joystickRightY > 0){   
            kiwi.mesh.position.y += joystickRightY/10;
            kiwi.mesh.position.x -= joystickRightY/0.6;
            kiwi.fireRight();
            $world.style.backgroundPositionY = `${Number($world.style.backgroundPositionY.slice(0, -2))+(joystickRightY*6)}px`;
        } else {
            kiwi.mesh.position.y -= .1;
        }

        if(joystickLeftY > 0){
            kiwi.mesh.position.y += joystickLeftY/10;
            kiwi.mesh.position.x += joystickLeftY/0.6;
            kiwi.fireLeft();
            $world.style.backgroundPositionY = `${Number($world.style.backgroundPositionY.slice(0, -2))+(joystickLeftY*6)}px`;
        } else {
            kiwi.mesh.position.y -= .1;
        }
   
        kiwi.mesh.position.z += triggerRight.value/15;
        kiwi.mesh.position.z -= triggerLeft.value/15;

   
        //Als er op arrowUp geduwt wordt, trilt de gamepad
        if(cross.pressed){
            gamepad.vibrationActuator.playEffect("dual-rumble", {
                startDelay: 0,
                duration: 500,
                weakMagnitude: 1.0,
                strongMagnitude: 1.0
            });
        }
    }
   
    renderer.render(scene, camera);
};
 
init();
}