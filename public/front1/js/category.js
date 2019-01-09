
$(function(){
    // 动态渲染左边的
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        datatype:'json',
        success:function(info){
            console.log(info);
            var htmlStr = template('leftTpl',info);
            $('.main-left ul').html(htmlStr);
            // console.log(info.rows[0].id);

            render(info.rows[0].id);
        }
    })
    // 动态渲染右边的
    function render(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            datatype:'json',
            success:function(info){
                // console.log(info);
                var htmlStr = template('rightTpl',info);
                $('.main-right ul').html(htmlStr);
            }
        })
    }

    // 给左边注册点击事件
    $('.main-left ul').on('click','a',function(){
        // alert(1);
        $('.main-left a').removeClass('current');
        $(this).addClass('current');

        // 获取id
        var id = $(this).data('id');
        render(id);
    })
})