(function (window) {
    var self;

    function Game(panel) {
        this.food = new Food({});
        this.snake = new Snake({});
        this.panel = panel;
        // console.log(this);
        // 指针赋值
        self = this;
    }

    Game.prototype = {
        constructor: Game,
        render: function () {
           // 1.把食物和蛇绘制到面板上
           this.food.render(this.panel);
           this.snake.render(this.panel);
        },
        run: function () {
            // 1. 蛇移动起来
            snakeMove();
            // 2. 方向控制
           dirControl();
        }
    };

    function snakeMove(){
       var timeId = setInterval(function () {
             // 1. 蛇开始移动和绘制
           self.snake.move(self.food, self.panel);
           self.snake.render(self.panel);

           // 2. 边界控制
           var maxX = self.panel.clientWidth / self.snake.width;
           var maxY = self.panel.clientHeight / self.snake.height;

           // 2.1 获取蛇头的X和Y
           var headX = self.snake.body[0].x;
           var headY = self.snake.body[0].y;

           // 2.2 水平判断
           if(headX < 0 || headX >= maxX){
                clearInterval(timeId);
                if(confirm('很遗憾， 您输了！再来一次？')){
                    // 刷新界面
                    window.location.reload();
                }else {
                    window.close();
                }
           }

           // 2.3 垂直判断
           if(headY < 0 || headY >= maxY){
               clearInterval(timeId);
               if(confirm('很遗憾， 您输了！再来一次？')){
                   // 刷新界面
                   window.location.reload();
               }else {
                   window.close();
               }
           }

       }, 200);
    }

    function dirControl(){
       document.addEventListener('keydown', function (e) {
           // console.log(e['keyCode']);
           /*
             37 - left
             38 - top
             39 - right
             40 - bottom
           */
           switch (e['keyCode']) {
               case 37:
                   self.snake.direction = 'left';
                   break;
               case 38:
                   self.snake.direction = 'top';
                   break;
               case 39:
                   self.snake.direction = 'right';
                   break;
               case 40:
                   self.snake.direction = 'bottom';
                   break;
           }
       }, false);
    }

    window.Game = Game;
})(window);