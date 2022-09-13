/**
 * 主题的亮色与暗色
 * @namespace themedata
 */

/**
 * 切换并尝试存储用户新的状态
 * @memberof themedata
 */
function darkSwitcher(dom) {
    darkSwitcherWithStorage(dom)
    if (dom.checked) document.querySelector('html').setAttribute('data-theme', 'dark')
    if (!dom.checked) document.querySelector('html').setAttribute('data-theme', 'light')
}

/**
 * 存储用户更改的状态
 * @memberof themedata
 */
function darkSwitcherWithStorage(dom) {
    if (!window.localStorage) return
    if (dom.checked) localStorage.setItem('data-theme', 'dark')
    if (!dom.checked) localStorage.setItem('data-theme', 'light')
}

/**
 * 初始化, 如果上一次用户更改了状态
 * @memberof themedata
 */
function initDataTheme() {
    if (window.localStorage) document.querySelector('html').setAttribute('data-theme', localStorage.getItem('data-theme'))
}
initDataTheme()