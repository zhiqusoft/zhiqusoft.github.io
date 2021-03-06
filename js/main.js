/**
 * Created by JiangYulin on 2015/10/14.
 */

console.log(navigator.userAgent)
var IE = 0;
var IE6 = 0;
var IE7 = 0;
var IE8 = 0;
var IE9 = 0;
var IE11 = 0
if(navigator.userAgent.indexOf('MSIE') >= 0) {
    IE = 1;
    if (navigator.userAgent.indexOf('MSIE 8') >= 0) {
        IE8 = 1;
    }
    else if (navigator.userAgent.indexOf('MSIE 9') >= 0) {
        IE9 = 1;
    }
    else if (navigator.userAgent.indexOf('MSIE 7') >= 0) {
        IE7 = 1;
    }
    else if (navigator.userAgent.indexOf('MSIE 6') >= 0) {
        IE6 = 1;
    }
}

if  (navigator.userAgent.indexOf('Trident') >= 0){
    IE11 = 1;
}

window.onload = function()
{
    if(!IE8 && !IE7 && !IE6) {
        console.log("One");
        /* for webkit */
        document.body.addEventListener("mousewheel", function (event) {
            /*
             need a lock for 0.7s
             */
            if (islock()) {
                return false;
            }
            lock();
            if (event.wheelDelta < 0) {
                goNext();
                setTimeout(unlock, 700);
            }
            else {
                goPrev();
                setTimeout(unlock, 700);
            }
        });
        /* for firefox */
        document.body.addEventListener("DOMMouseScroll", function (event) {
            /*
             need a lock for 0.7s
             */
            if (islock()) {
                return false;
            }
            lock();
            if (event.detail < 0) {
                goNext();
                setTimeout(unlock, 700);
            }
            else {
                goPrev();
                setTimeout(unlock, 700);
            }
        });
    } else {
        console.log("two");
        window.attachEvent("mousewheel", function (event) {
            console.log("three");
            /*
             need a lock for 0.7s
             */
            if (islock()) {
                return false;
            }
            lock();
            if (event.wheelDelta < 0) {
                console.log("move down");
                goNext();
                setTimeout(unlock, 700);
            }
            else {
                goPrev();
                setTimeout(unlock, 700);
            }
        });
    }

    if(!IE8 && !IE) {
        /* particlesJS('dom-id', params);
         /* @dom-id : set the html tag id [string, optional, default value : particles-js]
         /* @params: set the params [object, optional, default values : check particles.js] */

        /* config dom id (optional) + config particles params */
        particlesJS('particles-js', {
            particles: {
                color: '#fff',
                shape: 'edge', // "circle", "edge" or "triangle"
                opacity: 1,
                size: 2,
                size_random: true,
                nb: 50,
                line_linked: {
                    enable_auto: true,
                    distance: 50,
                    color: '#fff',
                    opacity: 1,
                    width: 1,
                    condensed_mode: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 600
                    }
                },
                anim: {
                    enable: true,
                    speed: 8
                }
            },
            interactivity: {
                enable: true,
                mouse: {
                    distance: 250
                },
                detect_on: 'canvas', // "canvas" or "window"
                mode: 'grab',
                line_linked: {
                    opacity: .5
                },
                events: {
                    onclick: {
                        enable: true,
                        mode: 'push', // "push" or "remove" (particles)
                        nb: 4
                    }
                }
            },
            /* Retina Display Support */
            retina_detect: true
        });

        /*
         auto zoom
         */
        if(1){
            _resize();
            $(window).resize(function () {
                _resize();
            })
        }
        //auto zoom 结束
        /*
         Ipad 滑动支持
         */
        fixed_touch_support();

        /*
         contact 部分的表单提交
         */
        //验证表单
        _validateOnBlur($("#contact-form"));
        //验证并提交
        $("#contact-form-submit").click(function (event) {
            $("#particles-js").removeClass("server-error");
            event.preventDefault();
            if (_validateForm($("#contact-form"))) {
                $("#particles-js").addClass("loading");
                $("#contact-form").ajaxSubmit({
                    success: function (data) {
                        $("#particles-js").removeClass("loading");
                        if (data == 0) {
                            //成功
                            $("#particles-js").addClass("success");

                        }
                        else {
                            $("#particles-js").addClass("server-error");
                        }
                    },
                    error: function(data) {
                        $("#particles-js").removeClass("loading");
                        $("#particles-js").addClass("server-error");
                    }
                });
            }
        })
    }

};
/*
_validate function
    验证表单函数
 */
