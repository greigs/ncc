var ncc = require('../index.js');
//var jpeg = require('jpeg-js');
var inkjet = require('inkjet');
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const queueForLedRender = (raw) => {
    // do something
}
const howLongShouldIWait = () => 0

const frameWidth = 384
const frameHeight = 64
const canvas = ncc({ logLevel: 'debug' }, async function (err, canvas) {
    if (err) throw err;

    canvas.width = frameWidth;
    canvas.height = frameHeight;

    const ctx = canvas.getContext("2d");
    let prevTimeStamp = new Date()
    let prevFrameCount = 0
    // render 10000 frames
    for (let frameCount=0; frameCount< 10000; frameCount++){
        const wait = howLongShouldIWait()
        if (wait > 0){
           await sleep(wait)
        }
        const grd = ctx.createLinearGradient(0, 0, frameWidth, frameHeight);
        grd.addColorStop(0, "rgb(" + frameCount % 255 + ", 102, 102)");
        grd.addColorStop(1, "white");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, frameWidth, frameHeight)
        ctx.fillRect(0, 0, frameWidth, frameHeight)
        ctx.fillRect(0, 0, frameWidth, frameHeight)
        ctx.fillRect(0, 0, frameWidth, frameHeight)
        ctx.fillRect(0, 0, frameWidth, frameHeight)

        await canvas.toDataURL('image/jpeg', .99)(async function (err, val) {
            let startFrameTime = new Date()
            let decodedJpeg = Buffer.from(val.substring(23),'base64'); // strip header
            let decodedJpegTime = new Date()
            //let rawImageData = jpeg.decode(decodedJpeg);

            inkjet.decode(decodedJpeg, function(err, rawImageData) {
              // decoded: { width: number, height: number, data: Uint8Array }

            let rawImageDataTime = new Date()
            queueForLedRender(rawImageData.data)
            let timeNow = new Date()
            if (timeNow - prevTimeStamp >= 1000){
                let framesRendered = frameCount - prevFrameCount
                console.log(framesRendered + 'fps')
                console.log('decodedJpeg: ' + (decodedJpegTime - startFrameTime))
                console.log('rawImageData: ' + (rawImageDataTime - decodedJpegTime))
                prevTimeStamp = timeNow
                prevFrameCount = frameCount
            }

            });
       })
    }
})

