/**
 * Created by 54721 on 2019/1/5.
 */
$(function() {

  // 1. 一进入发送ajax, 进行渲染
  var currentPage = 1;
  var pageSize = 5;
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template( "firstTpl", info );
        $('tbody').html( htmlStr );

        // 分页初始化
        $('#paginator').bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),
          // 注册页码点击事件
          onPageClicked: function( a, b, c, page ) {
            // 更新当前页
            currentPage = page;
            // 重新渲染页面
            render();
          }
        })
      }
    })
  }


  // 2. 点击添加按钮, 显示添加模态框
  $('#addBtn').click(function() {
    $('#addModal').modal("show");
  });


  // 3. 进行校验配置
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    // 校验字段, 一定要先配置 input 的 name
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "请输入一级分类名称"
          }
        }
      }
    }
  });



  // 4. 注册表单校验成功事件, 在成功准备提交表单时, 阻止默认的提交, 通过ajax提交
  $('#form').on("success.form.bv", function( e ) {
    e.preventDefault();

    // 通过 ajax 提交
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 添加成功, 关闭模态框, 重新渲染
          $('#addModal').modal("hide");

          // 重新渲染第一页
          currentPage = 1;
          render();

          // 重置表单内容, 内容和状态都重置
          $('#form').data("bootstrapValidator").resetForm(true);
        }
      }

    })
  })

})
