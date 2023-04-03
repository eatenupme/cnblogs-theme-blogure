# cnblogs-theme-blogure

> cnblogs-theme-blogure - 又一个博客园主题，它使用 *PetiteVue* 和 *PicoCSS*。

喜欢的话可以帮个点[⭐Star](https://github.com/zidft/cnblogs-theme-blogure)，万分感谢。

## 🚀 快速开始

> 确保博客园有JS权限，没有可以申请[博客园 JS 权限](https://i.cnblogs.com/settings)

1. 基本设置 -> 博客皮肤 -> SimpleMemory
1. 代码高亮 -> prismjs[完全支持]
1. 页面定制 CSS 代码 -> ☑️禁用模板默认CSS -> [source](https://github.com/zidft/cnblogs-theme-blogure/releases/download/v0.0.8/custom.css)
1. 页首 HTML 代码 -> [source](https://github.com/zidft/cnblogs-theme-blogure/releases/download/v0.0.8/page_begin.html)
1. 页脚 HTML 代码 -> [source](https://github.com/zidft/cnblogs-theme-blogure/releases/download/v0.0.8/page_end.html)

<span class="more"></span>

<div style="text-align:center">
<img src="https://img2023.cnblogs.com/blog/2555898/202301/2555898-20230125091544737-873550203.png" style="zoom:50%">
</div>

## ✨ 功能特性

### 正文预览

没有预览的摘要将变得难以理解，像下面这样。

<img src="https://camo.githubusercontent.com/9a9abef741d354c2d145e05e16698c66eb2450c512d6a5f67967ef02ec78f07f/68747470733a2f2f696d67323032332e636e626c6f67732e636f6d2f626c6f672f323535353839382f3230323330312f323535353839382d32303233303132353039313534343733372d3837333535303230332e706e67" style="zoom:50%">

Blogure支持将正文的一部分作为摘要展示在首页。

<img src="https://camo.githubusercontent.com/55031a35b55972cfc15c5f709a76ba62f830983683372f4bfdb7b0ec52ecce89/68747470733a2f2f696d67323032332e636e626c6f67732e636f6d2f626c6f672f323535353839382f3230323330312f323535353839382d32303233303132353038353832333732352d35383030373939382e706e67" style="zoom:50%">

使用它很简单，使用HTML元素`<* class="more"></*>`作为摘要，推荐使用单标签`<br class="more">`。

<img src="https://camo.githubusercontent.com/e313f24138ff4e895c99e7c9d0bf6b342545f6317bae1f3158b64004fc0bb325/68747470733a2f2f696d67323032332e636e626c6f67732e636f6d2f626c6f672f323535353839382f3230323330312f323535353839382d32303233303132353039303734383231372d3733313037323233322e706e67" style="zoom:50%">

### 暗黑模式

基于picocss，很方便可以调整主题风格为暗黑模式。

<img src="https://camo.githubusercontent.com/709f00f3a6d6c16069e3050d4bb5f559f0845228cbe26dffb746f6cf89974398/68747470733a2f2f696d67323032332e636e626c6f67732e636f6d2f626c6f672f323535353839382f3230323330312f323535353839382d32303233303132353039313135333836382d313539353635323636352e706e67" style="zoom:50%">

### 实时目录 | 阅读进度

基于 tocbot，很方便可以实时定位文章的目录，同时对文章页面加入了顶部实时进度。

<img src="https://camo.githubusercontent.com/b511cec2e03d6eff46f0ce1d4746d83e46debae0e348ee99127e94d5e9c8f571/68747470733a2f2f696d67323032332e636e626c6f67732e636f6d2f626c6f672f323535353839382f3230323330312f323535353839382d32303233303132353039313334373332352d313031343434393330332e706e67" style="zoom:50%">

### 代码高亮

博客园原生高亮`prismjs`支持。

<img src="https://camo.githubusercontent.com/832aadf63b65fc9af25b4721185b5d75b695bacb00381480c1abce0beab3ef42/68747470733a2f2f696d67323032332e636e626c6f67732e636f6d2f626c6f672f323535353839382f3230323330312f323535353839382d32303233303132353039313435313330342d313133353136313937322e706e67" style="zoom:50%">

## 📦 项目依赖

+ [PetiteVue ~6kb](https://github.com/vuejs/petite-vue)
+ [PicoCSS ~30kb](https://picocss.com/)

## 🔨 构建流程

### Linux

```sh
bash .merge
```

### Windows

自行`wsl`，按照`Linux`操作。

## 🎹 参与共建 | 二次开发

参与共建，可以在[github-issues](https://github.com/zidft/cnblogs-theme-blogure/issues)中找到`help wanted`标签，发起[PR](https://github.com/zidft/cnblogs-theme-blogure/compare)。

自行[fork](https://github.com/zidft/cnblogs-theme-blogure/fork)。

## 📝 反馈

通过[github-issues](https://github.com/zidft/cnblogs-theme-blogure/issues)。
