import 'css/components/confirm.scss';
import GMP from 'GMP';

let html = `
    <div class="m-dialog" role='confirmdialog'>
        <div class='dialog-content dialog-txt'>
            <%=msg%>
        </div>
        <div class="dialog-btn">
            <a href="javascript:;" role='button' class="primary cancelBtn" aria-controls='ok'>取消</a>
            <a href="javascript:;" role='button' class="default okBtn" aria-controls='ok'>确定</a>
        </div>
    </div>
    <div class="dialog-mask"></div>
`;

function preInit(options = {}, config = {}) {
    let d = {
        'click .okBtn': 'ok',
        'click .cancelBtn': 'cancel'
    };
    if (!options.events) {
        options.events = d;
    } else {
        GMP.Util.defaults(options.events, d);
    }
    if (!options.data) {
        options.data = config;
    } else {
        GMP.Util.defaults(options.data, config);
    }
}

export default class Confirm extends GMP.BaseClass {
    constructor(options) {
        preInit(options);
        super(options);
        this.trigger('_on_after', options);
    }
    _create() {
        this._createWrapper();
        let confirmHtml = GMP.template(html)(this.data);
        this.uiConfirm.append(confirmHtml);
    }
    _createWrapper() {
        this.uiConfirm = $('<div>').hide()
            .appendTo(this._appendTo(this.el));
    }
    open() {
        this.uiConfirm.show();
    }
    ok() {

    }
    cancel() {
        this.uiConfirm.hide();
    }
};
