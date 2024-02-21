$(document).ready(function() {
  let rowIndices;  // 定义全局变量用于存储当前选择的行数据

  const modal = $('#multi_del_Modal-card');  // 获取添加弹窗整个页面
  const closeButton = $('#multi_del_close-card');   // 获取关闭按钮
  const saveButton = $('#multi_del_saveButton-card');  // 获取确定按钮
  const close_saveButton = $('#multi_del_close_save-card');   // 获取保存关闭按钮
  const $popup = $('#multi_del_popup_save-card');   // 获取保存弹窗页面
  const $popupText = $('#multi_del_popupText_save-card');    // 获取保存弹窗提示


  // 创建选择框的点击事件处理程序
  $('.category-checkbox').on('click', function() {
    if ($(this).prop('checked')) {
      $(this).closest('tr').addClass('selected');
    } else {
      $(this).closest('tr').removeClass('selected');
    }
  });

  // 监听批量删除按钮的点击事件处理程序
  $('.multi-delete-button-card').click(function() {
    var selectedRows = $('tr.selected');
    var modalLabels = '';
    rowIndices = [];

    // 收集选中行的数据
    selectedRows.each(function(index, row) {
      var rowData = [];
      var rowIndex = $(this).index(); // 计算实际行序列号
      rowIndices.push(rowIndex); // 将行号添加到列表中

      rowData.push('名称: ' + $(this).find('td:nth-child(4)').text()+ ' '); // 名称在第4列
      rowData.push('链接: ' + $(this).find('td:nth-child(6)').text()+ ' '); // 链接在第6列
      modalLabels += '<label>' + rowData + '</label>';
    });

    console.log("rowIndices: " , rowIndices);
    console.log("名称: " , modalLabels);

    // 将选中行的数据显示在 modal 中
    $('.choose-card').html(modalLabels);
    modal.show();  // 显示编辑模态框
  });


  // 关闭按钮点击事件
  closeButton.click(function() {
    modal.hide();

    // 清空选择的类名的元素的内容
    $('.choose-card').empty();
    // 取消选择框列的勾选
    $('tr.selected').find('.category-checkbox').prop('checked', false);
    $('tr.selected').removeClass('selected');
  });

  // 保存编辑后的数据
  saveButton.click(function() {
    $.ajax({
      url: '/multi_delcards',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(rowIndices),
      success: function (response) {
        $popupText.text(response);
        $popup.show();
      },
      error: function (error) {
        console.log('删除数据时发生错误:', error);
      },
    });
  });


  // 关闭按钮点击事件
  close_saveButton.click(function() {
    $popup.hide();
  });

});