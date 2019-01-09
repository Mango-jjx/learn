
$(function () {
    // 渲染
    render();

    function getHistory() {
        // 获取本地存储数据
        var jsonStr = localStorage.getItem('search_list') || '[]';
        var arr = JSON.parse(jsonStr);
        return arr;
    }

    function render() {
        var arr = getHistory();
        var htmlStr = template('historyTpl', { arr: arr });
        $('.main-history').html(htmlStr);
    }

    // 点击清空历史，清空
    $('.main-history').on('click','.btn-empty',function(){
        mui.confirm('您确定要清空历史记录嘛','温馨提示',['取消','确定'],function(e){
            // console.log(e);
            if(e.index === 1){
                localStorage.removeItem('search_list');
                render();
            }
        })
    })

    // 删除单个
    $('.main-history').on('click','.btn-delete',function(){
        // 获取点击删除的项
        var index = $(this).data('index');
        var arr = getHistory();
        arr.splice(index , 1);
        localStorage.setItem('search_list',JSON.stringify(arr));
        render();
    })

    /*
  * 功能4. 添加单个历史记录功能
  * 思路:
  *   (1) 给搜索按钮, 添加点击事件
  *   (2) 获取搜索框的内容, 往数组最前面追加  unshift
  *   (3) 转成jsonStr, 将数组存储到本地
  *   (4) 页面重新渲染
  * */
   $('.btn-search').click(function(){
    //    alert(1);
    //    获取表单数据
        var txt = $('.ipt').val().trim();
        if(txt === ''){
            mui.toast('请输入搜索内容');
            return;
        }

        var arr = getHistory();

        // 去重
        var index = arr.indexOf(txt);
        if(index !== -1){
            arr.splice(index,1);
        }
        // 限制长度
        if(arr.length >= 10){
           arr.pop();
        }
    
        arr.unshift(txt);
        localStorage.setItem('search_list',JSON.stringify(arr));
        render();

        // 重置图片
        $('.ipt').val('');
   })

})