//验证规则
var rules = {
        name: function(ele) {
            if(ele.val().length < 2 )
            {
                return {
                    'status' : false,
                    'message': '最小长度为2'
                }
            }
            return {
                'status': true,
                'message': ''
            }
        },
        mobile : function(ele) {
            if(ele.val().length < 11 )
            {
                return {
                    'status' : false,
                    'message': '最小长度为11'
                }
            }
            return {
                'status': true,
                'message': ''
            }
        },
        email : function(ele) {
            return {
                'status': true,
                'message': ''
            }
        }
    };
//验证函数
function _validate(element){
        var foo = element.data("validate-rule");
        var result = rules[foo](element);
        if(!result.status) {
            element.addClass('error');
            return false;
        }
    return true;
}
//验证完整表单
function _validateForm(form)
{
    //get elements that use rule;
    var validate_elements = form.find("[data-validate-rule]");
    for(var i=0;i<validate_elements.length;i++){
        var element = $(validate_elements[i]);
        if(!_validate(element))
        {
            return false;
        }
    }
    return true;
}
/*
    焦点移除时的验证
 */
function _validateOnBlur(form){
    form.find("[data-validate-rule]").each(function(){
        $(this).blur(function(){
            _validate($(this));
        });
        $(this).focus(function() {
            $(this).removeClass('error');
        })
    })
}

/*
    验证部分相关函数结束
 */

/*
resize function
 */
var origin = {
        width : 1448,
        height: 849
    };
function _resize() {
    var current_W_H = $("body").height();
    var current_W_W = $("body").width();
        $(".auto-zoom").each(function () {
            if ((current_W_H / current_W_W) > (origin.height / origin.width)) {
                /* 以宽度比例计算 */
                var Q = current_W_W / origin.width;
                $(this).css("transform","scale("+Q+")");
                //$(this).css("zoom", Q);
            }
            else {
                /* 以高度比例计算*/
                var Q = current_W_H / origin.height;
                //$(this).css("zoom", Q);
                $(this).css("transform","scale("+Q+")");
            }
        });
}


/*
    for slide
 */
$(function(){
    $("#slides").slidesjs({
        width: 1000,
        height: 750,
        play: {
            //active: true,
            auto: true,
            speed: 2000,
            interval: 5000,
            swap: true,
            //pauseOnHover: true,
            restartDelay: 2500
        },
        effect: {
            slide: {
                // Slide effect settings.
                speed: 1200
                // [number] Speed in milliseconds of the slide animation.
            }
        }
    });
});

/*

 */

/*
lock & unlock
 */
var _lock = false;
function lock()
{
    _lock = true;
}

function unlock()
{
    _lock = false;
}

function islock()
{
    return _lock;
}

/*
slide to last page
 */
function goPrev()
{
    var front_section = $("#showcase").find(".active");
    var prev_front_section = front_section.prev();
    if(prev_front_section.prev().length == 0)
    {
        $(".header").addClass("on-first-page");
    }
    if(prev_front_section.length != 0) {
        if(IE9) {
            front_section.animate({'opacity': 0}, function () {
                front_section.removeClass("_front-section");
                front_section.removeClass("active");
                prev_front_section.addClass("active");
                front_section.css("opacity", 1);
            })
        } else {
            front_section.removeClass("_front-section");
            front_section.removeClass("active");
            prev_front_section.addClass("active");
        }
    }
}

/*
slide to next page
 */

function goNext()
{
    var front_section = $("#showcase").find(".active");
    var next_front_section = front_section.next();
    $(".header").removeClass("on-first-page");
    if(next_front_section.length != 0) {
        if(IE9) {
            next_front_section.addClass("_front-section");
            next_front_section.css({"opacity":0});
            next_front_section.animate({"opacity": 1}, function () {
                front_section.removeClass("active");
                front_section.addClass("_front-section");
                next_front_section.addClass("active");
            })
        } else {
                next_front_section.addClass("active");
                next_front_section.addClass("_front-section");
                front_section.removeClass("active");
                front_section.addClass("_front-section");
        }
    }
}

/*
IPad 等设备滑动支持
 */
var touch_start_y;
var touch_end_y;
var touch_start_timestamp;
var touch_end_timestamp;

function fixed_touch_support()
{
    document.body.addEventListener("touchstart",function(event){
        event.preventDefault();
        event.stopPropagation();
    });
    var showcase = document.getElementById("showcase");
    showcase.addEventListener("touchstart",function(event){
        touch_start_y = event.touches[0].pageY;
        touch_start_timestamp = new Date().getTime();
    });
    showcase.addEventListener("touchmove",function(event){
        touch_end_y = event.touches[0].pageY;
        touch_end_timestamp = new Date().getTime();
    });
    showcase.addEventListener("touchend",function(event){
        if((touch_start_y - touch_end_y)>100) {
            goNext();
        }
        else if((touch_start_y - touch_end_y)< -100) {
            goPrev();
        }
    });
}

