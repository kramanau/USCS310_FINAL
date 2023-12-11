let mouseDown = false;
let currentColor = 'red';
let lastX, lastY = 0;
const canvas = $('#canvas');
let currentStroke = 0;


function createSvgElement(tag, att){
    var element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    $.each(att, function(key, value){
        element.setAttribute(key, value);
    })
    return element;
}

function drawLine(x1, y1){
    const stroke = $(`#stroke${currentStroke}`)
    if (stroke.length == 0){
        lineAtt = { points: `${x1},${y1}`, stroke: "black", 'stroke-width': "5", fill: "none", id: `stroke${currentStroke}` };
        const line = createSvgElement('polyline', lineAtt);
        canvas.append(line);
    } else {
        const points = stroke.attr("points");
        const newPoints = points + ` ${x1},${y1}`;
        stroke.attr("points", newPoints);
    }
}

$(document).ready(function(){
    $('#canvas').mousedown(function(e){
        currentStroke += 1;
        mouseDown = true;
        console.log(canvas.attr("x"));
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