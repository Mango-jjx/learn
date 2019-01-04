$.ajax({
    type:'get',
    url:"/employee/checkRootLogin",
    datatype:"json",
    success:function( info ){
    //    console.log(1);
        console.log(info);
        if(info.error === 400){
            location.href = "login.html";
        }
    }
})