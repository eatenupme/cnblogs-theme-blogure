// comment 评论
// comment = {
//     "actions": "...修改 删除 回复", // 评论行为dom
//     "user": {
//         "info": "...#1楼 [楼主] 2022-09-17 08:53 blogure", // 用户信息dom
//         "avatar": "https://pic.cnblogs.com/face/2555898/20230117114245.png" // 头像url
//     },
//     "content": "...这里可以一起讨论主题哦!" // 评论内容dom
// }

// comments 评论数组

// tag 标签
// tag = {
//     "desc": "主题", // 标签文字
//     "url": "https://www.cnblogs.com/blogure/tag/%E4%B8%BB%E9%A2%98/" // 标签url
// }

// tags 标签数组

// post 文章
// post = {
//     "async": {
//         "tags": true, // 标签异步标志
//         "comments": true, // 评论异步标志 
//         "commentForm": true, // 评论框异步标志
//     },
//     "url": "https://www.cnblogs.com/blogure/p/cnblogs-theme-blogure.html", // 文章url
//     "title": "博客园 Blogure 主题 🎨", // 文章标题
//     "content": "...又一个博客园主题", // 文章内容
//     "preview": "...又一个博客园主题", // 文章预览
//     "desc": {
//         "date": "2021-09-29 09:30", // 发布时间
//         "viewCount": "494", // 浏览量
//         "commentCount": "6" // 评论数
//     },
//     "postid": "15322331", // 文章id
//     "comments": [object], // 评论数组
//     "process": {
//         "val": 6350, // 当前阅读进度
//         "max": 6809, // 最大阅读进度
//     },
//     "commentForm": "...", // 评论框dom
//     "tags": [object], // 标签数组
// }

// LoadReadProcess 进度条初始化与事件监听
function LoadReadProcess() {
    const vm = window.vm
    vm.post.process = { val: window.scrollY, max: document.documentElement.scrollHeight - window.innerHeight }
    document.addEventListener('scroll', () => {
        vm.post.process.max = document.documentElement.scrollHeight - window.innerHeight
        vm.post.process.val = window.scrollY
    })
}

// LoadComments 评论变动事件监听, 触发重新渲染
function LoadComments() {
    $(document).ajaxComplete((_e, _x, settings) => {
        if (settings.url.indexOf('PostComment/Add.aspx') < 0 && settings.url.indexOf('PostComment/Update.aspx') < 0 && settings.url.indexOf('comment/DeleteComment.aspx') < 0) return
        window.vm.post.async.comments = false
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
                const userdom = commentdom.querySelector('.feedbackListSubtitle')
                comment.user = { info: userdom.innerHTML.trim() }
                comment.content = commentdom.querySelectorAll('.feedbackCon div')[0].innerHTML.trim()
                const spandoms = commentdom.querySelectorAll('.feedbackCon span')
                const avatardom = spandoms[spandoms.length - 1]
                comment.user.avatar = avatardom.innerText.trim()
                comments.push(comment)
            }
            window.vm.post.comments = comments
            window.vm.post.async.comments = true
        })
    })
}

// tocSwitcher 控制目录打开和关闭
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

// LoadPost 文章初始化
function LoadPost() {
    // 设置页面布局与初始化文章
    const vm = window.vm
    vm.layout = 'post'
    vm.post = { async: {} }
    // fill
    FillPost(vm.post, vm.metadata)
    if (!vm.logined) return
    // 评论列表
    vm.post.async.comments = false
    vm.post.comments = []
    Get(getAjaxBaseUrl() + `GetComments.aspx?postId=${cb_entryId}&pageIndex=0`).then(((post) => {
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
    // 评论框
    vm.post.async.commentForm = false
    Get(getAjaxBaseUrl() + `CommentForm.aspx?postId=${cb_entryId}`).then(((post) => {
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

// FillPost 文章和文章列表共用逻辑
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
    Get(getAjaxBaseUrl() + `CategoriesTags.aspx?blogId=${currentBlogId}&postId=${post.postid}`).then(((post) => {
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
            console.debug(`tags${post.tags} loaded`)
        }
    })(post))
    console.debug(`post${post} loaded`)
}