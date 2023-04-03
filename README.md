# cnblogs-theme-blogure

> cnblogs-theme-blogure - 又一个博客园主题，它使用 *PetiteVue* 和 *PicoCSS*。

喜欢的话可以帮个点[⭐Star](https://github.com/zidft/cnblogs-theme-blogure)，万分感谢。

## 🚀 快速开始

> 确保博客园有JS权限，没有可以申请[博客园 JS 权限](https://i.cnblogs.com/settings)

1. 基本设置 -> 博客皮肤 -> SimpleMemory
1. 代码高亮 -> prismjs[完全支持]
1. 页面定制 CSS 代码 -> ☑️禁用模板默认CSS -> [source](https://github.com/zidft/cnblogs-theme-blogure/releases/download/v0.0.8/custom.css)
1. 页首 HTML 代码 -> [v7.source](https://github.com/zidft/cnblogs-theme-blogure/releases/download/v0.0.8/page_begin.html)
1. 页脚 HTML 代码 -> [v7.source](https://github.com/zidft/cnblogs-theme-blogure/releases/download/v0.0.8/page_end.html)

<span class="more"></span>

<div style="text-align:center">
<img src="https://img2023.cnblogs.com/blog/2555898/202301/2555898-20230125091544737-873550203.png" style="zoom:50%">
</div>

## ✨ 功能特性

### 正文预览

没有预览的摘要将变得难以理解，像下面这样。

<img src="https://img2023.cnblogs.com/blog/2555898/202301/2555898-20230125090439556-1919011365.png" style="zoom:50%">

Blogure支持将正文的一部分作为摘要展示在首页。

<img src="https://img2023.cnblogs.com/blog/2555898/202301/2555898-20230125085823725-58007998.png" style="zoom:50%">

使用它很简单，使用HTML元素`<* class="more"></*>`作为摘要，推荐使用单标签`<br class="more">`。

<img src="https://img2023.cnblogs.com/blog/2555898/202301/2555898-20230125090748217-731072232.png" style="zoom:50%">

### 暗黑模式

基于picocss，很方便可以调整主题风格为暗黑模式。

<img src="https://img2023.cnblogs.com/blog/2555898/202301/2555898-20230125091153868-1595652665.png" style="zoom:50%">

### 实时目录 | 阅读进度

基于 tocbot，很方便可以实时定位文章的目录，同时对文章页面加入了顶部实时进度。

<img src="https://img2023.cnblogs.com/blog/2555898/202301/2555898-20230125091347325-1014449303.png" style="zoom:50%">

### 代码高亮

博客园原生高亮`prismjs`支持。

<img src="https://img2023.cnblogs.com/blog/2555898/202301/2555898-20230125091451304-1135161972.png" style="zoom:50%">

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
