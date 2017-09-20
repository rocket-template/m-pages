let inited = false;
let $box, $dom, timer1,timer2;
function toggleToast(len){

	if (!inited) {
		$box = $('<div class="update-toast-wrap"><div class="toast-updated"></div></div>');
		$dom = $box.find('.toast-updated');
		$('body').prepend($box);
		inited = true;
	}

	clearTimeout(timer1);
	timer1 = setTimeout(function(){
		$dom.html('已更新'+len+'条内容');
		$dom.addClass('active');
	},0);
	
	clearTimeout(timer2);
	timer2 = setTimeout(function(){
		$dom.removeClass('active');
	},2000);
}

export default toggleToast;