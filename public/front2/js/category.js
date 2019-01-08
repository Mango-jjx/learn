/**
 * Created by 54721 on 2019/1/8.
 */
$(function() {


  // 一进入页面, 发送 ajax, 获取一级分类的数据, 渲染左侧
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function( info ) {
      console.log( info );
      var htmlStr = template("leftTpl", info);
      $('.lt_category_left ul').html( htmlStr );

      // 渲染完一级分类, 默认渲染第一个一级分类对应的二级分类
      renderById( info.rows[0].id );
    }
  })


  // 给左侧的所有 a 添加点击事件, 实现点击切换效果 (事件委托)
  $('.lt_category_left').on("click", "a", function() {
    // 移除所有的
    $('.lt_category_left a').removeClass("current");
    // 给自己加上 current 类,
    $(this).addClass("current");

    // 获取 id
    var id = $(this).data('id');
    // 调用方法, 发送请求渲染
    renderById( id );
  })

  // 根据一级分类 id, 发送ajax请求, 渲染二级分类
  function renderById( id ) {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: {
        id: id
      },
      dataType: "json",
      success: function( info ) {
        console.log( info )
        var htmlStr = template("rightTpl", info);
        $('.lt_category_right ul').html( htmlStr );
      }
    })
  }

})
