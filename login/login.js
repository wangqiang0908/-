let layer = layui.layer;
let form = layui.form;


// ***********************切换功能

//去注册
$('#goto-register').on('click', function () {
    $('#register').show()
    $('#login').hide()
});
//去登陆
$('#goto-login').on('click', function () {
    $('#register').hide()
    $('#login').show()
});





// -----------------------------------------验证
// 需求：
//    1. 用户名、密码、重复密码不能为空  
//    2. 密码、重复密码   长度 6~12 位，且不能出现空格：   非空格类字符；\S
//    3. 密码 和 重复密码 必须一致 


form.verify({
    // 长度 6~12 位，且不能出现空格
    changdu: function(value, dom) {
      let reg = /^\S{6,12}$/;
      if (reg.test(value) == false) {
        return "密码必须6到12位，且不能出现空格";
      }
    },
  
    // 密码 和 重复密码 必须一致   same设置给谁？设置重复密码
    same: function(value, dom) {
      // value：谁的value？重复密码的值
      // 验证：获取密码值！密码的值 如何获取?  设置类名.val(); 
      //       可以不写正则！
      if ($(".pwd").val() != value) {
        return "密码和重复密码必须一致!"
      }
    },
  
    // 简写：数组[正则、不满足时文字提醒]
    // pass: [
    //   /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    // ]
  });


// -------------------------------------------注册
// html：form表单！按钮/表单元素 name属性和参数名一致！
// JS ：收集数据！$.ajax()
$("#register form").on("submit", function(e) {
    e.preventDefault();
  
    // 1.收集数据  JQ  layui.form模块
    let data = $(this).serialize();
  
  
    // 2.提交数据
    $.ajax({
      url: "http://ajax.frontend.itheima.net/api/reguser",
      type: "POST",
      data: data,
      success: function(res) {
        layer.msg(res.message);
  
        if (res.status == 0) {
          // 去登录！
          $("#goto-login").click();
  
          // 注册表单重置！
          $("#register form")[0].reset();
        }
  
  
      }
    })
  
  
  
  });