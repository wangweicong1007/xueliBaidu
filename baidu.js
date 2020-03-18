$(function(){
    //get dom elem
    var $username = $('#username'), //用户名
        $phone=$('#phone'), //手机号
        $pwd =$('#pwd '), //密码
        $ma=$('#ma'), //验证码
        $getma=$('#getma'), //获取验证码
        $sub =$('#sub'), //注册
        $cbx=$('#cbx'), //勾选
        $tip1=$('#tip1'), //提示
        $tip2=$('#tip2'), //提示
        $warn1=$("#warn1"),//警告
        $warn2=$("#warn2"),
        $warn3=$("#warn3"),
        $warn4=$("#warn4");

        $sub.attr('disabled','false')
        //点击input有信息提示
        $username.focus(function(){
            $tip1.html('设置后不可更改，最长14个英文或7个汉字')
        })
        $pwd.focus(function(){
            $tip2.html('长度为8-14个字符 字母/数字/标点符号至少两种 不能有空格和汉字')
        })
        //点击其他地方提示消失
        $username.blur(function(){
            $tip1.html('')
            if($username.val()==''){
                $warn1.html('用户名不允许为空')
            }
        })
        $pwd.blur(function(){
            $tip2.html('')
        })
        //用户名验证
        $username.change(function(){
            var a = /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/.test($username.val()); //中英数字
            var aa=/^.*[^\d].*$/.test($username.val());  //数字
            var b=/^[\u4e00-\u9fa5]{1,7}$|^[\dA-Za-z_]{1,14}$/.test($username.val());
                      //7个汉字            //14个字符  为真说明有
            if(!(a&&aa)){
                $warn1.html('用户名仅支持中英文、数字和下划线且不能为纯数字');
            }else if(!b){
                $warn1.html('用户名不能超过7个汉字或者14个字符');
            }else{
                $warn1.html('') 
            }
            
        })
        //手机号验证
        $phone.change(function(){
            var c = /^[1][3,4,5,7,8][0-9]{9}$/.test($phone.val()); //手机格式
            if(!c){
                $warn2.html('手机号码格式不正确');
            }else{
                $warn2.html('')
            }
        })
        //密码验证
        $pwd.change(function(){
            var p=/(?!^[A-z]+$)(?!^[0-9]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{8,14}$/.test($pwd.val()); //密码格式
            if(!p){
                $warn3.html('密码设置不符合要求')
            }else{
                $warn3.html('')
            }
        });

        //点击发送验证码，即点击后倒计时效果，且按钮变为不可用
        var time=60;
        $getma.click(function(){
            $warn4.html('');
            if($phone.val()==''){
                $phone.css('border','1px solid red')
                $warn2.html('请您输入手机号码')
            }else{
                $phone.css('border','1px solid #E0E0E0')
                $warn2.html('')
                $getma.attr('disabled','true');
                send=setInterval(function(){
                    time=time-1;
                    if(time == 0){
                        clearInterval(send);
                        $getma.val('获取验证码');
                        time=60;
                        // $getma.attr('disabled','false');
                        $getma.removeAttr('disabled');
                        if(time ==60 ){
                            $warn4.html('请求超时，请稍后再试')
                        }
                    }else{
                        $getma.val('重新发送（'+ time +'s)');
                        
                    }
                },1000)
            }
        })
        $cbx.click(function(){
            $sub.removeAttr('disabled');
        })
        $sub.click(function(){
            if(!($username.val()=='' || $phone.val()=='' || $pwd.val()=='' || $ma.val() == '')){
                // return;
                alert("successful")
            }
            
        })
})