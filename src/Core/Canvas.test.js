import { Canvas } from './Canvas';
import jestConfig from '../../jest.config';

beforeEach(() => {
    const canvas = document.createElement('canvas')
    canvas.id = 'skiCanvas';
    document.getElementsByTagName('body')[0].appendChild(canvas);
});

describe('constructor', () => {
    it('should update element dimensions', () => {
        const canvas = new Canvas(123, 456);

        const element = document.getElementById('skiCanvas');
        expect(element.style.width).toEqual('123px');
        expect(element.style.height).toEqual('456px');
    });

    it('should scale canvas to dimensions', () => {
        const canvas = new Canvas(123, 456);

        expect(canvas.ctx.scale).toHaveBeenCalled();
    });
});