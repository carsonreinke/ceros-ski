import { Entity } from './Entity';
import * as Constants from '../Constants';
import { Rect, intersectTwoRects } from '../Core/Utils';

export class Rhino extends Entity {
    assetName = Constants.RHINO;
    skier = null;
    killed = false;

    constructor(skier, x, y) {
        super(x, y);
        this.skier = skier;
    }

    getAssetName() {
        if(this.killed) {
            return [
                Constants.RHINO_EAT_1,
                Constants.RHINO_EAT_2,
                Constants.RHINO_EAT_3,
                Constants.RHINO_EAT_4,
                Constants.RHINO_EAT_5,
                Constants.RHINO_EAT_6
            ];
        }

        return [Constants.RHINO, Constants.RHINO_RUN_1, Constants.RHINO_RUN_2];
    }

    move() {
        const { x: x1, y: y1 } = this.getPosition();
        const { x: x2, y: y2 } = this.skier.getPosition();

        // Calculate angle of attack
        const adj = x2 - x1;
        const opp = y2 - y1;
        let angle;
        if(adj === 0) {
            angle = 0;
        }
        else {
            angle = Math.abs(Math.atan(opp / adj));
        }

        // Figure out change based on angle
        const change = {
            x: Math.cos(angle) * Constants.RHINO_SPEED,
            y: Math.sin(angle) * Constants.RHINO_SPEED
        };

        // Update coordinates based on the change
        this.x += (adj < 0 ? -1 : 1) * change.x;
        this.y += (opp < 0 ? -1 : 1) * change.y;
    }

    moveToFinalPosition() {
        // Match position of skier
        const { x, y } = this.skier.getPosition();
        this.x = x;
        this.y = y;
    }

    checkIfKilledSkier(assetManager) {
        const rects = [this, this.skier].map(entity => {
            const dimensions = assetManager.getAssetDimensions(entity.getAssetName())
            const position = entity.getPosition();

            return new Rect(
                position.x - dimensions.width / 2,
                position.y - dimensions.height / 2,
                position.x + dimensions.width / 2,
                position.y + dimensions.height / 2
            );
        });

        if(intersectTwoRects(rects[0], rects[1])) {
            this.killed = true;
            this.skier.die();
            this.moveToFinalPosition();
        }
    }
}