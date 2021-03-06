var VimeoState={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3};
var g_srcVal, g_buffered;
videojs.Vimeo=videojs.MediaTechController.extend(
    {init:function(a,d,e){videojs.MediaTechController.call(this,a,d,e);
                            this.player_=a;
                            this.player_el_=document.getElementById(this.player_.id());
                            this.player_.controls(!1);
                            this.id_=this.player_.id()+"_vimeo_api";
                            this.el_=videojs.Component.prototype.createEl("iframe",{id:this.id_,className:"vjs-tech",scrolling:"no",marginWidth:0,marginHeight:0,frameBorder:0,webkitAllowFullScreen:"true",mozallowfullscreen:"true",allowFullScreen:"true"});
                            this.player_el_.insertBefore(this.el_,this.player_el_.firstChild);
                            this.baseUrl="https"==document.location.protocol?"https://secure.vimeo.com/video/":"http://player.vimeo.com/video/";this.vimeo={};this.vimeoInfo={};var h=this;
                            this.el_.onload=function(){h.onLoad()};
                            this.startMuted=a.options().muted;
                            this.src(g_srcVal || a.options().src)

                         }});

videojs.Vimeo.prototype.dispose=function(){
    if (this.vimeo) {
        if(this.vimeo.api)
            this.vimeo.api("unload");
        delete this.vimeo;
    }
        this.el_.parentNode.removeChild(this.el_);
        this.player_.controlBar.show();
        // videojs.MediaTechController.prototype.dispose.call(this);


};
videojs.Vimeo.prototype.src=function(a){  if(!a) throw new Error("KKK"); this.isReady_=!1;
    if(a.match(/^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/))

    {a =a.match(/^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/); this.videoId=a[5];

  videojs.Youtube.prototype.currentSrc = function(){ return this.srcVal; };

    } else if (a.indexOf('vimeo') != -1) { this.videoId = a.split('/');
    this.srcVal = a;

         this.videoId = this.videoId[this.videoId.length -1 ];}a={api:1,byline:0,portrait:0,show_title:0,show_byline:0,show_portait:0,fullscreen:1,player_id:this.id_,autoplay:this.player_.options().autoplay?1:0,loop:this.player_.options().loop?1:0};this.el_.src=this.baseUrl+this.videoId+"?"+videojs.Vimeo.makeQueryString(a)};videojs.Vimeo.prototype.load=function(){};
videojs.Vimeo.prototype.play=function(){this.vimeo.api("play")};videojs.Vimeo.prototype.pause=function(){this.vimeo.api("pause")};videojs.Vimeo.prototype.paused=function(){return this.lastState!==VimeoState.PLAYING&&this.lastState!==VimeoState.BUFFERING};videojs.Vimeo.prototype.currentTime=function(){return this.vimeoInfo.time||0};videojs.Vimeo.prototype.setCurrentTime=function(a){this.vimeo.api("seekTo",a);this.player_.trigger("timeupdate")};
videojs.Vimeo.prototype.duration=function(){return this.vimeoInfo.duration||0};videojs.Vimeo.prototype.buffered=function(){

    if (videojs.createTimeRange(0,this.vimeoInfo.buffered||0)) {
        g_buffered = videojs.createTimeRange(0,this.vimeoInfo.buffered||0);
        return g_buffered;
    } else {
        return g_buffered;
    }


};videojs.Vimeo.prototype.volume=function(){return this.vimeoInfo.muted?this.vimeoInfo.muteVolume:this.vimeoInfo.volume};videojs.Vimeo.prototype.setVolume=function(a){this.vimeo.api("setvolume",a);this.vimeoInfo.volume=a;this.player_.trigger("volumechange")};
videojs.Vimeo.prototype.muted=function(){return this.vimeoInfo.muted||!1};videojs.Vimeo.prototype.setMuted=function(a){a?(this.vimeoInfo.muteVolume=this.vimeoInfo.volume,this.setVolume(0)):this.setVolume(this.vimeoInfo.muteVolume);this.vimeoInfo.muted=a;this.player_.trigger("volumechange")};videojs.Vimeo.prototype.onReady=function(){this.isReady_=!0;this.triggerReady();this.startMuted&&(this.setMuted(!0),this.startMuted=!1)};
videojs.Vimeo.prototype.onLoad=function(){this.vimeo.api&&(this.vimeo.api("unload"),delete this.vimeo);this.vimeo=$f(this.el_);this.vimeoInfo={state:VimeoState.UNSTARTED,volume:1,muted:!1,muteVolume:1,time:0,duration:0,buffered:0,url:this.baseUrl+this.videoId,error:null};var a=this;this.vimeo.addEvent("ready",function(d){a.onReady()});this.vimeo.addEvent("loadProgress",function(d,e){a.onLoadProgress(d)});this.vimeo.addEvent("playProgress",function(d,e){a.onPlayProgress(d)});this.vimeo.addEvent("play",
function(d){a.onPlay()});this.vimeo.addEvent("pause",function(d){a.onPause()});this.vimeo.addEvent("finish",function(d){a.onFinish()});this.vimeo.addEvent("seek",function(d,e){a.onSeek(d)})};videojs.Vimeo.prototype.onLoadProgress=function(a){var d=!this.vimeoInfo.duration;this.vimeoInfo.duration=a.duration;this.vimeoInfo.buffered=a.percent;this.player_.trigger("progress");d&&this.player_.trigger("durationchange")};videojs.Vimeo.prototype.onPlayProgress=function(a){this.vimeoInfo.time=a.seconds;this.player_.trigger("timeupdate")};
videojs.Vimeo.prototype.onPlay=function(){this.vimeoInfo.state=VimeoState.PLAYING;this.player_.trigger("play")};


