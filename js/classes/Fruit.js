import Colors from './Colors.js';


class Fruit {

    constructor() {

    this.mesh = new THREE.Object3D();

    //Peel
    const geomPeel = new THREE.SphereBufferGeometry(15.4, 16, 6, 0, 2*Math.PI, 0, 0.5 * Math.PI);
    const materialPeel = new THREE.MeshPhongMaterial({color:Colors.darkBrown, shading:THREE.FlatShading});
    const spherePeel = new THREE.Mesh( geomPeel, materialPeel );
    materialPeel.side = THREE.DoubleSide;
    spherePeel.position.set(14,28,0);
    spherePeel.rotation.x = -1.7;

    this.mesh.add( spherePeel );

    const geometryOuter = new THREE.CircleGeometry( 14.5, 16 );
    const materialOuter = new THREE.MeshBasicMaterial( { color: Colors.white } );
    const circleOuter = new THREE.Mesh( geometryOuter, materialOuter );
    this.mesh.add( circleOuter );
    circleOuter.position.set(14,28,-.4);

    const geometry = new THREE.CircleGeometry( 13.5, 16 );
    const material = new THREE.MeshBasicMaterial( { color: Colors.green } );
    const circle = new THREE.Mesh( geometry, material );
    this.mesh.add( circle );
    circle.position.set(14,28,0);

    const geometryMiddle = new THREE.CircleGeometry( 5, 16 );
    const materialMiddle = new THREE.MeshBasicMaterial( { color: Colors.white } );
    const circleMiddle = new THREE.Mesh( geometryMiddle, materialMiddle );
    this.mesh.add( circleMiddle );
    circleMiddle.position.set(14,28,0.2);

    //seeds
    const geometrySeed01 = new THREE.ConeBufferGeometry( 1, 4, 5 );
    const materialSeed01 = new THREE.MeshBasicMaterial( {color: Colors.black} );
    const seed01 = new THREE.Mesh( geometrySeed01, materialSeed01 );
    this.mesh.add( seed01 );

    seed01.position.set(14,22,-.2);

    const geometrySeed02 = new THREE.ConeBufferGeometry( 1, 4, 5 );
    const materialSeed02 = new THREE.MeshBasicMaterial( {color: Colors.black} );
    const seed02 = new THREE.Mesh( geometrySeed02, materialSeed02 );
    this.mesh.add( seed02 );

    seed02.position.set(20,28,-.2);
    seed02.rotation.z = 1.7;

    const geometrySeed03 = new THREE.ConeBufferGeometry( 1, 4, 5 );
    const materialSeed03 = new THREE.MeshBasicMaterial( {color: Colors.black} );
    const seed03 = new THREE.Mesh( geometrySeed03, materialSeed03 );
    this.mesh.add( seed03 );

    seed03.position.set(14,34,-.2);
    seed03.rotation.z = 3;

    const geometrySeed04 = new THREE.ConeBufferGeometry( 1, 4, 5 );
    const materialSeed04 = new THREE.MeshBasicMaterial( {color: Colors.black} );
    const seed04 = new THREE.Mesh( geometrySeed04, materialSeed04 );
    this.mesh.add( seed04 );

    seed04.position.set(8,28,-.2);
    seed04.rotation.z = 4.7;

    const geometrySeed05 = new THREE.ConeBufferGeometry( 1, 4, 5 );
    const materialSeed05 = new THREE.MeshBasicMaterial( {color: Colors.black} );
    const seed05 = new THREE.Mesh( geometrySeed05, materialSeed05 );
    this.mesh.add( seed05 );

    seed05.position.set(18,24,-.2);
    seed05.rotation.z = .8;

    const geometrySeed06 = new THREE.ConeBufferGeometry( 1, 4, 5 );
    const materialSeed06 = new THREE.MeshBasicMaterial( {color: Colors.black} );
    const seed06 = new THREE.Mesh( geometrySeed06, materialSeed06 );
    this.mesh.add( seed06 );

    seed06.position.set(18,32,-.2);
    seed06.rotation.z = 2.4;

    const geometrySeed07 = new THREE.ConeBufferGeometry( 1, 4, 5 );
    const materialSeed07 = new THREE.MeshBasicMaterial( {color: Colors.black} );
    const seed07 = new THREE.Mesh( geometrySeed07, materialSeed07 );
    this.mesh.add( seed07 );

    seed07.position.set(10,32,-.2);
    seed07.rotation.z = 4;

    const geometrySeed08 = new THREE.ConeBufferGeometry( 1, 4, 5 );
    const materialSeed08 = new THREE.MeshBasicMaterial( {color: Colors.black} );
    const seed08 = new THREE.Mesh( geometrySeed08, materialSeed08 );
    this.mesh.add( seed08 );

    seed08.position.set(10,24,-.2);
    seed08.rotation.z = 5.5; 
    }
}

export default Fruit;