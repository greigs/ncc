const LedMatrix = require('rpi-led-matrix');
let matrix
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const queueForLedRender = () => {
    const buffer = Buffer.of(
        ...[...Array(matrix.width() * matrix.height() * 3).keys()].map(() => Math.random() > 0.4 ? 0xFF : 0x00)
      );
  
      console.log('before sync')
      matrix.drawBuffer(buffer).sync();
      console.log('sync')
}
const howLongShouldIWait = () => 100


const createMatrix = () => {
    return new LedMatrix.LedMatrix(
    {
        ...LedMatrix.LedMatrix.defaultMatrixOptions(),
        rows: 64,
        cols: 64,
        chainLength: 6,
        hardwareMapping: LedMatrix.GpioMapping.AdafruitHatPwm,
        pixelMapperConfig: LedMatrix.LedMatrixUtils.encodeMappers({ type: LedMatrix.PixelMapperType.U }),
    },
    {
        ...LedMatrix.LedMatrix.defaultRuntimeOptions(),
        gpioSlowdown: 1,
    }
    )
}

queueForLedRender()