videojs.Vimeo.prototype.currentSrc = function(){ return this.srcVal; };



videojs.Vimeo.prototype.onPause=function(){this.vimeoInfo.state=VimeoState.PAUSED;this.player_.trigger("pause")};videojs.Vimeo.prototype.onFinish=function(){this.vimeoInfo.state=VimeoState.ENDED;this.player_.trigger("ended")};videojs.Vimeo.prototype.onSeek=function(a){this.vimeoInfo.time=a.seconds;this.player_.trigger("timeupdate");this.player_.trigger("seeked")};
videojs.Vimeo.prototype.onError=function(a){this.player_.error=a;this.player_.trigger("error")};videojs.Vimeo.isSupported=function(){return!0};videojs.Vimeo.prototype.supportsFullScreen=function(){return!1};videojs.Vimeo.canPlaySource=function(a){
    if(a)
    {
        if (a.src && a.src.indexOf('vimeo') !== -1) {
            g_srcVal = a.src;
            return true;
        } else if (typeof a === 'string' && a.indexOf('vimeo') !== -1) {
            g_srcVal = a;
            return true;
        }
        return false;
    }
    return false;
};videojs.Vimeo.makeQueryString=function(a){var d=[],e;for(e in a)a.hasOwnProperty(e)&&d.push(encodeURIComponent(e)+"="+encodeURIComponent(a[e]));return d.join("&")};
var Froogaloop=function(){function a(m){return new a.fn.init(m)}function d(a,c,b){if(!b.contentWindow.postMessage)return!1;var d=b.getAttribute("src").split("?")[0];a=JSON.stringify({method:a,value:c});"//"===d.substr(0,2)&&(d=window.location.protocol+d);b.contentWindow.postMessage(a,d)}function e(a){var c,b;try{c=JSON.parse(a.data),b=c.event||c.method}catch(d){}"ready"!=b||k||(k=!0);if(a.origin!=l)return!1;a=c.value;var e=c.data,g=""===g?null:c.player_id;c=g?f[g][b]:f[b];b=[];if(!c)return!1;void 0!==
a&&b.push(a);e&&b.push(e);g&&b.push(g);return 0<b.length?c.apply(null,b):c.call()}function h(a,c,b){b?(f[b]||(f[b]={}),f[b][a]=c):f[a]=c}var f={},k=!1,l="";a.fn=a.prototype={element:null,init:function(a){"string"===typeof a&&(a=document.getElementById(a));this.element=a;a=this.element.getAttribute("src");"//"===a.substr(0,2)&&(a=window.location.protocol+a);a=a.split("/");for(var c="",b=0,d=a.length;b<d;b++){if(3>b)c+=a[b];else break;2>b&&(c+="/")}l=c;return this},api:function(a,c){if(!this.element||
!a)return!1;var b=this.element,e=""!==b.id?b.id:null,f=c&&c.constructor&&c.call&&c.apply?null:c,g=c&&c.constructor&&c.call&&c.apply?c:null;g&&h(a,g,e);d(a,f,b);return this},addEvent:function(a,c){if(!this.element)return!1;var b=this.element,e=""!==b.id?b.id:null;h(a,c,e);"ready"!=a?d("addEventListener",a,b):"ready"==a&&k&&c.call(null,e);return this},removeEvent:function(a){if(!this.element)return!1;var c=this.element,b=""!==c.id?c.id:null;a:{if(b&&f[b]){if(!f[b][a]){b=!1;break a}f[b][a]=null}else{if(!f[a]){b=
!1;break a}f[a]=null}b=!0}"ready"!=a&&b&&d("removeEventListener",a,c)}};a.fn.init.prototype=a.fn;window.addEventListener?window.addEventListener("message",e,!1):window.attachEvent("onmessage",e);return window.Froogaloop=window.$f=a}();
