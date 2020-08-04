import * as Constants from "../../Constants";
import { Entity } from "../Entity";
import { randomInt } from '../../Core/Utils';

const assetTypes = [
    {
        name: Constants.TREE,
        height: Number.MAX_VALUE
    },
    {
        name: Constants.TREE_CLUSTER,
        height: Number.MAX_VALUE
    },
    {
        name: Constants.ROCK1,
        height: 0
    },
    {
        name: Constants.ROCK2,
        height: 0
    },
    {
        name: Constants.JUMP,
        height: 5
    }
];

export class Obstacle extends Entity {
    height = 0;

    static random(x, y) {
        const assetIdx = randomInt(0, assetTypes.length - 1);
        const { name, height } = assetTypes[assetIdx];
        return new Obstacle(name, x, y, height);
    }

    constructor(assetName, x, y, height = 0) {
        super(x, y);

        this.assetName = assetName;
        this.height = height;
    }
}