var swa=typeof(swa)==="undefined"?{}:swa;
if(!String.prototype.startsWith){String.prototype.startsWith=function(a){return !this.indexOf(a)
}
}swa.getNameValuePairValue=function(d,c){var a=null;
if((arguments.length==2)&&(d!="")&&(c!="")){var b=new RegExp(c+"=([\\w|-]+)");
a=d.match(b);
if((a!=null)&&(a.length>1)){a=a[1]
}}return a
};
swa.store={get:function(c,d){var g=this.getStorage(d);
var b=this.getStoreName(c,g);
var a=g.getItem(b);
try{a=JSON.parse(a)
}catch(f){}return a
},set:function(b,d,c){var e=this.getStorage(c);
var a=this.getStoreName(b,e);
if(typeof d==="object"){d=JSON.stringify(d)
}if(a){e.setItem(a,d)
}},remove:function(b,c){var d=this.getStorage(c);
var a=this.getStoreName(b,d);
if(a){d.removeItem(a)
}},getStorage:function(a){var b=sessionStorage;
if(a==="local"){b=localStorage
}return b
},getStoreName:function(b,c){var a;
Object.keys(c).forEach(function(d){if(d.toLowerCase().startsWith(b.toLowerCase())){a=d
}});
return a
}};