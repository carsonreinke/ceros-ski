import { Game } from './Game';
import * as Constants from '../Constants';

jest.mock('./AssetManager');
jest.mock('./Canvas');

let game;

beforeEach(() => {
    game = new Game();
});

describe('run', () => {
    it('should update game when frame rate passed', async () => {
        const timestamp = Constants.FRAME_RATE + 1;

        jest.spyOn(game, 'updateGameWindow');

        await game.load();
        game.init();
        game.run(timestamp);

        expect(game.updateGameWindow).toHaveBeenCalled();
    });

    it('should not update game when frame rate has not passed', async () => {
        const timestamp = Constants.FRAME_RATE - 1;

        jest.spyOn(game, 'updateGameWindow');

        await game.load();
        game.init();
        game.run(timestamp);

        expect(game.updateGameWindow).not.toHaveBeenCalled();
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