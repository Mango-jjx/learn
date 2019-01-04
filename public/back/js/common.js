// 进度条
$(function(){
    $(document).ajaxStart(function(){
        NProgress.start();
    })
    
    $(document).ajaxStop(function(){
        setTimeout(function(){
            NProgress.done();
        },5000)
    })
})

// 首页公共部分
$(function(){
    // 左边二级切换
    $('.category').click(function(){
        $(this).next().stop().slideToggle();
    })

    // 右边topbar切换功能
    $('.icon-menu').click(function(){
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');
        $('.lt_topbar').toggleClass('hidemenu');
    })
    
    // 点击显示模态框
    $('.icon-logout').click(function(){
        // console.log(1);
        $('#myModal').modal('show');
    })
    // 退出功能
    $('#logoutBtn').click(function(){
        $.ajax({
            type:'get',
            url:"/employee/employeeLogout",
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