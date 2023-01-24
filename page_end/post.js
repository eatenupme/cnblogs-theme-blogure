/**
 * 随笔[文章]
 * @namespace post
 */

/**
 * 进度条
 * @memberof post
 */
function ReadProcess() {
    const vm = window.vm
    vm.post.process = { val: window.scrollY, max: document.documentElement.scrollHeight - window.innerHeight }
    document.addEventListener('scroll', () => {
        vm.post.process.max = document.documentElement.scrollHeight - window.innerHeight
        vm.post.process.val = window.scrollY
    })
}

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

function LoadPost() {
    // def
    const vm = window.vm
    vm.layout = 'post'
    vm.post = { async: {} }
    // fill
    FillPost(vm.post, vm.metadata)
    if (!vm.logined) return
    // comments(async)
    vm.post.async.comments = false
    vm.post.comments = []
    vm.post.async.commentsPromise = Get(getAjaxBaseUrl() + `GetComments.aspx?postId=${cb_entryId}&pageIndex=0`)
    vm.post.async.commentsPromise.then(((post) => {
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
                post.comments.push(comment)
            }
            post.async.comments = true
        }
    })(vm.post))

    vm.post.async.commentForm = false
    vm.post.async.commentsForm = Get(getAjaxBaseUrl() + `CommentForm.aspx?postId=${cb_entryId}`)
    vm.post.async.commentsForm.then(((post) => {
        return (r) => {
            const tempdom = document.createElement('div')
            tempdom.innerHTML = r.responseText.trim()
            tempdom.querySelector('.commentbox_main').style.width = '100%'
            tempdom.querySelector('#tbCommentBody').style.maxWidth = '100%'
            tempdom.querySelector('#tbCommentBody').style.minWidth = '100%'
            tempdom.querySelector('#commentform_title').style.padding = '0'
            tempdom.querySelector('#commentform_title').style.backgroundImage = 'none'

            post.commentForm = ''
            for (let index = 0; index < tempdom.children.length; index++) {
                const formdom = tempdom.children[index]
                if (formdom.tagName !== 'SCRIPT') post.commentForm += formdom.outerHTML
            }
            post.async.commentForm = true
        }
    })(vm.post))
}

// FillPost 传入post引用和dom 完成数据加载
function FillPost(post, dom) {
    const detaildom = dom.querySelector('#post_detail')
    // title url
    const titledom = detaildom.querySelector('.postTitle a')
    post.url = titledom.href.trim()
    post.title = titledom.innerText.trim()
    // content
    const bodydom = detaildom.querySelector('#cnblogs_post_body')
    highlightNumber(bodydom)
    post.content = bodydom.innerHTML.trim()
    // preview
    if (!bodydom.querySelector('.more')) post.preview = post.content
    else post.preview = ''
    for (let index = 0; index < bodydom.children.length && bodydom.querySelector('.more'); index++) {
        const childdom = bodydom.children[index]
        if (childdom == bodydom.querySelector('.more') || childdom.querySelector('.more')) break
        post.preview += childdom.outerHTML
    }
    // desc
    const descdom = detaildom.querySelector('.postDesc')
    post.desc = {}
    post.desc.metadata = descdom.innerHTML.trim()
    post.desc.date = descdom.querySelector('#post-date').innerText
    post.desc.viewCount = descdom.querySelector('#post_view_count').innerText
    post.desc.commentCount = descdom.querySelector('#post_comment_count').innerText
    // postid
    const bdoms = descdom.querySelectorAll('a')
    bdoms.forEach(e => {
        if (e.innerText === '编辑') post.postid = new URL(e.href).searchParams.get('postid')
    })
    // tags(async)
    if (!post.postid) { post.async.tags = true; return }
    post.async.tags = false
    post.async.tagsPromise = Get(getAjaxBaseUrl() + `CategoriesTags.aspx?blogId=${currentBlogId}&postId=${post.postid}`)
    post.async.tagsPromise.then(((post) => {
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
            post.tags = tags
            post.async.tags = true
            console.debug('tags loaded from tagxhr', post.async.tagsPromise, post.tags)
        }
    })(post))
    console.debug('post loaded from dom', dom, post)
}