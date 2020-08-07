export class AnimationManager {
    frame = 0;

    /**
     * Construct an manager of animation composed of the asset manager
     * 
     * @param {AssetManager} assetManager 
     */
    constructor(assetManager) {
        this.assetManager = assetManager;
    }

    /**
     * Increment animation to next frame
     */
    tick() {
        this.frame++;
    }

    /**
     * Get an asset for the current frame of the animation
     * 
     * @param {string[]} assetNames 
     */
    getAsset(assetNames) {
        const assetName = assetNames[this.frame % assetNames.length];
        return this.assetManager.getAsset(assetName);
    }

    /**
     * Get the dimensions of an asset
     * 
     * @param {string[]} assetNames 
     */
    getAssetDimensions(assetNames) {
        const { width, height } = this.getAsset(assetNames);
        return { width, height };
    }
}