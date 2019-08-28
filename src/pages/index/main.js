console.log("index lllll")
// import "./main.scss"
import "@/assets/scss/select.scss"
import $ from 'jquery'
$(".close_ly").click(function(){
    $(".leyu_yspd,.toumingbi_yspd").hide()
})
$(".head_onlineChat").click(function(){
    $(".leyu_yspd,.toumingbi_yspd").show()
})

// console.log(aa)
$(".app").html('ssss')
// import Swiper from'swiper'
// var index = {
//     swiper: function () {
//         new Swiper('.index_main_swiper', {
//             pagination: '.pagination',
//             paginationClickable: true,
//             autoplay: 10000,//可选选项，自动滑动
//             autoplayDisableOnInteraction: false,
//             loop: true
//         })

//     },
//     scroll: function () {
//         $(".index_humin_desc").niceScroll({
//             cursorcolor: '#dfdfdf',
//             autohidemode: 'leave'
//         })
//     },
//     init: function () {
//         index.swiper()
//         index.scroll()
//         index.tab()
//         index.zxly()
//     },
//     zxly:function(){
//         $(".close_ly").click(function(){
//             $(".leyu_yspd,.toumingbi_yspd").hide()
//         })
//         $(".head_onlineChat").click(function(){
//             $(".leyu_yspd,.toumingbi_yspd").show()
//         })
//     },
//     tab: function () {
//         $(".index_item_tabItem").click(function () {
//             var _this = $(this)
//             var index = _this.index()
//             _this.addClass("cur").siblings().removeClass("cur")
//             _this.closest(".index_item_titleBox").siblings(".index_item_container").removeClass("show").eq(index).addClass("show")
//         })
//     }
// }
// index.init()