// LoadMain 根据页面内容 加载main容器 
// 目前支持 layout: post posts
function LoadMain() {
    if (vm.metadata.querySelector('#post_detail')) {
        LoadPost()
        LoadReadProcess()
        LoadComments()
    }
    else if (vm.metadata.querySelectorAll('.postTitle, .postTitl2, .entrylistPosttitle').length !== 0) {
        LoadPosts()
        LoadPage()
    }
}