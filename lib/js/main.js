
let canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d')
const offScreen = new OffscreenCanvas(160, 144)
const offScreenCtx = offScreen.getContext("2d")
let workers = []
const columnCount = 1
const rowCount = 1
for (let i=0; i<columnCount; i++){
	for (let j=0; j<rowCount; j++){
		const worker = new Worker('js/worker.js')
		workers.push(worker)
		worker.postMessage({ i: i, j: j });
		worker.onmessage = function (e) {
			offScreenCtx.putImageData(e.data.image, 0, 0);
			ctx.drawImage(offScreen, e.data.i, e.data.j, 64, 64);
		}
	}
}
