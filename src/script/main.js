require.config({
    paths: {
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
        'lazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload',
        'cookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie'
    },
    shim: {
        'lazyload': {
            deps: ['jquery'],
            exports: '$.lazyload'
        },
        'cookie': {
            deps: ['jquery'],
            exports: '$.cookie'
        }
    }
});

require(['jquery', 'lazyload', 'cookie'], function($) { //加载jquery
    let modname = $('#currentpage').attr('current');
    if (modname) {
        require([modname], function(modname) {
            modname.init();
        })
    }
});