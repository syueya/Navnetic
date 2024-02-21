$(document).ready(function() {
  // 初始化排序功能
  $("#myTable-card tbody").sortable({
    update: function(event, ui) {
      const jsonDataPromise = getTableData(); // 获取表格数据

      jsonDataPromise.then(jsonData => {

        // 发送数据给后端保存
        $.ajax({
          type: "POST",
          url: "/sortablecard",
          data: JSON.stringify(jsonData),
          contentType: "application/json",
          success: function(response) {
            // 可以在这里执行其他操作，如果有需要的话
          },
          error: function(error) {
            console.error("重新排序失败:", error);
          }
        });
      });
    }
  });

  function getTableData() {
    const rowsPromises = [];

    $("#myTable-card tbody tr").each(function() {
      const currentRow = $(this); // 保存当前行的引用

      const xhrPromise = new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '../assets/category.json');
        xhr.onload = function() {
          if (xhr.status === 200) {
            const jsonData = JSON.parse(xhr.responseText);

            // 使用存储的当前行引用
            const categoryName = currentRow.find("td:nth-child(3)").text();
            let cardcategoryid = '';

            for (let i = 0; i < jsonData.length; i++) {
              if (jsonData[i].category_name === categoryName) {
                cardcategoryid = jsonData[i].category_id;
                break;
              }
            }

            const row = {
              选择: currentRow.find("td:nth-child(1)").text(),
              序号: currentRow.find("td:nth-child(2)").text(),
              所属分类: currentRow.find("td:nth-child(3)").text(),
              分类ID: cardcategoryid,
              名称: currentRow.find("td:nth-child(4)").text(),
              图标: currentRow.find("td:nth-child(5)").text(),
              链接: currentRow.find("td:nth-child(6)").text(),
              描述: currentRow.find("td:nth-child(7)").text(),
              操作: currentRow.find("td:nth-child(8)").text()
            };

            resolve(row);
          } else {
            reject(xhr.statusText);
          }
        };

        xhr.send();
      });

      rowsPromises.push(xhrPromise);
    });

    return Promise.all(rowsPromises);
  }
});