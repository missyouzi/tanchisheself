(function (window) {
    // 蛇数组
    var foodArr = [];
    var remove = function () {
        for (var i = foodArr.length - 1; i >= 0; i--) {
            // 1. 删除div
            foodArr[i].remove();
            // 2. 删除数组中的元素
            foodArr.splice(i, 1);
        }
    };

    function Food(options) {
        options = options || {};
        // 1. 属性
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.color = options.color || 'red';
    }

    Food.prototype = {
        constructor: Food,
        // 绘制食物
        render: function (panel) {
            // 0. 绘制之前先删除
            remove();

            // 1. 随机位置
            this.x = _.random(0, panel.clientWidth/this.width - 1) * this.width;
            this.y = _.random(0, panel.clientHeight/this.height - 1) * this.height;
            // console.log(panel.clientWidth, this.width);

            // 2. 动态创建食物div
            var div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.top = this.y + 'px';
            div.style.left = this.x + 'px';
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.backgroundColor =  this.color;
            div.style.borderRadius =  this.width * 0.5 + 'px';
            panel.appendChild(div);
            foodArr.push(div);
        }
    };

    window.Food = Food;
})(window);