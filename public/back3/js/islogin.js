// 登录拦截
$.ajax({
    type:'get',
    url:"/employee/checkRootLogin",
    datatype:'json',
    success:function(info){
        // console.log(info);
        if(info.error === 400){
            location.href = "login.html";
        }
    }
})