/**
 * posts.js — 文章索引
 *
 * 每次新增文章时：
 * 1. 在 posts/ 目录下新建一个 .md 文件
 * 2. 在这里的 POSTS 数组里追加一条记录
 *
 * 字段说明：
 *   id       — 文件名（不含 .md 后缀），也是 URL 参数
 *   title    — 文章标题
 *   date     — 日期，格式 YYYY-MM-DD
 *   excerpt  — 首页摘要（可手写，也可留空自动截取）
 *   tags     — 标签数组
 */
const POSTS = [
  {
    id: 'hello-world',
    title: 'Hello World · 开始记录',
    date: '2025-06-07',
    excerpt: '这是第一篇笔记，用来测试博客是否正常工作。后续会陆续记录 Kubernetes、ELK、Ceph 相关的运维实践。',
    tags: ['随笔']
  },
  // ── 在这里添加新文章 ──
  // {
  //   id: 'k8s-node-troubleshoot',
  //   title: 'Kubernetes 节点 NotReady 排查记录',
  //   date: '2025-06-10',
  //   excerpt: '记录一次生产环境节点异常的完整排查过程，涉及 kubelet、CNI 插件和 cgroup 配置。',
  //   tags: ['Kubernetes', '排查']
  // },
];
