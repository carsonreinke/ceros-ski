import { Game } from './Game';
import * as Constants from '../Constants';

jest.mock('./AssetManager');
jest.mock('./Canvas');

let game;

beforeEach(() => {
    game = new Game();
});

describe('run', () => {
    it('should call request animation', async () => {
        jest.spyOn(game, 'drawLoop');
        jest.spyOn(game, 'gameLoop');
        jest.spyOn(game, 'animationLoop');

        await game.load();
        game.init();
        game.run();

        expect(game.drawLoop).toHaveBeenCalled();
        expect(game.gameLoop).toHaveBeenCalled();
        expect(game.animationLoop).toHaveBeenCalled();
    });
});

describe('drawLoop', () => {
    it('should call request animation', async () => {
        jest.spyOn(window, 'requestAnimationFrame');

        await game.load();
        game.init();
        game.drawLoop();

        expect(window.requestAnimationFrame).toHaveBeenCalled();
    });
});

describe('gameLoop', () => {
    it('should update game when frame rate passed', async () => {
        const timestamp = Constants.FRAME_RATE + 1;

        jest.spyOn(game, 'updateGameWindow');

        await game.load();
        game.init();
        game.gameLoop(timestamp);

        expect(game.updateGameWindow).toHaveBeenCalled();
    });

    it('should not update game when frame rate has not passed', async () => {
        const timestamp = Constants.FRAME_RATE - 1;

        jest.spyOn(game, 'updateGameWindow');

        await game.load();
        game.init();
        game.gameLoop(timestamp);

        expect(game.updateGameWindow).not.toHaveBeenCalled();
    });

    it('should call request animation', async () => {
        jest.spyOn(window, 'requestAnimationFrame');

        await game.load();
        game.init();
        game.gameLoop();

        expect(window.requestAnimationFrame).toHaveBeenCalled();
    });

    it('should not call request animation when game over', async () => {
        jest.spyOn(window, 'requestAnimationFrame');

        game.skier.die();

        await game.load();
        game.init();
        game.gameLoop();

        expect(window.requestAnimationFrame).not.toHaveBeenCalled();
    });

    it('should remove event listener when game over', async () => {
        jest.spyOn(document, 'removeEventListener');

        game.skier.die();

        await game.load();
        game.init();
        game.gameLoop();

        expect(document.removeEventListener).toHaveBeenCalled();
    });
});

describe('animationLoop', () => {
    it('should call set timeout', async () => {
        jest.spyOn(window, 'setTimeout');

        game.animationLoop();

        expect(window.setTimeout).toHaveBeenCalled();
    });

    it('should call tick', async () => {
        jest.spyOn(game.animationManager, 'tick');

        game.animationLoop();

        expect(game.animationManager.tick).toHaveBeenCalled();
    });
});

describe('handleKeyDown', () => {
    it('should trigger jump on space', async () => {
        jest.spyOn(game.skier, 'jump');

        await game.load();
        game.init();

        game.handleKeyDown(new KeyboardEvent('keydown', { which: 32 }));

        expect(game.skier.jump).toHaveBeenCalled();
    });
});