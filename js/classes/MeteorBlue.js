import Colors from './Colors.js';

class MeteorBlue {

    constructor() {

    this.mesh = new THREE.Object3D();

    const geometryMeteorBlue = new THREE.SphereGeometry( 25, 6, 6 );
    const materialMeteorBlue = new THREE.MeshPhongMaterial({color:Colors.lightBlue, shading:THREE.FlatShading});

    const sphereMeteorBlue = new THREE.Mesh( geometryMeteorBlue, materialMeteorBlue );
    sphereMeteorBlue.position.set(0,0,0);
    sphereMeteorBlue.castShadow = true;
    sphereMeteorBlue.receiveShadow = true;
    this.mesh.add(sphereMeteorBlue)
    }
}
export default MeteorBlue;