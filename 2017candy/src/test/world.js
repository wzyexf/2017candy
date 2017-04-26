var world = cc.Scene.extend({


    onEnter: function () {
        this._super();
        var size = cc.director.getWinSize();
        var bg = new cc.Sprite(res.bg);
        bg.x = size.width / 2;
        bg.y = size.height / 2;
        this.addChild(bg);

        var layer = new uiLayer();
        this.addChild(layer);

        var layer1 = new candyLayer();
        layer1.x = (size.width - constant.size * 64) / 2;
        layer1.y = (size.height - constant.size * 64) / 2;
        this.addChild(layer1);
    }

});

var uiLayer = cc.Layer.extend({

    ctor: function () {
        this._super();
        var label1 = new cc.LabelTTF("等级", "Arial", 38);
        var size = cc.director.getWinSize();
        //label1.x = size.width/2;
        //label1.y = size.height / 2;
        label1.x = 150;
        label1.y = size.height-50;
        this.addChild(label1);

        var labelLevel = new cc.LabelTTF("0", "Arial", 38);
        labelLevel.x = 150;
        labelLevel.y = size.height - 90;
        this.addChild(labelLevel);

        var labe2 = new cc.LabelTTF("分数", "Arial", 38);
        
        labe2.x = 350;
        labe2.y = size.height - 50;
        this.addChild(labe2);

        var labelScore = new cc.LabelTTF("0", "Arial", 38);
        labelScore.x = 350;
        labelScore.y = size.height - 90;
        this.addChild(labelScore);

        var labe3 = new cc.LabelTTF("步数", "Arial", 38);
        
        labe3.x = 550;
        labe3.y = size.height - 50;
        this.addChild(labe3);

        var labelStep = new cc.LabelTTF("0", "Arial", 38);
        labelStep.x = 550;
        labelStep.y = size.height - 90;
        this.addChild(labelStep);


    }

});

var candyLayer = cc.Layer.extend({

    ctor: function () {
        this._super();
        for (var i = 0 ; i < constant.size; i++) {
            for (var j = 0; j < constant.size; j++)
            {
                var candy = new Candy(parseInt(Math.random()*5+1));
                candy.x = 64 * i + 32;
                candy.y = 64*j+32;
                this.addChild(candy);
            }
           
        }

    }



});
