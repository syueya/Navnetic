$(document).ready(function () {

  const modal = $('#add_Modal')  // 获取添加弹窗整个页面
  const closeButton = $('#add_close')   // 获取关闭按钮
  const saveButton = $('#add_saveButton')  // 获取保存按钮
  const close_saveButton = $('#add_close_save')   // 获取保存关闭按钮
  const $popup = $('#add_popup_save')   // 获取保存弹窗页面
  const $popupText = $('#add_popupText_save')    // 获取保存弹窗提示
  const addButton = $('.add-button-category') // 获取添加按钮

  // 获取输入框元素
  const categoryNoInput = $('#add_categoryNoInput')
  const categoryIdInput = $('#add_categoryIdInput')
  const categoryNameInput = $('#add_categoryNameInput')


  // 添加按钮点击事件
  addButton.click(function () {
    modal.show()
  })

  // 关闭按钮点击事件
  closeButton.click(function () {
    modal.hide()
  })

  // 保存按钮点击事件
  saveButton.click(function () {

    // 从输入框中获取类别号、类别ID和类别名称，并存储到newCategory对象中。
    const categoryNo = categoryNoInput.val()
    const categoryId = categoryIdInput.val()
    const categoryName = categoryNameInput.val()
    const newCategory = {
      category_No: categoryNo,
      category_id: categoryId,
      category_name: categoryName
    }

    $.ajax({
      url: '/addcategories',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newCategory),
      success: function (response) {
        // 清空输入框
        categoryNoInput.val('')
        categoryIdInput.val('')
        categoryNameInput.val('')
        // 显示添加成功弹窗
        $popupText.text(response)
        $popup.show()

        // 自动关闭弹窗和刷新页面
        setTimeout(function () {
          $popup.hide()
          location.reload()
        }, 2000) // 2秒后自动关闭弹窗并刷新页面 

      },
      error: function (error) {
        console.log('分类添加错误:', error)
      }
    })
  })


})