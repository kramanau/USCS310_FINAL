let mouseDown = false;
let currentStroke = 0;
const canvas = $('#canvas');
$("#start").toggleClass("hidden");

const offsetX = 0;
const offsetY = 75; //height of painttools bar

canvas.attr('width', `${window.innerWidth}`);
canvas.attr('height', `${window.innerHeight - 75}`);

const userBrush = new Brush(canvas, offsetX, offsetY);

function drawLine(x1, y1){
    const stroke = $(`#stroke${currentStroke}`)
    if (stroke.length == 0){
        userBrush.createPolyline(x1, y1, currentStroke);
    } else {
        userBrush.paintPoint(x1, y1, stroke);
    }
}

function validateRGB(){
    const R = $('#rInput').val();
    const G = $('#gInput').val();
    const B = $('#bInput').val();
    const pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if(pattern.test(R) && pattern.test(G) && pattern.test(B)){
        userBrush.updateColor(R,G,B);
    } else {
        alert('Failed to set color.');
    }
}

function startTimer(){
    $("#start").toggleClass("hidden");
    $("#timer").toggleClass("hidden");
    const interval = setInterval(()=>{
        const seconds = parseInt($("#timer").text().split(':')[1]);
        const newSeconds = seconds - 1;
        console.log(String(newSeconds).padStart(2,'0'));
        $("#timer").text(':'+String(newSeconds).padStart(2,'0'));
        if (newSeconds === 0){
            clearInterval(interval);
        }
    }, 1000);
}

$(document).ready(function(){
    $("#setcolor").on('click', validateRGB);

    $("#start").on('click', startTimer);
    
    $('#canvas').mousedown(function(e){
        currentStroke += 1;
        mouseDown = true;
    })

    $('#canvas').mouseup(function(e){
        mouseDown = false;
    })

    $('#canvas').mousemove(function(e){
        if (mouseDown){
            drawLine(e.pageX, e.pageY);
        }
    })
})