define(['header'], function(header) {
    header.init();
    return {
        init() {
            // 获取数据库的数据进行渲染
            $.ajax({
                url: "http://localhost/www/SECOO/php/listpagedata.php",
                dataType: "json",
                success: function(data) {
                    // console.log(data);
                    let str = '';
                    for (let value of data) {
                        str +=
                            `<a href="http://localhost/www/SECOO/src/detailpage.html?sid=${value.sid}">
                                <div class="products">
                                    <img src="http://a.tbcdn.cn/mw/webapp/fav/img/grey.gif" alt="" data-original="${value.url}" width="640" height="480">
                                    <span class="red">自营</span>
                                    <span class="black">直降</span>
                                    <div class="title">${value.title}</div>
                                    <div class="price">￥${value.price}</div>
                                </div>
                            </a>`;
                    }
                    $('.product-list').html(str);

                    // 页面优化性能：懒加载
                    $(function() {
                        $("img").lazyload();
                    });
                }
            });
        }
    }
});