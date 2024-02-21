const express = require('express'); // 引入express模块
const app = express();
const fs = require('fs');  // 引入fs（文件系统）模块
const bodyParser = require('body-parser');
app.use(express.json());  // express.json() 中间件解析请求体中的JSON数据
app.use(express.static('public')); // 提供静态文件（包括样式文件）的服务

const path = require('path'); // 引入path（路径）模块
const categoryFilePath = path.join(__dirname, 'public', 'assets', 'category.json');  // 设置存放分类数据的 JSON 文件路径
const cardFilePath = path.join(__dirname, 'public', 'assets', 'bookmarks.json');  // 设置存放网址数据的 JSON 文件路径

// 定义了一个 GET 请求处理程序，当客户端请求根路径 / 时，将发送 home.html 文件作为响应。。
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});


// 定义一个函数，用于读取JSON 文件
function readAndProcessJsonFile(filePath, res, callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return; // 添加 return 语句，避免继续执行发送响应的代码
    } else {
      const jsonData = JSON.parse(data);
      callback(jsonData);
    }
  });
}


// 处理添加分类的请求
app.post("/addcategories", (req, res) => {
  const newCategory = req.body;

  // 读取category.json文件
  readAndProcessJsonFile(categoryFilePath, res, (jsonData) => {
    jsonData.push(newCategory);

    // 将数据保存到JSON文件
    fs.writeFile(categoryFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send("添加成功");
        }
      }
    );
  });
});

// 处理编辑分类请求
app.post("/editcategories", (req, res) => {
  const dataToSend = req.body;
  const rowIndex = dataToSend.rowindex;  // 编辑所在的行号
  let currentRowData = dataToSend.currentRowData;  // 编辑后的数据

  // 读取category.json文件
  readAndProcessJsonFile(categoryFilePath, res, (jsonData) => {
    jsonData[rowIndex].category_No = currentRowData.index.toString();
    jsonData[rowIndex].category_id = currentRowData.id;
    jsonData[rowIndex].category_name = currentRowData.name;

    // 将数据保存到JSON文件
    fs.writeFile(categoryFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send("编辑成功");
        }
      }
    );
  });
});

// 处理删除分类请求
app.post("/delcategories", (req, res) => {
  const dataToSend = req.body;
  const rowIndex = dataToSend.rowindex;  // 删除所在的行号

  // 读取category.json文件
  readAndProcessJsonFile(categoryFilePath, res, (jsonData) => {
    jsonData.splice(rowIndex, 1); // 从 jsonData 中删除指定索引的元素

    // 将数据保存到JSON文件
    fs.writeFile(categoryFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send("删除成功");
        }
      }
    );
  });
});


// 处理批量删除分类请求
app.post('/multi_delcategories', (req, res) => {
  const dataToDelete = req.body;  // dataToDelete的类型：object

  // 读取category.json文件
  readAndProcessJsonFile(categoryFilePath, res, (jsonData) => {
    // 删除对应的数据
    for (let i = dataToDelete.length - 1; i >= 0; i--) {
      const index = dataToDelete[i];
      jsonData.splice(index, 1);
    }

    // 将数据保存到JSON文件
    fs.writeFile(categoryFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send("批量删除成功");
        }
    });
  });
});



// 处理拖动排序请求
app.post("/sortablecategory", (req, res) => {
  const jsonData = req.body;

  // 转换数据格式
  const transformedData = jsonData.map(item => ({
    category_No: item["序号"],
    category_id: item.ID,
    category_name: item["名称"]
  }));

  // 将数据保存到JSON文件
  fs.writeFile(categoryFilePath, JSON.stringify(transformedData, null, 2), 'utf8', (err) => {
    if (err) {
      console.error("重新排序失败:", err);
      res.status(500).send("重新排序失败");
    } else {
      res.send("重新排序成功");
    }
  });
});


// 处理添加卡片的请求
app.post("/addcards", (req, res) => {
  const newCategory = req.body;

  // 读取bookmarks.json文件
  readAndProcessJsonFile(cardFilePath, res, (jsonData) => {
    jsonData.push(newCategory);

    // 将数据保存到JSON文件
    fs.writeFile(cardFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send("网页添加成功");
        }
      }
    );
  });
});


// 处理编辑卡片请求
app.post("/editcards", (req, res) => {
  const dataToSend = req.body;
  const rowIndex = dataToSend.rowindex;  // 编辑所在的行号
  let currentRowData = dataToSend.currentRowData;  // 编辑后的数据

  console.log("dataToSend: " ,dataToSend);
  console.log("rowindex: " ,rowIndex);
  console.log("currentRowData: " ,currentRowData);

  // 读取bookmarks.json文件
  readAndProcessJsonFile(cardFilePath, res, (jsonData) => {
    jsonData[rowIndex].category_name = currentRowData.category;
    jsonData[rowIndex].category_id = currentRowData.categoryID;
    jsonData[rowIndex].name = currentRowData.name;
    jsonData[rowIndex].icon = currentRowData.icon;
    jsonData[rowIndex].href = currentRowData.href;
    jsonData[rowIndex].description = currentRowData.description;

    // 将数据保存到JSON文件
    fs.writeFile(cardFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send("编辑成功");
        }
      }
    );
  });
});


// 处理删除卡片请求
app.post("/delcards", (req, res) => {
  const dataToSend = req.body;
  const rowIndex = dataToSend.rowindex;  // 删除所在的行号

  // 读取category.json文件
  readAndProcessJsonFile(cardFilePath, res, (jsonData) => {
    jsonData.splice(rowIndex, 1); // 从 jsonData 中删除指定索引的元素

    // 将数据保存到JSON文件
    fs.writeFile(cardFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send("删除成功");
        }
      }
    );
  });
});


// 处理批量删除分类请求
app.post('/multi_delcards', (req, res) => {
  const dataToDelete = req.body;  // dataToDelete的类型：object

  // 读取category.json文件
  readAndProcessJsonFile(cardFilePath, res, (jsonData) => {
    // 删除对应的数据
    for (let i = dataToDelete.length - 1; i >= 0; i--) {
      const index = dataToDelete[i];
      jsonData.splice(index, 1);
    }

    // 将数据保存到JSON文件
    fs.writeFile(cardFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send("批量删除成功");
        }
    });
  });
});


// 处理拖动排序请求
app.post("/sortablecard", (req, res) => {
  const jsonData = req.body;

  // 转换数据格式
  const transformedData = jsonData.map(item => ({
    category_name: item["所属分类"],
    category_id: item["分类ID"],
    name: item["名称"],
    icon: item["图标"],
    href: item["链接"],
    description: item["描述"],
  }));

  // 将数据保存到JSON文件
  fs.writeFile(cardFilePath, JSON.stringify(transformedData, null, 2), 'utf8', (err) => {
    if (err) {
      console.error("重新排序失败:", err);
      res.status(500).send("重新排序失败");
    } else {
      res.send("重新排序成功");
    }
  });
});


// 使用 app.listen() 方法启动服务器并监听localhost上的3000端口。一旦服务器启动，console.log中的消息将打印到控制台。
app.listen(3000, () => {
  console.log('服务器已启动，点击 http://localhost:3000 查看');
});