$(document).ready(function(){var b;
var a=$("#searchCustomerServiceKeywordsFAQ");
var c;
c=SWA.funnelbackEnvironment+"suggest.json?collection=southwest-search&fmt=json%2B%2B&profile=_default&partial_query=";
options={url:c,getValue:"disp",list:{maxNumberOfElements:10,match:{enabled:true}},requestDelay:500,minCharNumber:3};
$(".gsa-search-header").click(function(){setTimeout(function(){b=$(".swa-header--search-input");
b.gsaAutocomplete(options);
b.focus()
},100)
});
if(a){a.gsaAutocomplete(options)
}});