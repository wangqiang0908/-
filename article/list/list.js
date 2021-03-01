let laypage = layui.laypage;
let form = layui.form;

// 全局变量：任何地方都可以用！
let data = {
  pagenum: 1,
  pagesize: 5,
};

// ***********************************************************列表加载
function list() {
  $.ajax({
    url: "/my/article/list",
    data: data,
    success: function(res) {
      if (res.status == 0) {

        // ************************列表渲染
        let str = "";
        res.data.forEach(item => {
          str += `<tr>
                <td>${item.title}</td>
                <td>${item.cate_name}</td>
                <td>${item.pub_date}</td>
                <td>${item.state}</td>
                <td>
                  <button type="button" class="layui-btn layui-btn-xs btn_edit" _id="${item.Id}">编辑</button>
                  <button type="button" class="layui-btn layui-btn-danger layui-btn-xs btn_delete" _id="${item.Id}">删除</button>
                </td>
              </tr>`;
        });
        $("tbody").html(str);

        // ***********************分页器配置
        pageRender(res.total)


      }
    }
  });
}
list();


// ************************************************************加载分页器
function pageRender(total) {
  laypage.render({
    elem: 'page',
    count: total, // 数据总数，从服务端得到,
    limit: data.pagesize, // 显示几条数据,依据全局变量data配置
    curr: data.pagenum, // 显示第几页


    // 可选
    limits: [2, 3, 5, 10], // 控制分页器，用户选择每页可以显示几条！
    layout: ['prev', 'page', 'next', 'count', 'limit', 'skip'], // 有啥功能

    // 分页器：用户点击页码，直接跳到某个页码;
    //    分页器第一次加载时候，会执行；
    //    用户改变页码的时候    会执行
    jump: function(obj, first) {
      // first：是第一次加载，还是用户操作！
      // obj：得到操作后：现在是第几页，选择页显示多少个数据


      // 当是用户操作的时候，才重新加载列表
      if (first == undefined) {
        // 业务：列表 按照用户的选择(页码2和显示多少条5)重新加载数据！
        data.pagenum = obj.curr;
        data.pagesize = obj.limit;
        list();
      }

    }


  });
}



// ***************************************************************加载分类数据
$.ajax({
  url: "/my/article/cates",
  success: function(res) {
    if (res.status == 0) {
      let str = "";

      res.data.forEach(item => {
        str += `<option value="${item.Id}">${item.name}</option>`
      });

      $(".cart").html(str);

      // 表单的重新渲染：更新渲染！
      form.render('select');
    }
  }
});


// 分类、状态：多个查询条件重新加载列表：
$(".search").on("submit", function(e) {
  e.preventDefault();


  // 1.收集数据：类别  和 状态  
  //    jQ   layui.form.val();
  // let str = $(this).serialize(); // 字符串
  // let arr = $(this).serializeArray(); // 数组对象；
  let obj = form.val("search"); // 对象


  // 2.重新设置data查询条件，重新加载列表 list();
  data.cate_id = obj.category;
  data.state = obj.state;
  // 业务上设计：带着分类(其他条件)查询列表，从第一页开始；
  data.pagenum = 1;
  list();

})
