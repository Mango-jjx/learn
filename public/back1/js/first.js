

$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();

    function render() {
        $.ajax({
            type: 'get',
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            datatype: 'json',
            success: function (info) {
                // console.log(info);
                var htmlStr = template('firstTpl', info);
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

    // 添加分类
    $('#addcate').click(function () {
        $('#addModal').modal('show');
    })

    // 表单验证
    $('#form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 校验字段
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '一级分类名称不能为空'
                    }
                }
            }
        }
    })

    // 表单验证成功
    $('#form').on('success.form.bv', function (e) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $('#form').serialize(),
            datatype: 'json',
            success: function (info) {
                // console.log(info);
                $('#addModal').modal('hide');
                currentPage = 1;
                render();

                $("#form").data('bootstrapValidator').resetForm(true);
            }
        })
    })

})