import '@/index.html'
import '@/assets/scss/index.scss'

// import '@/assets/scss/select.css'

import obj from '@/assets/js'
obj.init()


;(function (win) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var tid;
    function refreshRem () {
        var width = docEl.getBoundingClientRect().width;
        if (width > 480) {
            width = 480;
        }
        var rem = width / 750 * 100;
        docEl.style.fontSize = rem + 'px';
    }
    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);
    refreshRem();
})(window);

