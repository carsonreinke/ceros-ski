import { Rhino } from './Rhino';
import { Skier } from './Skier';

let skier, rhino;

beforeEach(() => {
    skier = new Skier(0, 0);
    rhino = new Rhino(0, 0);
});

describe('move', () => {
    it('should follow skier below right', () => {
        const skier = new Skier(25, 50);
        rhino.move(skier);

        console.log(rhino);
    });

    it('should follow skier below left', () => {
        rhino.x = 25
        const skier = new Skier(0, 50);
        rhino.move(skier);

        console.log(rhino);
    });

    it('should follow skier above left', () => {
        rhino.x = 25;
        rhino.y = 50;
        const skier = new Skier(0, 0);
        rhino.move(skier);

        console.log(rhino);
    });

    it('should follow skier above right', () => {
        rhino.y = 50;
        const skier = new Skier(25, 0);
        rhino.move(skier);

        console.log(rhino);
    });
});

describe('checkIfKilledSkier', () => {
    
});