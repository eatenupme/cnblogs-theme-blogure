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
 * @param {Element} originBody
 * @returns {main} 博客标题导航
 */
function GetMain(originBody) {
    if (originBody.querySelector('#post_detail')) {
        return MainPost(originBody.querySelector('#post_detail'))
    }
    if (originBody.querySelectorAll('.postTitle, .postTitl2, .entrylistPosttitle').length !== 0) {
        return MainPosts(originBody.querySelectorAll('.postTitle, .postTitl2, .entrylistPosttitle'),
            originBody.querySelectorAll('.postDesc, .postDesc2, .entrylistItemPostDesc'), originBody)
    }
    return { layout: '' }
}
