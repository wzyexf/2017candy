var test3 = cc.Scene.extend({

    onEnter: function () {
        this._super();
        this.addChild(new souceLayer());
        var size = cc.director.getWinSize();
       

    }


});

var testLayer = cc.Layer.extend({
    ball: null,
    bg: null,
    deltaX: 1,
    frame:0,
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        var ball = new cc.Sprite("res/1.png");
        ball.x = 0;
        ball.y = size.height / 2;
        this.addChild(ball);
        this.ball = ball;
        this.bg = new cc.DrawNode();
        this.addChild(this.bg);
        this.scheduleUpdate();
        return true;

    },
    update: function () {
        var size = cc.director.getWinSize();
        this.ball.x += this.deltaX;
        console.log(this.ball.x);
        if (this.ball.x > size.width || this.ball.x <= 0) {
            this.deltaX *= -1;
        }
        this.ball.y = Math.sin(this.frame / 20) * 50 + size.height / 2;
        this.bg.drawDot(new cc.Point(this.ball.x, this.ball.y), 2, cc.color(255, 0, 0));
        this.frame++;
    }
})

var baseLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        var ball = new cc.Sprite("res/start_N.png");
        ball.x = 0;
        ball.y = size.height / 2;
        this.addChild(ball);
        // var action = cc.moveTo(2, cc.p(size.width, size.height / 2));
        // var action = cc.moveBy(2, cc.p(size.width, 100));
       // var action = cc.scaleTo(1, 2, 2);
        //var action = cc.scaleTo(1, 2, -2);
       // var action = cc.fadeTo(2, 0);
        //var action = cc.fadeOut(2);
        //var action = cc.blink(2,10);
        var action = cc.tintTo(2, 100, 0, 0);
        ball.runAction(action);
        return true;
    }

});


var sequenceLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        var ball = new cc.Sprite("res/start_N.png");
        ball.x = 0;
        ball.y = size.height / 2;
        this.addChild(ball);
         var action1 = cc.moveTo(2, cc.p(size.width, size.height / 2));
        // var action = cc.moveBy(2, cc.p(size.width, 100));
        // var action = cc.scaleTo(1, 2, 2);
         var action2 = cc.scaleTo(2, 2, -2);
         var action3 = cc.scaleBy(2, 2, -2);
        // var action = cc.fadeTo(2, 0);
        //var action = cc.fadeOut(2);
        //var action = cc.blink(2,10);
        //var action = cc.tintTo(2, 100, 0, 0);
       
       // ball.runAction(cc.sequence(action1, action2));
        // ball.runAction(cc.spawn(action1, action2));
        // ball.runAction(cc.repeat(action3, 4));
        // ball.runAction(cc.repeatForever(action3));
         ball.runAction(cc.sequence(action3, action3.reverse()));//reverse只支持by
        return true;
    }

});

var seasingLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        var ball = new cc.Sprite("res/start_N.png");
        ball.x = size.width/2;
        ball.y = size.height / 2;
        this.addChild(ball);
        
        var action = cc.moveBy(2, 0, -(size.height - ball.height) / 2);
        action.easing(cc.easeIn(2));

        var back = action.clone().reverse();
      //  back.easing(cc.easeBounceIn());
        back.easing(cc.easeOut(2));
        ball.runAction(cc.sequence(action, back));//reverse只支持by

        var item1 = new cc.MenuItemFont("Start", this.play, this);
        var item2 = new cc.MenuItemFont("pause", this.pause, this);
        var mn = new cc.Menu(item1, item2);
        mn.alignItemsVertically();
        mn.y = 100;

        this.addChild(mn);

        return true;
    },
    play: function () {
        cc.director.resume();
    },
    pause: function () {
        cc.director.pause();
    }

});
var functionLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        var ball = new cc.Sprite("res/start_N.png");
        ball.x = size.width / 2;
        ball.y = size.height / 2;
        this.addChild(ball);

        var action = cc.moveBy(2, 0, -(size.height - ball.height) / 2);
        action.easing(cc.easeIn(2));

        var back = action.clone().reverse();
        //  back.easing(cc.easeBounceIn());
        back.easing(cc.easeOut(2));

        var callback = cc.callFunc(this.callback, this, "message");
        var delaytime = cc.delayTime(10);
         
        ball.runAction(cc.sequence(action, back, callback, delaytime, callback));//reverse只支持by
        return true;
    },
    callback: function (nodeExecutingAction,data) {
        console.log(data);

    }

});


var souceLayer = cc.Layer.extend({
    effect:null,
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        var ball = new cc.Sprite("res/start_N.png");
        ball.x = size.width / 2;
        ball.y = size.height / 2;
        this.addChild(ball);

        this.effect = cc.audioEngine.playEffect("res/1.mp3", true)

        var item1 = new cc.MenuItemFont("Start", this.play, this);
        var item2 = new cc.MenuItemFont("pause", this.pause, this);
        var item3 = new cc.MenuItemFont("mute", this.mute, this);
        var mn = new cc.Menu(item1, item2, item3);
        mn.alignItemsVertically();
        mn.y = 100;

        this.addChild(mn);

        return true;
    },
    play: function () {
      //  cc.audioEngine.playMusic("res/1.mp3", true)
        cc.audioEngine.pauseEffect(this.effect);

    },
    pause: function () {
       // cc.audioEngine.stopMusic();
        //cc.audioEngine.stopEffect(this.effect);
        cc.audioEngine.resumeEffect(this.effect);
    },
    mute: function () {

        cc.audioEngine.setEffectsVolume(0);
    }

});