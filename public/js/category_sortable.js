$(document).ready(function() {
  // 初始化排序功能
  $("#myTable-category tbody").sortable({
    update: function(event, ui) {
      const jsonData = getTableData(); // 获取表格数据

      // 发送数据给后端保存
      $.ajax({
        type: "POST",
        url: "/sortablecategory",
        data: JSON.stringify(jsonData),
        contentType: "application/json",
        success: function(response) {
          // 可以在这里执行其他操作，如果有需要的话
        },
        error: function(error) {
          console.error("重新排序失败:", error);
        }
      });
    }
  });

  // 获取表格数据
  function getTableData() {
    const rows = [];

    $("#myTable-category tbody tr").each(function() {
      const row = {
        选择: $(this).find("td:nth-child(1)").text(),
        序号: $(this).find("td:nth-child(2)").text(),
        ID: $(this).find("td:nth-child(3)").text(),
        名称: $(this).find("td:nth-child(4)").text(),
        图标: $(this).find("td:nth-child(5)").text(),
        操作: $(this).find("td:nth-child(6)").text()
      };

      rows.push(row);
    });

    return rows;
  }
});