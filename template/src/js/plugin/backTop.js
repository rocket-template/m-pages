/**
 *  使用方法:
 * import backTop from 'plugin/backTop.js';
 * 
 	new backTop({
		minHeight: 667  // 显示按钮的最小高度，默认屏幕高度一半
 	});
 * 
 */

class backTop {
	constructor(options) {
		this.options = options || {};
		this.minHeight = this.options.minHeight || window.screen.height / 2; // 不设定则卷去一半显示
		const gotoTop_html = '<div class="back-top" style="display: none;opacity: 0;" id="back-top"><em class="icon-19"></em></div>';
		$('body').append(gotoTop_html);
		this.ele = $('#back-top');
		this.ele.on('click', () => {
			this._scrollToTop(500);
		});
		setTimeout(() => {
			// 让 font 文件提前加载好
			this.ele.css({
				opacity: 1
			});
		}, 0)
		this.debounceFunc = this._debounce(this._controlButton.bind(this));
		$(window).on('scroll', this.debounceFunc);
		$(window).on('load', this.debounceFunc);
	}
	_controlButton() {
		const s = $(window).scrollTop();
		if (s > this.minHeight) {
			this.ele.show();
		} else {
			this.ele.hide();
		};
	}
	hide() {
		this.ele.hide();
	}
	show() {
		this._controlButton();
	}
	_scrollToTop(scrollDuration) {
		// scrollDuration 达到顶部的 ms 值
		const scrollHeight = window.scrollY;
		const scrollStep = Math.PI / Math.floor(scrollDuration / 15);
		const cosParameter = scrollHeight / 2;
		let scrollCount = 0;
		let scrollMargin;
		let scrollInterval = setInterval(() => {
			if (window.scrollY != 0) {
				scrollCount = scrollCount + 1;
				// ease 动画
				scrollMargin = cosParameter - Math.floor(cosParameter * Math.cos(scrollCount * scrollStep));
				window.scrollTo(0, (scrollHeight - scrollMargin));
			} else {
				clearInterval(scrollInterval);
			}
		}, 15);
	}
	_debounce(func, wait, immediate) {
		let timeout;
		return function() {
			const _this = this;
			const args = arguments;

			function later() {
				timeout = null;
				if (!immediate) func.apply(_this, args);
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(_this, args);
		}
	};
}

export default backTop;
