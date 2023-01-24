/**
 * 随笔[文章]列表
 * @namespace posts
 */

function LoadPosts() {
    // def
    const vm = window.vm
    vm.layout = 'posts'
    vm.posts = []
    // dom proc
    const postlistdoms = vm.metadata.querySelectorAll('.postTitle, .postTitl2, .entrylistPosttitle')
    const descsdoms = vm.metadata.querySelectorAll('.postDesc, .postDesc2, .entrylistItemPostDesc')
    const l = Math.min(postlistdoms.length, descsdoms.length)
    for (let index = 0; index < l; index++) {
        // def
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
                console.log('1', vm.posts[idx])
                FillPost(vm.posts[idx], tempdom)
                vm.posts[idx].async.preview = true
            }
        })(index))
    }
}
