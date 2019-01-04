// 进度条
$(function(){
    $(document).ajaxStart(function(){
        NProgress.start();
    })
    
    $(document).ajaxStop(function(){
        setTimeout(function(){
            NProgress.done();
        },5000)
    })
})