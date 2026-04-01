# LadOps 运维笔记

纯静态博客，部署在 GitHub Pages。

## 写新文章

1. 在 `posts/` 目录下新建 `your-post-id.md`，写 Markdown 内容
2. 编辑 `js/posts.js`，在 `POSTS` 数组里追加：

```js
{
  id: 'your-post-id',       // 对应 posts/your-post-id.md
  title: '文章标题',
  date: '2025-06-10',
  excerpt: '首页显示的摘要',
  tags: ['Kubernetes', '排查']
}
```

3. 提交推送：

```bash
git add .
git commit -m "post: 文章标题"
git push origin main
```

GitHub Actions 自动部署，约 1 分钟后上线。

