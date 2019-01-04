/**
 * Created by 54721 on 2019/1/4.
 */
$(function() {

  /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
  // 进行表单校验初始化
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    // 配置校验字段 注意(要先给 input 配置 name)
    fields: {
       username: {
         // 校验规则
         validators: {
           // 非空校验
           notEmpty: {
             message: "用户名不能为空"
           },
           // 长度校验
           stringLength: {
             min: 2,
             max: 6,
             message: "用户名长度必须是 2-6 位"
           },
           // callback 专门用于配置回调的提示
           callback: {
             message: "用户名不存在"
           }
         }
       },

       password: {
         // 校验规则
         validators: {
           // 非空校验
           notEmpty: {
             message: "密码不能为空"
           },
           // 长度校验
           stringLength: {
             min: 6,
             max: 12,
             message: "密码长度必须是 6-12 位"
           },
           callback: {
             message: "密码错误"
           }
         }
       }
     }
  })


  /*
  * 2. 我们需要用到插件的校验功能, 所以要用 submit 按钮
  *    所以需要注册表单校验成功事件, 在事件中, 阻止默认的提交(防止跳转), 通过 ajax 提交即可
  * */
  // 注册表单校验成功事件
  $('#form').on("success.form.bv", function( e ) {
    // 阻止默认的提交
    e.preventDefault();

    // 通过 ajax 提交
    // console.log( "阻止了默认的提交, 通过 ajax 提交" );

    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      // 表单序列化
      data: $('#form').serialize(),
      dataType: 'json',
      success: function( info ) {
        console.log( info );
        if ( info.error === 1000 ) {
          // alert( "用户名不存在" );
          // 调用插件实例方法, 更新校验状态成失败, 提示用户
          // updateStatus( field, status, validator );
          // 参数1: 校验字段
          // 参数2: 校验状态  NOT_VALIDATED, VALIDATING, INVALID or VALID
          // 参数3: 校验规则, 配置用于显示 message 提示
          $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
          return;
        }
        if ( info.error === 1001 ) {
          // alert( "密码错误" );
          $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
          return;
        }
        if ( info.success ) {
          // 跳转到首页
          location.href = "index.html";
          return;
        }
      }
    })

  });



  /*
  * 3. 重置功能,
  *    默认 type="reset" 按钮, 只会重置表单内容
  *    此时, 内容和校验状态都需要重置, 需要调用插件的实例方法
  *
  *    $('#form').data("bootstrapValidator") 创建插件实例
  *    resetForm();     不传参, 只重置校验状态
  *    resetForm(true); 传true, 内容和状态都重置
  * */
  $('[type="reset"]').click(function() {

    $('#form').data("bootstrapValidator").resetForm(); // 只重置状态, 内容已经被reset按钮重置了

  })


})
