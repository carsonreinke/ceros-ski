import { Obstacle } from './Obstacle';
import * as Constants from '../../Constants';

describe('constructor', () => {
    it('should create object', () => {
        const obstacle = new Obstacle(Constants.TREE, 1, 2, 3);

        expect(obstacle.assetName).toEqual(Constants.TREE);
        expect(obstacle.x).toEqual(1);
        expect(obstacle.y).toEqual(2);
        expect(obstacle.height).toEqual(3);
    });
});

describe('random', () => {
    it('should create random obstacle', () => {
        const obstacle = Obstacle.random(1, 2);

        expect(obstacle.assetName).toEqual(expect.anything());
        expect(obstacle.x).toEqual(1);
        expect(obstacle.y).toEqual(2);
        expect(obstacle.height).toEqual(expect.anything());
    });
});