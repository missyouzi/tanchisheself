(function (window) {
    // 蛇数组
    var snakeArr = [];
    var remove = function () {
        for (var i = snakeArr.length - 1; i >= 0; i--) {
            // 1. 删除div
            snakeArr[i].remove();
            // 2. 删除数组中的元素
            snakeArr.splice(i, 1);
        }
    };

    function Snake(options) {
        options = options || {};
        // 1. 属性
        // 1.1 蛇节
        this.width = options.width || 20;
        this.height = options.height || 20;
        // 1.2 蛇移动的方向
        this.direction = options.direction || 'right';
        // 1.3 蛇的身体和蛇头
        this.body = [
            {x: 2, y: 0, color: 'purple'}, // 蛇头
            {x: 1, y: 0, color: 'red'}, // 蛇节
            {x: 0, y: 0, color: 'red'} // 蛇节
        ];
    }

    Snake.prototype = {
        constructor: Snake,
        // 绘制
        render: function (panel) {
            // 1. 删除旧蛇
            remove();

            // 2. 绘制新蛇
            for (var i = 0, len = this.body.length; i < len; i++) {
                // 1. 取出蛇的信息
                var obj = this.body[i];
                // 2. 创建蛇节和蛇头
                var div = document.createElement('div');
                div.style.position = 'absolute';
                div.style.left = obj.x * this.width + 'px';
                div.style.top = obj.y * this.height + 'px';
                div.style.width = this.width + 'px';
                div.style.height = this.height + 'px';
                div.style.backgroundColor = obj.color;
                div.style.borderRadius = this.width * 0.5 + 'px';
                panel.appendChild(div);
                // 记录当前的蛇
                snakeArr.push(div);
            }
        },
        // 移动
        move: function (food, panel) {
            // 1. 控制蛇的身体移动 (当前的蛇节 移动到 上一个蛇节的位置)
            for (var i = this.body.length - 1; i > 0; i--) {
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;
            }

            // 2. 控制蛇头的移动
            var head = this.body[0];
            switch (this.direction) {
                case 'right':
                    head.x += 1;
                    break;
                case 'left':
                    head.x -= 1;
                    break;
                case 'top':
                    head.y -= 1;
                    break;
                case 'bottom':
                    head.y += 1;
                    break;
            }
            // 3. 判断蛇头是否和食物的坐标重叠
            var headX = head.x * this.width;
            var headY = head.y * this.height;
            // console.log(food.x, food.y);
            // console.log(headX, headY);
            if (headX === food.x && headY === food.y) {
                // 3.1 让蛇增加一节
                var last = this.body[this.body.length - 1];
                this.body.push({
                    x: last.x,
                    y: last.y,
                    color: last.color
                });

                // 3.2 随机在面板上重新生成食物
                food.render(panel);
            }
        }

    };

    window.Snake = Snake;
})(window);