---
layout: post
title:  "仿Jquery easy UI插件 编写方式"
date:   2016-03-10 16:44:00 +0800
categories: jekyll update
---
对于JavaScript，我还是算是一个入门级别的，希望大家多给点意，谢谢！

{% highlight javascript %}
!function(){
  $.fn.alert = function(option,parames){
      if(tyoeof option == 'string'){
        $(this).each(function(){
          $.fn.alert.action\[option](this,parames);
          })
        }
      return this;
  }
  $.fn.alert.action = {
      show: function(){},
      hide: function(){}  
  }
}()
{% endhighlight %}
