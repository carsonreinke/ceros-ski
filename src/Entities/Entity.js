export class Entity {
    x = 0;
    y = 0;

    assetName = '';

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getAssetName() {
        return this.assetName;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

    getPerspectivePosition() {
        return this.getPosition();
    }

    draw(canvas, assetManager) {
        const assetName = this.getAssetName();
        if(!assetName) {
            return;
        }

        const asset = assetManager.getAsset(assetName);
        const {x, y} = this.getPerspectivePosition();
        const drawX = x - asset.width / 2;
        const drawY = y - asset.height / 2;

        canvas.drawImage(asset, drawX, drawY, asset.width, asset.height);
    }
}