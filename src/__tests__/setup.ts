import "@testing-library/jest-dom";

const sampleMetrics = { cpu: 12, memory: 40, uptime: "3d 4h", disk: 55 };

// jsdom has neither fetch, matchMedia nor media playback; the metrics panel, motion and the card clips reach for them.
beforeEach(() => {
  window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(undefined);
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => sampleMetrics }) as jest.Mock;
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
});

afterEach(() => {
  jest.restoreAllMocks();
});
