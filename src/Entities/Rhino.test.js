import { Rhino } from './Rhino';
import { Skier } from './Skier';
import { AssetManager } from '../Core/AssetManager';

jest.mock('../Core/AssetManager');

let skier, rhino;

beforeEach(() => {
    skier = new Skier(0, 0);
    rhino = new Rhino(skier, 0, 0);
});

describe('constructor', () => {
    it('should create object', () => {
        expect(rhino.x).toEqual(0);
        expect(rhino.y).toEqual(0);
    });
});

describe('move', () => {
    it('should follow skier below right', () => {
        skier.x = 25;
        skier.y = 50;
        rhino.move();

        expect(rhino.x).toBeGreaterThan(0);
        expect(rhino.y).toBeGreaterThan(0);
    });

    it('should follow skier below left', () => {
        rhino.x = 25
        skier.x = 0;
        skier.y = 50;
        rhino.move();

        expect(rhino.x).toBeLessThan(25);
        expect(rhino.y).toBeGreaterThan(0);
    });

    it('should follow skier above left', () => {
        rhino.x = 25;
        rhino.y = 50;
        rhino.move();

        expect(rhino.x).toBeLessThan(25);
        expect(rhino.y).toBeLessThan(50);
    });

    it('should follow skier above right', () => {
        rhino.y = 50;
        skier.x = 25;
        rhino.move();

        expect(rhino.x).toBeGreaterThan(0);
        expect(rhino.y).toBeLessThan(50);
    });
});

describe('checkIfKilledSkier', () => {
    it('should do nothing if not intersecting', () => {
        skier.x = 1000;
        skier.y = 1000;
        rhino.checkIfKilledSkier(new AssetManager());

        expect(skier.isDead()).toBeFalsy();
    });

    it('should kill skier if intersecting', () => {
        rhino.checkIfKilledSkier(new AssetManager());

        expect(rhino.killed).toBeTruthy();
        expect(skier.isDead()).toBeTruthy();
    });

    it('should move to match position of skier after kill', () => {
        rhino.checkIfKilledSkier(new AssetManager());

        expect(rhino.getPosition()).toEqual(skier.getPosition());
    });
});