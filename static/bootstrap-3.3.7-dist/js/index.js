window.onload = function () {
    // 获取浏览器大小
    // var html_width = document.body.clientWidth;
    // var html_height = window.innerHeight;
    // var body_height = document.body.scrollHeight;
    // // 判断 浏览器最大的显示高度
    // if (html_height < body_height) {
    //     html_height = body_height;
    // }
    //
    // // 更改背景大小
    // console.log('页面高度：' + html_height);
    // document.getElementById('de_canvas').style.height = html_height + 'px';
    // // document.getElementById('de_canvas').style.width= html_width + 'px';
    //
    // // 搜索框页面垂直居中
    // // del_height 减去多余的高度
    // function div_position(del_height) {
    //
    //     $("#content_box").css({
    //         position: "absolute",
    //         left: ($(window).width() - $("#content_box").outerWidth()) / 2,
    //         top: (html_height - $("#content_box").outerHeight()) / 2 - 100 - del_height
    //     });
    // }
    //
    //
    // // $(window).resize(function () {
    // //     $("#content_box").css({
    // //         position: "absolute",
    // //         left: ($(window).width() - $("#content_box").outerWidth()) / 2,
    // //         top: (html_height - $("#content_box").outerHeight()) / 2 - 100
    // //     });
    // // });
    // $(window).resize(div_position(0));

    // 点击搜索触发ajax
    $("#botton_go").click(function () {
        var search_msg = $('#search_input').val();
        search(search_msg)
    });

    // 失去焦点 触发ajax
    $("#search_input").blur(function () {
        var search_msg = $('#search_input').val();
        search(search_msg)
    });

    // 失去焦点 触发ajax
    $("#search_input").keyup(function () {
        var search_msg = $('#search_input').val();
        search(search_msg)
    });

    // 输入内容 触发ajax
    $("#search_input").keyup(function () {
        var search_msg = $('#search_input').val();
        search(search_msg)
    });

    function search(search_msg) {
        console.log(search_msg);
        $.ajax({
            type: 'POST',
            url: '',
            data: {'search_msg': search_msg, 'csrfmiddlewaretoken': $("[name='csrfmiddlewaretoken']").val()},
            // headers:{"X-CSRFToken":$("[name='csrfmiddlewaretoken']").val()},
            // contentType: 'application/json',
            success: suc,
            error: function () {
                console.log('验证错误')
            },
        });
    }

    //  请求成功执行的函数
    function suc(request) {
        // console.log(request);
        var json_data = JSON.parse(request)['json_data'];

        if (json_data == null) {
            // 没有数据
            // $('#search_show').show();
            console.log('没有返回数据');
            nullshowserch();

        } else if (json_data == '') {
            // 没有数据
            // $('#search_show').show();
            console.log('没有返回数据');
            nullshowserch();
        } else {
            // 展示数据
            // console.log('返回结果：\n' + json_data);
            $('#search_show').show();
            showserch(json_data)
        }
    }

    // 展示数据内容
    function showserch(json_data) {
        // var _html = '<ol class="list-unstyled">';
        var _html = '<ol>';
        for (var i = 0; i < json_data.length; i++) {
            var rule_name = json_data[i][0];  // 模版名字
            var web_name = json_data[i][1];  // 网站名称
            var domain_name = json_data[i][2];  // 域名
            var url = json_data[i][3]; //链接
            var li_msg = '<li class="text-muted"><strong><a href="' + url +
                '">' + web_name +
                '&nbsp;/&nbsp;' + domain_name + '</a></strong>&nbsp;&nbsp;&nbsp;' + rule_name + '</li>';
            _html += li_msg
        }
        _html += '</ol>';
        $('#search_show').html(_html);
        $('#search_show').show();
    }

    // 提示没有数据内容
    function nullshowserch() {
        var _html = '<span class="glyphicon glyphicon-exclamation-sign text-left" aria-hidden="true"></span>' +
            '<span class="sr-only text-left">Error:</span>' +
            '&nbsp;NULL&nbsp;ヾ(×× ) ﾂ，没搜索到！';
        $('#search_show').html(_html);
        $('#search_show').css({'color': '#a94442'});
        $('#search_show').show();

        // var height_search_show = $('#search_show').innerHeight();  // 获取显示div的高度
        // $(window).resize(div_position(height_search_show));  // 保持搜索所在位置

    }
    // function switch_bg(){
    //     var bg_index = Math.floor(Math.random()*5+1);
    //     $('#de_canvas').attr('src', '/static/bootstrap-3.3.7-dist/js/a'+ bg_index +'.html')
    //     // alert(bg_index)
    // }
    // setInterval(switch_bg, 1000)
};

// document.addEventListener("DOMContentLoaded", function () {
//     document.body.style.display = 'block';
// });

