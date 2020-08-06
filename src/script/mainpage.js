define(['header'], function(header) {
    header.init();
    return {
        init() {
            // 轮播图板块效果
            // 1.获取元素
            const productul = document.querySelector('.product-list');
            // console.log(productul);
            // 2.渲染banner内部的每一个产品信息
            $.getJSON("http://localhost/www/SECOO/json/lunbodata.json", function(data) {
                // console.log(data);
                let str = '';
                for (let value of data) {
                    // console.log(value);
                    str += `
                    <li>
                    <a href="http://item.secoo.com/${value.id}.shtml">
                    <div class="product-img"> <img class="lazyPic" src="${value.img}" style="display: block;">
                    <div class="mask"></div>
                    </div>
                    <div class="product-details">
                    <p class="product-name">${value.brandName}</p>
                    <p class="product-desc">${value.desc}</p>
                    <div class="line"></div>
                    <p class="product-price">￥4,900</p>
                    </div>
                    </a>
                    </li>
                    `;
                }
                // 循环遍历, 每点击一下, 每一个单独的商品位以5为单位滑动
                productul.innerHTML = str;
                let num = 0;
                // 按上一张
                $('.prev').on('click', function() {
                        // Array$('li')
                        num++; //每次倍数靠num判断
                        let maxnum = parseInt($('.product-list li').length / 5)
                        console.log(num, maxnum)

                        let allwidth = $('.product-list li').width() * 5;
                        if (num > maxnum - 2) {
                            num = maxnum - 2;
                        }
                        $('.product-list').stop(true, true).animate({
                            left: `-${num * 1200}`
                        })
                        if (num >= maxnum - 2) {}
                    })
                    // 按下一张
                $('.next').on('click', function() {
                    num--; //每次倍数靠num判断
                    let allwidth = $('.product-list li').width() * 5;
                    $('.product-list').stop(true, true).animate({
                        left: `-${num * 1200}`
                    })
                    if (num < 0) {
                        num = 0;
                    }
                })
            })
        }

    }
    // 添加事件
    let $prev = $('.prev'),
        $next = $('.next');
});