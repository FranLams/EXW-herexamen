import Colors from './Colors.js';

class Kiwi {
    constructor() {

    this.mesh = new THREE.Object3D();
	
    const geometryHead = new THREE.SphereGeometry( 15, 8, 8 );
    const materialHead = new THREE.MeshPhongMaterial({color:Colors.blue, shading:THREE.FlatShading});

    const sphereHead = new THREE.Mesh( geometryHead, materialHead );
    sphereHead.position.set(0,25,0);
    sphereHead.castShadow = true;
    sphereHead.receiveShadow = true;
    this.mesh.add(sphereHead)

    //Left eye
    const geometryLefteye = new THREE.SphereGeometry( 5, 7, 7);
    const materialLefteye = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});

    const sphereLefteye = new THREE.Mesh( geometryLefteye, materialLefteye );
    sphereLefteye.position.set(-5,25,13);
    sphereLefteye.castShadow = true;
    sphereLefteye.receiveShadow = true;
    this.mesh.add(sphereLefteye)

    const geometryLefteyepupil = new THREE.SphereGeometry( 3, 7, 7 );
    const materialLefteyepupil = new THREE.MeshPhongMaterial({color:Colors.black, shading:THREE.FlatShading});

    const sphereLefteyepupil = new THREE.Mesh( geometryLefteyepupil, materialLefteyepupil );
    sphereLefteyepupil.position.set(-5.5,25,16.5);
    sphereLefteyepupil.castShadow = true;
    sphereLefteyepupil.receiveShadow = true;
    this.mesh.add(sphereLefteyepupil)

    const geometryLefteyelight01 = new THREE.SphereGeometry( 1, 5, 5 );
    const materialLefteyelight01 = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});

    const sphereLefteyelight01 = new THREE.Mesh( geometryLefteyelight01, materialLefteyelight01 );
    sphereLefteyelight01.position.set(-6.7,25.8,18.5);
    sphereLefteyelight01.castShadow = true;
    sphereLefteyelight01.receiveShadow = true;
    this.mesh.add(sphereLefteyelight01)

    //Right eye
    const geometryRighteye = new THREE.SphereGeometry( 5, 7, 7);
    const materialRighteye = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});

    const sphereRighteye = new THREE.Mesh( geometryRighteye, materialRighteye );
    sphereRighteye.position.set(5,25,13);
    sphereRighteye.castShadow = true;
    sphereRighteye.receiveShadow = true;
    this.mesh.add(sphereRighteye)

    const geometryRighteyepupil = new THREE.SphereGeometry( 3, 7, 7 );
    const materialRighteyepupil = new THREE.MeshPhongMaterial({color:Colors.black, shading:THREE.FlatShading});

    const sphereRighteyepupil = new THREE.Mesh( geometryRighteyepupil, materialRighteyepupil );
    sphereRighteyepupil.position.set(5.5,25,16.5);
    sphereRighteyepupil.castShadow = true;
    sphereRighteyepupil.receiveShadow = true;
    this.mesh.add(sphereRighteyepupil)

    const geometryRighteyelight01 = new THREE.SphereGeometry( 1, 5, 5 );
    const materialRighteyelight01 = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});

    const sphereRighteyelight01 = new THREE.Mesh( geometryRighteyelight01, materialRighteyelight01 );
    sphereRighteyelight01.position.set(4.3,25.8,18.5);
    sphereRighteyelight01.castShadow = true;
    sphereRighteyelight01.receiveShadow = true;
    this.mesh.add(sphereRighteyelight01)


    const geometry = new THREE.SphereGeometry( 11, 7, 4 );
    const material = new THREE.MeshPhongMaterial({color:Colors.blue, shading:THREE.FlatShading});

    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(0,2,0);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    this.mesh.add(sphere)   
	}
}
export default Kiwi;