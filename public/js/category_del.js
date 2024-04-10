$(document).ready(function () {
  // 定义全局变量用于存储当前删除的行数据
  let currentRowData = {}
  let rowindex

  const modal = $('#del_Modal')  // 获取添加弹窗整个页面

  const closeButton = $('#del_close')   // 获取关闭按钮
  const saveButton = $('#del_saveButton')  // 获取保存按钮
  const close_saveButton = $('#del_close_save')   // 获取保存关闭按钮
  const $popup = $('#del_popup_save')   // 获取保存弹窗页面
  const $popupText = $('#del_popupText_save')    // 获取保存弹窗提示

  // 显示删除表单并设置初始值
  function showEditForm (rowData) {
    // 保存当前行数据（进行深拷贝）
    currentRowData = JSON.parse(JSON.stringify(rowData))

    // 设置删除表单的初始值
    $('#del_categoryNoInput').val(currentRowData.index)
    $('#del_categoryIdInput').val(currentRowData.id)
    $('#del_categoryNameInput').val(currentRowData.name)

    // 显示删除模态框
    modal.show()
  }


  // 监听删除按钮的点击事件
  $('#myTable-category').on('click', '.delete-button-category', function () {
    // 获取所在行的数据
    const row = $(this).closest('tr')
    rowindex = row.index()

    const rowData = {
      index: parseInt(row.find('td:eq(1)').text(), 10),
      id: row.find('td:eq(2)').text(),
      name: row.find('td:eq(3)').text(),
    }

    // 显示删除表单
    showEditForm(rowData)
  })

  // 关闭按钮点击事件
  closeButton.click(function () {
    modal.hide()
  })


  // 保存删除后的数据
  saveButton.click(function () {
    const dataToSend = {
      rowindex: rowindex,
    }

    $.ajax({
      url: '/delcategories',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(dataToSend),
      success: function (response) {
        $popupText.text(response)
        $popup.show()

        // 关闭弹窗
        modal.hide()
        setTimeout(function () {
          $popup.hide()
          location.reload() // 在关闭提示弹窗后刷新页面          
        }, 2000) // 2秒后自动关闭保存提示弹窗
      },

      error: function (error) {
        console.log('保存数据时发生错误:', error)
      },
    })
  })


})