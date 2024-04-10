$(document).ready(function () {
  // 定义全局变量用于存储当前编辑的行数据
  let currentRowData = {}
  let rowindex

  const modal = $('#edit_Modal-card')  // 获取添加弹窗整个页面

  const closeButton = $('#edit_close-card')   // 获取关闭按钮
  const saveButton = $('#edit_saveButton-card')  // 获取保存按钮
  const close_saveButton = $('#edit_close_save-card')   // 获取保存关闭按钮
  const $popup = $('#edit_popup_save-card')   // 获取保存弹窗页面
  const $popupText = $('#edit_popupText_save-card')    // 获取保存弹窗提示

  // 显示编辑表单并设置初始值
  function showEditForm (rowData) {
    // 保存当前行数据（进行深拷贝）
    currentRowData = JSON.parse(JSON.stringify(rowData))

    // 设置编辑表单的初始值
    $('#edit_categoryInput-card').val(currentRowData.category)
    $('#edit_NameInput-card').val(currentRowData.name)
    $('#edit_iconInput-card').val(currentRowData.icon)
    $('#edit_hrefput-card').val(currentRowData.href)
    $('#edit_descriptionInput-card').val(currentRowData.description)

    // 显示编辑模态框
    modal.show()
  }


  // 监听编辑按钮的点击事件
  $('#myTable-card').on('click', '.edit-button-card', function () {
    // 获取所在行的数据
    const row = $(this).closest('tr')
    rowindex = row.index()

    const rowData = {
      category: row.find('td:eq(2)').text(),
      name: row.find('td:eq(3)').text(),
      icon: row.find('td:eq(4)').text(),
      href: row.find('td:eq(5)').text(),
      description: row.find('td:eq(6)').text(),
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
    const newcategory = $('#edit_categoryInput-card').val()
    const newname = $('#edit_NameInput-card').val()
    const newicon = $('#edit_iconInput-card').val()
    const newhref = $('#edit_hrefput-card').val()
    const newdescription = $('#edit_descriptionInput-card').val()

    const xhr = new XMLHttpRequest()
    xhr.open('GET', '../assets/category.json')  // 分类数据json文件
    // 利用对应的分类名称获取分类ID
    xhr.onload = function () {
      if (xhr.status === 200) {
        const jsonData = JSON.parse(xhr.responseText)

        let cardcategoryid = null
        for (let i = 0; i < jsonData.length; i++) {
          if (jsonData[i].category_name === newcategory) {
            cardcategoryid = jsonData[i].category_id
            break
          }
        }

        // 更新当前行数据
        currentRowData.category = newcategory
        currentRowData.name = newname
        currentRowData.icon = newicon
        currentRowData.href = newhref
        currentRowData.description = newdescription
        currentRowData.categoryID = cardcategoryid

        console.log("rowindex: ", rowindex)
        console.log("currentRowData: ", currentRowData)

        const dataToSend = {
          rowindex: rowindex,
          currentRowData: currentRowData
        }


        console.log("dataToSend: ", dataToSend)


        $.ajax({
          url: '/editcards',
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

      } else {
        console.error(xhr.statusText)
      }
    }

    xhr.onerror = function () {
      console.error(xhr.statusText)
    }

    xhr.send()
  })

})
