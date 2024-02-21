$(document).ready(function() {

  const modal = $('#add_Modal-card');  // 获取添加弹窗整个页面
  const closeButton = $('#add_close-card');   // 获取关闭按钮
  const saveButton = $('#add_saveButton-card');  // 获取保存按钮
  const close_saveButton = $('#add_close_save-card');   // 获取保存关闭按钮
  const $popup = $('#add_popup_save-card');   // 获取保存弹窗页面
  const $popupText = $('#add_popupText_save-card');    // 获取保存弹窗提示

  const addButton = $('.add-button-card'); // 获取添加按钮

  // 获取输入框元素
  const categoryInput = $('#add_categoryInput-card');
  const NameInput = $('#add_NameInput-card');
  const iconInput = $('#add_iconInput-card');
  const hrefput = $('#add_hrefput-card');
  const descriptionInput = $('#add_descriptionInput-card');




  // 添加按钮点击事件
  addButton.click(function() {
    modal.show();
  });

  // 关闭按钮点击事件
  closeButton.click(function() {
    modal.hide();
  });

   // 保存按钮点击事件
  saveButton.click(function() {

    // 从输入框中获取信息，并存储到newCategory对象中。
    const cardcategory = categoryInput.val();
    const cardName = NameInput.val();
    const cardicon = iconInput.val();
    const cardhref = hrefput.val();
    const carddescription = descriptionInput.val();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../assets/category.json');  // 分类数据json文件
    // 利用对应的分类名称获取分类ID
    xhr.onload = function () {
      if (xhr.status === 200) {
        const jsonData = JSON.parse(xhr.responseText);

        let cardcategoryid = null;
        for (let i = 0; i < jsonData.length; i++) {
          if (jsonData[i].category_name === cardcategory) {
            cardcategoryid = jsonData[i].category_id;
            break;
          }
        }
        // 从输入框中获取信息，并存储到newCategory对象中。
        const newCategory = {
          category_name: cardcategory,
          category_id: cardcategoryid,
          name: cardName,
          icon: cardicon,
          href: cardhref,
          description: carddescription,
        };

        $.ajax({
          url: '/addcards',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(newCategory),
          success: function (response) {
            // 清空输入框
            categoryInput.val('');
            NameInput.val('');
            iconInput.val('');
            hrefput.val('');
            descriptionInput.val('');
            // 显示添加成功弹窗
            $popupText.text(response);
            $popup.show();
          },
          error: function (error) {
            console.log('网页添加错误:', error);
          },
        });
      } else {
        console.error(xhr.statusText);
      }
    };

    xhr.onerror = function () {
      console.error(xhr.statusText);
    };

    xhr.send();
  });

  close_saveButton.click(function () {
    $popup.hide();
  });
});