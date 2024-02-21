function searchBookmarks(keyword) {
  var table = document.getElementById('myTable-category');
  var rows = table.getElementsByTagName('tr');
  var searchResultsContainer = document.getElementById('searchResults');
  searchResultsContainer.innerHTML = '';
  var searchCount = 0;


  if (keyword.trim() !== '') {
    for (var i = 1; i < rows.length; i++) { // 从索引1开始，跳过表头

      var idColumn = rows[i].cells[2].textContent.toLowerCase(); // 第3列，索引为2
      var nameColumn = rows[i].cells[3].textContent.toLowerCase(); // 第4列，索引为3
      if (
        idColumn.includes(keyword.toLowerCase()) ||
        nameColumn.includes(keyword.toLowerCase())
      ) {

        var resultItem = document.createElement('div');
        resultItem.classList.add('search-result');
        resultItem.innerHTML = `
          <div class="search-nameColumn">${nameColumn}</div>
          <div class="search-idColumn">${idColumn}</div>
        `;
        searchResultsContainer.appendChild(resultItem);

        searchCount++;
      }
    }


    var searchCountElement = document.createElement('div');
    searchCountElement.textContent = '共找到 ' + searchCount + ' 条搜索结果';
    searchCountElement.classList.add('search-count'); // 添加自定义的 CSS 类名
    searchResultsContainer.appendChild(searchCountElement);

    // 在有搜索结果时设置.display样式为“flex”
    searchResultsContainer.style.display = 'flex';
  } else {
    // 在搜索结果为空时设置.display样式为“none”，隐藏搜索结果
    searchResultsContainer.style.display = 'none';
  }
}

var searchInput = document.querySelector('.search-box input');
var searchResultsContainer = document.getElementById('searchResults');  // 获取搜索结果容器
var hasClickedSearchInput = false;
var searchTimeout;

searchInput.addEventListener('input', function () {
  clearTimeout(searchTimeout); // 清除延迟搜索

  // 延迟100毫秒进行搜索
  searchTimeout = setTimeout(function () {
    searchBookmarks(searchInput.value);
  }, 100);
});

searchInput.addEventListener('click', function () {
  clearTimeout(searchTimeout); // 清除之前的延迟搜索

  // 延迟100毫秒进行搜索
  searchTimeout = setTimeout(function () {
    searchBookmarks(searchInput.value);
  }, 100);
});

// 添加全局点击事件监听器
window.addEventListener('click', function (event) {
  var targetElement = event.target;

  // 判断点击的是否是搜索输入框以外的位置
  if (targetElement !== searchInput && !searchResultsContainer.contains(targetElement)) {
    clearTimeout(searchTimeout); // 清除延迟搜索
    // 隐藏搜索结果
    searchResultsContainer.style.display = 'none';
  }
});

window.addEventListener('load', function () {
  var savedKeyword = sessionStorage.getItem('savedKeyword');

  if (savedKeyword) {
    searchInput.value = savedKeyword;
    searchBookmarks(savedKeyword);
  }
});