// header 头部
// header.url 主页url
// header.title header.subtitle 博客标题 博客子标题 博客园设置中修改
// header.navlist 导航栏控件 博客园设置中修改

// LoadHeader header 数据加载
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

    console.debug(`header${header} loaded from vm.metadata`)
}