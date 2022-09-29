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
    if (settings.url.indexOf('PostComment/Add.aspx') < 0 && settings.url.indexOf('PostComment/Update.aspx') < 0 && settings.url.indexOf('comment/DeleteComment.aspx') < 0) return
    window.vm.main.post.async.comments = false
    Get(getAjaxBaseUrl() + `GetComments.aspx?postId=${cb_entryId}&pageIndex=0`).then((r) => {
        comments = []
        const tempdom = document.createElement('div')
        tempdom.innerHTML = r.responseText.trim()
        const commentsdoms = tempdom.querySelectorAll('.feedbackItem')
        for (let index = 0; index < commentsdoms.length; index++) {
            const commentdom = commentsdoms[index]
            const comment = {}
            comment.actions = commentdom.querySelector('.comment_actions').innerHTML
            commentdom.querySelector('.comment_actions').innerHTML = ''
            commentdom.querySelector('.feedbackManage').style.display = 'none'
            comment.layer = commentdom.querySelector('.layer').innerText.trim()
            comment.isSelf = commentdom.querySelector('.louzhu') ? true : false
            const userdom = commentdom.querySelector('.feedbackListSubtitle')
            comment.user = { info: userdom.innerHTML.trim() }
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
 * @typedef {Object} post
 * @property {Object} async - 异步回调完成标志
 * @property {String} url - 随笔url
 * @property {String} title - 随笔title
 * @property {String} content - 随笔内容,需要回调标志
 * @property {Object} desc - 随笔描述,发表日期,观看人数
 * @property {Object} tags - 随笔标签,需要回调标志
 * @property {Object} comments - 随笔评论,需要回调标志
 * @property {Object} commentForm - 评论容器,需要回调标志
 */

/**
 * post数据加载
 * @memberof post
 * @param {Element} detaildom
 * @returns {post} 随笔对象
 */
function GetMainPost(metadata) {
    // def
    const detaildom = metadata.querySelector('#post_detail')
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
    // desc
    const descdom = detaildom.querySelector('.postDesc')
    main.post.desc = {}
    main.post.desc.metadata = descdom.innerHTML.trim()
    main.post.desc.date = descdom.querySelector('#post-date').innerText
    main.post.desc.viewCount = descdom.querySelector('#post_view_count').innerText
    main.post.desc.commentCount = descdom.querySelector('#post_comment_count').innerText
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
                comment.actions = commentdom.querySelector('.comment_actions').innerHTML
                commentdom.querySelector('.comment_actions').innerHTML = ''
                commentdom.querySelector('.feedbackManage').style.display = 'none'
                comment.layer = commentdom.querySelector('.layer').innerText.trim()
                comment.isSelf = commentdom.querySelector('.louzhu') ? true : false
                const userdom = commentdom.querySelector('.feedbackListSubtitle')
                comment.user = { info: userdom.innerHTML.trim() }
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
            tempdom.querySelector('.commentbox_main').style.width = '100%'
            tempdom.querySelector('#tbCommentBody').style.maxWidth = '100%'
            tempdom.querySelector('#tbCommentBody').style.minWidth = '100%'
            tempdom.querySelector('#commentform_title').style.padding = '0'
            tempdom.querySelector('#commentform_title').style.backgroundImage = 'none'

            main.post.commentForm = ''
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