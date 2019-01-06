

$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();

    // 渲染表格和分页
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            datatype: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
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

    // 点击添加分类出现模态框
    $('#addcategory').click(function () {
        $('#addModal').modal('show');
    })

    // 表单验证
    $('#form').bootstrapValidator({
        // 字段图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 字段验证
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
    
    // 校验成功事件
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$('#form').serialize(),
            datatype:'json',
            success:function(info){
                // console.log(info);
                // 模态框消失
                $('#addModal').modal('hide');
                
                // 重新渲染首页
                currentPage = 1;
                render();

                // 重置添加分类表单
                $("#form").data('bootstrapValidator').resetForm(true);
            }
        })
    });
})