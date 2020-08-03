import { Game } from './Game';
import * as Constants from '../Constants';
import { Canvas } from './Canvas';
import { AssetManager } from './AssetManager';

jest.mock('./AssetManager');
jest.mock('./Canvas');

beforeAll(() => {
    //TODO
    AssetManager.mockImplementation(() => {
        return {
            loadAssets: jest.fn(),
            getAsset: () => {
                return {
                    width: 100,
                    height: 100
                };
            }
        }
    });
});

describe('run', () => {
    it('should update game when frame rate passed', async () => {
        const timestamp = Constants.FRAME_RATE + 1;
        const game = new Game();
        
        jest.spyOn(game, 'updateGameWindow');

        await game.load();
        game.init();
        game.run(timestamp);

        expect(game.updateGameWindow).toHaveBeenCalled();
    });
    
    it('should not update game when frame rate has not passed', async () => {
        const timestamp = Constants.FRAME_RATE - 1;
        const game = new Game();
        
        jest.spyOn(game, 'updateGameWindow');

        await game.load();
        game.init();
        game.run(timestamp);

        expect(game.updateGameWindow).not.toHaveBeenCalled();
    });
});