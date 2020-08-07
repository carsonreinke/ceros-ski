export class AnimationManager {
    frame = 0;

    constructor(assetManager) {
        this.assetManager = assetManager;
    }

    tick() {
        this.frame++;
    }

    getAsset(assetNames) {
        const assetName = assetNames[this.frame % assetNames.length];
        return this.assetManager.getAsset(assetName);
    }

    getAssetDimensions(assetNames) {
        const { width, height } = this.getAsset(assetNames);
        return { width, height };
    }
}