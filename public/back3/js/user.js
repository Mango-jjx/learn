

$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();

    var currentId;
    var isDelete;

    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            datatype: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('userTpl', info);
                $('tbody').html(htmlStr);

                // 分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: currentPage,//当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    size: "small",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                });
            }
        })
    }

    // 点击启用禁用按钮，模态框显示
    $('tbody').on('click', 'button', function () {
        $('#updateModal').modal('show');

        currentId = $(this).parent().data('id');
        isDelete = $(this).text() == '禁用' ? 0 : 1;
    })

    // 点击模态框中确定按钮功能
    $('#confirm').click(function () {
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id: currentId,
                isDelete: isDelete
            },
            datatype: 'json',
            success: function (info) {
                $('#updateModal').modal('hide');
                render();
            }
        })
    })
})