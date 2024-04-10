$(document).ready(function () {
  // 定义全局变量用于存储当前编辑的行数据
  let currentRowData = {}
  let rowindex

  const modal = $('#edit_Modal')  // 获取添加弹窗整个页面

  const closeButton = $('#edit_close')   // 获取关闭按钮
  const saveButton = $('#edit_saveButton')  // 获取保存按钮
  const close_saveButton = $('#edit_close_save')   // 获取保存关闭按钮
  const $popup = $('#edit_popup_save')   // 获取保存弹窗页面
  const $popupText = $('#edit_popupText_save')    // 获取保存弹窗提示

  // 显示编辑表单并设置初始值
  function showEditForm (rowData) {
    // 保存当前行数据（进行深拷贝）
    currentRowData = JSON.parse(JSON.stringify(rowData))

    // 设置编辑表单的初始值
    $('#edit_categoryNoInput').val(currentRowData.index)
    $('#edit_categoryIdInput').val(currentRowData.id)
    $('#edit_categoryNameInput').val(currentRowData.name)

    // 显示编辑模态框
    modal.show()
  }


  // 监听编辑按钮的点击事件
  $('#myTable-category').on('click', '.edit-button-category', function () {
    // 获取所在行的数据
    const row = $(this).closest('tr')
    rowindex = row.index()

    const rowData = {
      index: parseInt(row.find('td:eq(1)').text(), 10),
      id: row.find('td:eq(2)').text(),
      name: row.find('td:eq(3)').text(),
    }

    // 显示编辑表单
    showEditForm(rowData)
  })

  // 关闭按钮点击事件
  closeButton.click(function () {
    modal.hide()
  })


  // 保存编辑后的数据
  saveButton.click(function () {
    // 获取用户输入的新值
    const newIndex = $('#edit_categoryNoInput').val()
    const newId = $('#edit_categoryIdInput').val()
    const newName = $('#edit_categoryNameInput').val()

    // 更新当前行数据
    currentRowData.index = parseInt(newIndex, 10)
    currentRowData.id = newId
    currentRowData.name = newName

    const dataToSend = {
      rowindex: rowindex,
      currentRowData: currentRowData
    }

    $.ajax({
      url: '/editcategories',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(dataToSend),
      success: function (response) {
        $popupText.text(response)
        $popup.show()

        // 自动关闭弹窗和刷新页面
        setTimeout(function () {
          $popup.hide()
          location.reload()
        }, 2000) // 2秒后自动关闭弹窗并刷新页面

      },
      error: function (error) {
        console.log('保存数据时发生错误:', error)
      },
    })
  })



})