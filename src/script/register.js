;
! function() {
    // 一、表单验证部分
    // 1.获取元素
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

    let usernameflag = false,
        yzmflag = false,
        passwordflag = false,
        passagainflag = false,
        agreeflag = false;

    // $username验证规则分为两个部分：
    // 1.长度为3-6位数字字母下划线汉字
    // 2.查询数据库是否已被注册
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

        $.ajax({
            url: "http://localhost/www/SECOO/php/registry.php",
            type: 'post',
            dataType: 'json',
            data: {
                name: $username.val()
            },
            success: function(data) {
                // console.log(data)
                if (!data) { //可以注册
                    console.log(1);
                    $usererr.val("可以注册");
                    $username.css("borderColor", "");
                    usernameflag = true;
                } else { //用户名重名。
                    console.log(data);
                    $usererr.html('该用户名已被注册');
                    $username.css("borderColor", "#be002f");
                    usernameflag = false;
                }
            }
        });
    })

    // 密码验证规则：数字,字母(大小写),特殊字符6-18位
    // 弱：一种字符。不允许注册。
    // 中：二种或者三种字符。
    // 强：四种字符。
    $password.on('input', function() {
        let passlength = $password.val().length;
        if ($password.val() !== '') {
            if (passlength >= 6 && passlength <= 18) {
                var regnum = /\d+/,
                    reglower = /[a-z]/,
                    regupper = /[A - Z]/,
                    regspecial = /\W+/,
                    count = 0;
                if (regnum.test(this.value)) {
                    count++;
                }
                if (reglower.test(this.value)) {
                    count++;
                }
                if (regupper.test(this.value)) {
                    count++;
                }
                if (regspecial.test(this.value)) {
                    count++;
                }
                switch (count) {
                    case 1:
                        $passerr.html('强度弱 请重新输入');
                        $password.css("borderColor", "#be002f");
                        passwordflag = false;
                        break;
                    case 2:
                    case 3:
                        $passerr.html('');
                        $passerr.html('强度中');
                        $password.css("borderColor", "");
                        passwordflag = true;
                        break;
                    case 4:
                        $passerr.html('强度强');
                        $password.css("borderColor", "");
                        passwordflag = true;
                        break;
                }
            } else {
                $passerr.html('密码长度位6-18位');
                $password.css("borderColor", "#be002f");
            }
        } else {
            $passerr.html('密码不能为空');
            $password.val('');
            $password.css("borderColor", "#be002f");
            passwordflag = false;
        }
    })
    $password.on('blur', function() {
        if (this.value !== '') {} else {
            $passerr.html('密码不能为空');
            $password.css("borderColor", "#be002f");
            passwordflag = false;
        };
    })

    // 密码确认
    $passagain.on('input', function() {
        if (this.value === $password.val()) {
            $againerr.html('');
            $passagain.css("borderColor", "");
            passagainflag = true;
        } else {
            $againerr.html('两次密码不一致');
            $passagain.css("borderColor", "#be002f");
            passagainflag = false;
        }
    })
    $passagain.on('blur', function() {
        if ($passagain.val() !== '') {} else {
            $againerr.html('确认密码不能为空');
            $passagain.css("borderColor", "#be002f");
            passagainflag = false;
        };
    })

    // 验证码
    $.idcode.setCode(); //加载生成验证码方法
    $yzm.on('blur', function() {
        if ($yzm.val() !== '') {
            var IsBy = $.idcode.validateCode() //调用返回值，返回值结果为true或者false
            if (IsBy) {
                $yzmerr.html('');
                yzmflag = true;
            } else {
                $yzmerr.html('验证码错误 请注意大小写');
                yzmflag = false;
            }
        } else {
            $yzmerr.html('验证码不能为空');
            $yzm.css("borderColor", "#be002f");
            yzmflag = false;
        };
    })
    $huantext.on('click', function() {
        $.idcode.setCode(); //加载生成验证码方法
    })

    // 复选框状态
    $agree.on('click', function() {
        if ($('.agree').prop('checked')) {
            agreeflag = true;
        } else {
            agreeflag = false;

        }
    })


    // 点击按钮进行表单验证,规则全部验证通过才能注册成功
    $form.submit(function(ev) {
        if ($username.val() == '') {
            $usererr.html('用户名不能为空');
            $username.css("borderColor", "#be002f");
        }
        if ($password.val() == '') {
            $passerr.html('密码不能为空');
            $password.css("borderColor", "#be002f");
        }
        if ($passagain.val() == '') {
            $againerr.html('确认密码不能为空');
            $passagain.css("borderColor", "#be002f");
        }
        if ($yzm.val() == '') {
            $yzmerr.html('验证码不能为空');
            $yzm.css("borderColor", "#be002f");
        }
        if (!passwordflag || !passagainflag || !yzmflag || !agreeflag || !usernameflag) {
            console.log(1);
            // ev.preventDefault();
            return false;
        }
    })
}();