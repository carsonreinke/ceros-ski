import { Skier } from './Skier';
import * as Constants from '../Constants';
import { ObstacleManager } from './Obstacles/ObstacleManager';
import { AssetManager } from '../Core/AssetManager';
import { Obstacle } from './Obstacles/Obstacle';

jest.mock('../Core/AssetManager');
jest.mock('./Obstacles/ObstacleManager');

let skier;

beforeEach(() => {
    skier = new Skier(1, 2);
});

describe('constructor', () => {
    it('should create object', () => {
        expect(skier.x).toEqual(1);
        expect(skier.y).toEqual(2);
    });
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

describe('isJumping', () => {
    it('should be true when jumping', () => {
        expect(skier.isJumping()).toBeFalsy();

        skier.jump();

        expect(skier.isJumping()).toBeTruthy();
    });
});

describe('resetJump', () => {
    it('should reset jump state', () => {
        skier.jump();
        skier.resetJump();

        expect(skier.isJumping()).toBeFalsy();
    });
});

describe('getPerspectivePosition', () => {
    it('should get the position without jumping', () => {
        expect(skier.getPerspectivePosition()).toEqual(skier.getPosition());
    });

    it('should get the jumping position', () => {
        skier.jump();
        skier.progressJump();

        expect(skier.getPerspectivePosition()).not.toEqual(skier.getPosition());
    });
});

describe('move', () => {
    it('should progress jump', () => {
        skier.jump();
        const p1 = skier.getPerspectivePosition();
        skier.move();
        const p2 = skier.getPerspectivePosition();

        expect(p2).not.toEqual(p1);
    });

    it('should not progress when crashed', () => {
        skier.jump();
        skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        const p1 = skier.getPerspectivePosition();
        skier.move();
        const p2 = skier.getPerspectivePosition();

        expect(p2).toEqual(p1);
    });
});

describe('progressJump', () => {
    it('should change position', () => {
        skier.jump();
        const p1 = skier.getPerspectivePosition();
        skier.progressJump();
        const p2 = skier.getPerspectivePosition();

        expect(p2).not.toEqual(p1);
    });

    it('should reset jump once jump completed', () => {
        skier.jump();
        jest.spyOn(skier, 'resetJump');
        for(let index = 0; index < 100; index++) {
            skier.progressJump();
        }

        expect(skier.resetJump).toHaveBeenCalled();
    });
});

describe('jump', () => {
    it('should initiate jump', () => {
        skier.jump();

        expect(skier.isJumping()).toBeTruthy();
    });

    it('should not allow double bounce', () => {
        skier.jump();
        const p1 = skier.getPerspectivePosition();
        skier.jump();
        const p2 = skier.getPerspectivePosition();
        
        expect(p2).toEqual(p1);
    });
});

describe('crash', () => {
    it('should change direction', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        skier.crash();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.CRASH);
    });

    it('should reset jump', () => {
        skier.jump();
        skier.crash();

        expect(skier.isJumping()).toBeFalsy();
    });
});

describe('turnLeft', () => {
    it('should not change direction mid-jump', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        skier.jump();
        skier.turnLeft();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.DOWN);
    });
});

describe('turnRight', () => {
    it('should not change direction mid-jump', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        skier.jump();
        skier.turnRight();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.DOWN);
    });
});

describe('turnUp', () => {
    it('should not change direction mid-jump', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        skier.jump();
        skier.turnUp();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.DOWN);
    });
});

describe('turnDown', () => {
    it('should not change direction mid-jump', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        skier.jump();
        skier.turnDown();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.DOWN);
    });
});

describe('checkIfSkierHitObstacle', () => {
    it('should reset jump after collision', () => {
        ObstacleManager.mockImplementation(() => {
            return {
                getObstacles: jest.fn().mockReturnValue([new Obstacle('Testing', 1, 2)])
            };
        });

        skier.jump();
        jest.spyOn(skier, 'resetJump');
        skier.checkIfSkierHitObstacle(new ObstacleManager(), new AssetManager());

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.CRASH);
        expect(skier.resetJump).toHaveBeenCalled();
    });

    it('should jump over short obstacles', () => {
        ObstacleManager.mockImplementation(() => {
            return {
                getObstacles: jest.fn().mockReturnValue([new Obstacle('Testing', 1, 2, 0)])
            };
        });

        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        skier.jump();
        skier.progressJump();
        skier.checkIfSkierHitObstacle(new ObstacleManager(), new AssetManager());

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.DOWN);
    });

    it('should jump when hit ramp', () => {
        ObstacleManager.mockImplementation(() => {
            return {
                getObstacles: jest.fn().mockReturnValue([new Obstacle('Testing', 1, 2, 0, true)])
            };
        });

        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        skier.checkIfSkierHitObstacle(new ObstacleManager(), new AssetManager());

        expect(skier.isJumping()).toBeTruthy();
        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.DOWN);
    });
});

describe('die', () => {
    it('should change direction', () => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        skier.die();

        expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.DEAD);
    });

    it('should reset jump', () => {
        skier.jump();
        skier.die();

        expect(skier.isJumping()).toBeFalsy();
    });
});

describe('isDead', () => {
    it('should be true when dead', () => {
        expect(skier.isDead()).toBeFalsy();

        skier.die();

        expect(skier.isDead()).toBeTruthy();
    });
});

describe('getAssetNames', () => {
    //TODO
});