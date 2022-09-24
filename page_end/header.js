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
function GetHeader() {
    const header = (vm.header = {})
    const headerdom = vm.metadata.querySelector('#header')
    // title subtitle
    const h1dom = headerdom.querySelector('h1 a')
    header.url = h1dom.href.trim()
    header.title = h1dom.innerText.trim()
    const h2dom = headerdom.querySelector('h2')
    header.subtitle = h2dom.innerText.trim()
    // navlist
    const navlistdom = headerdom.querySelector('#navList')
    header.navlist = navlistdom.innerHTML.trim()
    console.log(header)
    return header
}