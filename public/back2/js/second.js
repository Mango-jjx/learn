/**
 * Created by 54721 on 2019/1/5.
 */
$(function() {


  // 定义当前页和总页数
  var currentPage = 1;
  var pageSize = 5;
  // 1. 一进入页面, 渲染第一页
  render();

  function render() {
    // 发送ajax, 进行渲染
     $.ajax({
       type: "get",
       url: "/category/querySecondCategoryPaging",
       data: {
         page: currentPage,
         pageSize: pageSize
       },
       dataType: "json",
       success: function( info ) {
         console.log( info );
         var htmlStr = template( "secondTpl", info );
         $('tbody').html( htmlStr );

         // 根据后台返回的数据, 进行分页初始化
         $('#paginator').bootstrapPaginator({
           bootstrapMajorVersion: 3,  // 版本号
           currentPage: info.page,  // 当前页
           totalPages: Math.ceil( info.total / info.size ), // 总页数
           onPageClicked: function( a, b, c, page ) {
             // 更新当前页
             currentPage = page;
             // 重新渲染
             render();
           }
         })
       }
     })
  }



  // 2. 点击添加按钮, 显示添加模态框
  $('#addBtn').click(function() {
    $('#addModal').modal("show");

    // 显示模态框, 立刻发送请求, 获取所有的一级分类, 渲染下拉菜单
    // 通过配置 page:1, pageSize:100 获取所有的以及分类
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template( "dropdownTpl", info );
        $('.dropdown-menu').html( htmlStr );
      }
    })
  });


  // 3. 给所有的下拉菜单的 a 添加点击事件 (通过事件委托)
  $('.dropdown-menu').on("click", "a", function() {

    // 获取自己的文本
    var txt = $(this).text();
    // 设置给按钮
    $('#dropdownText').text( txt );
  });



  // 4. 配置fileupload进行初始化
  $('#fileupload').fileupload({
    dataType: "json",
    // 文件上传完成的回调函数
    done: function( e, data ) {
      console.log( data );
      var picUrl = data.result.picAddr; // 获取地址
      $('#imgBox img').attr("src", picUrl);
    }
  })



})
