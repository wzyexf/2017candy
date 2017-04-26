var ClipScene = cc.Scene.extend({

    onEnter: function () {
        this._super();
        var layer = new ClipLayer();
        this.addChild(layer);
    }

});

var ClipLayer = cc.Layer.extend({

    ctor: function () {
        this._super();

        var size = cc.director.getWinSize();

        var clip = this.clip();

        var sprite = new cc.Sprite("res/bg.jpg");
        sprite.x = size.width / 2;
        sprite.y = size.height / 2;
       
        clip.addChild(sprite);

        this.addChild(clip);







    },

    clip: function () {
        var clipNode = new cc.ClippingNode();
                             // ClippingNode
        //var stencilLayer = new cc.Sprite("res/1.png")

        var stencil = new cc.DrawNode();
        stencil.drawRect(cc.p(0, 0), cc.p(100, 100), cc.color(0, 0, 0), 1, cc.color(0, 0, 0));//起点，终点，填充颜色，线宽度，线颜色

        var move = cc.moveTo(2, 500, 500);
        stencil.runAction(move);


        clipNode.stencil = stencil;
             //stencil
        return clipNode;
    }

});