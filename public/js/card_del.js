$(document).ready(function () {
  // 定义全局变量用于存储当前删除的行数据
  let currentRowData = {}
  let rowindex

  const modal = $('#del_Modal-card')  // 获取添加弹窗整个页面

  const closeButton = $('#del_close-card')   // 获取关闭按钮
  const saveButton = $('#del_saveButton-card')  // 获取保存按钮
  const close_saveButton = $('#del_close_save-card')   // 获取保存关闭按钮
  const $popup = $('#del_popup_save-card')   // 获取保存弹窗页面
  const $popupText = $('#del_popupText_save-card')    // 获取保存弹窗提示

  // 显示删除表单并设置初始值
  function showEditForm (rowData) {
    // 保存当前行数据（进行深拷贝）
    currentRowData = JSON.parse(JSON.stringify(rowData))

    // 设置删除表单的初始值
    $('#del_categoryInput-card').val(currentRowData.category)
    $('#del_NameInput-card').val(currentRowData.name)
    $('#del_iconInput-card').val(currentRowData.icon)
    $('#del_hrefput-card').val(currentRowData.href)
    $('#del_descriptionInput-card').val(currentRowData.description)

    // 显示删除模态框
    modal.show()
  }


  // 监听删除按钮的点击事件
  $('#myTable-card').on('click', '.delete-button-card', function () {
    // 获取所在行的数据
    const row = $(this).closest('tr')
    rowindex = row.index()

    const rowData = {
      category: row.find('td:eq(2)').text(),
      name: row.find('td:eq(3)').text(),
      icon: row.find('td:eq(4)').text(),
      href: row.find('td:eq(5)').text(),
      description: row.find('td:eq(6)').text()
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
      url: '/delcards',
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