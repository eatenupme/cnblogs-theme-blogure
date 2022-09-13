/**
 * @see markdown_highlight_swap
 * @memberof codehighlight
 */
function reset() {
    [markdown_highlight, markdown_highlight_swap] = [markdown_highlight_swap, markdown_highlight]
}
reset()

/**
 * 控制代码高亮是否显示行号
 * @memberof codehighlight
 */
function highlightNumber(dom) {
    if (!enableCodeLineNumber) return
    dom.querySelectorAll('pre code').forEach(codedom => {
        codedom.parentElement.classList.add('line-numbers', 'keep-initial-line-feed')
    })
}