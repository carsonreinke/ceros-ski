import 'babel-polyfill';


// JSDOM not implemented (see https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom)

// JSDOM does not provide this value, need to supply it globally
Object.defineProperty(window, 'devicePixelRatio', {
    writable: true,
    value: jest.fn().mockReturnValue(1.0)
});

// JSDOM has no mock canvas methods, add some simple ones instead of `canvas` package
// Copied from https://github.com/jsdom/jsdom/issues/1782#issuecomment-337656878
window.HTMLCanvasElement.prototype.getContext = function () {
    return {
        fillRect: jest.fn(),
        clearRect: jest.fn(),
        getImageData: jest.fn().mockImplementation((x, y, w, h) => {
            return {
                data: new Array(w * h * 4)
            };
        }),
        putImageData: jest.fn(),
        createImageData: jest.fn().mockReturnValue([]),
        setTransform: jest.fn(),
        drawImage: jest.fn(),
        save: jest.fn(),
        fillText: jest.fn(),
        restore: jest.fn(),
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        closePath: jest.fn(),
        stroke: jest.fn(),
        translate: jest.fn(),
        scale: jest.fn(),
        rotate: jest.fn(),
        arc: jest.fn(),
        fill: jest.fn(),
        measureText: jest.fn().mockReturnValue({ width: 0 }),
        transform: jest.fn(),
        rect: jest.fn(),
        clip: jest.fn(),
    };
}