/**
 * Created by 54721 on 2019/1/4.
 */
// 进度条方法初体验
// 开启进度条
//NProgress.start();

//setTimeout(function() {
//  // 结束进度条
//  NProgress.done();
//}, 500)


// 添加进度条效果:
// 1. 在第一个ajax开始发送时, 开启进度条
// 2. 在所有的ajax完成时, 结束进度条

// ajax 全局事件
// .ajaxComplete()   每个ajax完成时, 都会调用  (不管成功还是失败都调用)
// .ajaxSuccess()    每个成功的ajax, 都会调用
// .ajaxError()      每个失败的ajax, 都会调用
// .ajaxSend()       每个ajax准备发送时, 调用

// .ajaxStart()      第一个ajax发送时, 调用   (开启进度条)
// .ajaxStop()       当所有的ajax都完成时, 调用  (结束进度条)

$(document).ajaxStart(function() {
  // 开启进度条
  NProgress.start();
})
$(document).ajaxStop(function() {
  // 模拟网络延迟
  setTimeout(function() {
    // 结束进度条
    NProgress.done();
  }, 500)
})



// 入口函数, 等待当前的 dom 结构, 加载完成后, 执行
$(function() {
  // 公共的功能
  // 1. 左侧二级菜单切换功能
  $('.lt_aside .category').click(function() {
    // 切换 下一个兄弟元素 显示隐藏
    $(this).next().stop().slideToggle();
  })


  // 2. 左边侧边栏切换功能
  $('.icon_menu').click(function() {
    $('.lt_aside').toggleClass("hidemenu");
    $('.lt_topbar').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
  })


  // 3. 退出功能
  // (1) 显示模态框
  $('.icon_logout').click(function() {
    // 让模态框显示show 隐藏 hide
    $('#logoutModal').modal("show");
  });

  // (2) 点击退出按钮, 发送退出请求, 实现退出
  $('#logoutBtn').click(function() {
    // 发送 ajax 请求
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 退出成功, 跳到登陆页
          location.href = "login.html";
        }
      }
    })

  })

})
