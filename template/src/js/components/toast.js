import 'css/components/toast.scss';

var noop = function() {};

var defaults = {
    delay: 2000,
    class: 'pub-toast',
    position: {
        left: 'center',
        top: 'center'
    },
    onShow: noop,
    onHide: noop
};

var timer;
var $ele;
var currentCls;

var toast = function(msg, conf) {
    if (!msg) {
        throw Error('msg is required!');
    }
    var opts = $.extend({}, defaults, conf || {});

    var hide = function() {
        clearTimeout(timer);
        timer = null;
        $ele.hide();
    };
    var show = function() {
        currentCls = opts.class;
        opts.onShow($ele);
        timer = setTimeout(function() {
            hide();
            opts.onHide($ele);
        }, opts.delay);
    };

    if(!$ele){
        $ele = $('<div>').css({
            position: 'fixed'
        }).appendTo(document.body);
    } else {
        if(timer){
            hide();
        }
    }

    // 移除之前的样式, 设置msg,准备计算宽度
    $ele.removeClass(currentCls).addClass(opts.class).html(msg).show();

    var w = $ele.width();
    var h = $ele.height();
    var vw = window.innerWidth;
    var vh = window.innerHeight;

    var position = opts.position;
    var left = position.left;
    var top = position.top;
    if (left === 'center') {
        left = (vw - w) / 2 + 'px';
    }
    if (top === 'center') {
        top = (vh - h) / 2 + 'px';
    }
    $ele.css({
        left: left,
        top: top
    });

    show();
}

export default toast;
