define(['jquery'], function($) {
    return {
        init() {
            // 1.获取元素
            let $menuli = $('.nav-item'), //一级目录列表
                $libox = $('.nav-unfold'), //二级目录大盒子
                $list = $('.unfold-list'); //二级目录装数据的盒子
            ;

            // 2.鼠标移入时，盒子显示
            $menuli.on('mouseover', function() {
                $libox.show();
                // console.log($(this).find('.tit'));
                // 给菜单添加划过颜色变白的效果
                $(this).find('.tit').addClass('active').append("<i></i>");
                $(this).siblings('li').find('.tit').removeClass('active');
                // 这个菜单按钮对应的内容板块显示
                $(this).find('.unfold-list').show();
                $(this).siblings('li').find('.unfold-list').hide();
            })

            // 3.鼠标移出时，盒子隐藏
            $menuli.on('mouseout', function() {
                $libox.hide();
                $(this).find('.tit').removeClass('active');
            })

            // 点击二级菜单中男士包袋，跳转到列表页
            $('.jump').on('click', function() {
                location.href = "http://localhost/www/SECOO/src/listpage.html"
            })

        }
    }
});