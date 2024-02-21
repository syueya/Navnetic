$(document).ready(function() {
  let rowIndices;  // 定义全局变量用于存储当前选择的行数据

  const modal = $('#multi_del_Modal');  // 获取添加弹窗整个页面
  const closeButton = $('#multi_del_close');   // 获取关闭按钮
  const saveButton = $('#multi_del_saveButton');  // 获取确定按钮
  const close_saveButton = $('#multi_del_close_save');   // 获取保存关闭按钮
  const $popup = $('#multi_del_popup_save');   // 获取保存弹窗页面
  const $popupText = $('#multi_del_popupText_save');    // 获取保存弹窗提示


  // 创建选择框的点击事件处理程序
  $('.category-checkbox').on('click', function() {
    if ($(this).prop('checked')) {
      $(this).closest('tr').addClass('selected');
    } else {
      $(this).closest('tr').removeClass('selected');
    }
  });

  // 监听批量删除按钮的点击事件处理程序
  $('.multi-delete-button-category').click(function() {
    var selectedRows = $('tr.selected');
    var modalLabels = '';
    rowIndices = [];

    // 收集选中行的数据
    selectedRows.each(function(index, row) {
      var rowData = [];
      var rowIndex = $(this).index(); // 计算实际行序列号
      rowIndices.push(rowIndex); // 将行号添加到列表中

      rowData.push('序号: ' + $(this).find('td:nth-child(2)').text());
      rowData.push('ID: ' + $(this).find('td:nth-child(3)').text());
      rowData.push('名称: ' + $(this).find('td:nth-child(4)').text());
      modalLabels += '<label>' + rowData.join(', ') + '</label>';
    });

    // 将选中行的数据显示在 modal 中
    $('.choose-category').html(modalLabels);
    modal.show();  // 显示编辑模态框
  });

  // 关闭按钮点击事件
  closeButton.click(function() {
    modal.hide();

    // 清空选择的类名的元素的内容
    $('.choose-category').empty();
    // 取消选择框列的勾选
    $('tr.selected').find('.category-checkbox').prop('checked', false);
    $('tr.selected').removeClass('selected');
  });

  // 保存编辑后的数据
  saveButton.click(function() {
    $.ajax({
      url: '/multi_delcategories',
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