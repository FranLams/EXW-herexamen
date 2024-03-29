import Brainfood from './classes/Brainfood.js';
import Fruit from './classes/Fruit.js';
import Kiwi from './classes/Kiwi.js';
import Meteor from './classes/Meteor.js';
import MeteorBlue from './classes/MeteorBlue.js';
import Plane from './classes/Plane.js';

{
  let scene,
    WIDTH,
    HEIGHT,
    camera,
    fieldOfView,
    aspectRatio,
    renderer,
    container,
    hemisphereLight,
    shadowLight,
    ambientLight,
    isGamepadConnected = false,
    kiwi,
    brainfood,
    plane,
    plane02,
    meteor,
    meteorBlue,
    hasCollided,
    worms = [],
    collidedWorm,
    fruits = [],
    haveWormsDropped = [false, false, false, false, false],
    data = JSON.parse(facts),
    sec = 0,
    scoredMinutes,
    scoredSeconds,
    savedMinutes = localStorage.getItem('minutes'),
    savedSeconds = localStorage.getItem('seconds'),
    factList = [],
    factAnswered = false,
    randomQuestion,
    movementSpeedDouble = 1.8,
    movementSpeedSingle = 1.6;

  const backgroundMusic = document.getElementById('background-music');
  const explosion = document.getElementById('explosion-sound');
  const gameOver = document.getElementById('gameOver-sound');
  const win = document.getElementById('win-sound');
  const modalFact = document.getElementById('myModalFact');
  const modalContent = document.querySelector('.modal-content');
  const modalQuestion = document.getElementById('myModalQuestion');
  const $world = document.getElementById('world');
  const $height = document.getElementById('height');
  const needJs = document.getElementById('hidden');
  const $start = document.querySelector(`.start-container`);
  const $correct = document.getElementById('correct');
  const $warning = document.getElementById('warning');

  const $changeTitle = document.getElementById('changeTitle');
  const $false = document.getElementById('false');
  const $true = document.querySelector(`.true`);

  const $trueFalseFact = document.getElementById('trueFalseFact');
  const $question = document.getElementById('question');
  const $answer1 = document.getElementById('answer1');
  const $answer2 = document.getElementById('answer2');
  const $answer3 = document.getElementById('answer3');
  const $answer4 = document.getElementById('answer4');
  const $catched = document.getElementById('catched');

  const $game = document.querySelector(`.game-container`);

  const init = () => {
    createScene();
    createLights();
    createKiwi();
    createBrainfood();
    createPlane();
    createSecondPlane();
    createMeteor();
    createSecondMeteor();
    createFruits();
    initFactList();
    render();
  };

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

  const createScene = () => {
    $height.innerHTML = 0;
    hasCollided = false;

    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    scene = new THREE.Scene();

    let backgroundTexture = new THREE.TextureLoader().load('assets/img/background.svg');
    var geometry = new THREE.PlaneGeometry(390, 3290, 1);
    var material = new THREE.MeshLambertMaterial({ map: backgroundTexture });
    let backgroundPlane = new THREE.Mesh(geometry, material);
    backgroundPlane.position.z -= 20;
    backgroundPlane.position.y += 1570;
    scene.add(backgroundPlane);

    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio);
    camera.position.x = -12;
    camera.position.y = 30;
    camera.position.z = 150;

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enable = true;

    needJs.classList.add('hide');

    container = document.getElementById('world');
    container.appendChild(renderer.domElement);

    showBestTime();
  };

  const reportWindowSize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.onresize = reportWindowSize;

  const applyDeadzone = (number, threshold) => {
    let percentage = (Math.abs(number) - threshold) / (1 - threshold);
    if (percentage < 0) percentage = 0;
    return percentage * (number > 0 ? 1 : -1);
  };

  window.addEventListener('gamepadconnected', event => {
    isGamepadConnected = true;
    $warning.style.display = "none";
    console.log('A gamepad connected:');
    console.log(event.gamepad);
  });

  window.addEventListener('gamepaddisconnected', event => {
    isGamepadConnected = false;
    $warning.style.display = "block";
    console.log('A gamepad disconnected:');
    console.log(event.gamepad);
  });

  const createKiwi = () => {
    kiwi = new Kiwi();
    kiwi.mesh.scale.set(0.8, 0.8, 0.8);
    kiwi.mesh.position.x = -10;
    kiwi.mesh.position.y = 0;
    scene.add(kiwi.mesh);
  };

  const createBrainfood = (dropHeight, wormName) => {
    brainfood = new Brainfood();
    brainfood.mesh.scale.set(0.8, 0.8, 0.8);
    brainfood.mesh.name = wormName;

    let randomValueX = Math.round(Math.random() * (WIDTH / 30));
    randomValueX = randomValueX * 2;
    let isNegative = Math.round(Math.random() * (1 - 0));
    if (isNegative) {
      randomValueX = -Math.abs(randomValueX);
    }

    brainfood.mesh.position.x = randomValueX;
    brainfood.mesh.position.y = dropHeight;
    brainfood.mesh.rotation.y += Math.random() * 3;
    scene.add(brainfood.mesh);
    return brainfood;
  };

  const createPlane = () => {
    plane = new Plane();
    plane.mesh.scale.set(0.5, 0.5, 0.5);
    plane.mesh.position.x = -250;
    plane.mesh.position.y = 20;
    scene.add(plane.mesh);
  };

  const createSecondPlane = () => {
    plane02 = new Plane();
    plane02.mesh.scale.set(0.55, 0.55, 0.55);
    plane02.mesh.position.x = 250;
    plane02.mesh.position.y = 40;
    plane02.mesh.rotation.y = 3;
    scene.add(plane02.mesh);
  };

  const createMeteor = () => {
    meteor = new Meteor();
    meteor.mesh.scale.set(0.9, 0.9, 0.9);
    meteor.mesh.position.x = -300;
    meteor.mesh.position.y = 1500;
    scene.add(meteor.mesh);
  };

  const createSecondMeteor = () => {
    meteorBlue = new MeteorBlue();
    meteorBlue.mesh.scale.set(0.9, 0.9, 0.9);
    meteorBlue.mesh.position.x = 500;
    meteorBlue.mesh.position.y = 1900;
    scene.add(meteorBlue.mesh);
  };

  const createFruits = () => {
    const dropHeights = [100, 576, 1032, 1542, 1922, 2403];
    for (let i = 0, l = dropHeights.length; i < l; i++) {
      let fruit = new Fruit();
      fruit.mesh.scale.set(0.35, 0.35, 0.35);
      fruit.mesh.position.y = dropHeights[i];

      let randomValueX = Math.round(Math.random() * (WIDTH / 30));
      randomValueX = randomValueX * 2;
      let isNegative = Math.round(Math.random() * (1 - 0));
      if (isNegative) {
        randomValueX = -Math.abs(randomValueX);
      }

      fruit.mesh.position.x = randomValueX;
      fruit.mesh.position.z = 5;
      fruit.mesh.rotation.y += Math.random() * 2 - 1;
      scene.add(fruit.mesh);
      fruits.push(fruit);
    }
  };

  const doFruitLogic = () => {
    const fruitPos = new THREE.Vector3();
    fruitPos.setFromMatrixPosition(kiwi.mesh.matrixWorld);

    for (let i = 0, l = fruits.length; i < l; i++) {
      if (fruitPos.distanceTo(fruits[i].mesh.position) <= 25) {
        movementSpeedDouble = 3.6;
        movementSpeedSingle = 3.2;
        scene.remove(fruits[i].mesh);
        setTimeout(() => {
          movementSpeedDouble = 1.8;
          movementSpeedSingle = 1.6;
        }, 2000);
      }
    }
  };

  const doMeteorLogic = () => {
    const meteorPos = new THREE.Vector3();
    meteorPos.setFromMatrixPosition(kiwi.mesh.matrixWorld);

    if (meteorPos.distanceTo(meteor.mesh.position) <= 45) {
      const $crashed = document.querySelector(`.crashed-container`);
      const $game = document.querySelector(`.game-container`);
      $game.classList.remove(`active`);
      $crashed.classList.add(`active`);
      backgroundMusic.pause();
      explosion.play();
      resetGame();
      if (isGamepadConnected) {
        const gamepad = navigator.getGamepads()[0];
        gamepad.vibrationActuator.playEffect('dual-rumble', {
          startDelay: 0,
          duration: 500,
          weakMagnitude: 1.0,
          strongMagnitude: 1.0,
        });
      }
    }

    if (meteorPos.distanceTo(meteorBlue.mesh.position) <= 40) {
      const $crashed = document.querySelector(`.crashed-container`);
      const $game = document.querySelector(`.game-container`);
      $game.classList.remove(`active`);
      $crashed.classList.add(`active`);
      backgroundMusic.pause();
      explosion.play();
      resetGame();
      if (isGamepadConnected) {
        const gamepad = navigator.getGamepads()[0];
        gamepad.vibrationActuator.playEffect('dual-rumble', {
          startDelay: 0,
          duration: 500,
          weakMagnitude: 1.0,
          strongMagnitude: 1.0,
        });
      }
    }
  };

  const doPlaneLogic = () => {
    const planePos = new THREE.Vector3();
    planePos.setFromMatrixPosition(kiwi.mesh.matrixWorld);

    if (planePos.distanceTo(plane.mesh.position) <= 50) {
      const $crashed = document.querySelector(`.crashed-container`);
      const $game = document.querySelector(`.game-container`);
      $game.classList.remove(`active`);
      $crashed.classList.add(`active`);
      backgroundMusic.pause();
      explosion.play();
      resetGame();
      if (isGamepadConnected) {
        const gamepad = navigator.getGamepads()[0];
        gamepad.vibrationActuator.playEffect('dual-rumble', {
          startDelay: 0,
          duration: 500,
          weakMagnitude: 1.0,
          strongMagnitude: 1.0,
        });
      }
    }

    const planePos02 = new THREE.Vector3();
    planePos02.setFromMatrixPosition(kiwi.mesh.matrixWorld);

    if (planePos02.distanceTo(plane02.mesh.position) <= 50) {
      const $crashed = document.querySelector(`.crashed-container`);
      const $game = document.querySelector(`.game-container`);
      $game.classList.remove(`active`);
      $crashed.classList.add(`active`);
      backgroundMusic.pause();
      explosion.play();
      resetGame();

      if (isGamepadConnected) {
        const gamepad = navigator.getGamepads()[0];
        gamepad.vibrationActuator.playEffect('dual-rumble', {
          startDelay: 0,
          duration: 500,
          weakMagnitude: 1.0,
          strongMagnitude: 1.0,
        });
      }
    }
  };

  const doAnimalLogic = () => {
    const animalPos = new THREE.Vector3();
    animalPos.setFromMatrixPosition(kiwi.mesh.matrixWorld);

    for (let i = 0, l = worms.length; i < l; i++) {
      if (animalPos.distanceTo(worms[i].mesh.position) <= 30) {
        handleCollision(worms[i]);
        countUpWorms();
      }
    }
  };

  const countUpWorms = () => {
    catched.innerHTML++;
  };

  const handleCollision = currentWorm => {
    hasCollided = true;
    let currentWormIndex = worms.indexOf(currentWorm);
    if (currentWormIndex > -1) {
      worms.splice(currentWormIndex, 1);
      scene.remove(currentWorm.mesh);
    }

    setModalFact(currentWorm.mesh.name);

    modalFact.style.display = 'block';
  };

  const initFactList = () => {
    factList.push(data.troposfeer[Math.floor(Math.random() * data.troposfeer.length)]);
    factList.push(data.stratosfeer[Math.floor(Math.random() * data.stratosfeer.length)]);
    factList.push(data.mesosfeer[Math.floor(Math.random() * data.mesosfeer.length)]);
    factList.push(data.thermosfeer[Math.floor(Math.random() * data.thermosfeer.length)]);
    factList.push(data.exosfeer[Math.floor(Math.random() * data.exosfeer.length)]);
  };

  const setModalFact = index => {
    $trueFalseFact.innerHTML = factList[index].trueFalseFact;
    collidedWorm = index;
  };

  const setRandomQuestion = () => {
    randomQuestion = factList[Math.floor(Math.random() * factList.length)];
  };

  const setModalQuestion = () => {
    modalQuestion.style.display = 'block';
    hasCollided = true;

    $question.innerHTML = randomQuestion.question;
    $answer1.innerHTML = randomQuestion.answers[0];
    $answer2.innerHTML = randomQuestion.answers[1];
    $answer3.innerHTML = randomQuestion.answers[2];
    $answer4.innerHTML = randomQuestion.answers[3];

    correct.innerHTML = randomQuestion.correctAnswer;
  };

  let answeredCorrectly;
  const checkTrueFalse = () => {
    let index = collidedWorm;
    if (isGamepadConnected) {
      const gamepad = navigator.getGamepads()[0];

      const circle = gamepad.buttons[1];
      const triangle = gamepad.buttons[3];

      if(!factAnswered){
        if (triangle.pressed) {
          console.log('triangle pressed');
          if (factList[index].trueFalseAnswers[0] == factList[index].trueFalseCorrect) {
            factAnswered = true;
            answeredCorrectly = true;
            setTimeout(() => {
              $trueFalseFact.innerHTML = factList[index].fact;
              $trueFalseFact.style.color = "#333333";
              $trueFalseFact.style.backgroundColor = "#ffffff"
  
              $changeTitle.innerHTML = "Wist je datje"
              $true.style.display = "none"
              $false.innerHTML = "Sluiten";
              
            }, 400);
            $trueFalseFact.style.color = "rgba(90, 184, 79, 1.00)";
            $trueFalseFact.style.backgroundColor = "rgba(203, 245, 204, 1.00)"
          } else {
            factAnswered = true;
            answeredCorrectly = false;
            setTimeout(() => {
              $trueFalseFact.innerHTML = factList[index].fact;
              $trueFalseFact.style.color = "#333333";
              $trueFalseFact.style.backgroundColor = "#ffffff"
  
              $changeTitle.innerHTML = "Wist je datje"
              $true.style.display = "none"
              $false.innerHTML = "Sluiten";
            }, 400);
            $trueFalseFact.style.color = "rgb(196, 37, 51)";
            $trueFalseFact.style.backgroundColor = "rgba(244, 133, 132, 0.4)"
            gamepad.vibrationActuator.playEffect('dual-rumble', {
              startDelay: 0,
              duration: 500,
              weakMagnitude: 1.0,
              strongMagnitude: 1.0,
            });     
          }
        }
  
        if (circle.pressed) {
          console.log('circle pressed');
          if (factList[index].trueFalseAnswers[1] == factList[index].trueFalseCorrect) {
            answeredCorrectly = true;
            setTimeout(() => {
              factAnswered = true;
              $trueFalseFact.innerHTML = factList[index].fact;
              $trueFalseFact.style.color = "#333333";
              $trueFalseFact.style.backgroundColor = "#ffffff"
  
              $changeTitle.innerHTML = "Wist je datje"
              $true.style.display = "none"
              $false.innerHTML = "Sluiten";
              // if (circle.pressed) {
              //   closeModalFact();
              // }
            }, 400);
            $trueFalseFact.style.color = "rgba(90, 184, 79, 1.00)";
            $trueFalseFact.style.backgroundColor = "rgba(203, 245, 204, 1.00)"
          } else {
            answeredCorrectly = false;
            setTimeout(() => {
              factAnswered = true;
              $trueFalseFact.innerHTML = factList[index].fact;
              $trueFalseFact.style.color = "#333333";
              $trueFalseFact.style.backgroundColor = "#ffffff"
  
              $changeTitle.innerHTML = "Wist je datje"
              $true.style.display = "none"
              $false.innerHTML = "Sluiten";
              
            }, 400);
            $trueFalseFact.style.color = "rgb(196, 37, 51)";
            $trueFalseFact.style.backgroundColor = "rgba(244, 133, 132, 0.4)"
            gamepad.vibrationActuator.playEffect('dual-rumble', {
              startDelay: 0,
              duration: 500,
              weakMagnitude: 1.0,
              strongMagnitude: 1.0,
            });
          }
        }
      }else{
        if (circle.pressed) {
          closeModalFact();
          if(answeredCorrectly == true) {
            removeSeconds();
          }
          factAnswered = false;
          $changeTitle.innerHTML = "Waar of niet waar?"
          $true.style.display = "flex"
          $false.innerHTML = "Niet waar";
        }
      }
      
    }
  };

  const closeModalFact = () => {
    modalFact.style.display = 'none';
    hasCollided = false;
  };

  const removeSeconds = () => {
    if(sec > 10){
      sec = sec - 10;
    } else {
      sec = 0;
    }
  };

  const checkAnswer = () => {
    if (isGamepadConnected) {
      const gamepad = navigator.getGamepads()[0];

      const cross = gamepad.buttons[0];
      const circle = gamepad.buttons[1];
      const square = gamepad.buttons[2];
      const triangle = gamepad.buttons[3];

      const $certificate = document.querySelector(`.certificate-container`);
      const $lost = document.querySelector(`.lost-container`);

      if (square.pressed) {
        console.log('square pressed');
        setTimeout(() => {
          if (randomQuestion.answers[0] == randomQuestion.correctAnswer) {
            saveBestTime(true);
            $game.classList.remove(`active`);
            $certificate.classList.add(`active`);
            backgroundMusic.pause();
            win.play();
          } else {
            saveBestTime(false);
            $game.classList.remove(`active`);
            $lost.classList.add(`active`);
            backgroundMusic.pause();
            gameOver.play();
          }
        }, 100);
      }

      if (triangle.pressed) {
        console.log('triangle pressed');
        setTimeout(() => {
          if (randomQuestion.answers[1] == randomQuestion.correctAnswer) {
            saveBestTime(true);
            $game.classList.remove(`active`);
            $certificate.classList.add(`active`);
            backgroundMusic.pause();
            win.play();
          } else {
            saveBestTime(false);
            $game.classList.remove(`active`);
            $lost.classList.add(`active`);
            backgroundMusic.pause();
            gameOver.play();
          }
        }, 100);
      }

      if (circle.pressed) {
        console.log('circle pressed');
        setTimeout(() => {
          if (randomQuestion.answers[2] == randomQuestion.correctAnswer) {
            saveBestTime(true);
            $game.classList.remove(`active`);
            $certificate.classList.add(`active`);
            backgroundMusic.pause();
            win.play();
          } else {
            saveBestTime(false);
            $game.classList.remove(`active`);
            $lost.classList.add(`active`);
            backgroundMusic.pause();
            gameOver.play();
          }
        }, 100);
      }

      if (cross.pressed) {
        console.log('cross pressed');
        setTimeout(() => {
          if (randomQuestion.answers[3] == randomQuestion.correctAnswer) {
            saveBestTime(true);
            $game.classList.remove(`active`);
            $certificate.classList.add(`active`);
            backgroundMusic.pause();
            win.play();
          } else {
            saveBestTime(false);
            $game.classList.remove(`active`);
            $lost.classList.add(`active`);
            backgroundMusic.pause();
            gameOver.play();
          }
        }, 100);
      }
    }
  };

  const saveBestTime = isCorrect => {
    scoredMinutes = document.getElementById('minutes').innerHTML;
    scoredSeconds = document.getElementById('seconds').innerHTML;

    console.log(scoredMinutes, scoredSeconds);

    document.getElementsByClassName('certificate-time__minutes')[0].innerHTML = scoredMinutes;
    document.getElementsByClassName('certificate-time__seconds')[0].innerHTML = scoredSeconds;

    if (isCorrect) {
      if (
        !savedMinutes ||
        !savedSeconds ||
        (scoredMinutes == savedMinutes && scoredSeconds < savedSeconds) ||
        scoredMinutes < savedMinutes
      ) {
        localStorage.setItem('minutes', scoredMinutes);
        localStorage.setItem('seconds', scoredSeconds);
        savedMinutes = scoredMinutes;
        savedSeconds = scoredSeconds;
      }
    }

    document.getElementsByClassName('certificate-best__minutes')[0].innerHTML = localStorage.getItem('minutes');
    document.getElementsByClassName('certificate-best__seconds')[0].innerHTML = localStorage.getItem('seconds');

    setTimeout(() => {
      resetGame();
    }, 500);
  };

  const showBestTime = () => {
    let bestMinutes = document.getElementById('bestMinutes');
    let bestSeconds = document.getElementById('bestSeconds');
    bestMinutes.innerHTML = savedMinutes;
    bestSeconds.innerHTML = savedSeconds;
  };

  const resetGame = () => {
    sec = 0;
    backgroundMusic.currentTime = 0;
    document.getElementById('minutes').innerHTML = 0;
    document.getElementById('seconds').innerHTML = 0;
    catched.innerHTML = 0;
    scoredMinutes = null;
    scoredSeconds = null;

    plane.mesh.position.x = -250;
    plane.mesh.position.y = 20;

    plane02.mesh.position.x = 250;
    plane02.mesh.position.y = 40;

    meteor.mesh.position.x = -300;
    meteor.mesh.position.y = 1500;

    meteorBlue.mesh.position.x = 500;
    meteorBlue.mesh.position.y = 1900;

    kiwi.mesh.position.x = -10;
    kiwi.mesh.position.y = 0;
    camera.position.y = kiwi.mesh.position.y + 30;
    modalQuestion.style.display = 'none';
    for (let i = 0; i < worms.length; i++) {
      scene.remove(worms[i].mesh);
    }
    worms = [];
    haveWormsDropped = [false, false, false, false, false];

    for (let i = 0; i < fruits.length; i++) {
      scene.remove(fruits[i].mesh);
    }
    fruits = [];
    factList = [];
    hasCollided = false;
    initFactList();
    showBestTime();
    createFruits();
  };

  const pad = val => {
    return val > 9 ? val : '0' + val;
  };

  const timer = setInterval(function() {
    if ($world.classList.contains('active')) {
      let minutes = document.getElementById('minutes');
      let seconds = document.getElementById('seconds');
      seconds.innerHTML = pad(++sec % 60);
      minutes.innerHTML = pad(parseInt(sec / 60, 10));
    }
  }, 1000);

  //wordt 60 keer per seconde uitgevoerd
  const render = () => {
    doPlaneLogic();
    doMeteorLogic();
    doAnimalLogic();
    doFruitLogic();
    requestAnimationFrame(render);

    if (kiwi.mesh.position.x < -160) {
      kiwi.mesh.position.x = -160;
    }

    if (kiwi.mesh.position.x > 135) {
      kiwi.mesh.position.x = 135;
    }

    if (kiwi.mesh.position.y > 110) {
      plane.mesh.position.x = plane.mesh.position.x + 0.4;
      plane.mesh.position.y = 360;
    }

    if (kiwi.mesh.position.y > 1100) {
      meteor.mesh.position.x = meteor.mesh.position.x + 1;
      meteor.mesh.position.y = meteor.mesh.position.y - 0.5;
      meteor.mesh.rotation.z = meteor.mesh.rotation.z - 0.06;
    }

    if (kiwi.mesh.position.y > 1350) {
      meteorBlue.mesh.position.x = meteorBlue.mesh.position.x - 0.8;
      meteorBlue.mesh.position.y = meteorBlue.mesh.position.y - 0.4;
      meteorBlue.mesh.rotation.z = meteorBlue.mesh.rotation.z + 0.06;
    }

    if (kiwi.mesh.position.y > 190) {
      plane02.mesh.position.x = plane02.mesh.position.x - 0.5;
      plane02.mesh.position.y = 450;
    }

    plane.propeller.rotation.x += 0.3;
    plane02.propeller.rotation.x += 0.4;

    //Stel de aangesloten gamepad in
    if (isGamepadConnected && $game.classList.contains('active')) {
      const gamepad = navigator.getGamepads()[0];

      const joystickLeftY = applyDeadzone(gamepad.axes[1], 0.25);
      const joystickRightY = applyDeadzone(gamepad.axes[3], 0.25);

      const circle = gamepad.buttons[1];

      const triggerLeft = gamepad.buttons[6];
      const triggerRight = gamepad.buttons[7];

      if (Math.round(kiwi.mesh.position.y) > 2400) {
        $height.innerHTML = Math.round(kiwi.mesh.position.y * 3.33);
      } else if (Math.round(kiwi.mesh.position.y) > 1800) {
        $height.innerHTML = Math.round(kiwi.mesh.position.y * 0.417);
      } else if (Math.round(kiwi.mesh.position.y) > 1170) {
        $height.innerHTML = Math.round(kiwi.mesh.position.y / 21.9);
      } else if (Math.round(kiwi.mesh.position.y) > 720) {
        $height.innerHTML = Math.round(kiwi.mesh.position.y * 0.044);
      } else if (Math.round(kiwi.mesh.position.y) > 0) {
        $height.innerHTML = Math.round(kiwi.mesh.position.y / 32.6);
      } else {
        $height.innerHTML = 0;
      }

      if (kiwi.mesh.position.y > 100 && !haveWormsDropped[0]) {
        worms.push(createBrainfood(350, '0'));
        haveWormsDropped[0] = true;
      }
      if (kiwi.mesh.position.y > 850 && !haveWormsDropped[1]) {
        worms.push(createBrainfood(1000, '1'));
        haveWormsDropped[1] = true;
      }
      if (kiwi.mesh.position.y > 1400 && !haveWormsDropped[2]) {
        worms.push(createBrainfood(1600, '2'));
        haveWormsDropped[2] = true;
      }
      if (kiwi.mesh.position.y > 1900 && !haveWormsDropped[3]) {
        worms.push(createBrainfood(2150, '3'));
        haveWormsDropped[3] = true;
      }
      if (kiwi.mesh.position.y > 2400 && !haveWormsDropped[4]) {
        worms.push(createBrainfood(2750, '4'));
        haveWormsDropped[4] = true;
      }

      for (let i = 0, l = worms.length; i < l; i++) {
        worms[i].mesh.position.y -= 0.7;
      }

      kiwi.reset();

      if (!hasCollided) {
        camera.position.y = kiwi.mesh.position.y + 30;

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

        if (kiwi.mesh.position.y > 0) {
          let fallDownAmount = 0.3;
          if (joystickRightY === 0 && joystickLeftY === 0) {
            fallDownAmount = 0.8;
          }
          kiwi.mesh.position.y -= fallDownAmount;
        }
      }

      if (kiwi.mesh.position.y > 3050) {
        if (!hasCollided) {
          setRandomQuestion();
          setModalQuestion();
        }
        checkAnswer();
      }

      if (hasCollided) {
        checkTrueFalse();
      }

      if (triggerLeft.value > 0 && triggerRight.value > 0 && kiwi.mesh.position.y > 0 && kiwi.mesh.position.y < 3045) {
        kiwi.mesh.scale.set(0.85, 0.85, 0.85);
        kiwi.mesh.position.y -= 1;
      } else {
        kiwi.mesh.scale.set(0.8, 0.8, 0.8);
      }
    }

    renderer.render(scene, camera);
  };

  init();
}