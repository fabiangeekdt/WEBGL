registerDemo(function(engine) {
	document.title = "Skybox Geekdt ! J3D";
	
	var root;
	var mx = 0, my = 0;
	
	this.setup = function(callback){
		var assetsLoader = new J3D.AssetLoader();
		
		assetsLoader.addCubemap("cubemap",{
			left: "models/textures/left.png",
			right: "models/textures/right.png",
			up: "models/textures/top.png",
			down: "models/textures/bottom.png",
			back: "models/textures/back.png",
			front: "models/textures/front.png"
		});
		
		assetsLoader.load(function(a){
			setup(a, callback);
		});
	}
	
	function setup(assets, callback){
		var camera = new J3D.Transform();
		camera.camera = new J3D.Camera({far: 100});
		camera.position.z = 4;
		engine.scene.setCamera(camera);
		
		root = new J3D.Transform();
		root.add(camera);
		engine.scene.add(root);
		
		engine.scene.addSkybox(assets.cubemap);

		callback();
	}

    function onMouseMove(e){
    	mx = ((e.clientX / window.innerWidth  ) * 2 -1 ) * Math.PI * - 2;
    	my = ((e.clienty / window.innerHeight ) * 2 -1 ) * Math.PI * - 0.25
    }

	this.render = function(interactor){
		
		root.rotation.y += 0.0015;
		//root.rotation.y = mx;
		//root.rotation.x = my;
		//root.rotation.x += interactor.centerX * J3D.Time.deltaTime / 1000;
		//root.rotation.y += interactor.centerY * J3D.Time.deltaTime / 2000;
		engine.render();
	}
	
	return this;
});
