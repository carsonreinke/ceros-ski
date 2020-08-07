import * as Constants from "../../Constants";
import { Entity } from "../Entity";
import { randomInt } from '../../Core/Utils';

const assetTypes = [
    {
        name: Constants.TREE,
        height: Number.MAX_VALUE,
        ramp: false
    },
    {
        name: Constants.TREE_CLUSTER,
        height: Number.MAX_VALUE,
        ramp: false
    },
    {
        name: Constants.ROCK1,
        height: 0,
        ramp: false
    },
    {
        name: Constants.ROCK2,
        height: 0,
        ramp: false
    },
    {
        name: Constants.JUMP,
        height: 9,
        ramp: true
    }
];

export class Obstacle extends Entity {
    height = 0;

    /**
     * Create a random obstacle at the specified location
     * 
     * @param {number} x 
     * @param {number} y 
     * @returns {Obstacle}
     */
    static random(x, y) {
        const assetIdx = randomInt(0, assetTypes.length - 1);
        const { name, height, ramp } = assetTypes[assetIdx];
        return new Obstacle(name, x, y, height, ramp);
    }

    constructor(assetName, x, y, height = 0, ramp = false) {
        super(x, y);

        this.assetName = assetName;
        this.height = height;
        this.ramp = ramp;
    }

    /**
     * Height of the obstacle used for collision detection
     * 
     * @returns {number}
     */
    getHeight() {
        return this.height;
    }

    /**
     * Does this obstacle provide ramping abilities?
     * 
     * @returns {boolean}
     */
    isRamp() {
        return this.ramp;
    }
}