// posts 文章数组

// LoadPosts 文章列表初始化
function LoadPosts() {
    // 设置页面布局与初始化文章数组
    const vm = window.vm
    vm.layout = 'posts'
    vm.posts = []
    // 获取页面全部文章链接
    const postlistdoms = vm.metadata.querySelectorAll('.postTitle, .postTitl2, .entrylistPosttitle')
    const descsdoms = vm.metadata.querySelectorAll('.postDesc, .postDesc2, .entrylistItemPostDesc')
    const l = Math.min(postlistdoms.length, descsdoms.length)
    for (let index = 0; index < l; index++) {
        // 初始化文章进行预加载
        const post = { async: {} }
        const adom = postlistdoms[index].querySelector('a')
        post.title = adom.innerText.trim()
        post.url = adom.href.trim()
        post.async.preview = false
        vm.posts.push(post)
        Get(post.url).then(((idx) => {
            return (r) => {
                const tempdom = document.createElement('div')
                tempdom.innerHTML = r.responseText.trim()
                FillPost(vm.posts[idx], tempdom)
                vm.posts[idx].async.preview = true
            }
        })(index))
    }
}
