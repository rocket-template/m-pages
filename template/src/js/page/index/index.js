/* css */
import 'css/page/index/index.scss';

import GMP from 'GMP';
import fetch from 'io/fetch';

import toast from 'components/toast';
import updateToast from 'components/updateToast';
import PullToRefresh from 'components/pullToRefresh';

import Scrollload from 'Scrollload';
import backTop from 'plugin/backTop.js';
import fromNow from 'util/fromNow';

import tpl from './indexTpl.js';
import last from './last.js'; // 上次看到这里

window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload();
    }
}

var render = function(list) {
    var html = '';
    var fn = GMP.template(tpl);
    for (var i = 0, len = list.length; i < len; i++) {
        var v = list[i];
        // v.flag = v.video_type == 0 ? '直播' : timeLenFormat(v.length);
        v.flag = v.video_type == 0 ? '直播' : v.length;
        v.href = v.video_type == 0 ? 's' : 'v';
        v.update_time = fromNow(v.update_time);
        if(v.publisher.icon == ""){
        	v.publisher.icon = defaultHead();
        }
        // v.category = 1;
        if(v.category === 1){
            v.category = '<em class="icon-16"></em>';
        } else {
            v.category = '';
        }
        html += fn(v);
    }
    return html;
};

var load = function() {
    return fetch.get('/recommendList.json');
};

var showToast = function(len){
    updateToast(len);
};

var loadMore = true;
var $videoList = $('#videoList');
var $lastEle = last();
var errMsg = '网络请求异常';

// 下拉加载
var ptr = new PullToRefresh($videoList);
ptr.on('refreshing', function() {
    if (!loadMore) {
        ptr.noMoreData();
        ptr.loadDone();
        return;
    }
    load().done(function(json) {
    	if(json && json.code === 200){
    		var list = json.data.list;
    		var len = list.length;
    		if(len){
    			var html = render(list.reverse());
    			ptr.refreshLayer.after($lastEle).after(html);
    			showToast(len);
    		} else {
    			ptr.noMoreData();
    			loadMore = false;
    		}
		} else {
			toast(errMsg);
		}
    }).fail(function(xhr, status){
        // 有些浏览器上,在加载新页面时,会abort掉正在发送的请求
        if(status && status !== 'abort'){
            toast(errMsg);
        }
    }).always(function(){
    	ptr.loadDone();
    });
});

// 滚动加载
var scrollLoad = new Scrollload($videoList[0], function(sl) {
	var scrollLoadError = function(){
		sl.throwException();
    	toast(errMsg);
	};
    if (loadMore) {
    	load().done(function(json) {
    		if(json && json.code === 200){
    			var list = json.data.list;
    			var len = list.length;
    			if(len){
	    			var html = render(list);
	    			$(sl.bottomDom)/*.before($lastEle)*/.before(html);
	    			// showToast(len);  滚动加载不需要toast提示。
                    sl.unLock();
	    		} else {
	    			loadMore = false;
	    			sl.noData();
	    		}
    		} else {
    			scrollLoadError();
    		}
	    }).fail(function(){
            if(status && status !== 'abort'){
                scrollLoadError();
            }
	    });
    } else {
        sl.noData();
    }
}, {
    isInitLock: false,
    loadingHtml: '<div class="top-line no-more"><p>加载中...</p></div>',
    noDataHtml: '<div class="top-line no-more"><span class="line-left"></span><p>没有更多了</p><span class="line-right"></span></div>',
    exceptionHtml: '<div class="top-line no-more" data-node="errorNode"><p>出错啦，点我重试</p></div>'
});

$(scrollLoad.container).on('click', '[data-node=errorNode]', function(){
    scrollLoad.solveException();
});


new backTop();