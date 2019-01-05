// 表单校验
$(function () {
    $('form').bootstrapValidator({
        // 字体图标显示
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 字段校验
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度必须为2-6位"
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码必须为6-12位"
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    })

    // 注册表单验证成功事件
    $("form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type:'post',
            url:"/employee/employeeLogin",
            data:$('form').serialize(),
            datatype:'json',
            success:function( info ){
                // console.log(info);
                if(info.success){
                    location.href = "index.html"
                }
                if(info.error === 1000){
                    $("form").data('bootstrapValidator').updateStatus("username", "INVALID", "callback");
                }
                if(info.error === 1001){
                    $("form").data('bootstrapValidator').updateStatus("password", "INVALID", "callback");
                }
            }
        })
    });
    
    // 重置功能
    $('[type="reset"]').click(function(){
        $("form").data('bootstrapValidator').resetForm();
    })
})