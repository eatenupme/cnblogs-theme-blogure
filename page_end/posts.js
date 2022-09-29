/**
 * 随笔[文章]列表
 * @namespace posts
 */

/**
 * posts数据加载
 * @memberof posts
 * @param {Element} postlistdoms
 * @param {Element} descsdoms
 * @param {Element} pagedoms
 * @returns {Array.post} 随笔对象列表
 */
function GetMainPosts() {
    // def
    postlistdoms, descsdoms, pagedoms =
        vm.metadata.querySelectorAll('.postTitle, .postTitl2, .entrylistPosttitle'),
        vm.metadata.querySelectorAll('.postDesc, .postDesc2, .entrylistItemPostDesc'),
        vm.metadata
    const main = (vm.main = {})
    main.layout = 'posts'
    main.page = MainPage(pagedoms)
    main.posts = []
    // tags, content(async): optimization cycle complex
    const callback = (post) => {
        return (r) => {
            const tempdom = document.createElement('html')
            tempdom.innerHTML = r.responseText
            post = GetMainPost(tempdom)
        }
    }
    const l = Math.min(postlistdoms.length, descsdoms.length)
    for (let index = 0; index < l; index++) {
        const adom = postlistdoms[index].querySelector('a')
        // def
        const post = {}
        post.async = {}
        post.title = adom.innerText.trim()
        post.url = adom.href.trim()
        post.async.contentPromise = Get(post.url)
        post.async.content = false
        // async
        main.posts.push(post)
        contentPromise.then(callback(vm.main.posts[index]))
    }
    console.log(main)
    return main
}

/**
 * page数据加载
 * @memberof posts
 * @param {Element} originBody
 */
function MainPage(originBody) {
    const page = (vm.main.page = {})
    page.pages = []
    page.async = {}
    if (!((originBody.querySelector('.Pager, .pager') || originBody.querySelector('#nav_next_page a')))) {
        console.log(page)
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
        console.log(page)
        return page
    }
    page.async.pagePromise = Get(originBody.querySelector('#nav_next_page a').href.trim())
    page.async.pages = false
    page.async.pagePromise.then(((page) => {
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
    })(vm.main.page))
    console.log(page)
    return page
}