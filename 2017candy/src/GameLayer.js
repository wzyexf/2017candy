var GameLayer = cc.Layer.extend({

    mapPanel: null,
    ui: null,
    score: 0,
    level: 0,
    steps: 0,
    limitStep: 0,
    targetScore: 0,
    ctor: function () {
        this._super;

        var size = cc.winSize;
        var bg = new cc.Sprite("res/bg.jpg");
        this.addChild(bg, 1);
        bg.x = size.width / 2;
        bg.y = size.height / 2;


        var clippingPanel = new cc.ClippingNode();
        this.addChild(clippingPanel, 2);
        this.mapPanel = new cc.Layer();
        this.mapPanel.x = (size.width - Constant.CANDY_WIDTH * Constant.MAP_SIZE) / 2;
        this.mapPanel.y = (size.height - Contant.CANDY_WIDTH * Constant.MAP_SIZE) / 2;
        clippingPanel.addChild(this.mapPanel, 1);

        var stencil = new cc.DrawNode();
        stencil.DrawRect(cc.p(this.mapPanel.x,this.mapPanel.y),cc.p(this.mapPanel.x+Constant.CANDY_WIDTH*Constant.MAP_SIZE,this.mapPanel.y+Constant.CANDY_WIDTH*Constant.MAP_SIZE)),cc.color(0,0,0),1,cc.color(0,0,0));

        clippingPanel.stencil=stencil;


    },
    _init:function(){
        this.steps=0;
        this.level=0;
        this.score=0;
        this.limitStep=30;
        this.targetScore=100;
        this.map=[];

        for(var i=0;i<Constant.MAP_SIZE;i++)
        {
            var column=[];

        }

    }


});