const mod = jest.genMockFromModule('../AssetManager');

mod.AssetManager.mockImplementation(() => {
    return {
        loadAssets: jest.fn(),
        getAsset: () => {
            return {
                width: 100,
                height: 100
            };
        },
        getAssetDimensions: () => {
            return {
                width: 100,
                height: 100
            };
        }
    }
});

module.exports = mod;