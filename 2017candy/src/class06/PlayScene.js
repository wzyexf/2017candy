var PlayScene = cc.Scene.extend({
    playerLayer:null,
    onEnter: function () {
        this._super();
        var size = cc.director.getWinSize();
        var bg = new cc.Sprite("res/bg.jpg");
        bg.x = size.width / 2;
        bg.y = size.height / 2;
        this.addChild(bg);

        


        var clip = this.clip();
        this.addChild(clip);
        this.playerLayer = new PlayLayer();
        clip.addChild(this.playerLayer);
        this.playerLayer.x = (size.width - (Constant.CANDY_MAXSIZE * 64)) / 2;
        this.playerLayer.y = (size.height - (Constant.CANDY_MAXSIZE * 64)) / 2;

        var ui = new UILayer(this.playerLayer);
        this.addChild(ui, 3);
       


    },
    clip: function () {
        var size = cc.director.getWinSize();
        var clipNode = new cc.ClippingNode();
        var stencil = new cc.DrawNode();
        stencil.drawRect(
            cc.p(0, 0),
            cc.p(640, 640),
            cc.color(0, 0, 0),
            1,
            cc.color(0, 0, 0)
            );//起点，终点，填充颜色，线宽度，线颜色

        stencil.x = (size.width - (Constant.CANDY_MAXSIZE * 64)) / 2;
        stencil.y = (size.height - (Constant.CANDY_MAXSIZE * 64)) / 2;


        clipNode.stencil = stencil;
        //stencil
        return clipNode;
    }



});