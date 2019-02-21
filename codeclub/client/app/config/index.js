//
//
//

const Config = {
  pixi: {
    init: {
      backgroundColor: 0x070f1c,
      autoResize: true,
      resolution: devicePixelRatio
    },
    layers: [
      'BACKGROUND',
      'BACKGROUND_DETAIL',
      'MAIN',
      'FOREGROUND',
      'OVERLAY',
      'UI'
    ],
  }
};

export default Config;
