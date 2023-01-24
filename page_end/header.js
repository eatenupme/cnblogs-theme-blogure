/**
 * 博客标题导航等
 * @namespace headers
 */

/**
 * @typedef {Object} header
 * @property {String} url - 主页url
 * @property {String} title - https://i.cnblogs.com/settings - 博客标题
 * @property {String} subtitle - https://i.cnblogs.com/settings - 博客子标题
 * @property {String} navlist - https://i.cnblogs.com/preference - 导航栏控件
 */

/**
 * header数据加载
 * @memberof headers
 * @returns {header} 博客标题导航
 */
function LoadHeader() {
    const vm = window.vm
    const header = (vm.header = {})
    const headerdom = vm.metadata.querySelector('#header')
    // title subtitle
    const h1dom = headerdom.querySelector('h1 a')
    header.url = h1dom.href.trim()
    header.title = h1dom.innerText.trim()
    const h2dom = headerdom.querySelector('h2')
    header.subtitle = h2dom.innerText.trim()
    // navlist
    header.navlist = ''
    const navlistdoms = headerdom.querySelectorAll('#navList li')
    navlistdoms.forEach(nav => { // 原则上不解析, 这里因为博客园对关闭的导航栏保留标签导致需要去解析. 这里解析仅对空值过滤.
        if (nav.innerText.trim()) {
            header.navlist += nav.outerHTML
        }
    })
    console.debug('header loaded from vm.metadata', vm.metadata, header)
}