/**
 * 拖拽移动元素
 * @author 欧阳鹏
 * @version 1.0.1
 * @link https://apee.top
 */
class EleDrag implements IConfig {
    target: HTMLElement
    view?: HTMLElement | Window
    limitOut?: boolean
    /** 被拖拽元素起始左边距 */
    startOffsetLeft: number
    /** 被拖拽元素起始顶边距 */
    startOffsetTop: number
    /** 鼠标起始 X 值 */
    startMouseX: number
    /** 鼠标起始 Y 值 */
    startMouseY: number
    /** 鼠标是否在被拖拽元素按下 */
    isMouseDown: boolean
    /**
     * @param target 被拖拽元素
     * @param view 被拖拽元素在容器中移动
     * @param limitOut 是否禁止元素超出容器
     */
    constructor(
        target: HTMLElement,
        view: HTMLElement | Window = window,
        limitOut: boolean = false
    ) {
        this.view = (view || window) as HTMLElement
        this.target = target
        this.limitOut = limitOut
        this.target.style.position = 'absolute'
        this.target.style.left = this.target.offsetLeft + 'px'
        this.target.style.top = this.target.offsetTop + 'px'
        this.target.style.margin = '0'
        this.target.addEventListener('mousedown', (event) => {
            this.startOffsetLeft = this.target.offsetLeft
            this.startOffsetTop = this.target.offsetTop
            this.startMouseX = event.pageX
            this.startMouseY = event.pageY
            this.isMouseDown = true
        })
        this.view.addEventListener('mouseup', (event) => {
            this.isMouseDown = false
        })
        this.view.addEventListener('mousemove', (event) => {
            if (this.isMouseDown) {
                this.target.style.left = this.startOffsetLeft - this.startMouseX + event.clientX + 'px'
                this.target.style.top = this.startOffsetTop - this.startMouseY + event.clientY + 'px'
                if (this.limitOut) {
                    this.limitMoveOut()
                }
            }
        })
        this.view.addEventListener('resize', (event) => {
            if (this.limitOut) {
                this.limitMoveOut()
            }
        })
    }
    /** 禁止元素超出容器 */
    limitMoveOut() {
        if (this.target.offsetLeft < 1) {
            this.target.style.left = '1px'
        }
        if (this.target.offsetTop < 1) {
            this.target.style.top = '1px'
        }
        let maxLeft: number, maxTop: number
        if ((this.view as HTMLElement).tagName) {
            maxLeft = (this.view as HTMLElement).offsetWidth - this.target.offsetWidth - 1
            maxTop = (this.view as HTMLElement).offsetHeight - this.target.offsetHeight - 1
        } else {
            maxLeft = window.innerWidth - this.target.offsetWidth - 1
            maxTop = window.innerHeight - this.target.offsetHeight - 1
        }
        if (this.target.offsetLeft > maxLeft) {
            this.target.style.left = maxLeft + 'px'
        }
        if (this.target.offsetTop > maxTop) {
            this.target.style.top = maxTop + 'px'
        }
    }
}

/** 配置 */
interface IConfig {
    /** 被拖拽元素 */
    target: HTMLElement,
    /** 被拖拽元素在容器中移动 */
    view?: HTMLElement | Window,
    /** 是否禁止元素超出容器 */
    limitOut?: boolean
}