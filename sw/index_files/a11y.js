$(function(){$.arialive=function(b,c){var a=$(".js-arialive"),c=c||"assertive";
if(a.length){a.attr("aria-live","off");
a.html("").attr("aria-live",c);
a.html(b);
return this
}}
});
$(document).ready(function(){setTimeout(function(){$("iframe").each(function(){if(!$(this).attr("title")){$(this).attr({tabindex:"-1",title:"Advertising"})
}})
},1500)
});