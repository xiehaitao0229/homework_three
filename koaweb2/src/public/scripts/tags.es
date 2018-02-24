//在这里注册的是 x-praise 的标签
xtag.register('x-praise', {
    //标签内容 将 index.html 中注释的代码拿到这里做拼接
content : '<div class="hand" id="thumb">'+
    '<div class="finger"></div>'+
    '<div class="finger"></div>'+
    '<div class="finger"></div>'+
    '<div class="finger"></div>'+
    '<div class="finger thumb"></div>'+
    '<div class="arm"></div>'+
    '</div>'+ 
    '<span class = "hide" id = "animation" >+ 1 </span>',
    //方法
    methods: {
        praise: function() {
            let _this = this;
            //请求接口
            f.clickAction();
            //执行动画
            let animation = _this.querySelector('#animation');
            animation.className = 'hide num';
            setTimeout(function() {
                animation.className = 'hide';
            }, 800)
        }
    },
    //事件
    events: {
       //写点击事件的稀释
        click: function(e) {
            let _this = this;
            if (e.target.id = "thumb") {
                let t = '';
                if (t) {
                    clearTimeout(t);
                }
                t = setTimeout(() => {
                    _this.praise();
                }, 500)
            }
        }
    }
});
