$(document).ready(function(){
    // 복합 슬라이더 구성하기
    // 1. 슬라이드 자동 기능 구성
    // 2. 마우스 오버시 슬라이드의 자동 기능 일시정지
    // 3. 재생버튼/일시정지버튼
    // 4. carrot(화살표) 기능 구현

    function slide_fnc(){
        // 슬라이드 동작간 내부 콘텐츠가 적용되는 파트
        $("#slider_01 .slider ul li").removeClass("active");
        $("#slider_01 .slider ul li").eq(1).addClass("active");

        // 슬라이드 관련 페이저(indicator) 연동
        var $cur_rel=$("#slider_01 .slider ul li").eq(1).attr("rel");
        console.log("현재 브라우저 상에서 보여지는 화면의 rel값 : "+$cur_rel);
        $("#slider_01 ol li").removeClass("active");
        $("#slider_01 ol li").eq($cur_rel).addClass("active");
    };

    /* 1. 슬라이드 자동 기능 구성 */
    var $l_slide=$("#slider_01 .slider ul li").last();
    $("#slider_01 .slider ul").prepend($l_slide);
    $("#slider_01 .slider ul li").eq(1).addClass("active");
    
    setInterval(function(){
        var $pause=$("#slider_01").hasClass("pause");
        console.log($pause); // true : 슬라이드 일시정지 / false : 슬라이드 자동재생
        var $stop=$(".slider_play_01").hasClass("stop");
        console.log($stop); // true : 슬라이드 일시정지(버튼문구는 재생) / false : 슬라이드 자동재생(버튼문구는 정지)


        if($pause==true|$stop==true){ // $pause==true $stop==false / $pause==false $stop==true / $pause==true $stop==true
            // 일시정지
        }else{ // $pause==false $stop==false
            // 자동 슬라이드 기능
            var $f_child=$("#slider_01 .slider ul li").first();
            $("#slider_01 .slider ul").stop().animate({"margin-left":"-200%"},1000,function(){
                $("#slider_01 .slider ul").append($f_child).css("margin-left","-100%");

                slide_fnc();
            });
        }
    },4000);

    /* 2. 마우스 오버시 슬라이드의 자동 기능 일시정지 */
    $("#slider_01").hover(function(){ // .hover만 function을 2번 사용 가능하다
        $(this).addClass("pause"); // 마우스가 영역 내 진입시 슬라이드 일시정지
    }, function(){
        $(this).removeClass("pause"); // 마우스가 영역 밖 이탈시 슬라이드 자동재생

    });

    /* 3. 재생버튼/일시정지버튼 */
    // #01 슬라이드 일시정지 상태 / addClase("stop") / 버튼문구 : 재생 => 클릭시 #2
    // #02 슬라이드 자동재생 상태 / removeClase("stop") / 버튼문구 : 정지 => 클릭시 #1
    $(".slider_play_01").click(function(){
        var $state=$(this).hasClass("stop");
        if($state==false){ // 슬라이드 일시정지
            $(this).addClass("stop")
            $(this).text("재생 ▶")
        }else{ // 슬라이드 자동재생
            $(this).removeClass("stop")
            $(this).text("정지 ■")
        }
    });

    /* 4. carrot(화살표) 기능 구현 */
    // prepend
    $("#slider_01 .prev").click(function(){
        var $l_child=$("#slider_01 .slider ul li").last();
        $("#slider_01 .slider ul").stop().animate({"margin-left":"0"},500,function(){
            $("#slider_01 .slider ul").prepend($l_child).css("margin-left","-100%");
            slide_fnc();
        });
        return false;
    });

    // append
    $("#slider_01 .next").click(function(){
        var $f_child=$("#slider_01 .slider ul li").first();
        $("#slider_01 .slider ul").stop().animate({"margin-left":"-200%"},500,function(){
            $("#slider_01 .slider ul").append($f_child).css("margin-left","-100%");
            slide_fnc();
        });
        return false;
    });
    /* ---------------------------------------------------- */
    // fade 효과 적용 이미지 슬라이드
    var $slides=$("#slider_02 .slides .slide"); // var $slides=[li.slide.show, li.slide, li.slide, li.slide, li.slide]
    console.log($slides);
    var $cur_slide=0;
    $slides.eq(0).addClass("show");
    setInterval(function(){
        var $pause=$("#slider_02").hasClass("pause");
        var $stop=$(".slider_play_02").hasClass("stop");
        if($pause==true|$stop==true){

        }else{
            $slides.removeClass("show");
            $cur_slide=($cur_slide+1)%$slides.length; // 1,2,3,4,0
            /* 
            $cur_slide=(0+1)%5=1
            $cur_slide=(1+1)%5=2
            $cur_slide=(2+1)%5=3
            $cur_slide=(3+1)%5=4
            $cur_slide=(4+1)%5=0
            */
           $slides.eq($cur_slide).addClass("show");
            /* $index 값 또는 $rel 값 모두 가능
            var $rel=$(".show").attr("rel");
            console.log($rel);
            $("#slider_02 ol li").removeClass("active");
            $("#slider_02 ol li").eq($rel).addClass("active");
            */
           var $index=$(".show").index();
           console.log($index);
           $("#slider_02 ol li").removeClass("active");
           $("#slider_02 ol li").eq($index).addClass("active");
        }
    },4000);

    $("#slider_02").hover(function(){
        $(this).addClass("pause");
    }, function(){
        $(this).removeClass("pause");
    });

    $(".slider_play_02").click(function(){
        var $state=$(this).hasClass("stop");
        if($state==false){
            $(this).addClass("stop");
            $(this).text("재생 ▶");
        }else{
            $(this).removeClass("stop");
            $(this).text("정지 ■");
        }
    });

    $("#slider_02 .prev").click(function(){
        var $index=$("#slider_02 .slides .show").index(); // check!!!!!!!!
        $("#slider_02 .slides .slide").removeClass("show");
        $("#slider_02 ol li").removeClass("active");
        if($index==0){
            $("#slider_02 .slides .slide").eq($slides.length-1).addClass("show");
            $("#slider_02 ol li").eq($slides.length-1).addClass("active");
        }else{
            $("#slider_02 .slides .slide").eq($index).prev().addClass("show");
            $("#slider_02 ol li").eq($index).prev().addClass("active");
        }
        return false;
    })

    $("#slider_02 .next").click(function(){
        var $index=$("#slider_02 .slides .show").index();
        $("#slider_02 .slides .slide").removeClass("show");
        $("#slider_02 ol li").removeClass("active");
        if($index==4){
            $("#slider_02 .slides .slide").eq(0).addClass("show");
            $("#slider_02 ol li").eq(0).addClass("active");
        }else{
            $("#slider_02 .slides .slide").eq($index).next().addClass("show");
            $("#slider_02 ol li").eq($index).next().addClass("active");
        }
        return false;
    });

    $("#slider_02 ol li").click(function(){
        var $index=$(this).index();
        console.log($index);
        $("#slider_02 ol li").removeClass("active");
        $(this).addClass("active");
        $("#slider_02 .slides .slide").removeClass("show");
        $("#slider_02 .slides .slide").eq($index).addClass("show");
    });
});