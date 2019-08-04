import Colors from './Colors.js';

class Plane {
    constructor() {

    this.mesh = new THREE.Object3D();

    const geomCockpit = new THREE.BoxGeometry(80,50,50,1,1,1);
    const matCockpit = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});

    geomCockpit.vertices[4].y-=10;
    geomCockpit.vertices[4].z+=20;
    geomCockpit.vertices[5].y-=10;
    geomCockpit.vertices[5].z-=20;
    geomCockpit.vertices[6].y+=30;
    geomCockpit.vertices[6].z+=20;
    geomCockpit.vertices[7].y+=30;
    geomCockpit.vertices[7].z-=20;
    
    const cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);
	
	const geomEngine = new THREE.BoxGeometry(20,50,50,1,1,1);
	const matEngine = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
	const engine = new THREE.Mesh(geomEngine, matEngine);
	engine.position.x = 40;
	engine.castShadow = true;
	engine.receiveShadow = true;
	this.mesh.add(engine);
	
	const geomTailPlane = new THREE.BoxGeometry(15,20,5,1,1,1);
	const matTailPlane = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
	const tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
	tailPlane.position.set(-35,25,0);
	tailPlane.castShadow = true;
	tailPlane.receiveShadow = true;
	this.mesh.add(tailPlane);
	
	const geomSideWing = new THREE.BoxGeometry(40,8,150,1,1,1);
	const matSideWing = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
	const sideWing = new THREE.Mesh(geomSideWing, matSideWing);
	sideWing.castShadow = true;
	sideWing.receiveShadow = true;
	this.mesh.add(sideWing);
	
	const geomPropeller = new THREE.BoxGeometry(20,10,10,1,1,1);
	const matPropeller = new THREE.MeshPhongMaterial({color:Colors.darkBrown, shading:THREE.FlatShading});
	this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
	this.propeller.castShadow = true;
	this.propeller.receiveShadow = true;
	
	const geomBlade = new THREE.BoxGeometry(1,100,20,1,1,1);
	const matBlade = new THREE.MeshPhongMaterial({color:Colors.darkBrown, shading:THREE.FlatShading});
	
	const blade = new THREE.Mesh(geomBlade, matBlade);
	blade.position.set(8,0,0);
	blade.castShadow = true;
	blade.receiveShadow = true;
	this.propeller.add(blade);
	this.propeller.position.set(50,0,0);
	this.mesh.add(this.propeller);
    }
}

export default Plane;