var createEle = function(){
	return $(`
		<div class="top-line">
			<span class="line-left"></span>
			<p>
				<em class="icon-15"></em>
				上次看到这
			</p>
			<span class="line-right"></span>
		</div>`);
};

var init = function(){
	var ele;
	return function(){
		if(!ele){
			ele = createEle();
		}
		return ele;
	}
}

export default init();