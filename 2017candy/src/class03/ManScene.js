var MainScene = cc.Scene.extend(
    {
        onEnter: function () {
            this._super();
            var uiLayer = new UILayer();
            this.addChild(uiLayer);



            var size = cc.director.getWinSize();
            var playLayer = new PlayLayer();
            playLayer.y = (size.height-64*10) / 2;
            playLayer.x = (size.width - 64 * 10) / 2 ;

            this.addChild(playLayer);

        }

    }
    )

var UILayer = cc.Layer.extend({

    ctor: function () {
        this._super();
        var size=cc.director.getWinSize();

        var bg = new cc.Sprite("res/bg.jpg");
        bg.x = size.width / 2;
        bg.y = size.height / 2;
        this.addChild(bg);


        var lblLevel = new cc.LabelTTF("等级", "Arial", 38);
        lblLevel.x = 100;
        lblLevel.y = size.height - 20;
        this.addChild(lblLevel);

        var txtLevel = new cc.LabelTTF("0", "Arial", 38);
        txtLevel.x = 100;
        txtLevel.y = size.height - 50;
        this.addChild(txtLevel);

    }

});


var PlayLayer = cc.Layer.extend({

    ctor: function () {
        this._super();

        for(var i=0;i<10;i++)
        {
            for (var j = 0; j < 10; j++) {

            
            var candy = new Candy();
            candy.x = 64*i+32;
            candy.y = 64*j+32;
            this.addChild(candy);
            }
        }

    }
});


var Candy = cc.Sprite.extend({
    ctor: function () {
        this._super("res/"+ (parseInt(  Math.random()*5)+1)+".png");

    }

});