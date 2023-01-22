/**
 * 主体content, 目前用于承载{MainPosts,Page} {MainPost}
 * @namespace main
 */

/**
 * @typedef {Object} main
 * @property {String} layout - 布局[列表页,文章页,标签页]等
 * @property {Object} data - layout 所需要的信息,对main透明
 */

/**
 * main数据加载
 * @memberof main
 * @returns {main} 博客标题导航
 */
function GetMain() {
    if (vm.metadata.querySelector('#post_detail')) { // 单篇文章
        vm.GetMainPost = GetMainPost
        return vm.GetMainPost()
    } else if (vm.metadata.querySelectorAll('.postTitle, .postTitl2, .entrylistPosttitle').length !== 0) { // 文章列表
        vm.GetMainPosts = GetMainPosts
        return vm.GetMainPosts()
    }
    return { layout: '' }
}
