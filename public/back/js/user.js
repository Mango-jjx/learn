
$(function () {
    var currentId;
    var isDelete;

    var currentPage = 1;
    var pageSize = 5;

    render(currentPage, pageSize);

    function render(currentPage, pageSize) {
        // 渲染表格
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                var htmlStr = template('userTpl', info);
                $('tbody').html(htmlStr);

                // 分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: currentPage,//当前页
                    totalPages: Math.ceil(info.total/info.size),//总页数
                    size: "small",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (a, b, c, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        //   让当前分页等于点击的分页
                        currentPage = page;
                        //   重新渲染
                        render(currentPage, pageSize);
                    }
                });
            }
        })
    }

    // 禁用，启用按钮点击事件
    $('tbody').on('click', 'button', function () {
        // alert(1);
        // 显示模态框
        $('#updateModal').modal('show');

        currentId = $(this).parent().data('id');
        isDelete = $(this).text() == '禁用' ? 0 : 1;
        // console.log(isDelete);

    })
    // 点击模态框确认按钮，发送ajax
    $('#confrim').click(function () {
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            datatype: 'json',
            data: {
                id: currentId,
                isDelete: isDelete
            },
            success: function (info) {
                // console.log(info);
                // 模态框隐藏
                $('#updateModal').modal('hide');
                // 重新渲染页面
                render(currentPage, pageSize);
            }
        })
    })



})