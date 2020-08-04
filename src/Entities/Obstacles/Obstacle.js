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

    getHeight() {
        return this.height;
    }

    isRamp() {
        return this.ramp;
    }
}