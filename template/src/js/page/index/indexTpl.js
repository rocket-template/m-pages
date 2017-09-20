/**
 * [index item tpl]
 */
let tpl = `
<div class="list-item">
	    <a href="/sub/<%=publisher.id%>.html">
            <div class="list-head">
                <div class="fl">
                    <img src="<%=publisher.icon%>"><span><%=publisher.name%></span>
                </div>
                <!-- <div class="fr"><%=update_time%></div> -->
            </div>
		</a>
		<a href="/<%=href%>/<%=id%>.html">
            <div class="item-img">
                <img onerror="javascript:this.style.display='none';" src="<%=image%>">
                <span class="item-flag"><i><%=flag%></i></span>
            </div>
			<h2 class="item-title"><%=category%><%=title%></h2>
		</a>
		<div class="item-icon clearfix">
			<div class="fl <%=(is_collect ? ' active ' : '')%>" data-action="collect" data-collectid="<%=id%>" data-status="<%=is_collect%>">
				<em class="icon-7"></em>
			</div>
			<div class="fl <%=(is_praise ? ' active ' : '')%>" data-action="like" data-likeid="<%=id%>" data-status="<%=is_praise%>">
				<em class="icon-3"></em>
				<span data-node="count"><%=praise_num%></span>
			</div>
		</div>
</div>`;

module.exports = tpl;