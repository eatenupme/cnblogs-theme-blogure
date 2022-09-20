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
 */
function MainPosts(postlistdoms, descsdoms, pagedoms) {
    // def
    const main = (vm.main = {})
    main.layout = 'posts'
    main.page = MainPage(pagedoms)
    main.posts = []
    // tags, content(async): optimization cycle complex
    const callback = (post) => {
        return (r) => {
            const tempdom = document.createElement('html')
            tempdom.innerHTML = r[0].responseText
            const tagsdoms = tempdom.querySelectorAll('a')
            const tags = []
            for (let index = 0; index < tagsdoms.length; index++) {
                const tagdom = tagsdoms[index]
                const tag = {}
                tag.desc = tagdom.innerText.trim()
                tag.url = tagdom.href.trim()
                tags.push(tag)
            }
            post.tags = tags
            post.async.tags = true

            tempdom.innerHTML = r[1].responseText
            const detaildom = tempdom.querySelector('#post_detail')
            const titledom = detaildom.querySelector('.postTitle a')
            post.url = titledom.href.trim()
            post.title = titledom.innerText.trim()
            const bodydom = detaildom.querySelector('#cnblogs_post_body')
            highlightNumber(bodydom)
            post.content = bodydom.innerHTML.trim()
            post.async.content = true
            if (!bodydom.querySelector('.more')) return
            const desc = { content: '' }
            for (let index = 0; index < bodydom.children.length; index++) {
                const childdom = bodydom.children[index]
                if (childdom == bodydom.querySelector('.more') || childdom.querySelector('.more')) break
                desc.content += childdom.outerHTML
            }
            post.content = desc.content
            // desc
            const descdom = detaildom.querySelector('.postDesc')
            post.desc = descdom.innerHTML.trim()
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
        const bdoms = descsdoms[index].querySelectorAll('a')
        const postid = new URLSearchParams(new URL(bdoms[bdoms.length - 1].href).search).get('postid')
        post.async.tagsPromise = Get(getAjaxBaseUrl() + `CategoriesTags.aspx?blogId=${currentBlogId}&postId=${postid}`)
        post.async.tags = false
        main.posts.push(post)
        Promise.all([post.async.tagsPromise, post.async.contentPromise])
            .then(callback(vm.main.posts[index]))
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