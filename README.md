# 实现元素拖拽改变位置

## 项目信息

- [欧阳鹏](https://apee.top)
- 2023 年 1 月 30 日

## 使用方法

1. 使用 `<script src="script.js">` 导入库文件（[CDN&nbsp;地址](https://cdn.jsdelivr.net/gh/oyps/ele-drag/index.js)）
2. 增加拖拽功能，`.move` 是需要拖拽的元素

    ```js
    const ele = document.querySelector('.move')
    new EleDrag(ele, window, true)
    ```
3. 说明：需要为被拖拽元素设置宽度，否则元素移动到最右边时，页面可能出现水平滚动条

## 构造方法

```js
/**
 * @param target 被拖拽元素
 * @param view 被拖拽元素在容器中移动
 * @param limitOut 是否禁止元素超出容器
 */
constructor(
    target: HTMLElement,
    view: HTMLElement | Window = window,
    limitOut: boolean = true
)
```
