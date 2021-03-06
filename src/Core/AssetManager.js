export class AssetManager {
    loadedAssets = [];

    constructor() {
    }

    async loadAssets(assets) {
        const assetPromises = [];

        for (const [assetName, assetUrl] of Object.entries(assets)) {
            const assetPromise = this.loadSingleAsset(assetUrl, assetName);
            assetPromises.push(assetPromise);
        }

        await Promise.all(assetPromises);
    }

    loadSingleAsset(assetUrl, assetName) {
        return new Promise((resolve) => {
            const assetImage = new Image();
            assetImage.onload = () => {
                assetImage.width /= 2;
                assetImage.height /= 2;

                this.loadedAssets[assetName] = assetImage;
                resolve();
            };
            assetImage.src = assetUrl;
        });
    }

    getAsset(assetName) {
        const asset = this.loadedAssets[assetName];

        if (!assetName || !asset) {
            throw new Error(`Missing asset for "${assetName}"`);
        }

        return asset;
    }

    /**
     * Get the dimensions of an asset
     * 
     * @param {string[]} assetName 
     * @returns {Object}
     */
    getAssetDimensions(assetName) {
        const { width, height } = this.getAsset(assetName);
        return { width, height };
    }
}