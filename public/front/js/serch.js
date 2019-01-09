// 分析功能:
// 功能1. 历史记录渲染  (查询)
// 思路:
// (1) 获取本地历史存储
// (2) 获取得到的是 jsonStr, 转成 arr
// (3) 得到数组, 利用模板引擎渲染即可

//   我们约定操作的键名: search_list

$(function () {
    render();
    function getHistory() {
        //   从本地获取历史数据
        var jsonStr = localStorage.getItem('search_list') || '[]';
        // 将json字符串转为数组
        var arr = JSON.parse(jsonStr);
        // console.log(arr);

        return arr;
    }

    function render() {
        var arr = getHistory();
        // console.log(arr);
        var htmlStr = template('historyTpl', { arr: arr });
        $('.lt-history').html(htmlStr);
    }


    // 功能2. 清空历史记录 removeItem
    $('.lt-history').on('click', '.btn-empty', function () {
        // alert(1);
        mui.confirm('你确定要清空历史记录吗?', '温馨提示', ['取消', '确认'], function (e) {
            console.log(e);
            if (e.index == 1) {
                localStorage.removeItem('search_list');
                render();
            }
        })
    })

    /*
  * 功能3. 删除单个
  * 思路:
  *   (1) 给所有的删除按钮, 添加点击事件 (事件委托)
  *   (2) 获取要删除项的下标, 根据下标删除数组的对应项
  *   (3) 得到新数组后, 将新数组转成 jsonStr, 存储到本地
  *   (4) 重新渲染
  * */
    $('.lt-history').on('click','.btn-delete',function(){
        // 获取点击的index
        var index = $(this).data('index');
        // 获取本地存储数组
        var arr = getHistory();
        // 删除点击的那一项
        arr.splice(index , 1);

        // 将新数组转为json字符串传入本地重新渲染
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
    $('.btn-serch').click(function(){
        // alert(1);
        var txt = $('.serch-ip').val().trim();
        if(txt == ''){
            mui.toast('请输入搜索关键字');
            return;
        }
        // 获取数组
        var arr = getHistory();

        // 添加之前去重
        var index = arr.indexOf(txt);
        if(index !== -1){
            arr.splice(index , 1)
        }
        // 限制长度
        if(arr.length >= 10){
            arr.pop();
        }

        // 往数组添加数据
        arr.unshift(txt);
        localStorage.setItem('search_list',JSON.stringify(arr));
        render();

        // 清空input框
        $('.serch-ip').val('');
    })
})