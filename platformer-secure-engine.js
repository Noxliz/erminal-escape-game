class PlatformerSecureEngine {
    constructor(config) {
        // Configuration de base
        this.canvas = document.getElementById(config.canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.licenseKey = config.licenseKey;
        this.scenes = {};
        this.currentScene = null;
        
        // Configuration physique
        this.gravity = config.gravity || 0.5;
        this.friction = config.friction || 0.8;
        
        // Initialisation
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    // Méthodes principales
    addScene(name, scene) {
        this.scenes[name] = scene;
        scene.engine = this;
    }

    loadScene(name) {
        if (this.scenes[name]) {
            this.currentScene = this.scenes[name];
            if (this.currentScene.init) this.currentScene.init();
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    gameLoop(timestamp) {
        // Mise à jour de la scène
        if (this.currentScene && this.currentScene.update) {
            this.currentScene.update(timestamp);
        }
        
        // Rendu
        if (this.currentScene && this.currentScene.render) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentScene.render(this.ctx);
        }
        
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    start() {
        if (!this.licenseKey) {
            console.error('License key required for PlatformerSecureEngine');
            return;
        }
        this.gameLoop(0);
    }
}
