/**
 * 文章目录生成
 * @namespace toc
 */

/**
 * tocbot 加载完成回调, 初始化 '.article' 中的三级标题 到 '#toc'.
 * @memberof toc
 * @param {Element} dom 触发回调的元素, 用于触发回调后初始化 toc 目录生成.
 */
function tocbotOnload(dom) {
    if (!(!dom.readyState || dom.readyState === 'loaded' || dom.readyState === 'complete')) return
    tocbot.init({
        tocSelector: '#toc',
        contentSelector: '.article',
        headingSelector: 'h1, h2, h3',
        hasInnerContainers: true,
    })
}

/**
 * tocbot 改变 css 样式, 弹出目录承载容器.
 * @memberof toc
 * @param {Element} dom 触发回调的元素, 用于弹出目录承载容器.
 */
function tocSwitcher(dom) {
    if (dom.checked) {
        document.querySelector('#toc').style.transform = 'translate(0)'
        document.querySelector('#toc').style.boxShadow = 'var(--card-box-shadow)'
    }
    if (!dom.checked) {
        document.querySelector('#toc').style.transform = 'translate(calc(var(--spacing)*15))'
        document.querySelector('#toc').style.boxShadow = ''
    }
}
