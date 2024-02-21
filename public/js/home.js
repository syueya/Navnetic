document.addEventListener('DOMContentLoaded', function() {
    // 使用 fetch API 从服务器获取 JSON 数据,生成书签列表的代码
    fetch('./assets/bookmarks.json')
        .then(response => response.json())
        .then(data => {
            // 使用获取到的数据生成 HTML 并插入页面
            document.getElementById('layout-groups').innerHTML = generateBookmarksHtml(data);

            // 监听侧边栏链接的点击事件
            var linkElements = document.getElementsByClassName('scroll-link');

            Array.from(linkElements).forEach(function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();

                    var targetId = this.dataset.target;
                    var targetElement = document.querySelector(targetId);

                    scrollToElement(targetElement);
                });
            });

            function scrollToElement(element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        })
        .catch(error => console.error('读取 JSON 文件时出错:', error));
});


function generateBookmarkHtml(bookmark) {
    const iconPath = `./images/logos/${bookmark.icon}`;
    return `
        <li class="bookmark" data-name="${bookmark.name}">
            <a href="${bookmark.href}" title="${bookmark.name}" target="_blank" class="bookmark-href" >
                <div class="flex">
                    <div class="bookmark-icon-area">
                        <div class="bookmark-icon">
                            <img alt="logo" src="${iconPath}" decoding="async" data-nimg="future" loading="lazy" style="color: transparent; width: 32px; height: 32px; object-fit: contain; max-height: 100%; max-width: 100%;">
                        </div>
                    </div>
                    <div class="bookmark-text">
                        <div class="bookmark-name">${bookmark.name}</div>
                        <div class="bookmark-description">${bookmark.description}</div>
                    </div>
                </div>
            </a>
        </li>`;
}

function generateGroupHtml(categoryId, categoryName, bookmarksHtml) {
    // 根据类别名称生成类图标的路径
    const iconPath_category = `./images/logos/${categoryId}.png`;
    return `
        <div class="bookmark-group" id="${categoryId}">
            <!--类图标名称-->
            <div class="group">
                <div class="bookmark-group-icon">
                    <img alt="logo" src="${iconPath_category}" decoding="async" data-nimg="future" loading="lazy" style="color: transparent; width: 32px; height: 32px; object-fit: contain; max-height: 100%; max-width: 100%;">
                </div>
                <h2 class="bookmark-group-name">${categoryName}</h2>
            </div>
            <!--$类 网址列表-->
            <div class="bookmark-list-area">
                <ul class="bookmark-list">
                    ${bookmarksHtml}
                </ul>
            </div>
        </div>`;
}

function groupByCategory(data) {
    return data.reduce((groups, bookmark) => {
        const { category_id } = bookmark;
        if (!groups[category_id]) {
            groups[category_id] = {
                name: bookmark.category_name, // 使用 'category' 作为显示名
                bookmarks: []
            };
        }
        groups[category_id].bookmarks.push(bookmark);
        return groups;
    }, {});
}

// 更新 generateBookmarksHtml 函数来处理新的 groupedBookmarks 格式
function generateBookmarksHtml(data) {
    const groupedBookmarks = groupByCategory(data);
    let groupsHtml = '';

    for (let categoryId in groupedBookmarks) {
        const categoryName = groupedBookmarks[categoryId].name;
        const bookmarksHtml = groupedBookmarks[categoryId].bookmarks.map(generateBookmarkHtml).join('');
        groupsHtml += generateGroupHtml(categoryId, categoryName, bookmarksHtml);
    }

    return groupsHtml;
}


