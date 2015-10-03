registerDemo(function(engine) {

    var stars;

    document.title = "Skybox With Particules";

    var numParticles = 100000;

    this.setup = function(callback) {
        J3D.Loader.loadGLSL("shaders/MillionParticles.glsl", function(s) {
            onShader(s);
            callback.call(null);
        });
    }

    function onShader(s) {
        var camera = new J3D.Transform();
        camera.camera = new J3D.Camera();
        camera.position.z = 100;
        engine.scene.setCamera(camera);

        stars = new J3D.Transform();
        stars.renderer = s
        stars.renderer.drawMode = gl.POINTS;

        stars.geometry = new J3D.Geometry();
        stars.geometry.addArray("aVertexPosition", J3D.ParticleUtil.insideCube(numParticles, 400), 3);
        stars.geometry.addArray("aVertexColor", J3D.ParticleUtil.randomColors(numParticles, 0.5), 4);

        engine.scene.add(stars, camera);
    }

    this.render = function(interactor) {
        stars.renderer.uColor = [53 , 96, 255, 255];

        engine.render();
    }

    return this;
});