const sidebar = document.querySelector('.sidebar');

fetch('./assets/category.json')
  .then(response => response.json())
  .then(jsonData => {
    jsonData.forEach(item => {
      const link = document.createElement('a');
      link.classList.add('scroll-link');
      link.dataset.target = `#${item.category_id}`;
      link.textContent = item.category_name;
      sidebar.appendChild(link);
    });
  })
  .catch(error => {
    console.log('读取 JSON 文件时出错:', error);
  });