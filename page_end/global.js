/**
 * 全局
 * @namespace global
 */

/**
 * IIFE
 * @see markdown_highlight_swap
 * @memberof global
 */
function reset() {
    [markdown_highlight, markdown_highlight_swap] = [markdown_highlight_swap, markdown_highlight]
}
reset()

/**
 * 读取WindowLocalStorage中设置的亮色暗色状态 IIFE
 * @memberof global
 */
function initDataTheme() {
    if (window.localStorage && localStorage.getItem('data-theme')) document.querySelector('html').setAttribute('data-theme', localStorage.getItem('data-theme'))
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches) document.querySelector('#dark-switch').checked = true
        else document.querySelector('#dark-switch').checked = false
        darkSwitcher(document.querySelector('#dark-switch'))
    })
}
initDataTheme()

/**
 * onload触发设置body可见, 触发各个组件的数据加载, 挂载dom
 * @memberof global
 * @param {Element} dom
 */
function petitevueOnload(dom) {
    if (!(!dom.readyState || dom.readyState === 'loaded' || dom.readyState === 'complete')) return
    // save to origin 
    const originBody = document.createElement('html')
    originBody.innerHTML = document.body.innerHTML
    // body html update
    document.body.innerHTML = originBody.querySelector('#page_begin_html').innerHTML
    // body css update
    document.body.classList.remove('skin-simplememory')
    document.body.classList.remove('has-navbar')
    document.body.classList.remove('mathjax2')
    document.body.classList.remove('no-navbar')
    document.body.style.visibility = 'visible'
    // body html append token
    const tokendom = originBody.querySelector('#antiforgery_token')
    document.body.appendChild(tokendom)
    // vm mount
    const vm = (window.vm = PetiteVue.reactive({}))
    vm.theme = localStorage.getItem('data-theme') ?? 'light'
    vm.async = {}
    vm.header = GetHeader(originBody)
    vm.main = GetMain(originBody)
    PetiteVue.createApp({ vm, Header, Main, Footer, Page }).mount()
}

/**
 * 代码行号显示 兼容博客园自身配置
 * @memberof global
 * @param {Element} dom
 */
function highlightNumber(dom) {
    if (!enableCodeLineNumber) return
    dom.querySelectorAll('pre code').forEach(codedom => {
        codedom.parentElement.classList.add('line-numbers', 'keep-initial-line-feed')
    })
}

/**
 * 更改的亮色暗色状态并存储到WindowLocalStorage
 * @memberof global
 * @param {Element} dom
 */
function darkSwitcherWithStorage(dom) {
    if (!window.localStorage) return
    if (dom.checked) localStorage.setItem('data-theme', 'dark')
    if (!dom.checked) localStorage.setItem('data-theme', 'light')
}

/**
 * 点击触发亮色暗色切换
 * @memberof global
 * @param {Element} dom
 */
function darkSwitcher(dom) {
    darkSwitcherWithStorage(dom)
    if (dom.checked) document.querySelector('html').setAttribute('data-theme', 'dark')
    if (!dom.checked) document.querySelector('html').setAttribute('data-theme', 'light')
    window.vm.theme = document.querySelector('html').getAttribute('data-theme')
}

/**
 * 原生xhr
 * @memberof global
 * @param {String} url
 */
function Get(url) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.send()
    return new Promise(r => {
        xhr.onreadystatechange = _ => {
            if (xhr.readyState !== 4) return
            r(xhr)
        }
    })
}