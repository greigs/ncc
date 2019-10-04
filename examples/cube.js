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

    var grd = ctx.createLinearGradient(0, 0, 256, 256);
    grd.addColorStop(0, "slateGray");
    grd.addColorStop(1, "white");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 384,64)

    // --- INFO ---
    //  now we reuse the filled canvas in a pattern and draw it back to canvas

    var pat = ctx.createPattern(canvas, "repeat");
    ctx.rect(0, 0, 384, 64);
    ctx.fillStyle = pat;
    ctx.scale(.1 + (i * .01), .1 + (i * .01))

    ctx.fill()

    //await sleep(1);
    await canvas.toDataURL('image/jpeg', .5)(async function (err, val) {
        if (err) throw err;

        //console.log(">>> dataURL: '" + val.substring(0, 40) + "...' [length: " + val.length + "]");
        data.push(val)
        if (i % 20 == 0){
          console.log(i)
        }
    })

}
    //  --- ALTERNATIVES ---
    //  in example 3 you learned return values are accessible through callbacks
    //  this is also true for gradients and patterns:
    //
    //    "ctx.createLinearGradient(0, 0, width, height)(function(err,gra){...)"
    //
    //  but you also have the 'early-access' option allready shown for the initial canvas
    //  in example 2. This is holds for all ncc-proxys-ojects (e.g image, ctx, ...)
    console.log(data)
})

