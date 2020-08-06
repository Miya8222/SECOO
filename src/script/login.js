;
! function($) {
    let $username = $('#username'),
        $usererr = $('.usererr'),
        $password = $('#password'),
        $passerr = $('.passerr'),
        $passagain = $('#passagain'),
        $againerr = $('.againerr'),
        $yzm = $('#yzm'),
        $yzmerr = $('.yzmerr'),
        $huan = $('.huan'),
        $btn = $('.btn'),
        $agree = $('.agree'),
        $huantext = $('.huantext'),
        $submit = $('.submit'),
        $form = $('.form');

    // tab切换决定登录内容
    $('.login_tab div').on('click', function() {
        $(this).addClass('active').siblings('div').removeClass('active');
        var index = $(this).index();
        switch (index) {
            case 0:
                $(".QRcode").css('display', 'block');
                $('.pass_login').css('display', 'none');
                break;
            case 1:
                $('.QRcode').css('display', 'none');
                $(".pass_login").css('display', 'block');
                break;
        }
    })

    // 密码登录-表单初级验证
    $username.on('blur', function() {
        if ($username.val() !== '') {
            let usernameReg = /^[0-9A-Za-z_\u4e00-\u9fa5]+$/;
            let strlength = $username.val().length;
            if (strlength >= 3 && strlength <= 6) {
                if (usernameReg.test(this.value)) {
                    // console.log(this.value)
                    $usererr.html('');
                    $username.css("borderColor", "");
                    usernameflag = true;
                } else {
                    $usererr.html('请输入符合规范的用户名');
                    $username.css("borderColor", "#be002f");
                    usernameflag = false;
                }
            } else if (strlength < 3) {
                $usererr.html('用户名长度不够');
                $username.val("");
                $username.css("borderColor", "#be002f");
                usernameflag = false;
            } else {
                $usererr.html('用户名长度超出');
                $username.val("");
                $username.css("borderColor", "#be002f");
                usernameflag = false;
            }
        } else {
            $usererr.html('用户名不能为空');
            $username.css("borderColor", "#be002f");
            usernameflag = false;
        }
    })

    // 点击登录，用户名密码核实
    // btn.onclick = function() {
    //     $ajaxpromise({
    //         type: 'post',
    //         url: 'http://localhost:8088/JS2004/Day%2024_cookie/login&registry/php/login.php',
    //         data: {
    //             name: user.value,
    //             pass: hex_sha1(pass.value)
    //         }
    //     }).then(function(data) {
    //         if (!data) {
    //             alert('用户名或者密码错误');
    //             pass.value = '';
    //         } else {
    //             cookie.set('username', user.value, 7); //存储用户名
    //             location.href = "index.html"; //首页
    //         }
    //     })
    // }

    $submit.on('click', function() {
        $.ajax({
            url: "http://localhost/www/SECOO/php/login.php",
            type: 'post',
            dataType: 'json',
            data: {
                username: $username.val(),
                password: $username.val()
            },
            success: function(data) {
                console.log(data);
                if (!data) {
                    alert('用户名或者密码错误');
                    $username.val();
                    $password.val();
                } else {
                    // return false;
                    $.cookie('$username', $username.val(), 15);
                    location.href = "http://localhost/www/SECOO/src/mainpage.html"; //首页
                }
            }
        });
    })

    // 密码登录-验证码
    $.idcode.setCode(); //加载生成验证码方法
    $yzm.on('blur', function() {
        if ($yzm.val() !== '') {
            var IsBy = $.idcode.validateCode() //调用返回值，返回值结果为true或者false
            if (IsBy) {
                $yzmerr.html('');
                // yzmflag = true;
            } else {
                $yzmerr.html('验证码错误 请注意大小写');
                // yzmflag = false;
            }
        } else {
            $yzmerr.html('验证码不能为空');
            $yzm.css("borderColor", "#be002f");
            // yzmflag = false;
        };
    })
    $huantext.on('click', function() {
        $.idcode.setCode(); //加载生成验证码方法
    })
}(jQuery);