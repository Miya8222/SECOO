define([], function() {
    return {
        init() {
            // 获取商品列表页返回的数据，主要得到id
            let sid = location.search.substring(1).split('=')[1];
            // console.log(sid);
            $.ajax({
                url: 'http://localhost/www/SECOO/php/getsid.php',
                data: {
                    sid: sid
                },
                datatype: 'json',
                success: function(data) {
                    data = JSON.parse(data);
                    // console.log(data);
                    // 渲染大图图片、标题、价格、颜色
                    $(".small-pic img").attr("src", `${data.url}`);
                    $('.product-name h2').html(`${data.title}`);
                    $('.price').html(`${data.price}`)
                    $('.color1 img').attr("src", `${data.url}`);
                    $('.color2 img').attr("src", `${data.url}`);

                    // 给左侧区域渲染照片
                    let $spicshowlist = data.piclisturl.split(',');
                    $.each($spicshowlist, function(index, value) {
                        // console.log(index, value)
                        $($('.show-pic img')[index]).attr("src", `${value}`);
                    })

                    // 给图片展示区添加hover事件
                    $('.pic-l img').each(function(i) {
                        $(this).hover(function() {
                            let url = $(this).attr("src");
                            $('.small-pic img').attr("src", url);

                        }, function() {
                            $('.small-pic img').attr("src", `${data.url}`);
                        })
                    })

                    // 放大镜效果
                    // 鼠标移进
                    $('.small-pic').on('mouseenter', function() {
                        $('.bigger').show();
                        $('#wavepoint').show();
                        let url = `${data.url}`;
                        $('.bigger img').attr('src', url)
                            // $(".small-pic img").attr("src", `${data.url}`);

                        // 鼠标移动
                        $(this).on('mousemove', function(ev) {
                            ev = ev || window.event;
                            let x = ev.pageX - $(this).offset().left - parseInt($('#wavepoint').css('width')) / 2,
                                y = ev.pageY - $(this).offset().top - parseInt($('#wavepoint').css('height')) / 2;
                            // console.log(x, y)
                            // 控制左右边界
                            if (x <= 0) {
                                x = 0;
                            } else if (x > parseInt($(this).css('width')) - parseInt($('#wavepoint').css('width'))) {
                                x = parseInt($(this).css('width')) - parseInt($('#wavepoint').css('width'))
                            }
                            // 控制上下边界
                            if (y <= 0) {
                                y = 0;
                            } else if (y > parseInt($(this).css('height')) - parseInt($('#wavepoint').css('height'))) {
                                y = parseInt($(this).css('height')) - parseInt($('#wavepoint').css('height'))
                            }
                            $('#wavepoint').css({ top: y, left: x });

                            // 随着鼠标移动，右侧放大区域相对移动
                            // 计算波点的真实宽高
                            let swidth = parseInt($('.bigger').css('width')) * parseInt($('.small-box img').css('width')) / parseInt($('.bigger img').css('width'));
                            $('#wavepoint').css('width', swidth);
                            $('#wavepoint').css('height', swidth);
                            // console.log(swidth);
                            // 计算比例：大图/小图 = 大放/小放 
                            let ratio = parseInt($('.bigger img').css('width')) / parseInt($('.small-pic img').css('width'));
                            xx = -ratio * parseInt($('#wavepoint').css('left'));
                            yy = -ratio * parseInt($('#wavepoint').css('top'));
                            $('.bigger img').css('left', xx);
                            $('.bigger img').css('top', yy);
                        })
                    })

                    //鼠标移除
                    $('.small-pic').on('mouseleave', function() {
                        $('.bigger').hide();
                        $('#wavepoint').hide();
                    })
                }
            })

            // 购物车核心思想，利用cookie存储实现，需要知道商品id与数量
            // 定义两个空数组，分别存放id和num
            // 点击加入购物车,先判断是否首次购买，如果首次购买，存入cookie并加入数组，非首次购买当前num+加新增num
            // 设置cookie key分别为cookiesid/cookienum
            let sidbox = [],
                numbox = [];

            function cookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    sidbox = $.cookie('cookiesid').split(',');
                    // console.log(sidbox)
                    numbox = $.cookie('cookienum').split(',');
                    // console.log(numbox)
                } else {
                    sidbox = [];
                    numbox = [];
                }
            }
            $('.btn-jiaru a').on('click', function() {
                cookietoarray()
                if (sidbox.indexOf(sid) === -1) {
                    sidbox.push(sid);
                    numbox.push($('.input').val());
                    $.cookie('cookiesid', sidbox.toString(), { expires: 7 });
                    $.cookie('cookienum', numbox.toString(), { expires: 7 });
                } else {
                    let num = sidbox.indexOf(sid); //indexof返回所在位置
                    numbox[num] = parseInt(numbox[num]) + parseInt($('.input').val());
                    $.cookie('cookienum', numbox.toString(), { expires: 7 });
                    console.log(sidbox, numbox);
                }
            })
        }
    }
})