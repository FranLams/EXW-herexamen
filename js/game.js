import Kiwi from './classes/Kiwi.js';

{
let scene,
WIDTH, HEIGHT,
camera, fieldOfView, aspectRatio, renderer, container,
hemisphereLight, shadowLight, ambientLight, isGamepadConnected = false, kiwi; 

//const $container = document.querySelector(`.game-container`);
 
const init = () => {
    createScene();
    createLights();
    createKiwi();
    render();
  }

const createLights = () => {
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9);
    scene.add(hemisphereLight);

    shadowLight = new THREE.DirectionalLight(0xffffff, .9);
    scene.add(shadowLight);

    ambientLight = new THREE.AmbientLight(0x000000, .4);
    scene.add(ambientLight);
    shadowLight.position.set(150, 350, 350);
    
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
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    scene = new THREE.Scene();

    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio
    );
    camera.position.x =0;
    camera.position.y = 0;
    camera.position.z = 200;

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enable = true;
    renderer.setClearColor(0xDAE3F0);

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
    scene.add(kiwi.mesh);
}
 
//wordt 60 keer per seconde uitgevoerd
const render = () => {
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
   
        kiwi.mesh.position.y -= 1;
   
        if(joystickLeftY > 0){
            kiwi.mesh.position.y += joystickLeftY/0.5;
            kiwi.mesh.position.x += joystickLeftY/0.6;
        }
   
        if(joystickRightY > 0){    
            kiwi.mesh.position.y += joystickRightY/0.5;
            kiwi.mesh.position.x -= joystickRightY/0.6;
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