/**
 * Created by 54721 on 2019/1/8.
 */
$(function() {

  /*
   我们约定操作的键名: search_list
   以下三句话, 用于在控制台执行, 添加存储假数据
   var arr = ["老奶奶", "老北京", "耐克", "耐克王", "阿迪王" ];
   var jsonStr = JSON.stringify( arr );
   localStorage.setItem( "search_list", jsonStr );
  * */

  // 分析功能:
  // 功能1. 历史记录渲染  (查询)
  // 思路:
  // (1) 获取本地历史存储
  // (2) 获取得到的是 jsonStr, 转成 arr
  // (3) 得到数组, 利用模板引擎渲染即可
  render();

  // 从本地存储中读取历史记录, 转成数组返回
  function getHistory() {
    var jsonStr = localStorage.getItem( "search_list" ) || '[]';
    var arr = JSON.parse( jsonStr ); // 转成数组
    return arr;
  }
  // 获取本地存储的历史记录数组, 通过模板引擎渲染
  function render() {
    var arr = getHistory();
    // 利用模板引擎渲染即可
    var htmlStr = template('searchTpl', { arr: arr });
    $('.lt_history').html( htmlStr );
  }


  // 功能2. 清空历史记录 removeItem
  // 思路:
  // (1) 给清空历史添加点击事件 (事件委托)
  // (2) 调用removeItem清空历史
  // (3) 重新渲染页面
  $('.lt_history').on("click", ".btn_empty", function() {
    // 添加确认框
    // mui.confirm('对话框内容', '对话框标题', ["按钮文本1", "按钮文本2"], function() {});
    mui.confirm( "你确定要清空历史记录吗?", "文星提示", ["取消", "确认"], function( e ) {
      console.log( e );
      // e.index 就是点击的按钮的下标
      if ( e.index === 1 ) {
        // 确认
        // 清空历史
        localStorage.removeItem( "search_list" );
        // 重新渲染
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
  $('.lt_history').on("click", ".btn_delete", function() {

    // 获取存储在自定义属性中的 index
    var index = $(this).data("index");

    // 获取数组
    var arr = getHistory();

    // 根据下标删除数组的对应项
    // splice 会改变原数组
    // splice(start, num, args1, args2, args3 .... );
    // splice(从哪开始, 删几个, 替换的项1, 替换的项2, 替换的项3, ...... )
    // 删除某项, arr.splice( index, 1 );
    arr.splice( index, 1 );

    // 将数组转成 jsonStr, 存储到本地
    localStorage.setItem( "search_list", JSON.stringify( arr ) );

    // 重新渲染
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
  $('.search_btn').click(function() {

    var key = $('.search_input').val().trim(); // 获取搜索关键字
    if ( key === "" ) {
      mui.toast("请输入搜索关键字");
      return;
    }

    // 获取数组
    var arr = getHistory();

    // 1. 如果有重复项, 先把重复项删掉
    var index = arr.indexOf(key);
    if ( index !== -1 ) {
      // 找到了, 有重复项, 删除该项
      arr.splice( index, 1 );
    }

    // 2. 如果长度太长, 如果超过 10 条, 删掉最后一个
    if ( arr.length >= 10 ) {
      arr.pop();
    }

    // 往数组最前面追加
    arr.unshift( key );

    // 转成jsonStr, 将数组存储到本地
    localStorage.setItem( "search_list", JSON.stringify( arr ) );

    // 重新渲染
    render();

    // 清空 input
    $('.search_input').val("");
  })

})
