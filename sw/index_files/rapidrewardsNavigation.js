$(document).ready(function(){var e=$(".js-arialive");
var c=$(".js-customer-number");
var g=$(".wcm_grid_cell_text_new_flag");
if(g.size()>0){var a=15;
var f=-52;
var b=g.parents(".rr_blue_box");
var d=g.parents(".rr_blue_box_content");
if(d.size()>0){b=d;
a=0;
f=-44
}g.appendTo(document.body).css({top:b.offset().top+a,left:b.offset().left+b.width()+f}).show()
}c.keyup(function(){if(this.value.length>13){e.text(swa.rapidrewards.emailSubscription.customerNumber.maxlength.reached)
}});
c.keydown(function(){e.text("")
})
});