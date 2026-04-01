# Hello World · 开始记录

这是博客的第一篇文章，用来验证整个系统是否正常运行。

## 为什么写博客

运维工作中踩过太多坑，排查问题时常常发现自己之前遇到过但没有记录下来，只能重新排查一遍。这个博客的目的很简单：**把有价值的东西写下来**，供自己查阅，也许对别人也有用。

## 技术栈

这个博客是纯静态页面，部署在 GitHub Pages 上：

- 页面：手写 HTML / CSS / JS，无框架依赖
- 文章：Markdown 格式，通过 `marked.js` 在浏览器渲染
- 代码高亮：`highlight.js`，主题 Atom One Dark
- 部署：GitHub Actions 自动触发

## 写一篇新文章

1. 在 `posts/` 目录下新建 `your-post-id.md`
2. 在 `js/posts.js` 的 `POSTS` 数组里追加一条记录
3. `git add . && git commit -m "post: xxx" && git push`
4. GitHub Actions 自动部署，约 1 分钟后上线

## 代码示例

验证一下代码块渲染效果：

```bash
# 查看 Pod 状态
kubectl get pods -n elk -o wide

# 查看 Elasticsearch 日志
kubectl logs -n elk elasticsearch-0 --tail=100 -f
```

```yaml
# 典型的 Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: example
  template:
    metadata:
      labels:
        app: example
    spec:
      containers:
        - name: app
          image: nginx:alpine
          ports:
            - containerPort: 80
```

---

后续会陆续补充 Kubernetes、ELK、Ceph 相关的实践笔记。
