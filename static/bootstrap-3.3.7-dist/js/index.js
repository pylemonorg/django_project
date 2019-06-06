window.onload = function () {
    // 修改背景大小
    var html_width = document.body.clientWidth;
    var html_height = window.innerHeight;
    var body_height = document.body.scrollHeight;
    if (html_height < body_height) {
        html_height = body_height;
    }

    console.log(html_height);
    document.getElementById('de_canvas').style.height = html_height + 'px';
    // document.getElementById('de_canvas').style.width= html_width + 'px';

    // 搜索框页面垂直居中
    $(window).resize(function () {
        $("#content_box").css({
            position: "absolute",
            left: ($(window).width() - $("#content_box").outerWidth()) / 2,
            top: (html_height - $("#content_box").outerHeight()) / 2 - 100
        });
    });
    $(window).resize();

    $("#botton_go").click(function () {
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
        console.log(request);
        var json_data = JSON.parse(request)['json_data'];

        if (json_data == null) {
            // 没有数据
            $('#search_show').show();
            console.log('没有返回数据');
            nullshowserch();

        } else {
            // 展示数据
            console.log('返回结果：\n' + json_data);
            $('#search_show').show();
            showserch(json_data)
        }
    }

    // 展示数据内容
    function showserch(json_data) {
        var _html = '<ul class="list-unstyled">';
        for (var i = 0; i < json_data.length; i++) {
            var rule_name = json_data[i][0];  // 模版名字
            var domain_name = json_data[i][1];  // 域名
            var url = json_data[i][2];  // 域名地址
            var li_msg = '<li>' + rule_name + '&nbsp;' + domain_name + url + '</li>';
            _html += li_msg
        }
        _html += '</ul>';
        $('#search_show').show();
        $('#search_show').html(_html);
    }

    // 提示没有数据内容
    function nullshowserch() {
        var _html = '<span class="glyphicon glyphicon-exclamation-sign text-left" aria-hidden="true"></span>' +
            '<span class="sr-only text-left">Error:</span>' +
            '&nbsp;很绝望&nbsp;ヾ(×× ) ﾂ，没搜索到！';
        $('#search_show').html(_html);
        $('#search_show').css({'color': '#a94442'});
    }
};