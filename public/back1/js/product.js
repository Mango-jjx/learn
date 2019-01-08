
$(function () {
    var currentPage = 1;
    var pageSize = 2;
    var prosrc = [];//创建数组用于存储图片地址
    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            datatype: 'json',
            success: function (info) {
                // console.log(info);
                var htmlStr = template('productTpl', info);
                $('tbody').html(htmlStr);

                // 分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: info.page,//当前页
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

    // 点击添加商品显示模态框
    $('#addpro').click(function () {
        $('#proModal').modal('show');

        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            datatype: 'json',
            success: function (info) {
                // console.log(info);
                var htmlStr = template('ulTpl', info);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    })

    // 点击模态框选择按钮
    $('.dropdown-menu').on('click','a',function(){
        var txt = $(this).text();
        $('.addcate').text(txt);

        var id = $(this).data('id');
        $('[name="brandId"]').val(id);

        $("#form").data('bootstrapValidator').updateStatus("brandId", 'VALID');
    })

    // 多文件图片上传
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        // 多文件是独立上传，每上传成功一次触发一次该事件
        done:function (e, data) {
        //   console.log(data);
            var imgsrc = data.result.picAddr;
            prosrc.unshift(imgsrc);

            $('#imgbox').prepend('<img style="width:100px" src="'+ imgsrc +'" alt="">');

            if(prosrc.length > 3){
                // 删除数组
                prosrc.pop();
                // $('#imgbox img').eq(prosrc.length).remove();
                $('#imgbox img:last-of-type').remove();
            }
            if(prosrc.length == 3){
                // 图片校验成功
                $("#form").data('bootstrapValidator').updateStatus("picArr", 'VALID');
            }
        }
    });

    // 表单验证
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 字段校验
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入库存'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存格式, 必须是非零开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入尺码'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '必须是 xx-xx 的格式, xx为两位的数字, 例如: 36-44'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入原价'
                    },
                    regexp: {
                        regexp: /^\d*$/,
                        message: '必须是数字'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入现价'
                    },
                    regexp: {
                        regexp: /^\d*$/,
                        message: '必须是数字'
                    }
                }
            },
            picArr: {
                validators: {
                    notEmpty: {
                        message: '请上传三张图片'
                    }
                }
            }
        }
    })

    // 表单验证成功
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        var dataform = $('#form').serialize();
        // 数组转为json字符串
        var prostr = JSON.stringify(prosrc);
        dataform += prostr;
        console.log(dataform);

        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:dataform,
            datatype:'json',
            success:function(info){
                console.log(info);
                if(info.success){
                    $('#proModal').modal('hide');
                    currentPage = 1;
                    render();

                    // 重置表单
                    $("#form").data('bootstrapValidator').resetForm(true);
                    $('.addcate').text('请选择二级分类');
                    $('#imgbox img').remove();
                }
            }
        })
    }); 
})