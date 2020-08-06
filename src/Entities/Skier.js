import * as Constants from '../Constants';
import { Entity } from './Entity';
import { intersectTwoRects, Rect } from '../Core/Utils';

export class Skier extends Entity {
    z = 0;
    verticalVelocity = null;
    assetName = Constants.SKIER_DOWN;

    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;

    constructor(x, y) {
        super(x, y);
    }

    setDirection(direction) {
        if (!Object.values(Constants.SKIER_DIRECTIONS).includes(direction)) {
            throw new Error(`Direction is not valid`);
        }

        this.direction = direction;
        this.updateAsset();
    }

    rotateLeft() {
        if (this.direction !== Constants.SKIER_DIRECTIONS.CRASH && this.direction > Constants.SKIER_DIRECTIONS.LEFT) {
            this.setDirection(this.direction - 1);
        }
    }

    rotateRight() {
        if (this.direction !== Constants.SKIER_DIRECTIONS.CRASH && this.direction < Constants.SKIER_DIRECTIONS.RIGHT) {
            this.setDirection(this.direction + 1);
        }
    }

    isJumping() {
        return this.verticalVelocity !== null;
    }

    isDead() {
        return this.direction === Constants.SKIER_DIRECTIONS.DEAD;
    }

    resetJump() {
        this.z = 0;
        this.verticalVelocity = null;
    }

    getPerspectivePosition() {
        return {
            x: this.x,
            y: this.y - this.z
        };
    }

    updateAsset() {
        this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
    }

    getAssetName() {
        if(this.isJumping()) {
            return [
                Constants.SKIER_JUMP_1,
                Constants.SKIER_JUMP_2,
                Constants.SKIER_JUMP_3,
                Constants.SKIER_JUMP_4,
                Constants.SKIER_JUMP_5
            ];
        }

        return this.assetName;
    }

    move() {
        switch (this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }

        // Update the position of the skier based on the current jump
        if (this.direction !== Constants.SKIER_DIRECTIONS.CRASH && this.isJumping()) {
            this.progressJump();
        }
    }

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
        this.y += this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }

    progressJump() {
        this.verticalVelocity -= Constants.GRAVITY;
        this.z += this.verticalVelocity;
        this.verticalVelocity *= Constants.FRICTION;

        if (this.z <= 0) {
            this.resetJump();
        }
    }

    turnLeft() {
        if (this.isJumping()) {
            return;
        }

        if (this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            this.moveSkierLeft();
        }
        else {
            this.rotateLeft();
        }
    }

    turnRight() {
        if (this.isJumping()) {
            return;
        }

        if (this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierRight();
        }
        else {
            this.rotateRight();
        }
    }

    turnUp() {
        if (this.isJumping()) {
            return;
        }

        if (this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        if (this.isJumping()) {
            return;
        }

        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    jump() {
        if (this.isJumping()) {
            return;
        }

        this.verticalVelocity = Constants.SKIER_JUMP_VELOCITY;
    }

    crash() {
        this.resetJump();
        this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
    }

    die() {
        this.resetJump();
        this.setDirection(Constants.SKIER_DIRECTIONS.DEAD);
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        const dimensions = assetManager.getAssetDimensions(this.getAssetName());
        const skierBounds = new Rect(
            this.x - dimensions.width / 2,
            this.y - dimensions.height / 2,
            this.x + dimensions.width / 2,
            this.y - dimensions.height / 4
        );

        const collision = obstacleManager.getObstacles().find((obstacle) => {
            const obstacleDimensions = assetManager.getAssetDimensions(obstacle.getAssetName());
            const obstaclePosition = obstacle.getPosition();
            const obstacleBounds = new Rect(
                obstaclePosition.x - obstacleDimensions.width / 2,
                obstaclePosition.y - obstacleDimensions.height / 2,
                obstaclePosition.x + obstacleDimensions.width / 2,
                obstaclePosition.y
            );

            return intersectTwoRects(skierBounds, obstacleBounds) && this.z <= obstacle.getHeight();
        });

        if (collision) {
            collision.isRamp() ? this.jump() : this.crash();
        }
    };
}