import { Entity } from './Entity';
import { Canvas } from '../Core/Canvas';
import { AssetManager } from '../Core/AssetManager';

jest.mock('../Core/Canvas');
jest.mock('../Core/AssetManager');

describe('constructor', () => {
    it('should create object', () => {
        const entity = new Entity(1, 2);

        expect(entity.x).toEqual(1);
        expect(entity.y).toEqual(2);
    })
});

describe('getPerspectivePosition', () => {
    it('should return same as position', () => {
        const entity = new Entity(1, 2);

        expect(entity.getPerspectivePosition()).toEqual(entity.getPosition());
    });
});

describe('draw', () => {
    it('should use perspective position', () => {
        class TestEntity extends Entity {
            assetName = 'test';

            getPerspectivePosition() {
                return {x: 3, y: 4};
            }
        }
        const entity = new TestEntity(1, 2);
        const canvas = new Canvas();
        jest.spyOn(canvas, 'drawImage');
        
        entity.draw(canvas, new AssetManager());

        expect(canvas.drawImage.mock.calls[0][1]).toEqual(-47);
        expect(canvas.drawImage.mock.calls[0][2]).toEqual(-46);
    });

    it('should not draw when no assets', () => {
        class TestEntity extends Entity {
            getName() {
                return null;
            }
        }
        const entity = new TestEntity(1, 2);
        const canvas = new Canvas();
        jest.spyOn(canvas, 'drawImage');
        
        entity.draw(canvas, new AssetManager());

        expect(canvas.drawImage).not.toHaveBeenCalled();
    });
});

describe('getAssetNames', () => {
    //TODO
});