import Colors from './Colors.js';

class Meteor {

    constructor() {

    this.mesh = new THREE.Object3D();

    const geometryMeteor = new THREE.SphereGeometry( 30, 6, 6 );
    const materialMeteor = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});

    const sphereMeteor = new THREE.Mesh( geometryMeteor, materialMeteor );
    sphereMeteor.position.set(0,0,0);
    sphereMeteor.castShadow = true;
    sphereMeteor.receiveShadow = true;
    this.mesh.add(sphereMeteor)
    }
}
export default Meteor;