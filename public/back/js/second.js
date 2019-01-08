$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();

    // 渲染页面
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            datatype: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                var htmlStr = template('sceondTpl', info);
                $('tbody').html(htmlStr);

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
    };

    // 点击添加分类显示模态框
    $('#addBtn').click(function () {
        $('#sceondModal').modal('show');

        // ajax请求模态框的ul数据，点击添加按钮时
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 1000
            },
            datatype: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('ulTpl', info);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    });

    // 给下拉菜单的li-a注册点击事件  事件委托
    $('.dropdown-menu').on('click', 'a', function () {
        var txt = $(this).text();
        // 给模态框的button赋值
        $('.dropdownText').text(txt);

        // 给隐藏域的id赋值
        var id = $(this).data('id');
        $('[name="categoryId"]').val(id);
        // 使表单校验为成功状态
        $("#form").data('bootstrapValidator').updateStatus("categoryId", "VALID")
    });
    
    // 图片预览
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            //   console.log(data);
            var src = data.result.picAddr;
            $('#myBox img').attr('src', src);

            // 给隐藏域赋值地址
            $('[name="brandLogo"]').val(src);
            // 上传成功后，将表单校验修改为成功
            $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }
    });


    // 分类名称校验
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],

        // 图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 字段校验
        fields: {
            brandName: {
                validators: {
                    notEmpty: {
                        message: "二级分类名称不能为空"
                    }
                }
            },
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传图片'
                    }
                }
            }
        }
    });
    
    // 表单校验成功事件
    $('#form').on('success.form.bv',function( e ){
        e.preventDefault();

        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$('#form').serialize(),
            datatype:'json',
            success:function(info){
                // console.log(info);
                if(info.success){
                    $('#sceondModal').modal('hide');
                    currentPage = 1;
                    render();

                    // 重置表单项
                    $('#form').data('bootstrapValidator').resetForm(true);
                    // 重置模态框一级分类和图片
                    $('.dropdownText').text('请输入一级分类');
                    $('#myBox img').attr('src','./images/none.png');
                }
            }
        })
    })
})