var PlayLayer = cc.Layer.extend({
    level: 0,
    score: 0,
    steps: 0,
    limitStep: 0,
    targetScore: 0,
    candySprite:null,
    ctor: function () {
        this._super();
        this._init();
        var size = cc.director.getWinSize();
        this.candySprite = [];
        for (var i = 0; i < Constant.CANDY_MAXSIZE; i++) {
            var column=[];
            for (var j = 0; j < Constant.CANDY_MAXSIZE; j++) {
                var item = Candy.createCandy(i,j);
                item.x = 32 + 64 * i;
                item.y = 32 + 64 * j;
                this.addChild(item);
                column.push(item);
            }
            this.candySprite.push(column);
            
        }
        this._addEvent();

       
    },
    _init: function () {
        this.level = 1;
        this.score = 10;
        this.steps = 30;
        this.limitStep = 30;
        this.targetScore = 500;
    },
    _addEvent: function () {
        cc.eventManager.addListener(
                {
                    event: cc.EventListener.MOUSE,
                    onMouseDown: this._onMouseDown.bind(this)

                },
                this
            );
    },
    _onMouseDown:function(event){
        var pos = event.getLocation();
        var column = Math.floor((pos.x - this.x) / 64);
        var row = Math.floor((pos.y - this.y) / 64);
        //console.log(column);
        //console.log(row);
        this._popCandy(column, row);
    },
    _popCandy: function (column, row) {

        var pool = [this.candySprite[column][row]];
        var index = 0;
        var addpool = function (candy) {
            if (pool.indexOf(candy)<0)
                pool.push(candy);
        }
        while (index < pool.length) {
            var candy = pool[index];
            column = candy.column;
            row = candy.row;
          //  console.log(this._checkExist(column + 1, row));
            if(this._checkExist(column+1,row)&&this.candySprite[column+1][row].type==candy.type)
            {
                addpool(this.candySprite[column + 1][row])
              
            }
            if (this._checkExist(column - 1, row) && this.candySprite[column - 1][row].type == candy.type) {
                addpool(this.candySprite[column - 1][row])

            }
            if (this._checkExist(column , row-1) && this.candySprite[column ][row-1].type == candy.type) {
                addpool(this.candySprite[column ][row-1])

            }
            if (this._checkExist(column , row+1) && this.candySprite[column][row+1].type == candy.type) {
                addpool(this.candySprite[column ][row+1])

            }
            index++;
        }
        if(index<2)
        {
            return;

        }else
        {
            //分数计算
            this.score += pool.length * pool.length;
            //消除自己节点
            for (var i = 0; i < pool.length; i++) {
                var candy = pool[i];
                this.candySprite[candy.column][candy.row] = null;
                this.removeChild(candy);
                
            }


            //生成新的节点，掉下动画
            this._generateCandy();
        }
    },
    _checkExist: function (colunm, row) {
        
        if(colunm<0|| colunm>=10 || row<0|| colunm>=10)
        {
            return false
        }else
        {
            if (!this.candySprite[colunm][row]) {
                return false;
            } else
            {
                return true;
            }
            
        }
    },
    _generateCandy: function () {
        
        for (var i = 0 ; i < 10; i++) {
            var misscount = 0;
            console.log(this.candySprite[i].length);
            for (var j = 0; j < this.candySprite[i].length; j++) {
                var candy = this.candySprite[i][j];
                if (!candy) {
                    //空
                    var newCandy = Candy.createCandy(i, 10+misscount);
                    newCandy.x = newCandy.column * 64 + 32;
                    newCandy.y = newCandy.row * 64 + 32;
                    this.addChild(newCandy);
                    this.candySprite[i][newCandy.row] = newCandy;
                    misscount++;
                    
                }else
                {
                    //非空
                    if(misscount>0){
                    var move = cc.moveTo(1, candy.x, candy.y - 64 * misscount);
                    candy.runAction(move);
                    this.candySprite[i][j] = null;
                    this.candySprite[i][j - misscount] = candy;
                    }

                }

            }

            for (var j = this.candySprite[i].length; j >= 10; j--) {
                this.candySprite[i].splice(j, 1);
            }
        }
    }
   
});