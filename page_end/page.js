// page 分页
// page = {
//     "pages": [
//         { "desc": "1", "url": "" }, // 当前页
//         { "desc": "2", "url": "https://www.cnblogs.com/blogure/?page=2" }, // 其他页
//         { "desc": "下一页", "url": "https://www.cnblogs.com/blogure/?page=2" }
//     ],
//     "async": {
//         "pages": true // 分页异步标志
//     }
// }

function LoadPage() {
    const vm = window.vm
    const page = (vm.page = {})
    const originBody = vm.metadata
    page.pages = []
    page.async = {}
    if (!((originBody.querySelector('.Pager, .pager') || originBody.querySelector('#nav_next_page a')))) {
        return page
    }
    const pagerdom = originBody.querySelector('.Pager') ? originBody.querySelector('.Pager') : originBody.querySelector('.pager')
    if (pagerdom) {
        const pagenodes = pagerdom.childNodes
        for (let index = 0; index < pagenodes.length; index++) {
            const pagenode = pagenodes[index]
            if (pagenode.textContent.trim() == '') continue
            const p = {}
            p.desc = pagenode.textContent.trim()
            p.url = pagenode.href ? pagenode.href.trim() : ''
            page.pages.push(p)
        }
        return page
    }
    page.async.pages = false
    Get(originBody.querySelector('#nav_next_page a').href.trim()).then(((page) => {
        return (r) => {
            const tempdom = document.createElement('html')
            tempdom.innerHTML = r.responseText
            const pagenodes = tempdom.querySelector('.Pager, .pager').childNodes
            for (let index = 0; index < pagenodes.length; index++) {
                const pagenode = pagenodes[index]
                if (pagenode.textContent.trim() == '') continue
                const p = {}
                p.desc = pagenode.textContent.trim()
                p.url = pagenode.href ? pagenode.href.trim() : ''
                page.pages.push(p)
            }
            page.pages.shift() // const('上一页')
            if (page.pages.length == 2) page.pages.push({ 'desc': '下一页', url: r.responseURL })
            [page.pages[0], page.pages[1]] = [page.pages[1], page.pages[2]]
            page.pages[0].desc = '1'
            page.pages[0].url = ''
            page.pages[1].desc = '2'
            page.pages[1].url = r.responseURL
            page.async.pages = true
        }
    })(vm.page))
}