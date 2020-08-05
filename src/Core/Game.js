import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';
import { Rhino } from '../Entities/Rhino';

export class Game {
    gameWindow = null;

    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0);
        this.rhino = new Rhino(this.skier, 0, 
            /* Starting position is far enough above to match speeds of both entities */
            ((Constants.GAME_LENGTH / Constants.FRAME_RATE) * Constants.SKIER_STARTING_SPEED) / 2
            -((Constants.GAME_LENGTH / Constants.FRAME_RATE) * Constants.RHINO_SPEED) / 2
        );
        this.obstacleManager = new ObstacleManager();
        this.timestamp = 0.0;
        this.keyDownListener = this.handleKeyDown.bind(this);

        document.addEventListener('keydown', this.keyDownListener);
    }

    init() {
        this.obstacleManager.placeInitialObstacles();

        // Need to have state of game window ready in case of drawing
        this.calculateGameWindow();
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    run() {
        requestAnimationFrame(this.drawLoop.bind(this));
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    drawLoop() {
        // Per MDN, request next frame early instead of later (see https://developer.mozilla.org/en-US/docs/Games/Anatomy)
        requestAnimationFrame(this.drawLoop.bind(this));

        this.canvas.clearCanvas();

        this.drawGameWindow();
    }

    gameLoop(timestamp = performance.now()) {
        // Check if frame is ready to be progressed
        if(timestamp - this.timestamp >= Constants.FRAME_RATE) {
            this.timestamp = timestamp;

            this.updateGameWindow();
        }

        if(this.skier.isDead()) {
            document.removeEventListener('keydown', this.keyDownListener);
        }
        else {
            requestAnimationFrame(this.gameLoop.bind(this));
        }
    }

    // animationLoop() {

    // }

    updateGameWindow() {
        this.skier.move();
        this.rhino.move(this.skier);

        const previousGameWindow = this.gameWindow;
        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);

        this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);
        this.rhino.checkIfKilledSkier(this.assetManager);
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

        this.skier.draw(this.canvas, this.assetManager);
        this.rhino.draw(this.canvas, this.assetManager);
        this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    handleKeyDown(event) {
        switch(event.which) {
            case Constants.KEYS.LEFT:
                this.skier.turnLeft();
                event.preventDefault();
                break;
            case Constants.KEYS.RIGHT:
                this.skier.turnRight();
                event.preventDefault();
                break;
            case Constants.KEYS.UP:
                this.skier.turnUp();
                event.preventDefault();
                break;
            case Constants.KEYS.DOWN:
                this.skier.turnDown();
                event.preventDefault();
                break;
            case Constants.KEYS.SPACE:
                this.skier.jump();
                event.preventDefault();
                break;
        }
    }
}