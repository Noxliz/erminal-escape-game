// Initialisation du moteur PlatformerSecureEngine
const engine = new PlatformerSecureEngine({
    canvasId: 'gameCanvas',
    licenseKey: 'YOUR_PLATFORMER_LICENSE_KEY',
    gravity: 0.8,
    friction: 0.7
});

// Configuration des scènes
engine.addScene('terminal', new TerminalScene());
engine.addScene('escape', new EscapeScene());
engine.start();

// Classe principale de la scène Terminal
class TerminalScene {
    constructor() {
        this.commandHistory = [];
        this.currentDirectory = '/home/user';
        this.fileSystem = {
            '/home/user': {
                'log.txt': 'Journal système corrompu... [ERROR] 0x7F3A21\n[WARNING] Interface compromise',
                '.hidden': 'Fichier caché sensible'
            },
            '/etc': {
                'passwd': 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:User,,,:/home/user:/bin/bash'
            },
            '/bin': {
                'unlock': 'Exécutable verrouillé - utilisez "run unlock"'
            }
        };
    }

    init() {
        // Initialisation du terminal
        this.setupTerminal();
        this.printWelcomeMessage();
    }

    setupTerminal() {
        this.terminalOutput = document.getElementById('terminal-output');
        this.commandInput = document.getElementById('command-input');
        
        this.commandInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.processCommand(this.commandInput.value);
                this.commandInput.value = '';
            }
        });
    }

    printWelcomeMessage() {
        this.printToTerminal('Bienvenue dans CODE RUNNER: THE TERMINAL ESCAPE');
        this.printToTerminal('Vous êtes piégé dans une simulation. Trouvez un moyen de vous échapper.');
        this.printToTerminal('Tapez "help" pour la liste des commandes disponibles.\n');
        this.updatePrompt();
    }

    processCommand(cmd) {
        this.commandHistory.push(cmd);
        this.printToTerminal(`$ ${cmd}`);
        
        const [command, ...args] = cmd.split(' ');
        
        switch(command) {
            case 'ls':
                this.listDirectory(args[0] || this.currentDirectory);
                break;
            case 'cat':
                this.readFile(args[0]);
                break;
            case 'cd':
                this.changeDirectory(args[0]);
                break;
            case 'clear':
                this.clearTerminal();
                break;
            case 'run':
                this.runProgram(args[0]);
                break;
            case 'help':
                this.showHelp();
                break;
            default:
                this.printToTerminal(`Commande inconnue: ${command}`);
        }
        
        this.updatePrompt();
    }

    listDirectory(path) {
        const absPath = this.resolvePath(path);
        const dir = this.getDirectory(absPath);
        
        if (!dir) {
            this.printToTerminal(`ls: impossible d'accéder à '${path}': Aucun fichier ou dossier de ce type`);
            return;
        }

        const files = Object.keys(dir).join('  ');
        this.printToTerminal(files);
    }

    readFile(path) {
        if (!path) {
            this.printToTerminal('cat: spécifiez un fichier');
            return;
        }

        const absPath = this.resolvePath(path);
        const [dir, file] = this.splitPath(absPath);
        const directory = this.getDirectory(dir);

        if (!directory || !directory[file]) {
            this.printToTerminal(`cat: ${path}: Fichier introuvable`);
            return;
        }

        this.printToTerminal(directory[file]);
    }

    changeDirectory(path) {
        if (!path) {
            this.currentDirectory = '/home/user';
            return;
        }

        const absPath = this.resolvePath(path);
        if (this.getDirectory(absPath)) {
            this.currentDirectory = absPath;
        } else {
            this.printToTerminal(`cd: ${path}: Dossier introuvable`);
        }
    }

    clearTerminal() {
        this.terminalOutput.innerHTML = '';
    }

    runProgram(program) {
        if (!program) {
            this.printToTerminal('run: spécifiez un programme');
            return;
        }

        const absPath = `/bin/${program}`;
        const [dir, file] = this.splitPath(absPath);
        const directory = this.getDirectory(dir);

        if (!directory || !directory[file]) {
            this.printToTerminal(`run: ${program}: Programme introuvable`);
            return;
        }

        if (program === 'unlock') {
            this.printToTerminal('Séquence de déverrouillage initiée...');
            setTimeout(() => {
                engine.loadScene(new EscapeScene());
            }, 2000);
        } else {
            this.printToTerminal(directory[file]);
        }
    }

    showHelp() {
        const helpText = [
            'Commandes disponibles:',
            'ls [dir]      - Lister les fichiers',
            'cat <file>    - Afficher un fichier',
            'cd [dir]      - Changer de dossier',
            'clear         - Effacer le terminal',
            'run <program> - Exécuter un programme',
            'help          - Afficher cette aide'
        ].join('\n');
        this.printToTerminal(helpText);
    }

    // Méthodes utilitaires
    resolvePath(path) {
        if (path.startsWith('/')) return path;
        return `${this.currentDirectory}/${path}`.replace(/\/+/g, '/');
    }

    splitPath(path) {
        const lastSlash = path.lastIndexOf('/');
        return [path.substring(0, lastSlash), path.substring(lastSlash + 1)];
    }

    getDirectory(path) {
        const parts = path.split('/').filter(p => p);
        let current = this.fileSystem;

        for (const part of parts) {
            if (!current[part]) return null;
            current = current[part];
        }

        return current;
    }
    
    printToTerminal(text) {
        const line = document.createElement('div');
        line.textContent = text;
        this.terminalOutput.appendChild(line);
        this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
    }

    updatePrompt() {
        document.querySelector('.prompt').textContent = 
            `user@simulation:${this.currentDirectory}$ `;
    }
}

// Scène d'évasion
class EscapeScene {
    constructor() {
        this.message = 'FÉLICITATIONS! Vous avez réussi à vous échapper de la simulation.';
    }

    init() {
        document.getElementById('terminal-overlay').style.display = 'none';
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = '24px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText(this.message, canvas.width/2, canvas.height/2);
    }
}

// Initialisation du jeu
engine.init();
engine.loadScene(new TerminalScene());
