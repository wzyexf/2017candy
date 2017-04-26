var PlayLayer = cc.Layer.extend({
    SushiSprites: null,
    scoreLabel: null,
    score: 0,
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        this.scoreLabel = new cc.LabelTTF("score:0", "Arial", 20);
        this.scoreLabel.attr({
            x: size.width / 2 + 100,
            y: size.height - 20
        });
        this.addChild(this.scoreLabel, 5);
        this.SushiSprites = [];
        this.schedule(this.update, 1, 16 * 1024, 1);
        return true;
    },
    update: function () {
        this.addSushi();
        this.removeSushi();
    },
    addSushi: function () {

        //var sushi = new cc.Sprite("res/sushi_png");
        var sushi = new SushiSprite("res/sushi_1n.png");
        var size = cc.winSize;

        var x = sushi.width / 2 + size.width / 2 * cc.random0To1();
        sushi.attr({
            x: x,
            y: size.height - 30
        });

        this.addChild(sushi, 5);
        var dorpAction = cc.MoveTo.create(4, cc.p(sushi.x, -30));
        sushi.runAction(dorpAction);
        sushi.index = this.SushiSprites.length;
        this.SushiSprites.push(sushi);
       
    },
    removeSushi: function () {
        //移除到屏幕底部的sushi
        for (var i = 0; i < this.SushiSprites.length; i++) {
            //cc.log("removeSushi.........");
            if (0 > this.SushiSprites[i].y) {
                cc.log("==============remove:" + i);
                this.SushiSprites[i].removeFromParent();
                this.SushiSprites[i] = undefined;
                this.SushiSprites.splice(i, 1);
                i = i - 1;
            }
        }
    },
    removeSushiByindex: function (dx) {

        if (isNaN(dx) || dx > this.SushiSprites.length) { return false; }
        for (var i = 0, n = 0; i < this.SushiSprites.length; i++) {
            if (this.SushiSprites[i] != this[dx]) {
                cc.log("--------------");
                this.SushiSprites[n++] = this.SushiSprites[i]
            }
        }
        this.SushiSprites.length -= 1
    },
    addScore: function () {
        this.score += 1;
        this.scoreLabel.setString("score:" + this.score);
    }
});

var PlayScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});