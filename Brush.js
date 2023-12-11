class Brush{
    constructor(canvas, offsetX, offsetY){
        this.canvas = canvas;
        this.thickness = 5;
        this.color = 'rgb(0,0,0)';
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    paintPoint(x1, y1, stroke){
        const points = stroke.attr("points");
        const newPoints = points + ` ${x1 - this.offsetX},${y1 - this.offsetY}`;
        stroke.attr("points", newPoints);
    }

    createPolyline(x1, y1, currentStroke){
        const lineAtt = { points: `${x1 - this.offsetX},${y1 - this.offsetY}`, stroke: this.color, 'stroke-width': this.thickness, fill: "none", id: `stroke${currentStroke}` };
        const line = Brush.createSvgElement('polyline', lineAtt);
        canvas.append(line);
    }

    updateColor(R,G,B){
        this.color = `rgb(${R},${G},${B})`;
    }

    static createSvgElement(tag, att){
        var element = document.createElementNS("http://www.w3.org/2000/svg", tag);
        $.each(att, function(key, value){
            element.setAttribute(key, value);
        })
        return element;
    }
}