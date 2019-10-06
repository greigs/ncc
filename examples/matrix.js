var ncc = require('../index.js');
//var jpeg = require('jpeg-js');
var inkjet = require('inkjet');
const LedMatrix = require('rpi-led-matrix');
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const queueForLedRender = (raw) => {
    // do something
}
const howLongShouldIWait = () => 0





const matrix = new LedMatrix.LedMatrix(
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
);
console.log('matrix:' + matrix)


const canvas = ncc({ logLevel: 'debug' }, async function (err, canvas) {
    if (err) throw err;

    const ctx = canvas.getContext("2d");
    let prevTimeStamp = new Date()
    let prevFrameCount = 0
    // render 10000 frames
    for (let frameCount=0; frameCount< 10000; frameCount++){
        const wait = howLongShouldIWait()
        if (wait > 0){
           await sleep(wait)
        }

        await canvas.toDataURL('image/jpeg', .85)(async function (err, val) {
            let startFrameTime = new Date()
            let decodedJpeg = Buffer.from(val.substring(23),'base64'); // strip header
            let decodedJpegTime = new Date()
            inkjet.decode(decodedJpeg, function(err, rawImageData) {
                let rawImageDataTime = new Date()
                queueForLedRender(rawImageData.data)
                let timeNow = new Date()
                if (timeNow - prevTimeStamp >= 1000){
                    let framesRendered = frameCount - prevFrameCount
                    console.log(framesRendered + 'fps')
                    //console.log('decodedJpeg: ' + (decodedJpegTime - startFrameTime))
                    //console.log('rawImageData: ' + (rawImageDataTime - decodedJpegTime))
                    prevTimeStamp = timeNow
                    prevFrameCount = frameCount
                }
            });
        })
    }
})

