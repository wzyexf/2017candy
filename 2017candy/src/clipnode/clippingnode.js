var ClippingNode = cc.Scene.extend({
    onEnter: function () {
        this._super();
        
        var size = cc.director.getWinSize();
        var bg = new cc.LayerColor(cc.color(0, 0, 0), size.width, size.height);
        this.addChild(bg);
        var label=new cc.LabelTTF("ClippingNode 测试","Arial",50);
        label.setColor(cc.color(255,255,255));
        label.x=200;
        label.y=size.height-100;
        this.addChild(label);
        var layer = new ClippingNodeLayer1();
        this.addChild(layer);
    }



})


var ClippingNodeLayer1 = cc.Layer.extend({

    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();

        console.log("1111");
        var clippingPanel = this.clipper();
        var sprite = new cc.Sprite("res/bg.jpg");
        sprite.x = size.width / 2;
        sprite.y = size.height / 2;
        clippingPanel.addChild(sprite);
        this.addChild(clippingPanel);
        console.log("2222");

    },
    clipper: function () {  //创建剪切区域
        var clipper = new cc.ClippingNode();
        var size = cc.director.getWinSize();
        var stencil = new cc.DrawNode();
        stencil.drawRect(cc.p(0, 0), cc.p(100, 100), cc.color(0, 0, 0), 1, cc.color(0, 0, 0));//起点，终点，填充颜色，线宽度，线颜色

        var action = cc.moveTo(2, cc.p(size.width, size.height));
        stencil.runAction(action);
        clipper.stencil = stencil;
        return clipper;
    }
})

//drawNode.drawCardinalSpline(config, tension, segments, lineWidth, color)
////曲线 参数说明: //congfig:点数组 //tension:张力 //segments:段落 //lineWidth:线条宽度 //color:颜色    
//drawNode.drawCatmullRom(points, segments, lineWidth, color)
////同上    
//drawNode.drawCircle(center, radius, angle, segments, drawLineToCenter, lineWidth, color)
////画圆 //参数说明: 原点，半径，弧度，分段(越大越接近圆)，原点到弧度的线(boolean)，线条宽度，颜色    
//drawNode.drawCubicBezier(origin, control1, control2, destination, segments, lineWidth, color)
////画三次贝塞尔曲线 //
//drawNode.drawCubicBezier(cc.p(s.width - 250, 40), cc.p(s.width - 70, 100), cc.p(s.width - 30, 250), cc.p(s.width - 10, s.height - 50), 10, 1, cc.color(0, 1, 0, 1)); drawNode.drawQuadBezier(origin, control, destination, segments, lineWidth, color)
////画二次贝塞尔曲线 参考三次贝塞尔曲线 
//drawNode.drawDot(pos, radius, color)
////画点 //
//drawNode.drawDot(cc.p(60, 100), 20, cc.color(0.5, 0.6, 0, 1)); drawNode.drawDots(points, radius, color)
////画点  points  点数组    
//drawNode.drawPoly(verts, fillColor, lineWidth, color)
////画多边形 
//drawNode.drawRect(origin, destination, fillColor, lineWidth, lineColor)
////画矩形 
//drawNode.drawSegment(from, to, lineWidth, color)
////画线段