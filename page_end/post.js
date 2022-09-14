/**
 * 随笔[文章]
 * @namespace post
 */

/**
 * 网络触发重新渲染评论
 * @memberof post
 * @param {ajax.settings} settings
 */
$(document).ajaxComplete((_e, _x, settings) => {
    if (settings.url.indexOf('PostComment/Add.aspx') < 0) return
    window.vm.main.post.async.comments = false
    Get(getAjaxBaseUrl() + `GetComments.aspx?postId=${cb_entryId}&pageIndex=0`).then((r) => {
        comments = []
        const tempdom = document.createElement('div')
        tempdom.innerHTML = r.responseText.trim()
        const commentsdoms = tempdom.querySelectorAll('.feedbackItem')
        for (let index = 0; index < commentsdoms.length; index++) {
            const commentdom = commentsdoms[index]
            const comment = {}
            comment.layer = commentdom.querySelector('.layer').innerText.trim()
            comment.isSelf = commentdom.querySelector('.louzhu') ? true : false
            const adoms = commentdom.querySelectorAll('.feedbackListSubtitle a')
            const userdom = adoms[adoms.length - 1]
            comment.user = { desc: userdom.innerText.trim(), url: userdom.href.trim() }
            comment.content = commentdom.querySelectorAll('.feedbackCon div')[0].innerHTML.trim()
            const spandoms = commentdom.querySelectorAll('.feedbackCon span')
            const avatardom = spandoms[spandoms.length - 1]
            comment.user.avatar = avatardom.innerText.trim()
            comments.push(comment)
        }
        window.vm.main.post.comments = comments
        window.vm.main.post.async.comments = true
    })
})

/**
 * onload触发渲染目录
 * @memberof post
 * @param {Element} dom
 */
function tocbotOnload(dom) {
    if (!(!dom.readyState || dom.readyState === 'loaded' || dom.readyState === 'complete')) return
    tocbot.init({
        tocSelector: '#toc',
        contentSelector: '.article',
        headingSelector: 'h1, h2, h3',
        hasInnerContainers: true,
    })
}

/**
 * 点击触发显示目录
 * @memberof post
 * @param {Element} dom
 */
function tocSwitcher(dom) {
    if (dom.checked) {
        document.querySelector('#toc').style.transform = 'translate(0)'
        document.querySelector('#toc').style.boxShadow = 'var(--card-box-shadow)'
    }
    if (!dom.checked) {
        document.querySelector('#toc').style.transform = 'translate(calc(var(--spacing)*15))'
        document.querySelector('#toc').style.boxShadow = ''
    }
}

/**
 * post数据加载
 * @memberof post
 * @param {Element} detaildom
 */
function MainPost(detaildom) {
    // def
    const main = (vm.main = {})
    main.layout = 'post'
    main.post = {}
    main.post.async = {}
    // title url
    const titledom = detaildom.querySelector('.postTitle a')
    main.post.url = titledom.href.trim()
    main.post.title = titledom.innerText.trim()
    // content
    const bodydom = detaildom.querySelector('#cnblogs_post_body')
    highlightNumber(bodydom)
    main.post.content = bodydom.innerHTML.trim()
    // tags(async)
    main.post.async.tags = false
    main.post.async.tagsPromise = Get(getAjaxBaseUrl() + `CategoriesTags.aspx?blogId=${currentBlogId}&postId=${cb_entryId}`)
    main.post.async.tagsPromise.then(((main) => {
        return (r) => {
            const tempdom = document.createElement('div')
            tempdom.innerHTML = r.responseText.trim()
            const tagsdoms = tempdom.querySelectorAll('a')
            const tags = []
            for (let index = 0; index < tagsdoms.length; index++) {
                const tagdom = tagsdoms[index]
                const tag = {}
                tag.desc = tagdom.innerText.trim()
                tag.url = tagdom.href.trim()
                tags.push(tag)
            }
            main.post.tags = tags
            main.post.async.tags = true
        }
    })(vm.main))
    // comments(async)
    main.post.logined = isLogined
    if (!main.post.logined) return main
    main.post.async.comments = false
    main.post.async.commentsPromise = Get(getAjaxBaseUrl() + `GetComments.aspx?postId=${cb_entryId}&pageIndex=0`)
    main.post.comments = []
    main.post.async.commentsPromise.then(((main) => {
        return (r) => {
            const tempdom = document.createElement('div')
            tempdom.innerHTML = r.responseText.trim()
            const commentsdoms = tempdom.querySelectorAll('.feedbackItem')
            for (let index = 0; index < commentsdoms.length; index++) {
                const commentdom = commentsdoms[index]
                const comment = {}
                comment.layer = commentdom.querySelector('.layer').innerText.trim()
                comment.isSelf = commentdom.querySelector('.louzhu') ? true : false
                const adoms = commentdom.querySelectorAll('.feedbackListSubtitle a')
                const userdom = adoms[adoms.length - 1]
                comment.user = { desc: userdom.innerText.trim(), url: userdom.href.trim() }
                comment.content = commentdom.querySelectorAll('.feedbackCon div')[0].innerHTML.trim()
                const spandoms = commentdom.querySelectorAll('.feedbackCon span')
                const avatardom = spandoms[spandoms.length - 1]
                comment.user.avatar = avatardom.innerText.trim()
                main.post.comments.push(comment)
            }
            main.post.async.comments = true
        }
    })(vm.main))
    main.post.async.commentForm = false
    main.post.async.commentsForm = Get(getAjaxBaseUrl() + `CommentForm.aspx?postId=${cb_entryId}`)
    main.post.async.commentsForm.then(((main) => {
        return (r) => {
            const tempdom = document.createElement('div')
            tempdom.innerHTML = r.responseText.trim()
            main.post.commentForm = ''
            const jsdoms = []
            for (let index = 0; index < tempdom.children.length; index++) {
                const formdom = tempdom.children[index]
                if (formdom.tagName !== 'SCRIPT') main.post.commentForm += formdom.outerHTML
            }
            main.post.async.commentForm = true
        }
    })(vm.main))
    console.log(main)
    return main
}