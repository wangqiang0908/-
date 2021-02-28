// ******************************************************列表加载
$.ajax({
  url: "/my/article/cates",
  success: function(res) {
    if (res.status == 0) {
      let str = "";
      res.data.forEach(item => {
        str += `<tr>
                <td>${item.name}</td>
                <td>${item.alias}</td>
                <td>
                  <button type="button" class="layui-btn layui-btn-xs btnEdit">编辑</button>
                  <button type="button" class="layui-btn layui-btn-xs layui-btn-danger btnDelete">删除</button>
                </td>
              </tr>`;
      });


      $("tbody").html(str);


    }
  }
})