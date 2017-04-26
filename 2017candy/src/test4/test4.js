var test4 = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new AccelerometerLayer();
        this.addChild(layer);

    }



});

var TestLayer01 = cc.Layer.extend({
    ball:null,
    ctor: function () {
        this._super();
        var size=cc.director.getWinSize();
        this.ball = new cc.Sprite("res/1.png");
        this.ball.x = size.width / 2;
        this.ball.y = size.height;
        var action = cc.moveTo(2, cc.p(size.width/2, 0));
        this.ball.runAction(action);
        this.addChild(this.ball);

        var item0 = new cc.MenuItemFont("pause", this.pause, this);
        var item1 = new cc.MenuItemFont("resume", this.resume, this);
        var item2 = new cc.MenuItemFont("stop", this.stop, this);
        var mn = new cc.Menu(item0, item1,item2);
        mn.alignItemsVertically();
        mn.x = size.width / 2;
        mn.y = size.height / 2;
        
        this.addChild(mn);
        return true;
    },
    pause: function () { this.ball.pause(); },
    resume: function () { this.ball.resume(); },
    stop: function () { this.ball.stopAllActions() }


});

var TestLayer02 = cc.Layer.extend({
    ctor: function () {
        this._super();
        cc.eventManager.addListener(
            {
                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) { console.log("onMouseDown"); var pos = event.getLocation(); console.log(pos.x); var target = event.getCurrentTarget(); console.log(target);},
                onMouseUp: function (event) { console.log("onMouseUp"); },
                onMouseMove: function (event) { console.log("onMouseMove"); }

            }, this);
           
    }
});

var TestLayer03 = cc.Layer.extend({
    ctor: function () {
        this._super();
        cc.eventManager.addListener(
            {
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: function (touch, event) {
                    console.log("onTouchBegan");
                    var pos = touch.getLocation();
                    var id = touch.getID();
                    console.log("onTouchBegan at: " + pos.x + " " + pos.y + " Id:" + id);
                    
                },
                onTouchMoved: function (touch,event) { console.log("onMouseUp"); },
                onTouchEnded: function (touch,event) { console.log("onMouseMove"); },
                onTouchCancelled: function (touch, event) { console.log("onMouseMove"); }

            }, this);

    }
});

var TestLayer04 = cc.Layer.extend({
    ctor: function () {
        this._super();
        cc.eventManager.addListener(
            {
                event: cc.EventListener.KEYBOARD,
                onKeyReleased: function (keyCode, event) {
                    if(keyCode=cc.KEY.back)
                    {
                        cc.log("return button clicked. keycode:" + keyCode);
                        cc.director.end();
                    }
                    else if (keyCode == cc.KEY.menu) {
                        cc.log("menu button clicked. keycode:" + keyCode);
                    }
                }

            }, this);

    }
});

var AccelerometerLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var winSize = cc.director.getWinSize();

        if ('accelerometer' in cc.sys.capabilities) {
            cc.inputManager.setAccelerometerInterval(1 / 30);
            cc.inputManager.setAccelerometerEnabled(true);
            cc.eventManager.addListener({
                event: cc.EventListener.ACCELERATION,
                callback: function (accelerometerInfo, event) {
                    var target = event.getCurrentTarget();
                    cc.log('Accel x: ' + accelerometerInfo.x + ' y:' + accelerometerInfo.y + ' z:' + accelerometerInfo.z + ' time:' + accelerometerInfo.timestamp);

                    var w = winSize.width;
                    var h = winSize.height;

                    var x = w * accelerometerInfo.x + w / 2;
                    var y = h * accelerometerInfo.y + h / 2;

                    x = x * 0.5 + target.prevX * 0.5;       //使小球慢慢移动到目标位置
                    y = y * 0.5 + target.prevY * 0.5;

                    target.prevX = x;
                    target.prevY = y;
                    target.sprite.x = x;
                    target.sprite.y = y;
                }
            }, this);

            var sprite = this.sprite = new cc.Sprite("res/1.png");
            this.addChild(sprite);
            sprite.x = winSize.width / 2;
            sprite.y = winSize.height / 2;

            this.prevX = 0;
            this.prevY = 0;
        } else {
            cc.log("ACCELEROMETER not supported");
        }
    }
});