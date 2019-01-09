
$(function(){
    // 请求左边数据
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        datatype:'json',
        success:function(info){
            // console.log(info);
            var htmlStr = template('leftTpl',info);
            $('.main-left ul').html(htmlStr);

            renderRight(info.rows[0].id);
        }
    });

    // 右边请求数据
    function renderRight( id ){
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

    // 点击左边一级分类事件
    $('.main-left').on('click','a',function(){
        $('.main-left a').removeClass('current');
        $(this).addClass('current');

        // 调用右边请求数据
        // 获取点击a的id
        var id = $(this).data('id');
        renderRight(id);
    })
})