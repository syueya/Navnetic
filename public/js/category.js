// 分类管理页面

// 获取表格容器和表体元素
var table = document.getElementById('myTable-category');
var tbody = document.getElementById('tableBody-category');

// 读取并处理JSON数据
fetch('./assets/category.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    createTable(data);
  })
  .catch(function(error) {
    console.log('读取 JSON 文件时出错:', error);
  });

// 创建表格
function createTable(data) {
  data.forEach(function(item, index) {
    var row = tbody.insertRow();

    // 创建选择框
    var checkboxCell = row.insertCell();
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add("category-checkbox"); // 添加 "category-checkbox" 类
    checkboxCell.appendChild(checkbox);

    // 创建序号列
    var indexCell = row.insertCell();
    indexCell.textContent = item.category_No;

    // 创建ID列
    var idCell = row.insertCell();
    idCell.textContent = item.category_id;

    // 创建名称列
    var nameCell = row.insertCell();
    nameCell.textContent = item.category_name;

    // 创建图标列
    var iconCell = row.insertCell();
    var iconContainer = document.createElement('div');
    iconContainer.style.display = 'flex';
    iconContainer.style.alignItems = 'center';
    // 创建图标图片
    var iconImg = document.createElement('img');
    iconImg.src = './images/logos/' + item.category_id + '.png';
    iconImg.style.height = "1.5rem";  // 设置图标高度为 1cm
    iconImg.style.marginRight = "10px";  // 添加右边距为 5px
    // 创建图标文字
    var iconText = document.createTextNode(item.category_id);
    var iconTextSpan = document.createElement('span');
    iconTextSpan.appendChild(iconText);
    // 将图标图片和图标文字添加到图标容器中
    iconContainer.appendChild(iconImg);
    iconContainer.appendChild(iconTextSpan);
    iconCell.appendChild(iconContainer);

    // 创建操作列
    var actionCell = row.insertCell();
    var editButton = document.createElement('button');
    editButton.textContent = '编辑';
    editButton.classList.add("edit-button-category"); // 添加 "edit-button" 类
    editButton.addEventListener("click", function() {
      // 编辑按钮的点击事件
      // 在这里执行相应的编辑逻辑
    });

    var deleteButton = document.createElement('button');
    deleteButton.textContent = '删除';
    deleteButton.classList.add("delete-button-category"); // 添加 "delete-button" 类
    deleteButton.addEventListener("click", function() {
      // 删除按钮的点击事件
      // 在这里执行相应的删除逻辑
    });

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
  });
}
