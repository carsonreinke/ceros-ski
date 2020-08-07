import { AnimationManager } from './AnimationManager';
import { AssetManager } from './AssetManager';

jest.mock('./AssetManager');

let animationManager, assetManager;

beforeEach(() => {
    assetManager = new AssetManager;
    animationManager = new AnimationManager(assetManager);
});

describe('constructor', () => {
    it('should create object', () => {
        expect(animationManager.assetManager).toEqual(assetManager);
    });
});

describe('tick', () => {
    it('should go to next frame', () => {
        const frame = animationManager.frame;

        animationManager.tick();
        
        expect(animationManager.frame).toBeGreaterThan(frame);
    });
});

describe('getAsset', () => {
    it('should get a single asset', () => {
        const asset = animationManager.getAsset(['test1', 'test2']);
        expect(asset).not.toBeNull();
    });

    it('should use next asset after tick', () => {
        jest.spyOn(assetManager, 'getAsset');

        const names = ['test1', 'test2'];
        animationManager.getAsset(names);
        animationManager.tick();
        animationManager.getAsset(names);

        expect(assetManager.getAsset).toHaveBeenCalledTimes(2);
        expect(assetManager.getAsset.mock.calls[0][0]).toEqual('test1');
        expect(assetManager.getAsset.mock.calls[1][0]).toEqual('test2');
    });
});

describe('getAssetDimensions', () => {
    it('should get dimensions for an asset', () => {
        jest.spyOn(assetManager, 'getAsset');

        const dimensions = animationManager.getAssetDimensions(['test1', 'test2']);

        expect(assetManager.getAsset.mock.calls[0][0]).toEqual('test1');
        expect(dimensions).not.toBeNull();
    });
});