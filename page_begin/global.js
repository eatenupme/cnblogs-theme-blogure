/**
 * markdown_highlight 是异步的, 而且没有给到应用. 使用 patch 来主动管控 markdown_highlight.
 * @memberof global
 */
function markdown_highlight_swap() { }

/**
 * IIFE
 * @see markdown_highlight_swap
 * @memberof global
 */
function stub() {
    [markdown_highlight, markdown_highlight_swap] = [markdown_highlight_swap, markdown_highlight]
}
stub()