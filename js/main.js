/* main.js — 渲染逻辑 */

// ── 工具函数 ──────────────────────────────────────
function formatDate(str) {
  const d = new Date(str + 'T00:00:00');
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatDateShort(str) {
  return str.slice(0, 10); // YYYY-MM-DD
}

function postURL(id) {
  return `post.html?id=${id}`;
}

// ── 首页文章列表 ──────────────────────────────────
function renderPostList(containerId, posts, limit) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const list = limit ? posts.slice(0, limit) : posts;
  if (list.length === 0) {
    el.innerHTML = '<p style="color:var(--ink-faint);font-size:.9rem;">还没有文章，快去写第一篇吧。</p>';
    return;
  }
  el.innerHTML = list.map(p => `
    <div class="post-item" onclick="location.href='${postURL(p.id)}'">
      <div class="post-item-date">${formatDate(p.date)}</div>
      <div class="post-item-title">${p.title}</div>
      ${p.excerpt ? `<div class="post-item-excerpt">${p.excerpt}</div>` : ''}
      ${p.tags && p.tags.length ? `<div class="post-item-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
    </div>
  `).join('');
}

// ── 归档页 ────────────────────────────────────────
function renderArchives(containerId, posts) {
  const el = document.getElementById(containerId);
  if (!el) return;

  // 按年分组
  const byYear = {};
  posts.forEach(p => {
    const year = p.date.slice(0, 4);
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push(p);
  });

  const years = Object.keys(byYear).sort((a, b) => b - a);
  el.innerHTML = years.map(year => `
    <div class="archive-year">
      <div class="archive-year-label">${year} · ${byYear[year].length} 篇</div>
      ${byYear[year].map(p => `
        <div class="archive-post-item" onclick="location.href='${postURL(p.id)}'">
          <span class="archive-post-date">${formatDateShort(p.date)}</span>
          <span class="archive-post-title">${p.title}</span>
        </div>
      `).join('')}
    </div>
  `).join('');
}

// ── 文章详情页 ────────────────────────────────────
async function loadPost() {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if (!id) { document.getElementById('post-content').textContent = '文章不存在。'; return; }

  const post = POSTS.find(p => p.id === id);
  if (!post) { document.getElementById('post-content').textContent = '文章不存在。'; return; }

  // 设置 meta
  document.title = `${post.title} · LadOps`;
  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-date').textContent = formatDate(post.date);

  if (post.tags && post.tags.length) {
    document.getElementById('post-tags').innerHTML =
      post.tags.map(t => `<span class="tag">${t}</span>`).join('');
  }

  // 加载 Markdown
  try {
    const res = await fetch(`posts/${id}.md`);
    if (!res.ok) throw new Error('not found');
    const md = await res.text();

    // 配置 marked
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    document.getElementById('post-content').innerHTML = marked.parse(md);

    // 代码高亮
    document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));

  } catch (e) {
    document.getElementById('post-content').innerHTML =
      '<p style="color:var(--ink-faint)">文章内容加载失败，请检查 posts/ 目录下是否有对应的 .md 文件。</p>';
  }

  // 上一篇 / 下一篇
  const idx = POSTS.findIndex(p => p.id === id);
  const prev = POSTS[idx + 1];
  const next = POSTS[idx - 1];
  const navEl = document.getElementById('post-nav');
  if (navEl && (prev || next)) {
    navEl.innerHTML = `
      ${prev ? `<a href="${postURL(prev.id)}"><span>← 上一篇</span>${prev.title}</a>` : '<span></span>'}
      ${next ? `<a href="${postURL(next.id)}" class="nav-next"><span>下一篇 →</span>${next.title}</a>` : ''}
    `;
  }
}
