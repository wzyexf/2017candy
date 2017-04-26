var PlayerScene1 = cc.Scene.extend({
    score: null,
    lblScore: null,
    SushiSprites: null,//精灵集合
    onEnter: function () {
        this._super();
        this.SushiSprites = [];
         this.lblScore = new cc.LabelTTF("分数: 0", "Arial", 38);
         this.addChild(this.lblScore);
         //this.scheduleUpdate();//帧定时器
         this.schedule(this.update, 1, 16 * 1024, 1);
    },
    update:function(){
        this.addSushi();
        this.removeSushi();
    },
    addSushi: function () {
        var size = cc.director.getWinSize();
       // var sprite = new cc.Sprite("res/sushi_1n.png");
        var sprite = new SushiSprite1();
        sprite.x = size.width*Math.random();
        sprite.y = size.height;
        this.addChild(sprite);

        var action = cc.moveTo(2,sprite.x, -30);
        sprite.runAction(action);
        this.SushiSprites.push(sprite);
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

    }



});