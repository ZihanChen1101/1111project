
// 搜索数据源
const data = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Grape',
    'Lemon',
    'Mango',
    'Orange',
    'Peach',
    'Plum',
    'Strawberry',
    'Watermelon'
];

// 防抖函数
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        // 清除之前的定时器
        clearTimeout(timeout);
        // 设置新的定时器
        timeout = setTimeout(() => func(...args), delay);
    };
}

// 模糊搜索函数
function fuzzySearch(query, list) {
    // 将查询字符串转为小写以便不区分大小写
    const lowerQuery = query.toLowerCase();
    // 过滤出包含查询字符串的项
    return list.filter(item => item.toLowerCase().includes(lowerQuery));
}

// 显示建议列表
function showSuggestions(query) {
    const suggestionsList = document.getElementById('suggestionsList');
    // 清空之前的建议
    suggestionsList.innerHTML = '';

    // 如果查询为空，不显示任何建议
    if (query === '') {
        suggestionsList.style.display = 'none';
        return;
    }

    // 执行模糊搜索
    const filteredData = fuzzySearch(query, data);

    // 如果有搜索结果
    if (filteredData.length > 0) {
        // 为每个结果创建列表项
        filteredData.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            // 点击建议项时，将内容填入搜索框并隐藏建议列表
            li.onclick = function() {
                document.getElementById('searchBox').value = item;
                suggestionsList.style.display = 'none';
            };
            suggestionsList.appendChild(li);
        });
        // 显示建议列表
        suggestionsList.style.display = 'block';
    } else {
        // 没有搜索结果时显示提示
        const li = document.createElement('li');
        li.textContent = 'No results found';
        // 设置无结果时的样式
        li.style.color = '#999';
        li.style.cursor = 'default';
        suggestionsList.appendChild(li);
        suggestionsList.style.display = 'block';
    }
}

// 获取DOM元素
const searchBox = document.getElementById('searchBox');
const suggestionsList = document.getElementById('suggestionsList');

// 创建防抖处理后的搜索函数
const debouncedShowSuggestions = debounce(function() {
    const query = searchBox.value;
    showSuggestions(query);
}, 300); // 300毫秒延迟

// 监听输入框的输入事件
searchBox.addEventListener('input', debouncedShowSuggestions);

// 点击页面其他区域时关闭建议列表
document.addEventListener('click', function(e) {
    // 如果点击的不是搜索框或建议列表
    if (e.target !== searchBox && e.target !== suggestionsList) {
        // 隐藏建议列表
        suggestionsList.style.display = 'none';
    }
});