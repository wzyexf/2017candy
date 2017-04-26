var Class04 = cc.Scene.extend({

    onEnter: function () {
        this._super();
        // var layer = new Class04Layer01();
        //var layer = new Class04Layer02();
        var layer = new Class04Layer04();
        
        this.addChild(layer);

    }

});

var Class04Layer01 = cc.Layer.extend({

    ctor:function()
    {
        this._super();

        cc.eventManager.addListener(

            {

                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                    var pos = event.getLocation();
                    console.log(pos.x);
                    var target = event.getCurrentTarget();
                    console.log(target);

                },
                onMouseUp: function () { },
                onMouseMove:function(){}
            },

            this
            );


    }

});
var Class04Layer02 = cc.Layer.extend({

    ctor: function () {
        this._super();

        cc.eventManager.addListener(

            {

                event: cc.EventListener.KEYBOARD,
                onKeyReleased: function (keycode, event) {
                     
                    console.log(keycode);
                    var target = event.getCurrentTarget();
                    console.log(target);

                }
            },

            this
            );


    }

});
var Class04Layer03 = cc.Layer.extend({

    ctor: function () {
        this._super();

        cc.eventManager.addListener(

            {

                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: function (touch, event) {
                    var pos = touch.getLocation();
                    var id = touch.getID();



                    console.log(pos.x);
                    console.log(id);
                    var target = event.getCurrentTarget();
                    console.log(target);

                },
                onTouchMoved: function () { },
                onTouchEnded: function () { },
                onTouchCancelled:function(){}
            },

            this
            );


    }

});
var Class04Layer04 = cc.Layer.extend({

    ctor: function () {
        this._super();
        cc.inputManager.setAccelerometerInterval(1 / 30);
        cc.inputManager.setAccelerometerEnabled(true);

        cc.eventManager.addListener(

            {

                event: cc.EventListener.ACCELERATION,
                callback: function (accelerometerInfo, event) {

                    //console.log(accelerometerInfo.x);
                    //console.log(accelerometerInfo.y);
                    //console.log(accelerometerInfo.z);

                    var target = event.getCurrentTarget();
                    //cc.log('Accel x: ' + accelerometerInfo.x + ' y:' + accelerometerInfo.y + ' z:' + accelerometerInfo.z + ' time:' + accelerometerInfo.timestamp);

                    var w = winSize.width;
                    var h = winSize.height;

                    var x = w * accelerometerInfo.x + w / 2;
                    var y = h * accelerometerInfo.y + h / 2;

                    x = x * 0.2 + target.prevX * 0.8;       //使小球慢慢移动到目标位置
                    y = y * 0.2 + target.prevY * 0.8;

                    target.prevX = x;
                    target.prevY = y;
                    target.sprite.x = x;
                    target.sprite.y = y;
                    
                }
               
            },

            this
            );
        var sprite = this.sprite = new cc.Sprite("res/1.png");
        this.addChild(sprite);
        sprite.x = winSize.width / 2;
        sprite.y = winSize.height / 2;

        this.prevX = 0;
        this.prevY = 0;

    }

});
