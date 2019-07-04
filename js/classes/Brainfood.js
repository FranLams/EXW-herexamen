import Colors from './Colors.js';

function CustomSinCurve( scale ) {

    THREE.Curve.call( this );

    this.scale = ( scale === undefined ) ? 1 : scale;

}

CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
CustomSinCurve.prototype.constructor = CustomSinCurve;

CustomSinCurve.prototype.getPoint = function ( t ) {

    const tx = t * 5 - 1.5;
    const ty = Math.sin( 2 * Math.PI * t );
    const tz = 0;

    return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );
};

class Brainfood {


    constructor() {

    this.mesh = new THREE.Object3D();
    
    //Parachute
    const geometryPara = new THREE.SphereBufferGeometry(15.4, 8, 6, 0, 2*Math.PI, 0, 0.5 * Math.PI);
    const materialPara = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
    const spherePara = new THREE.Mesh( geometryPara, materialPara );
    materialPara.side = THREE.DoubleSide;
    spherePara.position.set(0,20,0);

    this.mesh.add( spherePara );


    const geometryLine01 = new THREE.BoxGeometry(.7,27,.7,1,1,1);
	const materialLine01 = new THREE.MeshPhongMaterial({color:Colors.grayBlue, shading:THREE.FlatShading});

	const line01 = new THREE.Mesh(geometryLine01, materialLine01);
    line01.position.set(-5,10,5);
    line01.rotation.x += .35;
    line01.rotation.z += .45;

    this.mesh.add(line01)
    

    const geometryLine02 = new THREE.BoxGeometry(.7,27,.7,1,1,1);
	const materialLine02 = new THREE.MeshPhongMaterial({color:Colors.grayBlue, shading:THREE.FlatShading});

	const line02 = new THREE.Mesh(geometryLine02, materialLine02);
    line02.position.set(5,11,-5);
    line02.rotation.x -= .35;
    line02.rotation.z -= .45;

    this.mesh.add(line02)
    
    const geometryLine03 = new THREE.BoxGeometry(.7,27,.7,1,1,1);
	const materialLine03 = new THREE.MeshPhongMaterial({color:Colors.grayBlue, shading:THREE.FlatShading});

	const line03 = new THREE.Mesh(geometryLine03, materialLine03);
    line03.position.set(-4.8,10.5,-5);
    line03.rotation.x -= .35;
    line03.rotation.z += .45;

    this.mesh.add(line03)
    

    const geometryLine04 = new THREE.BoxGeometry(.7,27,.7,1,1,1);
	const materialLine04 = new THREE.MeshPhongMaterial({color:Colors.grayBlue, shading:THREE.FlatShading});

	const line04 = new THREE.Mesh(geometryLine04, materialLine04);
    line04.position.set(5,11,5);
    line04.rotation.x += .35;
    line04.rotation.z -= .45;

    this.mesh.add(line04)
    
    //Worm
    const path = new CustomSinCurve( 3 );
    const geometry = new THREE.TubeGeometry( path, 15, 1.5, 10, false );
    const material = new THREE.MeshPhongMaterial({color:Colors.colorSnavel, shading:THREE.FlatShading});
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(-3,0,0);
    this.mesh.add( mesh );

    const geometryHead = new THREE.SphereGeometry( 1.5, 6, 6 );
    const materialHead = new THREE.MeshPhongMaterial({color:Colors.colorSnavel, shading:THREE.FlatShading});

    const sphereHead = new THREE.Mesh( geometryHead, materialHead );
    sphereHead.position.set(-7.5,0,0);
    sphereHead.castShadow = true;
    sphereHead.receiveShadow = true;
    this.mesh.add(sphereHead)

    const geometryTail = new THREE.SphereGeometry( 1.6, 6, 6 );
    const materialTail = new THREE.MeshPhongMaterial({color:Colors.colorSnavel, shading:THREE.FlatShading});

    const sphereTail = new THREE.Mesh( geometryTail, materialTail );
    sphereTail.position.set(7.5,0,0);
    sphereTail.castShadow = true;
    sphereTail.receiveShadow = true;
    this.mesh.add(sphereTail)
    }

}

export default Brainfood;