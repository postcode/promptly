((function(){var a,b,c,d,e=[].slice,f={}.hasOwnProperty,g=function(a,b){function c(){this.constructor=a}for(var d in b)f.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},h=function(a,b){return function(){return a.apply(b,arguments)}},i=[].indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(b in this&&this[b]===a)return b;return-1};b=window.Morris={},a=jQuery,b.EventEmitter=function(){function a(){}return a.prototype.on=function(a,b){return this.handlers==null&&(this.handlers={}),this.handlers[a]==null&&(this.handlers[a]=[]),this.handlers[a].push(b),this},a.prototype.fire=function(){var a,b,c,d,f,g,h;c=arguments[0],a=2<=arguments.length?e.call(arguments,1):[];if(this.handlers!=null&&this.handlers[c]!=null){g=this.handlers[c],h=[];for(d=0,f=g.length;d<f;d++)b=g[d],h.push(b.apply(null,a));return h}},a}(),b.commas=function(a){var b,c,d,e;return a!=null?(d=a<0?"-":"",b=Math.abs(a),c=Math.floor(b).toFixed(0),d+=c.replace(/(?=(?:\d{3})+$)(?!^)/g,","),e=b.toString(),e.length>c.length&&(d+=e.slice(c.length)),d):"-"},b.pad2=function(a){return(a<10?"0":"")+a},b.Grid=function(c){function d(b){var c=this;typeof b.element=="string"?this.el=a(document.getElementById(b.element)):this.el=a(b.element);if(this.el==null||this.el.length===0)throw new Error("Graph container element not found");this.el.css("position")==="static"&&this.el.css("position","relative"),this.options=a.extend({},this.gridDefaults,this.defaults||{},b),typeof this.options.units=="string"&&(this.options.postUnits=b.units),this.raphael=new Raphael(this.el[0]),this.elementWidth=null,this.elementHeight=null,this.dirty=!1,this.init&&this.init(),this.setData(this.options.data),this.el.bind("mousemove",function(a){var b;return b=c.el.offset(),c.fire("hovermove",a.pageX-b.left,a.pageY-b.top)}),this.el.bind("mouseout",function(a){return c.fire("hoverout")}),this.el.bind("touchstart touchmove touchend",function(a){var b,d;return d=a.originalEvent.touches[0]||a.originalEvent.changedTouches[0],b=c.el.offset(),c.fire("hover",d.pageX-b.left,d.pageY-b.top),d}),this.el.bind("click",function(a){var b;return b=c.el.offset(),c.fire("gridclick",a.pageX-b.left,a.pageY-b.top)}),this.postInit&&this.postInit()}return g(d,c),d.prototype.gridDefaults={dateFormat:null,axes:!0,grid:!0,gridLineColor:"#aaa",gridStrokeWidth:.5,gridTextColor:"#888",gridTextSize:12,gridTextFamily:"sans-serif",gridTextWeight:"normal",hideHover:!1,yLabelFormat:null,xLabelAngle:0,numLines:5,padding:25,parseTime:!0,postUnits:"",preUnits:"",ymax:"auto",ymin:"auto 0",goals:[],goalStrokeWidth:1,goalLineColors:["#666633","#999966","#cc6666","#663333"],events:[],eventStrokeWidth:1,eventLineColors:["#005a04","#ccffbb","#3a5f0b","#005502"]},d.prototype.setData=function(a,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q;c==null&&(c=!0),this.options.data=a;if(a==null||a.length===0){this.data=[],this.raphael.clear(),this.hover!=null&&this.hover.hide();return}o=this.cumulative?0:null,p=this.cumulative?0:null,this.options.goals.length>0&&(h=Math.min.apply(null,this.options.goals),g=Math.max.apply(null,this.options.goals),p=p!=null?Math.min(p,h):h,o=o!=null?Math.max(o,g):g),this.data=function(){var c,d,g;g=[];for(f=c=0,d=a.length;c<d;f=++c)j=a[f],i={},i.label=j[this.options.xkey],this.options.parseTime?(i.x=b.parseDate(i.label),this.options.dateFormat?i.label=this.options.dateFormat(i.x):typeof i.label=="number"&&(i.label=(new Date(i.label)).toString())):(i.x=f,this.options.xLabelFormat&&(i.label=this.options.xLabelFormat(i))),l=0,i.y=function(){var a,b,c,d;c=this.options.ykeys,d=[];for(e=a=0,b=c.length;a<b;e=++a)n=c[e],q=j[n],typeof q=="string"&&(q=parseFloat(q)),q!=null&&typeof q!="number"&&(q=null),q!=null&&(this.cumulative?l+=q:o!=null?(o=Math.max(q,o),p=Math.min(q,p)):o=p=q),this.cumulative&&l!=null&&(o=Math.max(l,o),p=Math.min(l,p)),d.push(q);return d}.call(this),g.push(i);return g}.call(this),this.options.parseTime&&(this.data=this.data.sort(function(a,b){return(a.x>b.x)-(b.x>a.x)})),this.xmin=this.data[0].x,this.xmax=this.data[this.data.length-1].x,this.events=[],this.options.parseTime&&this.options.events.length>0&&(this.events=function(){var a,c,e,f;e=this.options.events,f=[];for(a=0,c=e.length;a<c;a++)d=e[a],f.push(b.parseDate(d));return f}.call(this),this.xmax=Math.max(this.xmax,Math.max.apply(null,this.events)),this.xmin=Math.min(this.xmin,Math.min.apply(null,this.events))),this.xmin===this.xmax&&(this.xmin-=1,this.xmax+=1),this.ymin=this.yboundary("min",p),this.ymax=this.yboundary("max",o),this.ymin===this.ymax&&(p&&(this.ymin-=1),this.ymax+=1);if(this.options.axes===!0||this.options.grid===!0)this.options.ymax===this.gridDefaults.ymax&&this.options.ymin===this.gridDefaults.ymin?(this.grid=this.autoGridLines(this.ymin,this.ymax,this.options.numLines),this.ymin=Math.min(this.ymin,this.grid[0]),this.ymax=Math.max(this.ymax,this.grid[this.grid.length-1])):(k=(this.ymax-this.ymin)/(this.options.numLines-1),this.grid=function(){var a,b,c,d;d=[];for(m=a=b=this.ymin,c=this.ymax;b<=c?a<=c:a>=c;m=a+=k)d.push(m);return d}.call(this));this.dirty=!0;if(c)return this.redraw()},d.prototype.yboundary=function(a,b){var c,d;return c=this.options["y"+a],typeof c=="string"?c.slice(0,4)==="auto"?c.length>5?(d=parseInt(c.slice(5),10),b==null?d:Math[a](b,d)):b!=null?b:0:parseInt(c,10):c},d.prototype.autoGridLines=function(a,b,c){var d,e,f,g,h,i,j,k,l;return h=b-a,l=Math.floor(Math.log(h)/Math.log(10)),j=Math.pow(10,l),e=Math.floor(a/j)*j,d=Math.ceil(b/j)*j,i=(d-e)/(c-1),j===1&&i>1&&Math.ceil(i)!==i&&(i=Math.ceil(i),d=e+i*(c-1)),e<0&&d>0&&(e=Math.floor(a/i)*i,d=Math.ceil(b/i)*i),i<1?(g=Math.floor(Math.log(i)/Math.log(10)),f=function(){var a,b;b=[];for(k=a=e;e<=d?a<=d:a>=d;k=a+=i)b.push(parseFloat(k.toFixed(1-g)));return b}()):f=function(){var a,b;b=[];for(k=a=e;e<=d?a<=d:a>=d;k=a+=i)b.push(k);return b}(),f},d.prototype._calc=function(){var a,b,c,d,e,f;e=this.el.width(),c=this.el.height();if(this.elementWidth!==e||this.elementHeight!==c||this.dirty){this.elementWidth=e,this.elementHeight=c,this.dirty=!1,this.left=this.options.padding,this.right=this.elementWidth-this.options.padding,this.top=this.options.padding,this.bottom=this.elementHeight-this.options.padding,this.options.axes&&(f=function(){var a,c,d,e;d=this.grid,e=[];for(a=0,c=d.length;a<c;a++)b=d[a],e.push(this.measureText(this.yAxisFormat(b)).width);return e}.call(this),this.left+=Math.max.apply(Math,f),a=function(){var a,b,c;c=[];for(d=a=0,b=this.data.length;0<=b?a<b:a>b;d=0<=b?++a:--a)c.push(this.measureText(this.data[d].text,-this.options.xLabelAngle).height);return c}.call(this),this.bottom-=Math.max.apply(Math,a)),this.width=Math.max(1,this.right-this.left),this.height=Math.max(1,this.bottom-this.top),this.dx=this.width/(this.xmax-this.xmin),this.dy=this.height/(this.ymax-this.ymin);if(this.calc)return this.calc()}},d.prototype.transY=function(a){return this.bottom-(a-this.ymin)*this.dy},d.prototype.transX=function(a){return this.data.length===1?(this.left+this.right)/2:this.left+(a-this.xmin)*this.dx},d.prototype.redraw=function(){this.raphael.clear(),this._calc(),this.drawGrid(),this.drawGoals(),this.drawEvents();if(this.draw)return this.draw()},d.prototype.measureText=function(a,b){var c,d;return b==null&&(b=0),d=this.raphael.text(100,100,a).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).rotate(b),c=d.getBBox(),d.remove(),c},d.prototype.yAxisFormat=function(a){return this.yLabelFormat(a)},d.prototype.yLabelFormat=function(a){return typeof this.options.yLabelFormat=="function"?this.options.yLabelFormat(a):""+this.options.preUnits+b.commas(a)+this.options.postUnits},d.prototype.updateHover=function(a,b){var c,d;c=this.hitTest(a,b);if(c!=null)return(d=this.hover).update.apply(d,c)},d.prototype.drawGrid=function(){var a,b,c,d,e,f;if(this.options.grid===!1&&this.options.axes===!1)return;e=this.grid,f=[];for(c=0,d=e.length;c<d;c++)a=e[c],b=this.transY(a),this.options.axes&&this.drawYAxisLabel(this.left-this.options.padding/2,b,this.yAxisFormat(a)),this.options.grid?f.push(this.drawGridLine("M"+this.left+","+b+"H"+(this.left+this.width))):f.push(void 0);return f},d.prototype.drawGoals=function(){var a,b,c,d,e,f,g;f=this.options.goals,g=[];for(c=d=0,e=f.length;d<e;c=++d)b=f[c],a=this.options.goalLineColors[c%this.options.goalLineColors.length],g.push(this.drawGoal(b,a));return g},d.prototype.drawEvents=function(){var a,b,c,d,e,f,g;f=this.events,g=[];for(c=d=0,e=f.length;d<e;c=++d)b=f[c],a=this.options.eventLineColors[c%this.options.eventLineColors.length],g.push(this.drawEvent(b,a));return g},d.prototype.drawGoal=function(a,b){return this.raphael.path("M"+this.left+","+this.transY(a)+"H"+this.right).attr("stroke",b).attr("stroke-width",this.options.goalStrokeWidth)},d.prototype.drawEvent=function(a,b){return this.raphael.path("M"+this.transX(a)+","+this.bottom+"V"+this.top).attr("stroke",b).attr("stroke-width",this.options.eventStrokeWidth)},d.prototype.drawYAxisLabel=function(a,b,c){return this.raphael.text(a,b,c).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor).attr("text-anchor","end")},d.prototype.drawGridLine=function(a){return this.raphael.path(a).attr("stroke",this.options.gridLineColor).attr("stroke-width",this.options.gridStrokeWidth)},d}(b.EventEmitter),b.parseDate=function(a){var b,c,d,e,f,g,h,i,j,k,l;return typeof a=="number"?a:(c=a.match(/^(\d+) Q(\d)$/),e=a.match(/^(\d+)-(\d+)$/),f=a.match(/^(\d+)-(\d+)-(\d+)$/),h=a.match(/^(\d+) W(\d+)$/),i=a.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+)(Z|([+-])(\d\d):?(\d\d))?$/),j=a.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+):(\d+(\.\d+)?)(Z|([+-])(\d\d):?(\d\d))?$/),c?(new Date(parseInt(c[1],10),parseInt(c[2],10)*3-1,1)).getTime():e?(new Date(parseInt(e[1],10),parseInt(e[2],10)-1,1)).getTime():f?(new Date(parseInt(f[1],10),parseInt(f[2],10)-1,parseInt(f[3],10))).getTime():h?(k=new Date(parseInt(h[1],10),0,1),k.getDay()!==4&&k.setMonth(0,1+(4-k.getDay()+7)%7),k.getTime()+parseInt(h[2],10)*6048e5):i?i[6]?(g=0,i[6]!=="Z"&&(g=parseInt(i[8],10)*60+parseInt(i[9],10),i[7]==="+"&&(g=0-g)),Date.UTC(parseInt(i[1],10),parseInt(i[2],10)-1,parseInt(i[3],10),parseInt(i[4],10),parseInt(i[5],10)+g)):(new Date(parseInt(i[1],10),parseInt(i[2],10)-1,parseInt(i[3],10),parseInt(i[4],10),parseInt(i[5],10))).getTime():j?(l=parseFloat(j[6]),b=Math.floor(l),d=Math.round((l-b)*1e3),j[8]?(g=0,j[8]!=="Z"&&(g=parseInt(j[10],10)*60+parseInt(j[11],10),j[9]==="+"&&(g=0-g)),Date.UTC(parseInt(j[1],10),parseInt(j[2],10)-1,parseInt(j[3],10),parseInt(j[4],10),parseInt(j[5],10)+g,b,d)):(new Date(parseInt(j[1],10),parseInt(j[2],10)-1,parseInt(j[3],10),parseInt(j[4],10),parseInt(j[5],10),b,d)).getTime()):(new Date(parseInt(a,10),0,1)).getTime())},b.Hover=function(){function c(c){c==null&&(c={}),this.options=a.extend({},b.Hover.defaults,c),this.el=a("<div class='"+this.options["class"]+"'></div>"),this.el.hide(),this.options.parent.append(this.el)}return c.defaults={"class":"morris-hover morris-default-style"},c.prototype.update=function(a,b,c){return this.html(a),this.show(),this.moveTo(b,c)},c.prototype.html=function(a){return this.el.html(a)},c.prototype.moveTo=function(a,b){var c,d,e,f,g,h;return g=this.options.parent.innerWidth(),f=this.options.parent.innerHeight(),d=this.el.outerWidth(),c=this.el.outerHeight(),e=Math.min(Math.max(0,a-d/2),g-d),b!=null?(h=b-c-10,h<0&&(h=b+10,h+c>f&&(h=f/2-c/2))):h=f/2-c/2,this.el.css({left:e+"px",top:parseInt(h)+"px"})},c.prototype.show=function(){return this.el.show()},c.prototype.hide=function(){return this.el.hide()},c}(),b.Line=function(a){function c(a){this.hilight=h(this.hilight,this),this.onHoverOut=h(this.onHoverOut,this),this.onHoverMove=h(this.onHoverMove,this),this.onGridClick=h(this.onGridClick,this);if(!(this instanceof b.Line))return new b.Line(a);c.__super__.constructor.call(this,a)}return g(c,a),c.prototype.init=function(){this.pointGrow=Raphael.animation({r:this.options.pointSize+3},25,"linear"),this.pointShrink=Raphael.animation({r:this.options.pointSize},25,"linear");if(this.options.hideHover!=="always")return this.hover=new b.Hover({parent:this.el}),this.on("hovermove",this.onHoverMove),this.on("hoverout",this.onHoverOut),this.on("gridclick",this.onGridClick)},c.prototype.defaults={lineWidth:3,pointSize:4,lineColors:["#0b62a4","#7A92A3","#4da74d","#afd8f8","#edc240","#cb4b4b","#9440ed"],pointWidths:[1],pointStrokeColors:["#ffffff"],pointFillColors:[],smooth:!0,xLabels:"auto",xLabelFormat:null,xLabelMargin:24,continuousLine:!0,hideHover:!1},c.prototype.calc=function(){return this.calcPoints(),this.generatePaths()},c.prototype.calcPoints=function(){var a,b,c,d,e,f;e=this.data,f=[];for(c=0,d=e.length;c<d;c++)a=e[c],a._x=this.transX(a.x),a._y=function(){var c,d,e,f;e=a.y,f=[];for(c=0,d=e.length;c<d;c++)b=e[c],b!=null?f.push(this.transY(b)):f.push(b);return f}.call(this),f.push(a._ymax=Math.min.apply(null,[this.bottom].concat(function(){var c,d,e,f;e=a._y,f=[];for(c=0,d=e.length;c<d;c++)b=e[c],b!=null&&f.push(b);return f}())));return f},c.prototype.hitTest=function(a,b){var c,d,e,f,g;if(this.data.length===0)return null;g=this.data.slice(1);for(c=e=0,f=g.length;e<f;c=++e){d=g[c];if(a<(d._x+this.data[c]._x)/2)break}return c},c.prototype.onGridClick=function(a,b){var c;return c=this.hitTest(a,b),this.fire("click",c,this.options.data[c],a,b)},c.prototype.onHoverMove=function(a,b){var c;return c=this.hitTest(a,b),this.displayHoverForRow(c)},c.prototype.onHoverOut=function(){if(this.options.hideHover!==!1)return this.displayHoverForRow(null)},c.prototype.displayHoverForRow=function(a){var b;return a!=null?((b=this.hover).update.apply(b,this.hoverContentForRow(a)),this.hilight(a)):(this.hover.hide(),this.hilight())},c.prototype.hoverContentForRow=function(a){var b,c,d,e,f,g,h;d=this.data[a],b="<div class='morris-hover-row-label'>"+d.label+"</div>",h=d.y;for(c=f=0,g=h.length;f<g;c=++f)e=h[c],b+="<div class='morris-hover-point' style='color: "+this.colorFor(d,c,"label")+"'>\n  "+this.options.labels[c]+":\n  "+this.yLabelFormat(e)+"\n</div>";return typeof this.options.hoverCallback=="function"&&(b=this.options.hoverCallback(a,this.options,b)),[b,d._x,d._ymax]},c.prototype.generatePaths=function(){var a,c,d,e,f;return this.paths=function(){var g,h,j,k;k=[];for(d=g=0,h=this.options.ykeys.length;0<=h?g<h:g>h;d=0<=h?++g:--g)f=this.options.smooth===!0||(j=this.options.ykeys[d],i.call(this.options.smooth,j)>=0),c=function(){var a,b,c,f;c=this.data,f=[];for(a=0,b=c.length;a<b;a++)e=c[a],e._y[d]!==void 0&&f.push({x:e._x,y:e._y[d]});return f}.call(this),this.options.continuousLine&&(c=function(){var b,d,e;e=[];for(b=0,d=c.length;b<d;b++)a=c[b],a.y!==null&&e.push(a);return e}()),c.length>1?k.push(b.Line.createPath(c,f,this.bottom)):k.push(null);return k}.call(this)},c.prototype.draw=function(){this.options.axes&&this.drawXAxis(),this.drawSeries();if(this.options.hideHover===!1)return this.displayHoverForRow(this.data.length-1)},c.prototype.drawXAxis=function(){var a,c,d,e,f,g,h,i,j,k,l=this;h=this.bottom+this.options.padding/2,f=null,e=null,a=function(a,b){var c,d,g,i,j;return c=l.drawXAxisLabel(l.transX(b),h,a),j=c.getBBox(),c.transform("r"+ -l.options.xLabelAngle),d=c.getBBox(),c.transform("t0,"+d.height/2+"..."),l.options.xLabelAngle!==0&&(i=-0.5*j.width*Math.cos(l.options.xLabelAngle*Math.PI/180),c.transform("t"+i+",0...")),d=c.getBBox(),(f==null||f>=d.x+d.width||e!=null&&e>=d.x)&&d.x>=0&&d.x+d.width<l.el.width()?(l.options.xLabelAngle!==0&&(g=1.25*l.options.gridTextSize/Math.sin(l.options.xLabelAngle*Math.PI/180),e=d.x-g),f=d.x-l.options.xLabelMargin):c.remove()},this.options.parseTime?this.data.length===1&&this.options.xLabels==="auto"?d=[[this.data[0].label,this.data[0].x]]:d=b.labelSeries(this.xmin,this.xmax,this.width,this.options.xLabels,this.options.xLabelFormat):d=function(){var a,b,c,d;c=this.data,d=[];for(a=0,b=c.length;a<b;a++)g=c[a],d.push([g.label,g.x]);return d}.call(this),d.reverse(),k=[];for(i=0,j=d.length;i<j;i++)c=d[i],k.push(a(c[0],c[1]));return k},c.prototype.drawSeries=function(){var a,b,c,d,e,f;this.seriesPoints=[];for(a=b=d=this.options.ykeys.length-1;d<=0?b<=0:b>=0;a=d<=0?++b:--b)this._drawLineFor(a);f=[];for(a=c=e=this.options.ykeys.length-1;e<=0?c<=0:c>=0;a=e<=0?++c:--c)f.push(this._drawPointFor(a));return f},c.prototype._drawPointFor=function(a){var b,c,d,e,f,g;this.seriesPoints[a]=[],f=this.data,g=[];for(d=0,e=f.length;d<e;d++)c=f[d],b=null,c._y[a]!=null&&(b=this.drawLinePoint(c._x,c._y[a],this.options.pointSize,this.colorFor(c,a,"point"),a)),g.push(this.seriesPoints[a].push(b));return g},c.prototype._drawLineFor=function(a){var b;b=this.paths[a];if(b!==null)return this.drawLinePath(b,this.colorFor(null,a,"line"))},c.createPath=function(a,c,d){var e,f,g,h,i,j,k,l,m,n,o,p,q,r;k="",c&&(g=b.Line.gradients(a)),l={y:null};for(h=q=0,r=a.length;q<r;h=++q){e=a[h];if(e.y!=null)if(l.y!=null)c?(f=g[h],j=g[h-1],i=(e.x-l.x)/4,m=l.x+i,o=Math.min(d,l.y+i*j),n=e.x-i,p=Math.min(d,e.y-i*f),k+="C"+m+","+o+","+n+","+p+","+e.x+","+e.y):k+="L"+e.x+","+e.y;else if(!c||g[h]!=null)k+="M"+e.x+","+e.y;l=e}return k},c.gradients=function(a){var b,c,d,e,f,g,h,i;c=function(a,b){return(a.y-b.y)/(a.x-b.x)},i=[];for(d=g=0,h=a.length;g<h;d=++g)b=a[d],b.y!=null?(e=a[d+1]||{y:null},f=a[d-1]||{y:null},f.y!=null&&e.y!=null?i.push(c(f,e)):f.y!=null?i.push(c(f,b)):e.y!=null?i.push(c(b,e)):i.push(null)):i.push(null);return i},c.prototype.hilight=function(a){var b,c,d,e,f;if(this.prevHilight!==null&&this.prevHilight!==a)for(b=c=0,e=this.seriesPoints.length-1;0<=e?c<=e:c>=e;b=0<=e?++c:--c)this.seriesPoints[b][this.prevHilight]&&this.seriesPoints[b][this.prevHilight].animate(this.pointShrink);if(a!==null&&this.prevHilight!==a)for(b=d=0,f=this.seriesPoints.length-1;0<=f?d<=f:d>=f;b=0<=f?++d:--d)this.seriesPoints[b][a]&&this.seriesPoints[b][a].animate(this.pointGrow);return this.prevHilight=a},c.prototype.colorFor=function(a,b,c){return typeof this.options.lineColors=="function"?this.options.lineColors.call(this,a,b,c):c==="point"?this.options.pointFillColors[b%this.options.pointFillColors.length]||this.options.lineColors[b%this.options.lineColors.length]:this.options.lineColors[b%this.options.lineColors.length]},c.prototype.drawXAxisLabel=function(a,b,c){return this.raphael.text(a,b,c).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor)},c.prototype.drawLinePath=function(a,b){return this.raphael.path(a).attr("stroke",b).attr("stroke-width",this.options.lineWidth)},c.prototype.drawLinePoint=function(a,b,c,d,e){return this.raphael.circle(a,b,c).attr("fill",d).attr("stroke-width",this.strokeWidthForSeries(e)).attr("stroke",this.strokeForSeries(e))},c.prototype.strokeWidthForSeries=function(a){return this.options.pointWidths[a%this.options.pointWidths.length]},c.prototype.strokeForSeries=function(a){return this.options.pointStrokeColors[a%this.options.pointStrokeColors.length]},c}(b.Grid),b.labelSeries=function(c,d,e,f,g){var h,i,j,k,l,m,n,o,p,q,r;j=200*(d-c)/e,i=new Date(c),n=b.LABEL_SPECS[f];if(n===void 0){r=b.AUTO_LABEL_ORDER;for(p=0,q=r.length;p<q;p++){k=r[p],m=b.LABEL_SPECS[k];if(j>=m.span){n=m;break}}}n===void 0&&(n=b.LABEL_SPECS.second),g&&(n=a.extend({},n,{fmt:g})),h=n.start(i),l=[];while((o=h.getTime())<=d)o>=c&&l.push([n.fmt(h),o]),n.incr(h);return l},c=function(a){return{span:a*60*1e3,start:function(a){return new Date(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours())},fmt:function(a){return""+b.pad2(a.getHours())+":"+b.pad2(a.getMinutes())},incr:function(b){return b.setUTCMinutes(b.getUTCMinutes()+a)}}},d=function(a){return{span:a*1e3,start:function(a){return new Date(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours(),a.getMinutes())},fmt:function(a){return""+b.pad2(a.getHours())+":"+b.pad2(a.getMinutes())+":"+b.pad2(a.getSeconds())},incr:function(b){return b.setUTCSeconds(b.getUTCSeconds()+a)}}},b.LABEL_SPECS={decade:{span:1728e8,start:function(a){return new Date(a.getFullYear()-a.getFullYear()%10,0,1)},fmt:function(a){return""+a.getFullYear()},incr:function(a){return a.setFullYear(a.getFullYear()+10)}},year:{span:1728e7,start:function(a){return new Date(a.getFullYear(),0,1)},fmt:function(a){return""+a.getFullYear()},incr:function(a){return a.setFullYear(a.getFullYear()+1)}},month:{span:24192e5,start:function(a){return new Date(a.getFullYear(),a.getMonth(),1)},fmt:function(a){return""+a.getFullYear()+"-"+b.pad2(a.getMonth()+1)},incr:function(a){return a.setMonth(a.getMonth()+1)}},day:{span:864e5,start:function(a){return new Date(a.getFullYear(),a.getMonth(),a.getDate())},fmt:function(a){return""+a.getFullYear()+"-"+b.pad2(a.getMonth()+1)+"-"+b.pad2(a.getDate())},incr:function(a){return a.setDate(a.getDate()+1)}},hour:c(60),"30min":c(30),"15min":c(15),"10min":c(10),"5min":c(5),minute:c(1),"30sec":d(30),"15sec":d(15),"10sec":d(10),"5sec":d(5),second:d(1)},b.AUTO_LABEL_ORDER=["decade","year","month","day","hour","30min","15min","10min","5min","minute","30sec","15sec","10sec","5sec","second"],b.Area=function(c){function d(c){var f;if(!(this instanceof b.Area))return new b.Area(c);f=a.extend({},e,c),this.cumulative=!f.behaveLikeLine,f.fillOpacity==="auto"&&(f.fillOpacity=f.behaveLikeLine?.8:1),d.__super__.constructor.call(this,f)}var e;return g(d,c),e={fillOpacity:"auto",behaveLikeLine:!1},d.prototype.calcPoints=function(){var a,b,c,d,e,f,g;f=this.data,g=[];for(d=0,e=f.length;d<e;d++)a=f[d],a._x=this.transX(a.x),b=0,a._y=function(){var d,e,f,g;f=a.y,g=[];for(d=0,e=f.length;d<e;d++)c=f[d],this.options.behaveLikeLine?g.push(this.transY(c)):(b+=c||0,g.push(this.transY(b)));return g}.call(this),g.push(a._ymax=Math.max.apply(Math,a._y));return g},d.prototype.drawSeries=function(){var a,b,c,d,e,f,g,h,i,j,k;this.seriesPoints=[],this.options.behaveLikeLine?b=function(){i=[];for(var a=0,b=this.options.ykeys.length-1;0<=b?a<=b:a>=b;0<=b?a++:a--)i.push(a);return i}.apply(this):b=function(){j=[];for(var a=h=this.options.ykeys.length-1;h<=0?a<=0:a>=0;h<=0?a++:a--)j.push(a);return j}.apply(this),k=[];for(e=0,f=b.length;e<f;e++)a=b[e],this._drawFillFor(a),this._drawLineFor(a),k.push(this._drawPointFor(a));return k},d.prototype._drawFillFor=function(a){var b;b=this.paths[a];if(b!==null)return b+="L"+this.transX(this.xmax)+","+this.bottom+"L"+this.transX(this.xmin)+","+this.bottom+"Z",this.drawFilledPath(b,this.fillForSeries(a))},d.prototype.fillForSeries=function(a){var b;return b=Raphael.rgb2hsl(this.colorFor(this.data[a],a,"line")),Raphael.hsl(b.h,this.options.behaveLikeLine?b.s*.9:b.s*.75,Math.min(.98,this.options.behaveLikeLine?b.l*1.2:b.l*1.25))},d.prototype.drawFilledPath=function(a,b){return this.raphael.path(a).attr("fill",b).attr("fill-opacity",this.options.fillOpacity).attr("stroke-width",0)},d}(b.Line),b.Bar=function(c){function d(c){this.onHoverOut=h(this.onHoverOut,this),this.onHoverMove=h(this.onHoverMove,this),this.onGridClick=h(this.onGridClick,this);if(!(this instanceof b.Bar))return new b.Bar(c);d.__super__.constructor.call(this,a.extend({},c,{parseTime:!1}))}return g(d,c),d.prototype.init=function(){this.cumulative=this.options.stacked;if(this.options.hideHover!=="always")return this.hover=new b.Hover({parent:this.el}),this.on("hovermove",this.onHoverMove),this.on("hoverout",this.onHoverOut),this.on("gridclick",this.onGridClick)},d.prototype.defaults={barSizeRatio:.75,barGap:3,barColors:["#0b62a4","#7a92a3","#4da74d","#afd8f8","#edc240","#cb4b4b","#9440ed"],xLabelMargin:50},d.prototype.calc=function(){var a;this.calcBars();if(this.options.hideHover===!1)return(a=this.hover).update.apply(a,this.hoverContentForRow(this.data.length-1))},d.prototype.calcBars=function(){var a,b,c,d,e,f,g;f=this.data,g=[];for(a=d=0,e=f.length;d<e;a=++d)b=f[a],b._x=this.left+this.width*(a+.5)/this.data.length,g.push(b._y=function(){var a,d,e,f;e=b.y,f=[];for(a=0,d=e.length;a<d;a++)c=e[a],c!=null?f.push(this.transY(c)):f.push(null);return f}.call(this));return g},d.prototype.draw=function(){return this.options.axes&&this.drawXAxis(),this.drawSeries()},d.prototype.drawXAxis=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m;j=this.bottom+this.options.padding/2,g=null,f=null,m=[];for(a=k=0,l=this.data.length;0<=l?k<l:k>l;a=0<=l?++k:--k)h=this.data[this.data.length-1-a],b=this.drawXAxisLabel(h._x,j,h.label),i=b.getBBox(),b.transform("r"+ -this.options.xLabelAngle),c=b.getBBox(),b.transform("t0,"+c.height/2+"..."),this.options.xLabelAngle!==0&&(e=-0.5*i.width*Math.cos(this.options.xLabelAngle*Math.PI/180),b.transform("t"+e+",0...")),(g==null||g>=c.x+c.width||f!=null&&f>=c.x)&&c.x>=0&&c.x+c.width<this.el.width()?(this.options.xLabelAngle!==0&&(d=1.25*this.options.gridTextSize/Math.sin(this.options.xLabelAngle*Math.PI/180),f=c.x-d),m.push(g=c.x-this.options.xLabelMargin)):m.push(b.remove());return m},d.prototype.drawSeries=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n;return c=this.width/this.options.data.length,h=this.options.stacked!=null?1:this.options.ykeys.length,a=(c*this.options.barSizeRatio-this.options.barGap*(h-1))/h,g=c*(1-this.options.barSizeRatio)/2,n=this.ymin<=0&&this.ymax>=0?this.transY(0):null,this.bars=function(){var h,q,u,v;u=this.data,v=[];for(d=h=0,q=u.length;h<q;d=++h)i=u[d],e=0,v.push(function(){var h,q,u,v;u=i._y,v=[];for(j=h=0,q=u.length;h<q;j=++h)m=u[j],m!==null?(n?(l=Math.min(m,n),b=Math.max(m,n)):(l=m,b=this.bottom),f=this.left+d*c+g,this.options.stacked||(f+=j*(a+this.options.barGap)),k=b-l,this.options.stacked&&(l-=e),this.drawBar(f,l,a,k,this.colorFor(i,j,"bar")),v.push(e+=k)):v.push(null);return v}.call(this));return v}.call(this)},d.prototype.colorFor=function(a,b,c){var d,e;return typeof this.options.barColors=="function"?(d={x:a.x,y:a.y[b],label:a.label},e={index:b,key:this.options.ykeys[b],label:this.options.labels[b]},this.options.barColors.call(this,d,e,c)):this.options.barColors[b%this.options.barColors.length]},d.prototype.hitTest=function(a,b){return this.data.length===0?null:(a=Math.max(Math.min(a,this.right),this.left),Math.min(this.data.length-1,Math.floor((a-this.left)/(this.width/this.data.length))))},d.prototype.onGridClick=function(a,b){var c;return c=this.hitTest(a,b),this.fire("click",c,this.options.data[c],a,b)},d.prototype.onHoverMove=function(a,b){var c,d;return c=this.hitTest(a,b),(d=this.hover).update.apply(d,this.hoverContentForRow(c))},d.prototype.onHoverOut=function(){if(this.options.hideHover!==!1)return this.hover.hide()},d.prototype.hoverContentForRow=function(a){var b,c,d,e,f,g,h,i;d=this.data[a],b="<div class='morris-hover-row-label'>"+d.label+"</div>",i=d.y;for(c=g=0,h=i.length;g<h;c=++g)f=i[c],b+="<div class='morris-hover-point' style='color: "+this.colorFor(d,c,"label")+"'>\n  "+this.options.labels[c]+":\n  "+this.yLabelFormat(f)+"\n</div>";return typeof this.options.hoverCallback=="function"&&(b=this.options.hoverCallback(a,this.options,b)),e=this.left+(a+.5)*this.width/this.data.length,[b,e]},d.prototype.drawXAxisLabel=function(a,b,c){var d;return d=this.raphael.text(a,b,c).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor)},d.prototype.drawBar=function(a,b,c,d,e){return this.raphael.rect(a,b,c,d).attr("fill",e).attr("stroke-width",0)},d}(b.Grid),b.Donut=function(c){function d(c){this.select=h(this.select,this),this.click=h(this.click,this);var d;if(!(this instanceof b.Donut))return new b.Donut(c);typeof c.element=="string"?this.el=a(document.getElementById(c.element)):this.el=a(c.element),this.options=a.extend({},this.defaults,c);if(this.el===null||this.el.length===0)throw new Error("Graph placeholder not found.");if(c.data===void 0||c.data.length===0)return;this.data=c.data,this.values=function(){var a,b,c,e;c=this.data,e=[];for(a=0,b=c.length;a<b;a++)d=c[a],e.push(parseFloat(d.value));return e}.call(this),this.redraw()}return g(d,c),d.prototype.defaults={colors:["#0B62A4","#3980B5","#679DC6","#95BBD7","#B0CCE1","#095791","#095085","#083E67","#052C48","#042135"],backgroundColor:"#FFFFFF",labelColor:"#000000",formatter:b.commas},d.prototype.redraw=function(){var a,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,u,v,w,x,y;this.el.empty(),this.raphael=new Raphael(this.el[0]),c=this.el.width()/2,d=this.el.height()/2,n=(Math.min(c,d)-10)/3,l=0,v=this.values;for(o=0,r=v.length;o<r;o++)m=v[o],l+=m;i=5/(2*n),a=1.9999*Math.PI-i*this.data.length,g=0,f=0,this.segments=[],w=this.values;for(e=p=0,s=w.length;p<s;e=++p)m=w[e],j=g+i+a*(m/l),k=new b.DonutSegment(c,d,n*2,n,g,j,this.options.colors[f%this.options.colors.length],this.options.backgroundColor,f,this.raphael),k.render(),this.segments.push(k),k.on("hover",this.select),k.on("click",this.click),g=j,f+=1;this.text1=this.drawEmptyDonutLabel(c,d-10,this.options.labelColor,15,800),this.text2=this.drawEmptyDonutLabel(c,d+10,this.options.labelColor,14),h=Math.max.apply(null,function(){var a,b,c,d;c=this.values,d=[];for(a=0,b=c.length;a<b;a++)m=c[a],d.push(m);return d}.call(this)),f=0,x=this.values,y=[];for(q=0,u=x.length;q<u;q++){m=x[q];if(m===h){this.select(f);break}y.push(f+=1)}return y},d.prototype.click=function(a){return this.fire("click",a,this.data[a])},d.prototype.select=function(a){var b,c,d,e,f,g;g=this.segments;for(e=0,f=g.length;e<f;e++)c=g[e],c.deselect();return d=this.segments[a],d.select(),b=this.data[a],this.setLabels(b.label,this.options.formatter(b.value,b))},d.prototype.setLabels=function(a,b){var c,d,e,f,g,h,i,j;return c=(Math.min(this.el.width()/2,this.el.height()/2)-10)*2/3,f=1.8*c,e=c/2,d=c/3,this.text1.attr({text:a,transform:""}),g=this.text1.getBBox(),h=Math.min(f/g.width,e/g.height),this.text1.attr({transform:"S"+h+","+h+","+(g.x+g.width/2)+","+(g.y+g.height)}),this.text2.attr({text:b,transform:""}),i=this.text2.getBBox(),j=Math.min(f/i.width,d/i.height),this.text2.attr({transform:"S"+j+","+j+","+(i.x+i.width/2)+","+i.y})},d.prototype.drawEmptyDonutLabel=function(a,b,c,d,e){var f;return f=this.raphael.text(a,b,"").attr("font-size",d).attr("fill",c),e!=null&&f.attr("font-weight",e),f},d}(b.EventEmitter),b.DonutSegment=function(a){function b(a,b,c,d,e,f,g,i,j,k){this.cx=a,this.cy=b,this.inner=c,this.outer=d,this.color=g,this.backgroundColor=i,this.index=j,this.raphael=k,this.deselect=h(this.deselect,this),this.select=h(this.select,this),this.sin_p0=Math.sin(e),this.cos_p0=Math.cos(e),this.sin_p1=Math.sin(f),this.cos_p1=Math.cos(f),this.is_long=f-e>Math.PI?1:0,this.path=this.calcSegment(this.inner+3,this.inner+this.outer-5),this.selectedPath=this.calcSegment(this.inner+3,this.inner+this.outer),this.hilight=this.calcArc(this.inner)}return g(b,a),b.prototype.calcArcPoints=function(a){return[this.cx+a*this.sin_p0,this.cy+a*this.cos_p0,this.cx+a*this.sin_p1,this.cy+a*this.cos_p1]},b.prototype.calcSegment=function(a,b){var c,d,e,f,g,h,i,j,k,l;return k=this.calcArcPoints(a),c=k[0],e=k[1],d=k[2],f=k[3],l=this.calcArcPoints(b),g=l[0],i=l[1],h=l[2],j=l[3],"M"+c+","+e+("A"+a+","+a+",0,"+this.is_long+",0,"+d+","+f)+("L"+h+","+j)+("A"+b+","+b+",0,"+this.is_long+",1,"+g+","+i)+"Z"},b.prototype.calcArc=function(a){var b,c,d,e,f;return f=this.calcArcPoints(a),b=f[0],d=f[1],c=f[2],e=f[3],"M"+b+","+d+("A"+a+","+a+",0,"+this.is_long+",0,"+c+","+e)},b.prototype.render=function(){var a=this;return this.arc=this.drawDonutArc(this.hilight,this.color),this.seg=this.drawDonutSegment(this.path,this.color,this.backgroundColor,function(){return a.fire("hover",a.index)},function(){return a.fire("click",a.index)})},b.prototype.drawDonutArc=function(a,b){return this.raphael.path(a).attr({stroke:b,"stroke-width":2,opacity:0})},b.prototype.drawDonutSegment=function(a,b,c,d,e){return this.raphael.path(a).attr({fill:b,stroke:c,"stroke-width":3}).hover(d).click(e)},b.prototype.select=function(){if(!this.selected)return this.seg.animate({path:this.selectedPath},150,"<>"),this.arc.animate({opacity:1},150,"<>"),this.selected=!0},b.prototype.deselect=function(){if(this.selected)return this.seg.animate({path:this.path},150,"<>"),this.arc.animate({opacity:0},150,"<>"),this.selected=!1},b}(b.EventEmitter)})).call(this);