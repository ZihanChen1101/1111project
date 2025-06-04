// 动态生成作品展馆
const galleryData = [
    // 这里应该是12个作品的数据
    { id: 1, title: "作品1", image: "work1.jpg" },
    // ...其他作品
];

function renderGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = galleryData.map(item => `
        <div class="gallery-item">
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
        </div>
    `).join('');
}

// 动态生成最新资讯
const newsData = [
    { title: "动漫产业高峰论坛", date: "2025-05-15", desc: "探讨动漫产业未来发展趋势" },
    // 另一条资讯
];

function renderNews() {
    const newsList = document.querySelector('.news-list');
    newsList.innerHTML = newsData.map(item => `
        <article class="news-item">
            <h3>${item.title}</h3>
            <time>${item.date}</time>
            <p>${item.desc}</p>
        </article>
    `).join('');
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    renderNews();
    // 其他初始化代码
});