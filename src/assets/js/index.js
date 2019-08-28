import Swiper from 'swiper'
import $ from 'jquery'
import Bselector from 'Bselector'
 
export default {
    // 回到指定位置
    goTop() {
        let top1 = $('.citys').offset().top;
        $('.baoming').click(function () {
            $('html,body').animate({ scrollTop: top1 });
        });
    },
    banner1() {
        new Swiper('#banner1', {
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            loop: true,
            slidesPerView: 'auto',
            pagination: {
                el: '.plan-pagination',
                clickable: true
            }
        })
    },
    banner2(){
        new Swiper('#banner2', {
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            loop: true,
            slidesPerView: 'auto',
            pagination: {
                el: '.plan-pagination',
                clickable: true
            }
        });
    },
    banner3(){
        new Swiper('#banner3', {
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            loop: true,
            slidesPerView: 'auto',
            pagination: {
                el: '.plan-pagination',
                clickable: true
            }
        });
    },
    toastBox(){
        // 弹出表单
        setTimeout(function () {
            $('.yuyue').fadeIn();
        }, 5000);
        setTimeout(function () {
            $('.yuyue').fadeIn();
        }, 20000);
        $(".yuyue .guanbi").click(function () {
            $('.yuyue').fadeOut();
        });

        $('.choose-city .option').click(function () {
            $('.choose-city .current').text($(this).text());
            $('.course-input').val($(this).text());
        });
        // 提交预约
        $('.form-content').listenForm({
            siteId: 23,
            contentName: 'web秋季班',
            submitTarget: '.yuyue-btn',
            courseRequired: true
        });
        // 课程
        new Bselector({
            showSelected: "#courseName",
            inputSelected: ".course-input",
            options: [{ text: '雅思' }, { text: '托福' }, { text: 'SAT' }]
        });

    },
 
    init() {
        this.goTop()
        this.banner1()
        this.banner2()
        this.banner3()
        this.toastBox()
    }

}