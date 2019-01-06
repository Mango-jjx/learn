

$(function () {
    // 进度条
    $(document).ajaxStart(function () {
        // console.log(1);
        NProgress.start();
    })
    $(document).ajaxStop(function () {
        setTimeout(function () {
            NProgress.done();
        }, 500)

    })

    // 点击分类管理出现二级菜单
    $('.category').click(function () {
        $('.child').slideToggle();
    })

    // 点击topbar的icon-left左侧切换显示影藏
    $('.icon-left').click(function () {
        $('.lt-aside').toggleClass('hidemenu');
        $('.lt-main').toggleClass('hidemenu');
        $('.lt-topbar').toggleClass('hidemenu');
    })

    // 点击topbar的icon-right退出功能
    $('.icon-logout').click(function () {
        // 显示模态框
        $('#myModal').modal('show');
    })

    // 点击模态框的退出按钮退出
    $('.logout').click(function () {
        // alert(1);
        $.ajax({
            type: 'get',
            url: "/employee/employeeLogout",
            datatype: 'json',
            success: function (info) {
                if (info.success) {
                    location.href = "login.html";
                }
            }
        })
    })
})