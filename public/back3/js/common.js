// 进度条
$(document).ajaxStart(function(){
    NProgress.start();
})
$(document).ajaxStop(function(){
    NProgress.done();
})

$(function(){
    // 左边切换二级分类功能
    $('.category').click(function(){
        $('.child').stop().slideToggle();
    })
    // 点击topbar的icon-left按钮。侧边栏切换隐藏
    $('.icon-left').click(function(){
        $('.lt-aside').toggleClass('hidemenu');
        $('.lt-main').toggleClass('hidemenu');
        $('.lt-topbar').toggleClass('hidemenu');
    })

    // 退出功能，显示模态框
    $('.icon-logout').click(function(){
        $('.modal').modal('show');
    })

    // 退出功能
    $('.logout').click(function(){
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            datatype:'json',
            success:function(info){
            //    console.log(info);
                if(info.success){
                    location.href = "login.html";
                }
            }
        })
    })
})