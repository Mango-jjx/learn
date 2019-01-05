/**
 * Created by 54721 on 2019/1/5.
 */
$(function() {
  var currentId;  // 当前操作的用户id
  var isDelete; // 当前需要修改用户的状态

  // 1. 一进入页面, 发送 ajax 请求, 获取数据, 进行模板引擎渲染
  var currentPage = 1;
  var pageSize = 5;
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        //var htmlStr = template("模板id", "数据对象")
        var htmlStr = template("tpl", info);
        $('tbody').html( htmlStr );


        // 分页初始化
        $('#paginator').bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),
          // 添加页码点击事件
          onPageClicked: function( a, b, c, page ) {
            // 更新到 page 页
            currentPage = page;
            // 重新调用 render() 渲染
            render();
          }
        })
      }
    });
  }

  // 准备分页容器 ul, 进行分页初始化
  //$('#paginator').bootstrapPaginator({
  //  // 设置bootstrap版本号
  //  bootstrapMajorVersion: 3,
  //  // 当前页
  //  currentPage: 1,
  //  // 总页数
  //  totalPages: 5,
  //  // 给页码添加点击事件
  //  onPageClicked: function( a, b, c, page ) {
  //    // page 表示点击的按钮指向的页码
  //    console.log( page );
  //  }
  //})


  // 2. 按钮事件, 通过事件委托绑定
  $('tbody').on("click", ".btn", function() {
    // 弹出模态框
    $('#userModal').modal("show");

    // 获取当前用户 id
    currentId = $(this).parent().data("id");

    // 获取将用户修改成什么状态
    // 禁用按钮 ? 禁用状态 0 : 启用状态 1
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  });

  // 3. 点击模态框确认按钮, 发送请求, 修改用户状态
  $('#submitBtn').click(function() {

    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 关闭模态框
          $('#userModal').modal("hide");
          // 重新渲染页面
          render();
        }
      }
    })

  })
})
