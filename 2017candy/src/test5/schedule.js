var Schedule = cc.Scene.extend({
    onEnter: function () {
        this._super();

       // var layer = new ScheduleLayer();
      //  var layer = new ResumeLayer();
      //  var layer = new InaccuracyTestLayer();

        var layer = new BetterScheduleLayer();
        this.addChild(layer);

    }

});

var ScheduleLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        //        this.schedule(this.tick, 1, cc.REPEAT_FOREVER, 1);
        //        setInterval(this.tick, 1000);
        this.schedule(this.tick, 1, cc.REPEAT_FOREVER, 1);
        this.tickCount = 0;
    },

    tick: function () {
        console.log("tick");
        this.tickCount++;
        if (this.tickCount == 5) {
            this.unschedule(this.tick);
        }
    }
});

var ResumeLayer = cc.Layer.extend({

    ctor: function () {
        this._super();
        this.scheduleUpdate();
        this.schedule(this.scheduleTest, 1);
        this.scheduleOnce(this.scheduleOnceTest, 3);

        setTimeout(function () {
            console.log("pause", this.currentTime());
            this.pause();
        }.bind(this), 2000);

        setTimeout(function () {
            console.log("resume", this.currentTime());
            this.resume();
        }.bind(this), 5000);

        console.log(this.currentTime());
        this.frame = 0;
    },

    update: function () {
        this.frame++;
        if (this.frame % 10 == 0) {
            console.log("update 10 frame");
        }
    },

    scheduleTest: function () {
        console.log("scheduleTest", this.currentTime());
    },

    scheduleOnceTest: function () {
        console.log("scheduleOnceTest", this.currentTime());
    },

    currentTime: function () {
        return parseInt(new Date().getTime() / 1000);
    }
});
var InaccuracyTestLayer = cc.Layer.extend({

    ctor: function () {
        this._super();
        var startTime = new Date().getTime();
        var count = 0;
        this.schedule(function () {
            var timePass = new Date().getTime() - startTime;
            count++;
            var delta = timePass - (count * 100);
            console.log("time pass", timePass, "total delta", delta, "count", count);
        }, 0.1);

        //this.scheduleUpdate();
    },

    update: function () {
        for (var i = 0; i < 10000000; i++) {
            b = 1 / 0.22222;
        }
    }
});

var BetterScheduleLayer = cc.Layer.extend({

    ctor: function () {
        this._super();

        var startTime = Date.now();
        var count = 0;
        this.schedule2(function () {
            var timePass = Date.now() - startTime;
            count++;
            var delta = timePass - (count * 100);
            console.log("time pass", timePass, "total delta", delta, "count", count);
        }, 0.1);
       // this.scheduleUpdate();
    },

    schedule2: function (callback, interval) {
        var then = Date.now();
        interval = interval * 1000;
        this.schedule(function () {
            var now = Date.now();
            var delta = now - then;
            if (delta > interval) {
                then = now - (delta % interval);
                callback.call(this);
            }
        }.bind(this), 0);
    },

    update: function () {
        for (var i = 0; i < 10000000; i++) {
            b = 1 / 0.22222;
        }
    }
});
