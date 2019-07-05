import Colors from './Colors.js';


class Kiwi {

    constructor() {

    this.mesh = new THREE.Object3D();
    
    //Head
    const geometryHead = new THREE.SphereGeometry( 16, 8, 8 );
    const materialHead = new THREE.MeshPhongMaterial({color:Colors.colorBody, shading:THREE.FlatShading});

    const sphereHead = new THREE.Mesh( geometryHead, materialHead );
    sphereHead.position.set(0,25,0);
    sphereHead.castShadow = true;
    sphereHead.receiveShadow = true;
    this.mesh.add(sphereHead)

    //Body
    const geometryBody = new THREE.SphereGeometry( 13, 7, 5 );
    const materialBody = new THREE.MeshPhongMaterial({color:Colors.colorBody, shading:THREE.FlatShading});

    const sphereBody = new THREE.Mesh( geometryBody, materialBody );
    sphereBody.position.set(0,-1.5,0);
    sphereBody.castShadow = true;
    sphereBody.receiveShadow = true;
    this.mesh.add(sphereBody)


    //Hat
    const geometryHat = new THREE.SphereBufferGeometry(15.4, 8, 6, 0, 2*Math.PI, 0, 0.5 * Math.PI);
    const materialHat = new THREE.MeshPhongMaterial({color:Colors.darkBrown, shading:THREE.FlatShading});
    const sphereHat = new THREE.Mesh( geometryHat, materialHat );
    materialHat.side = THREE.DoubleSide;
    sphereHat.position.set(0,28,0);

    this.mesh.add( sphereHat );

    const geometryEarLeft = new THREE.SphereGeometry( 9, 15, 15 );
    const materialEarLeft = new THREE.MeshPhongMaterial({color:Colors.darkBrown, shading:THREE.FlatShading});

    const sphereEarLeft = new THREE.Mesh( geometryEarLeft, materialEarLeft );
    sphereEarLeft.position.set(-8,24.5,0);
    sphereEarLeft.castShadow = true;
    sphereEarLeft.receiveShadow = true;
    this.mesh.add(sphereEarLeft)

    const geometryEarRight = new THREE.SphereGeometry( 9, 15, 15 );
    const materialEarRight = new THREE.MeshPhongMaterial({color:Colors.darkBrown, shading:THREE.FlatShading});

    const sphereEarRight = new THREE.Mesh( geometryEarRight, materialEarRight );
    sphereEarRight.position.set(8,24.5,0);
    sphereEarRight.castShadow = true;
    sphereEarRight.receiveShadow = true;
    this.mesh.add(sphereEarRight)


    //Goggles
    const geometryLeftgoggle = new THREE.CircleGeometry( 5.5, 32 );
    const materialLeftgoggle = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
    const sphereLeftgoggle = new THREE.Mesh( geometryLeftgoggle, materialLeftgoggle );
    sphereLeftgoggle.position.set(-5.5,36,11.8);
    sphereLeftgoggle.rotation.x -= .3;
    sphereLeftgoggle.rotation.y -= .4;
    this.mesh.add( sphereLeftgoggle );

    const geometryLeftgoggleglass = new THREE.CircleGeometry( 4.2, 32 );
    const materialLeftgoggleglass = new THREE.MeshPhongMaterial({color:Colors.lightBlue, shading:THREE.FlatShading});
    const sphereLeftgoggleglass = new THREE.Mesh( geometryLeftgoggleglass, materialLeftgoggleglass );
    sphereLeftgoggleglass.position.set(-5.5,36,12);
    sphereLeftgoggleglass.rotation.x -= .3;
    sphereLeftgoggleglass.rotation.y -= .4;
    this.mesh.add( sphereLeftgoggleglass );

    const geometryRightgoggle = new THREE.CircleGeometry( 5.5, 32 );
    const materialRightgoggle = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
    const sphereRightgoggle = new THREE.Mesh( geometryRightgoggle, materialRightgoggle );
    sphereRightgoggle.position.set(5.5,36,11.8);
    sphereRightgoggle.rotation.x -= .3;
    sphereRightgoggle.rotation.y += .4;
    this.mesh.add( sphereRightgoggle );

    const geometryRightgoggleglass = new THREE.CircleGeometry( 4.2, 32 );
    const materialRightgoggleglass = new THREE.MeshPhongMaterial({color:Colors.lightBlue, shading:THREE.FlatShading});
    const sphereRightgoggleglass = new THREE.Mesh( geometryRightgoggleglass, materialRightgoggleglass );
    sphereRightgoggleglass.position.set(5.5,36,12);
    sphereRightgoggleglass.rotation.x -= .3;
    sphereRightgoggleglass.rotation.y += .4;
    this.mesh.add( sphereRightgoggleglass );

    const geometryBridge = new THREE.BoxGeometry(2.5,2,.5,1,1,1);
	const materialBridge = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});

	const bridge = new THREE.Mesh(geometryBridge, materialBridge);
    bridge.position.set(0,36,13.5);
    bridge.rotation.x -= .3;
    bridge.castShadow = true;
    bridge.receiveShadow = true;
	this.mesh.add(bridge)

    //Left eye
    const geometryLefteye = new THREE.CircleGeometry( 5.5, 32 );
    const materialLefteye = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
    const sphereLefteye = new THREE.Mesh( geometryLefteye, materialLefteye );
    sphereLefteye.position.set(-5.5,25,14.3);
    sphereLefteye.rotation.y -= .3;
    sphereLefteye.castShadow = true;
    sphereLefteye.receiveShadow = true;
    this.mesh.add( sphereLefteye );

    const geometryLefteyepupil = new THREE.CircleGeometry( 4, 32 );
    const materialLefteyepupil = new THREE.MeshPhongMaterial({color:Colors.black, shading:THREE.FlatShading});
    const sphereLefteyepupil = new THREE.Mesh( geometryLefteyepupil, materialLefteyepupil );
    sphereLefteyepupil.position.set(-5.5,25,14.5);
    sphereLefteyepupil.rotation.y -= .3;
    sphereLefteyepupil.castShadow = true;
    sphereLefteyepupil.receiveShadow = true;
    this.mesh.add( sphereLefteyepupil );

    const geometryLefteyelight01 = new THREE.CircleGeometry( 1.8, 20 );
    const materialLefteyelight01 = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
    const sphereLefteyelight01 = new THREE.Mesh( geometryLefteyelight01, materialLefteyelight01 );
    sphereLefteyelight01.position.set(-7.5,27,14.7);
    sphereLefteyelight01.rotation.y -= .3;
    sphereLefteyelight01.castShadow = true;
    sphereLefteyelight01.receiveShadow = true;
    this.mesh.add( sphereLefteyelight01 );

    //Right eye
    const geometryRighteye = new THREE.CircleGeometry( 5.5, 32 );
    const materialRighteye = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
    const sphereRighteye = new THREE.Mesh( geometryRighteye, materialRighteye );
    sphereRighteye.position.set(5.5,25,14.3);
    sphereRighteye.rotation.y -= -.3;
    sphereRighteye.castShadow = true;
    sphereRighteye.receiveShadow = true;
    this.mesh.add( sphereRighteye );

    const geometryRighteyepupil = new THREE.CircleGeometry( 4, 32 );
    const materialRighteyepupil = new THREE.MeshPhongMaterial({color:Colors.black, shading:THREE.FlatShading});
    const sphereRighteyepupil = new THREE.Mesh( geometryRighteyepupil, materialRighteyepupil );
    sphereRighteyepupil.position.set(5.5,25,14.5);
    sphereRighteyepupil.rotation.y -= -.3;
    sphereRighteyepupil.castShadow = true;
    sphereRighteyepupil.receiveShadow = true;
    this.mesh.add( sphereRighteyepupil );

    const geometryRighteyelight01 = new THREE.CircleGeometry( 1.8, 20 );
    const materialRighteyelight01 = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
    const sphereRighteyelight01 = new THREE.Mesh( geometryRighteyelight01, materialRighteyelight01 );
    sphereRighteyelight01.position.set(3.5,27,15.2);
    sphereRighteyelight01.rotation.y -= -.3;
    sphereRighteyelight01.castShadow = true;
    sphereRighteyelight01.receiveShadow = true;
    this.mesh.add( sphereRighteyelight01 );

    //Snavel
    const geometrySnavel = new THREE.BoxGeometry(5,20,5,1,1,1);
	const materialSnavel = new THREE.MeshPhongMaterial({color:Colors.colorSnavel, shading:THREE.FlatShading});
   
    geometrySnavel.vertices[0].y-=3.5;
    geometrySnavel.vertices[0].x-=1;
    geometrySnavel.vertices[1].x+=1;
    geometrySnavel.vertices[2].x-=2.2;
    geometrySnavel.vertices[2].z+=3;
    geometrySnavel.vertices[3].x-=2.2;
    geometrySnavel.vertices[3].z+=6;
    geometrySnavel.vertices[4].x-=1;
    geometrySnavel.vertices[5].y-=3.5;
    geometrySnavel.vertices[5].x+=1;
    geometrySnavel.vertices[6].x+=2.2;
    geometrySnavel.vertices[6].z+=6;
    geometrySnavel.vertices[7].x+=2.2;
    geometrySnavel.vertices[7].z+=3;

	const snavel = new THREE.Mesh(geometrySnavel, materialSnavel);
	snavel.position.set(0,11,16);
    snavel.castShadow = true;
    snavel.receiveShadow = true;
    this.mesh.add(snavel)
    
    //Jetpack
    const geometryJetLeft = new THREE.CylinderGeometry( 4, 6, 25, 10 );
	const materialJetLeft = new THREE.MeshPhongMaterial({color:Colors.colorSnavel, shading:THREE.FlatShading});
    const jetLeft = new THREE.Mesh( geometryJetLeft, materialJetLeft );
    jetLeft.position.set(-7,3,-14);
    jetLeft.rotation.z -= .1;
    jetLeft.rotation.x -= -.2;
    
    this.mesh.add( jetLeft );


    const geometryFireLeft = new THREE.ConeGeometry( 5, 25, 32 );
    const materialFireLeft = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
    const fireLeft = new THREE.Mesh( geometryFireLeft, materialFireLeft );
    fireLeft.position.set(-7,4,-13.2);
    fireLeft.rotation.z += .1;
    fireLeft.rotation.x -= -3.2;
    this.mesh.add( fireLeft );

    const geometryFireLeftYellow = new THREE.ConeGeometry( 2, 15, 32 );
    const materialFireLeftYellow = new THREE.MeshPhongMaterial({color:Colors.yellow, shading:THREE.FlatShading});
    const fireLeftYellow = new THREE.Mesh( geometryFireLeftYellow, materialFireLeftYellow );
    fireLeftYellow.position.set(-8,-2,-13);
    fireLeftYellow.rotation.z += .1;
    fireLeftYellow.rotation.x -= -3.2;
    this.mesh.add( fireLeftYellow );



    const geometryJetRight = new THREE.CylinderGeometry( 4, 6, 25, 10 );
	const materialJetRight = new THREE.MeshPhongMaterial({color:Colors.colorSnavel, shading:THREE.FlatShading});
    const jetRight = new THREE.Mesh( geometryJetRight, materialJetRight );
    jetRight.position.set(7,3,-14);
    jetRight.rotation.z += .1;
    jetRight.rotation.x -= -.2;
    
    this.mesh.add( jetRight );


    const geometryFireRight = new THREE.ConeGeometry( 5, 25, 32 );
    const materialFireRight = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
    const fireRight = new THREE.Mesh( geometryFireRight, materialFireRight );
    fireRight.position.set(7,4,-13.2);
    fireRight.rotation.z -= .1;
    fireRight.rotation.x -= -3.2;
    this.mesh.add( fireRight );

    const geometryFireRightYellow = new THREE.ConeGeometry( 2, 15, 32 );
    const materialFireRightYellow = new THREE.MeshPhongMaterial({color:Colors.yellow, shading:THREE.FlatShading});
    const fireRightYellow = new THREE.Mesh( geometryFireRightYellow, materialFireRightYellow );
    fireRightYellow.position.set(8,-2,-13);
    fireRightYellow.rotation.z -= .1;
    fireRightYellow.rotation.x -= -3.2;
    this.mesh.add( fireRightYellow )




    const geometryBackpack = new THREE.BoxGeometry(15,15,7,1,1,1);
	const materialBackpack = new THREE.MeshPhongMaterial({color:Colors.colorSnavel, shading:THREE.FlatShading});
    
    geometryBackpack.vertices[1].x-=2;
    geometryBackpack.vertices[1].y-=2;
    geometryBackpack.vertices[4].x+=2;
    geometryBackpack.vertices[4].y-=2;
    geometryBackpack.vertices[2].x+=2;
    geometryBackpack.vertices[2].y-=3;

    geometryBackpack.vertices[7].x-=2;
    geometryBackpack.vertices[7].y-=3;

    geometryBackpack.vertices[3].x-=2;
    geometryBackpack.vertices[3].y+=2;
    geometryBackpack.vertices[6].x+=2;
    geometryBackpack.vertices[6].y+=2;

	const backpack = new THREE.Mesh(geometryBackpack, materialBackpack);
    backpack.position.set(0,10,-19);
    backpack.rotation.x -= -.2;
    backpack.castShadow = true;
    backpack.receiveShadow = true;
    this.mesh.add(backpack)

    const geometryStrapLeft = new THREE.TorusGeometry( 9, 1.5, 10, 100 );
    const materialStrapLeft = new THREE.MeshPhongMaterial({color:Colors.colorSnavel, shading:THREE.FlatShading});
    const strapLeft = new THREE.Mesh( geometryStrapLeft, materialStrapLeft );
    strapLeft.position.set(-6.5,.8,0);
    strapLeft.rotation.y += 1;
    strapLeft.rotation.x += .1;
    this.mesh.add( strapLeft );

    const geometryWingLeft = new THREE.SphereGeometry( 5, 4, 4 );
    const materialWingLeft = new THREE.MeshPhongMaterial({color:Colors.colorBody, shading:THREE.FlatShading});

    const sphereWingLeft = new THREE.Mesh( geometryWingLeft, materialWingLeft );
    sphereWingLeft.position.set(-10,4,6);
    sphereWingLeft.castShadow = true;
    sphereWingLeft.receiveShadow = true;
    this.mesh.add(sphereWingLeft)

    const geometryStrapRight = new THREE.TorusGeometry( 9, 1.5, 10, 100 );
    const materialStrapRight = new THREE.MeshPhongMaterial({color:Colors.colorSnavel, shading:THREE.FlatShading});
    const strapRight = new THREE.Mesh( geometryStrapRight, materialStrapRight );
    strapRight.position.set(6.5,.8,0);
    strapRight.rotation.y -= 1;
    strapRight.rotation.x += .1;
    this.mesh.add( strapRight );

    const geometryWingRight = new THREE.SphereGeometry( 5, 4, 4 );
    const materialWingRight = new THREE.MeshPhongMaterial({color:Colors.colorBody, shading:THREE.FlatShading});

    const sphereWingRight = new THREE.Mesh( geometryWingRight, materialWingRight );
    sphereWingRight.position.set(10,4,6);
    sphereWingRight.castShadow = true;
    sphereWingRight.receiveShadow = true;
    this.mesh.add(sphereWingRight)

    }

    fireLeft() {
        this.mesh.children[18].position.x = -8.5;
        this.mesh.children[18].position.y = -15;
        this.mesh.children[18].position.z = -16;

        this.mesh.children[19].position.x = -8.5;
        this.mesh.children[19].position.y = -12;
        this.mesh.children[19].position.z = -13.2;
    }

    fireRight() {
        this.mesh.children[21].position.x = 8.5;
        this.mesh.children[21].position.y = -15;
        this.mesh.children[21].position.z = -16;

        this.mesh.children[22].position.x = 8.5;
        this.mesh.children[22].position.y = -12;
        this.mesh.children[22].position.z = -13.2;
    }

    reset() {
        this.mesh.children[18].position.x = 0;
        this.mesh.children[18].position.y = 0;
        this.mesh.children[18].position.z = 0;

        this.mesh.children[19].position.x = 0;
        this.mesh.children[19].position.y = 0;
        this.mesh.children[19].position.z = 0;

        this.mesh.children[21].position.x = 0;
        this.mesh.children[21].position.y = 0;
        this.mesh.children[21].position.z = 0;

        this.mesh.children[22].position.x = 0;
        this.mesh.children[22].position.y = 0;
        this.mesh.children[22].position.z = 0;
    }

    //fireLeft.position.set(-7,4,-13.2);
    //fireLeftYellow.position.set(-9,-12,-13);
}
export default Kiwi;