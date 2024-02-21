document.addEventListener('DOMContentLoaded', function() {
  // 获取下拉框的元素和箭头元素
  var selectBox = document.getElementById('category-select');
  var arrow = document.querySelector('.category-select-all .arrow');

  // 设置标志变量以控制下拉框的显示和隐藏
  var isDropdownVisible = false;

  // 发起 JSON 文件请求并处理响应
  fetch('./assets/category.json')
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        console.log('读取 JSON 文件时出错');
        return [];
      }
    })
    .then(function(data) {
      // 调用处理 JSON 数据的函数，并传递数据作为参数
      handleJsonData(data);
    })
    .catch(function(error) {
      console.log('请求 JSON 文件时出错:', error);
    });

  // 定义一个函数来处理 JSON 数据
  function handleJsonData(data) {
    // 遍历 JSON 数据并创建下拉框选项
    data.forEach(function(item) {
      var option = document.createElement('option');
      option.value = item.category_name;
      option.textContent = item.category_name;
      selectBox.appendChild(option);
    });

    // 下拉框选项改变时触发事件
    selectBox.addEventListener('change', function() {
      // 获取选中的选项值
      var selectedOption = selectBox.value;

      // 获取表格行元素
      var tableRows = document.querySelectorAll('#myTable-card tbody tr');

      // 如果选择了空选项，则显示所有行
      if (selectedOption === "") {
        tableRows.forEach(function(row) {
          row.style.display = 'table-row'; // 显示行
        });
      } else {
        // 迭代表格行，根据选项值进行筛选显示
        tableRows.forEach(function(row) {
          // 获取所属分类列的元素
          var categoryCell = row.querySelector('td:nth-child(3)');

          // 检查所属分类列的内容是否与选项值匹配，如果匹配则显示行，否则隐藏行
          if (categoryCell.textContent === selectedOption) {
            row.style.display = 'table-row'; // 显示行
          } else {
            row.style.display = 'none'; // 隐藏行
          }
        });
      }
    });

  }

  // 点击箭头时切换下拉框的显示和隐藏
  arrow.addEventListener('click', function(event) {
    event.stopPropagation(); // 阻止事件冒泡，避免点击箭头时隐藏下拉框

    // 切换下拉框的显示和隐藏
    selectBox.classList.toggle('show');
    isDropdownVisible = !isDropdownVisible; // 切换标志变量的状态
  });

  // 点击其他位置时隐藏下拉框
  document.addEventListener('click', function() {
    if (isDropdownVisible) {
      selectBox.classList.remove('show');
      isDropdownVisible = false; // 重置标志变量的状态
    }
  });
});