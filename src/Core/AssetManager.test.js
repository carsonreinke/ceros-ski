import { AssetManager } from './AssetManager';
import * as Constants from '../Constants';

let assetManager;

beforeEach(() => {
    assetManager = new AssetManager();
});

describe('getAsset', () => {
    it('should throw when missing asset', () => {
        expect(() => {
            assetManager.getAsset('test')
        }).toThrow();
    });

    it('should throw when missing asset name', () => {
        expect(() => {
            assetManager.getAsset(undefined)
        }).toThrow();
    });
});

describe('getAssetDimensions', () => {
    it('should get dimensions for an asset', async () => {
        // Goofy Image.onload mock workaround
        assetManager.loadSingleAsset = jest.fn().mockImplementation((assetUrl, assetName) => {
            const image = new Image();
            image.width = 100;
            image.height = 100;
            assetManager.loadedAssets[assetName] = image;

            return Promise.resolve();
        });

        await assetManager.loadAssets(Constants.ASSETS);

        const dimensions = assetManager.getAssetDimensions(Constants.SKIER_CRASH);

        expect(dimensions.width).toBeGreaterThan(0);
        expect(dimensions.height).toBeGreaterThan(0);
    });
});