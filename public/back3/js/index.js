$(function () {

    // 1、柱形图
    // 基于准备好的dom，初始化echarts实例
    var echartsleft = echarts.init(document.querySelector('.echarts-left'));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '2019年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数','销量']
        },
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [50, 200, 36, 100, 10, 20]
        },{
            name: '销量',
            type: 'bar',
            data: [50, 200, 360, 10, 10, 209]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echartsleft.setOption(option1);

    // 2、饼图
    var echartsright = echarts.init(document.querySelector('.echarts-right'));

    // 指定图表的配置项和数据
    var option2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2019年1月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','老奶奶','老北京','匡威']
        },
        series : [
            {
                name: '热销品牌',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'老奶奶'},
                    {value:135, name:'老北京'},
                    {value:1548, name:'匡威'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 50,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    echartsright.setOption(option2);
})