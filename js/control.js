import Kiwi from './classes/Kiwi.js';

{
  let scene,
    WIDTH,
    HEIGHT,
    camera,
    fieldOfView,
    aspectRatio,
    renderer,
    controlContainer,
    hemisphereLight,
    shadowLight,
    ambientLight,
    kiwi,
    isGamepadConnected = false,
    movementSpeedDouble = 1.8,
    movementSpeedSingle = 1.6;

  const $control = document.querySelector(`.control-container`);

  const init = () => {
    createScene();
    createLights();
    createKiwi();
    render();
  };

  const createScene = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    scene = new THREE.Scene();

    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio);
    camera.position.x = 0;
    camera.position.y = 30;
    camera.position.z = 150;

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enable = true;

    controlContainer = document.getElementById('control-world');
    controlContainer.appendChild(renderer.domElement);
  };

  const reportWindowSize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.onresize = reportWindowSize;

  const createLights = () => {
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
    scene.add(hemisphereLight);
    hemisphereLight.position.set(0, 450, 450);

    shadowLight = new THREE.DirectionalLight(0xffffff, 0.7);
    scene.add(shadowLight);

    ambientLight = new THREE.AmbientLight(0x9ab5dc, 0.24);
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
  };

  const createKiwi = () => {
    kiwi = new Kiwi();
    kiwi.mesh.scale.set(0.7, 0.7, 0.7);
    kiwi.mesh.position.x = -24;
    kiwi.mesh.position.y = -12;
    scene.add(kiwi.mesh);
  };

  window.addEventListener('gamepadconnected', event => {
    isGamepadConnected = true;
    console.log('A gamepad connected:');
    console.log(event.gamepad);
  });

  window.addEventListener('gamepaddisconnected', event => {
    isGamepadConnected = false;
    console.log('A gamepad disconnected:');
    console.log(event.gamepad);
  });

  const applyDeadzone = (number, threshold) => {
    let percentage = (Math.abs(number) - threshold) / (1 - threshold);
    if (percentage < 0) percentage = 0;
    return percentage * (number > 0 ? 1 : -1);
  };

  const render = () => {
    requestAnimationFrame(render);

    if (isGamepadConnected && $control.classList.contains('active')) {
      const gamepad = navigator.getGamepads()[0];

      const joystickLeftY = applyDeadzone(gamepad.axes[1], 0.25);
      const joystickRightY = applyDeadzone(gamepad.axes[3], 0.25);

      const triggerLeft = gamepad.buttons[6];
      const triggerRight = gamepad.buttons[7];

      kiwi.reset();

      if (kiwi.mesh.position.x < -(WIDTH / 10)) {
        kiwi.mesh.position.x = -(WIDTH / 10);
      }

      if (kiwi.mesh.position.x > WIDTH / 10) {
        kiwi.mesh.position.x = WIDTH / 10;
      }

      if (joystickRightY > 0 && joystickLeftY > 0) {
        kiwi.mesh.position.y += movementSpeedDouble;
        kiwi.fireLeft();
        kiwi.fireRight();
      } else if (joystickRightY > 0 && joystickLeftY <= 0) {
        kiwi.mesh.position.y += movementSpeedSingle;
        kiwi.mesh.position.x -= movementSpeedSingle / 2;
        kiwi.fireRight();
      } else if (joystickLeftY > 0 && joystickRightY <= 0) {
        kiwi.mesh.position.y += movementSpeedSingle;
        kiwi.mesh.position.x += movementSpeedSingle / 2;
        kiwi.fireLeft();
      } else if (kiwi.mesh.position.y > 0) {
        kiwi.mesh.position.y -= 0.2;
      }

      if (kiwi.mesh.position.y > -12) {
        let fallDownAmount = 0.3;
        if (joystickRightY === 0 && joystickLeftY === 0) {
          fallDownAmount = 0.8;
        }
        kiwi.mesh.position.y -= fallDownAmount;
      }

      if (triggerLeft.value > 0 && triggerRight.value > 0 && kiwi.mesh.position.y > 0 && kiwi.mesh.position.y < 3045) {
        kiwi.mesh.scale.set(0.75, 0.75, 0.75);
        kiwi.mesh.position.y -= 1;
      } else {
        kiwi.mesh.scale.set(0.7, 0.7, 0.7);
      }
    }

    renderer.render(scene, camera);
  };

  init();
}