/**
 * 代码高亮相关
 * @namespace codehighlight 
 */


/**
 * 博客园 markdown_highlight 是异步的, 有几率会造成代码无法显示, 采取了比较trick的方式解决, 就是直接patch
 * 会在博客园调用前patch掉, 在正常调用前patch回来.
 * @memberof codehighlight
 */
function markdown_highlight_swap() { }

/**
 * @see markdown_highlight_swap
 * @memberof codehighlight
 */
function stub() {
    [markdown_highlight, markdown_highlight_swap] = [markdown_highlight_swap, markdown_highlight]
}
stub()
