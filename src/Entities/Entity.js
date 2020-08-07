export class Entity {
    x = 0;
    y = 0;

    assetName = '';

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Get all the current assets that can be displayed for this entity.
     * 
     * NOTE: This could be an empty array if there is nothing to display
     * 
     * @returns {string[]}
     */
    getAssetNames() {
        const names = [];
        if(this.assetName) {
            names.push(this.assetName);
        }
        return names;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

    /**
     * Get the position of the entity displayed to the user, but not the
     * actual position the entity is within the game
     * 
     * @returns {Object}
     */
    getPerspectivePosition() {
        return this.getPosition();
    }

    draw(canvas, assetManager) {
        const assetName = this.getAssetNames();
        if(assetName.length === 0) {
            return;
        }

        const asset = assetManager.getAsset(assetName);
        const {x, y} = this.getPerspectivePosition();
        const drawX = x - asset.width / 2;
        const drawY = y - asset.height / 2;

        canvas.drawImage(asset, drawX, drawY, asset.width, asset.height);
    }
}