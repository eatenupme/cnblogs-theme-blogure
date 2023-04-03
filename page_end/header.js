// header 博客头部
// header = {
//     "url": "https://www.cnblogs.com/blogure/", // 博客园主页url
//     "title": "blogure", // 博客园标题
//     "subtitle": "又一个博客园主题", // 博客园副标题
//     "navlist": "...管理" // 导航栏dom
// }

// LoadHeader 头部数据初始化
function LoadHeader() {
    const vm = window.vm
    const header = (vm.header = {})
    const headerdom = vm.metadata.querySelector('#header')
    // 博客标题 博客子标题
    const h1dom = headerdom.querySelector('h1 a')
    header.url = h1dom.href.trim()
    header.title = h1dom.innerText.trim()
    const h2dom = headerdom.querySelector('h2')
    header.subtitle = h2dom.innerText.trim()
    // 导航栏控件
    header.navlist = ''
    const navlistdoms = headerdom.querySelectorAll('#navList li')
    navlistdoms.forEach(nav => { // 这里解析仅对空值过滤
        if (nav.innerText.trim()) {
            header.navlist += nav.outerHTML
        }
    })
    console.debug(`header${header} loaded`)
}