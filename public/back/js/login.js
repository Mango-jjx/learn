
// 验证
$(function(){
    // 使用表单校验插件
    $('form').bootstrapValidator({

        // 校验时的图标显示
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 指定校验字段
        fields:{
            // 用户名校验
            username:{
                validators:{
                    //不能为空
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    // 长度校验
                    stringLength:{
                        min:2,
                        max:6,
                        message:'用户名长度必须在2-6位之间'
                    },
                    callback:{
                        message:"用户名不存在"
                    }
                }
            },
            // 密码校验
            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码必须是6-12位"
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        }
    })
})

// 进行登录请求
// 表单验证成功事件
$("form").on('success.form.bv', function (e) {
    // 阻止submit跳转
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
        type:"post",
        url:"/employee/employeeLogin",
        datatype:'json',
        data:$('form').serialize(),
        success:function( info ){
            // console.log(info);
            if(info.error === 1000){
                // $("form").data('bootstrapValidator')  获取表单校验实例
                // alert('用户名不存在')
                $("form").data('bootstrapValidator').updateStatus('username','INVALID','callback');
            }
            if(info.error === 1001){
                // alert('密码错误');
                $("form").data('bootstrapValidator').updateStatus('password','INVALID','callback');
            }
            if(info.success){
                location.href = "index.html";
            }
        }
    })
});

// 重置功能
$('[type="reset"]').click(function(){
    console.log(111);
    // 重置状态，重置内容reset本身就有
    $("form").data('bootstrapValidator').resetForm();
})



