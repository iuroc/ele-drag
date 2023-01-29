/** 拖拽移动元素 */
var EleDrag = /** @class */ (function () {
    /**
     * @param target 被拖拽元素
     * @param view 被拖拽元素在容器中移动
     * @param limitOut 是否禁止元素超出容器
     */
    function EleDrag(target, view, limitOut) {
        if (view === void 0) { view = window; }
        if (limitOut === void 0) { limitOut = false; }
        var _this = this;
        this.view = (view || window);
        this.target = target;
        this.limitOut = limitOut;
        this.target.style.position = 'absolute';
        this.target.style.left = this.target.offsetLeft + 'px';
        this.target.style.top = this.target.offsetTop + 'px';
        this.target.style.margin = '0';
        this.target.addEventListener('mousedown', function (event) {
            _this.startOffsetLeft = _this.target.offsetLeft;
            _this.startOffsetTop = _this.target.offsetTop;
            _this.startMouseX = event.pageX;
            _this.startMouseY = event.pageY;
            _this.isMouseDown = true;
        });
        this.view.addEventListener('mouseup', function (event) {
            _this.isMouseDown = false;
        });
        this.view.addEventListener('mousemove', function (event) {
            if (_this.isMouseDown) {
                _this.target.style.left = _this.startOffsetLeft - _this.startMouseX + event.clientX + 'px';
                _this.target.style.top = _this.startOffsetTop - _this.startMouseY + event.clientY + 'px';
                if (_this.limitOut) {
                    _this.limitMoveOut();
                }
            }
        });
        this.view.addEventListener('resize', function (event) {
            if (_this.limitOut) {
                _this.limitMoveOut();
            }
        });
    }
    /** 禁止元素超出容器 */
    EleDrag.prototype.limitMoveOut = function () {
        if (this.target.offsetLeft < 1) {
            this.target.style.left = '1px';
        }
        if (this.target.offsetTop < 1) {
            this.target.style.top = '1px';
        }
        var maxLeft, maxTop;
        if (this.view.tagName) {
            maxLeft = this.view.offsetWidth - this.target.offsetWidth - 1;
            maxTop = this.view.offsetHeight - this.target.offsetHeight - 1;
        }
        else {
            maxLeft = window.innerWidth - this.target.offsetWidth - 1;
            maxTop = window.innerHeight - this.target.offsetHeight - 1;
        }
        if (this.target.offsetLeft > maxLeft) {
            this.target.style.left = maxLeft + 'px';
        }
        if (this.target.offsetTop > maxTop) {
            this.target.style.top = maxTop + 'px';
        }
    };
    return EleDrag;
}());
