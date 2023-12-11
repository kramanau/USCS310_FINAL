let mouseDown = false;
let currentStroke = 0;
const canvas = $('#canvas');


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
    pattern = 
    userBrush.updateColor(R,G,B);
}

$(document).ready(function(){
    $("#setcolor").on('click', validateRGB);
    
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