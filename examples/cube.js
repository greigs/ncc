// NCC Example 4 - gradients and patterns

var ncc = require('../index.js'); // require('ncc');
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
data = []
const canvas = ncc({ logLevel: 'debug' }, async function (err, canvas) {
    if (err) throw err;

    canvas.width = 384;
    canvas.height = 64;

    var ctx = canvas.getContext("2d");

    // --- INFO ---
    //  first we fill the canvas with a gray-white gradient from ul to lr
    //await sleep(1000);
for (let i=0; i< 1000; i++){

    grd = ctx.createLinearGradient(0, 0, 384, 64);
    grd.addColorStop(0, "rgb(" + i % 255 + ", 102, 102)");
    grd.addColorStop(1, "white");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 384,64)

    await canvas.toDataURL('image/jpeg', .5)(async function (err, val) {
        if (err) throw err;

        //console.log(">>> dataURL: '" + val.substring(0, 40) + "...' [length: " + val.length + "]");
        data.push(val)
        if (i % 20 == 0){
          console.log(i)
        }
        if (i % 900 == 0){
            console.log(data)
        }
    })

}
   
})

