import Kiwi from './classes/Kiwi.js';
import Brainfood from './classes/Brainfood.js';

{
    let scene,
    WIDTH, HEIGHT,
    camera, fieldOfView, aspectRatio, renderer, certificateContainer,
    hemisphereLight, shadowLight, ambientLight, kiwi, worm;

    const init = () => {
        createScene();
        createLights();
        createKiwi();
        createWorm();
        render();
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
        camera.position.x = 0;
        camera.position.y = 30;
        camera.position.z = 150;
    
        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        renderer.setSize(WIDTH, HEIGHT);
        renderer.shadowMap.enable = true;

        certificateContainer = document.getElementById('certificate-world');
        certificateContainer.appendChild(renderer.domElement)
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

    const createKiwi = () => {
        kiwi = new Kiwi();
        kiwi.mesh.scale.set(.9,.9,.9);
        kiwi.mesh.position.x = 58;
        kiwi.mesh.position.y = 28;
        kiwi.mesh.rotation.y = -.3;
        kiwi.mesh.rotation.x = .1;
        kiwi.mesh.rotation.z = -.05;
        scene.add(kiwi.mesh);
    }

    const createWorm = () => {
        worm = new Brainfood();
        worm.mesh.scale.set(.8,.8,.8);
        worm.mesh.position.x = 27;
        worm.mesh.position.y = 50;
        worm.mesh.rotation.y = .8;
        worm.mesh.rotation.x = .1;
        worm.mesh.rotation.z = .1;
        scene.add(worm.mesh);
    }

    const render = () => {
        requestAnimationFrame( render );
        renderer.render(scene, camera);
    }

    init();
}