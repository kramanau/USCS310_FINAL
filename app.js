let mouseDown = false;
let currentColor = 'red';

function createSvgElement(tag, att){
    var element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    $.each(att, function(key, value){
        element.setAttribute(key, value);
    })
    return element;
}

function colorPalette(xCord, yCord){
    if(mouseDown){
        const svg = $('#canvas');
        const rectAtt = {x: xCord - 5, y: yCord - 5, width: "10", height: "10", fill: currentColor};
        const rect = createSvgElement('rect', rectAtt);
        svg.append(rect);
        setTimeout(function(){colorPalette(xCord, yCord)}, 10);
    }
}

$(document).ready(function(){
    $('body').mousedown(function(e){
        mouseDown = true;
    })

    $('body').mouseup(function(e){
        mouseDown = false;
    })

    $('body').mousemove(function(e){
        if(mouseDown){
            colorPalette(e.pageX, e.pageY);
        }
    })
})