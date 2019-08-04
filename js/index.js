{
    let isGamepadConnected = false;
    
    const $standardMessage = document.querySelector(`.active`);
    const $start = document.querySelector(`.start-container`);
    const $instructions = document.querySelector(`.instructions-container`);
    const $game = document.querySelector(`.game-container`);
    const $certificate = document.querySelector(`.certificate-container`);
    const $lost = document.querySelector(`.lost-container`);
    
    const init = () => {
        switchScreen($standardMessage, $start);
        startToInstructions();
        /*instructionsToGame();*/
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

    const startToInstructions = () => {
        requestAnimationFrame(startToInstructions);
        if(isGamepadConnected){
            const gamepad = navigator.getGamepads()[0];
        
            const cross = gamepad.buttons[0];
            const circle = gamepad.buttons[1];
            const square = gamepad.buttons[2];
            const triangle = gamepad.buttons[3];

            if(cross.pressed && $start.classList.contains('active')){
                switchScreen($start, $game);
            };
            if(square.pressed && $start.classList.contains('active')){
                switchScreen($start, $instructions);
            };

            if(cross.pressed && $instructions.classList.contains('active')){
                switchScreen($instructions, $game);
            };
            if(triangle.pressed && $instructions.classList.contains('active')){
                switchScreen($instructions, $start);
            };

            if(cross.pressed && $certificate.classList.contains('active')){
                switchScreen($certificate, $game);
            };
            if(triangle.pressed && $certificate.classList.contains('active')){
                switchScreen($certificate, $start);
            };

            if(cross.pressed && $lost.classList.contains('active')){
                switchScreen($lost, $game);
            };
            if(triangle.pressed && $lost.classList.contains('active')){
                switchScreen($lost, $start);
            };
        }
    }

    const switchScreen = (previous, next) => {
        previous.classList.remove(`active`);
        next.classList.add(`active`);
    }

    init();
}