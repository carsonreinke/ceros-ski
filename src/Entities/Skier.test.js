import { Skier } from './Skier';
import * as Constants from '../Constants';

let skier;

beforeEach(() => {
    skier = new Skier(0, 0);
});

describe('setDirection', () => {
    it('should throw if invalid', () => {
        expect(() => {
            skier.setDirection(-99)
        }).toThrow();
    });

    it('should change direction and assets', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.LEFT);
        expect(skier.assetName).toEqual(Constants.SKIER_DIRECTION_ASSET[Constants.SKIER_DIRECTIONS.LEFT]);
    });
});

describe('rotateLeft', () => {
    it('should change direction', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        skier.rotateLeft();
        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
    });

    it('should stop rotating once left', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
        skier.rotateLeft();
        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.LEFT);
    });
});

describe('rotateRight', () => {
    it('should change direction', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        skier.rotateRight();
        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
    });

    it('should stop rotating once left', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
        skier.rotateRight();
        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.RIGHT);
    });
});