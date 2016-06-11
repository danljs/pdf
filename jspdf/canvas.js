
function report_canvas(){
	var pdf = new jsPDF();
	pdf.addImage(get_image(), 'png', 15, 10);
	pdf.addImage(get_image(), 'png', 15, 20);
	pdf.addImage(get_image(), 'png', 15, 30);
	pdf.addImage(get_image(), 'png', 15, 40);
	pdf.save("download.pdf");
};
function get_image(){
	return aaa();

	// var canvas = document.getElementById('myCanvas');
	// var context = canvas.getContext('2d');

	//Create canvas with the device resolution.
	// var canvas = createHiDPICanvas(500, 250);
	// var context = canvas.getContext('2d');
	//Create canvas with a custom resolution.
	// var canvas = createHiDPICanvas(500, 200, 4);
	// var context = canvas.getContext('2d');

	context.clearRect(0, 0, canvas.width, canvas.height);
	// context.fillStyle = "#fff";
	// context.fillRect(0,0,100,100);
	context.fillStyle = '#000';
	context.font = "18px SimSun";
	context.fillText("世界你好",10,30);
	// return canvas.toDataURL("image/jpeg");
	return canvas.toDataURL();
	
};
function aaa(){
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	// SVG is resolution independent. Canvas is not. We need to make our canvas High Resolution.

	// lets get the resolution of our device.
	var pixelRatio = window.devicePixelRatio || 1;

	// lets scale the canvas and change its CSS width/height to make it high res.
	canvas.style.width = canvas.width +'px';
	canvas.style.height = canvas.height +'px';
	canvas.width *= pixelRatio;
	canvas.height *= pixelRatio;

	// Now that its high res we need to compensate so our images can be drawn as normal, by scaling everything up by the pixelRatio.
	context.setTransform(pixelRatio,0,0,pixelRatio,0,0);

	context.fillStyle = '#000';
	context.font = "18px SimSun";
	context.fillText("世界你好",10,30);


	return canvas.toDataURL();
}
var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();


createHiDPICanvas = function(w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    var can = document.createElement("canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
}
