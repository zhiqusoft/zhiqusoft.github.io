/**
 * Created by JiangYulin on 2015/10/14.
 */


window.onload = function()
{
    /* for webkit */
    document.body.addEventListener("mousewheel",function(event){
        /*
        need a lock for 0.7s
         */
        if(islock())
        {
            return false;
        }
        lock();
        if(event.deltaY > 0)
        {
            goNext();
            setTimeout(unlock,700);
        }
        else {
            goPrev();
            setTimeout(unlock,700);
        }
    });
    /* for firefox */
    document.body.addEventListener("DOMMouseScroll",function(event){
        /*
         need a lock for 0.7s
         */
        if(islock())
        {
            return false;
        }
        lock();
        if(event.detail > 0)
        {
            goNext();
            setTimeout(unlock,700);
        }
        else {
            goPrev();
            setTimeout(unlock,700);
        }
    });

    /* particlesJS('dom-id', params);
     /* @dom-id : set the html tag id [string, optional, default value : particles-js]
     /* @params: set the params [object, optional, default values : check particles.js] */

    /* config dom id (optional) + config particles params */
    particlesJS('particles-js', {
        particles: {
            color: '#fff',
            shape: 'triangle', // "circle", "edge" or "triangle"
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
    {
        _resize();
        $(window).resize(function () {
            _resize();
        })
    }
    //auto zoom 结束

    //contact-form 表单验证
    $("#contact-from").validate();
    /*
        contact 部分的表单提交
    */

    $("#contact-form-submit").click(function(event){
        event.preventDefault();

    })

};

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
        if ((current_W_H / current_W_W) > (origin.height/origin.width)) {
            /* 以宽度比例计算 */
            var Q = current_W_W/origin.width;
            console.log("Q=" + Q);
            $(this).css("zoom",Q);
        }
        else
        {
            /* 以高度比例计算*/
            var Q = current_W_H/origin.height;
            console.log("Q=" + Q);
            $(this).css("zoom",Q);
        }
    });
}


/*
    for slide
 */
$(function(){
    $("#slides").slidesjs({
        width: 800,
        height: 1000,
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
    if(prev_front_section.length != 0) {
        front_section.removeClass("active");
        front_section.removeClass("_front-section");
        prev_front_section.addClass("active");
    }
}

/*
slide to next page
 */
function goNext()
{
    var front_section = $("#showcase").find(".active");
    var next_front_section = front_section.next();
    if(next_front_section.length != 0) {
        next_front_section.addClass("active");
        front_section.removeClass("active");
        next_front_section.addClass("_front-section");
        front_section.addClass("_front-section");
    }
}







