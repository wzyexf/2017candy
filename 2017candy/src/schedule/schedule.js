var ScheduleScene = cc.Scene.extend(
    {
        onEnter: function () {
            this._super();
            var size = cc.director.getWinSize();
            var bg = new cc.LayerColor(cc.color(0, 0, 0), size.width, size.height);
            this.addChild(bg);

            var label = new cc.LabelTTF("Schedule效果演示", "Arial", 50);
            label.setColor(cc.color(255, 255, 255));
            label.x = 220;
            label.y = size.height - 50;
            this.addChild(label);
            //layer = new ScheduleLayer1();
            layer = new ScheduleLayer4();
            this.addChild(layer);
        }


    }
    );


var ScheduleLayer1 = cc.Layer.extend({

    ctor: function () {
        this._super();
        this.schedule(this.callback, 1, 10, 1);//(函数，间隔时间秒，重复次数+1，第一次延迟时间秒）
        var item = new cc.MenuItemFont("停止", this._end, this);
        item.fontSize = 32;
        item.fontName = "Arial";
        var item2 = new cc.MenuItemFont("暂停", this._pause, this);
        item2.fontSize = 32;
        item2.fontName = "Arial";
        var item3 = new cc.MenuItemFont("继续", this._resume, this);
        item3.fontSize = 32;
        item3.fontName = "Arial";
        var menu = new cc.Menu(item, item2, item3);
        menu.alignItemsVertically();
        menu.alignItemsHorizontally();
        this.addChild(menu);

    },
    _end: function () {
        this.unschedule(this.callback);
    },
    _pause: function () {
        this.pause();
    },
    _resume: function () {
        this.resume();
    },
    callback: function () {
        console.log("schedule");
    }
});

var ScheduleLayer2 = cc.Layer.extend({

    ctor: function () {
        this._super();
        this.scheduleOnce(this.callback,1);//(函数，第一次延迟时间秒）


    },

    callback: function () {
        console.log("scheduleOnce");
    }
});

var ScheduleLayer3 = cc.Layer.extend({

    ctor: function () {
        this._super();
        this.scheduleUpdate();//(函数，第一次延迟时间秒）

        var item = new cc.MenuItemFont("停止", this._end, this);
        item.fontSize = 32;
        item.fontName = "Arial";
        var item2 = new cc.MenuItemFont("暂停", this._pause, this);
        item2.fontSize = 32;
        item2.fontName = "Arial";
        var item3 = new cc.MenuItemFont("继续", this._resume, this);
        item3.fontSize = 32;
        item3.fontName = "Arial";
        var menu = new cc.Menu(item,item2, item3);
        menu.alignItemsVertically();
        menu.alignItemsHorizontally();
        this.addChild(menu);

    },
    _end: function () {
        this.unscheduleUpdate();
    },
    _pause: function () {
        this.pause();
    },
    _resume:function(){
        this.resume();
    },
    update: function () {
        console.log("scheduleOnce");
    }
});

var ScheduleLayer4 = cc.Layer.extend({

    ctor: function () {
        this._super();
        //setTimeout(this.done, 1000);//毫秒  思考一下
        setTimeout(this.done1.bind(this), 1000);//毫秒
        setInterval(this.done2.bind(this), 100);

    },
    done1: function () {
        console.log("setTimeOut:done");
        this.test();
    },
    done2: function () {
        console.log("setInterval:done");
        this.test();
    },
    test: function () {
        console.log(new Date().getTime() / 1000);
    }

});