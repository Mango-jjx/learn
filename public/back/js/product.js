
$(function () {
    var currentPage = 1;
    var pageSize = 2;
    var prosrc = [];//用于存储图片的地址
    render();

    // 页面渲染
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
    $('#proAdd').click(function () {
        $('#productModal').modal('show');

        // 请求模态框ul数据
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
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

    // 点击选择二级分类事件
    $('.dropdown-menu').on('click', 'a', function () {
        var txt = $(this).text();
        $('.procate').text(txt);

        // 给隐藏域赋值
        var id = $(this).data('id');
        $('[name="brandId"]').val(id);

        // 表单验证状态改为成功
        $("#form").data('bootstrapValidator').updateStatus('brandId', 'VALID');
    })

    // 表单校验
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],
        // 图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 校验字段
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '二级分类商品名称不能为空'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '二级分类商品描述不能为空'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '二级分类商品库存不能为空'
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
                        message: '二级分类商品尺码不能为空'
                    },
                    regexp: {
                        regexp: /^(\d{2})-(\d{2})*$/,
                        message: '必须是 xx-xx 的格式, xx为两位的数字, 例如: 36-44'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '二级分类商品原价不能为空'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '二级分类商品现价不能为空'
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

    // 多图片文件预览
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            // console.log(data.result.picAddr);
            // 图片的地址
            var imgsrc = data.result.picAddr;
            prosrc.unshift(imgsrc);
            // console.log(prosrc);

            // 给imgbox创建添加图片
            $('#imgbox').prepend('<img style="width:100px" src="' + imgsrc + '" alt="">');

            // 如果数组中图片地址超过3张，删除最后一张
            if (prosrc.length > 3) {
                // 删除数组中数据
                prosrc.pop();
                // console.log(prosrc);
                // 删除图片
                $('#imgbox img').eq(prosrc.length - 1).remove();
            }

            if (prosrc.length == 3) {
                $("#form").data('bootstrapValidator').updateStatus('picArr', 'VALID');

                // 将数组转为json格式字符串
                var picstr = JSON.stringify(prosrc);

                // 给前面隐藏域赋值
                $('[name="picArr"]').val(picstr);
                // console.log($('#form').serialize());
            }
        }
    });

    // 表单校验成功事件
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: $('#form').serialize(),
            datatype: 'json',
            success: function (info) {
                // console.log(info);
                $('#productModal').modal('hide');
                currentPage = 1;
                render();

                // 重置表单
                $("#form").data('bootstrapValidator').resetForm(true);
                $('#imgbox img').remove();
                $('.procate').text('请选择二级分类');

            }
        })
    });

})