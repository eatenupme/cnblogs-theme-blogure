/**
 * 主体content, 目前用于承载{@link MainPosts,Page} {@link MainPost}
 * @namespace main
 */

/**
 * main数据加载
 * @memberof main
 * @param {Element} originBody
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
