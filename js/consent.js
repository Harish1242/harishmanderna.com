(function(){
  var ID="G-CJCDGPCC2Q",KEY="hm_cookie_consent";
  function loadGA(){
    if(window.__gaLoaded)return;window.__gaLoaded=true;
    var s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+ID;document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};
    gtag("js",new Date());gtag("config",ID,{anonymize_ip:true});
  }
  var v=null;try{v=localStorage.getItem(KEY);}catch(e){}
  if(v==="accepted"){loadGA();return;}
  if(v==="declined")return;
  function show(){
    var b=document.createElement("div");b.id="cookie-banner";b.setAttribute("role","dialog");b.setAttribute("aria-label","Cookie consent");
    b.style.cssText="position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:640px;margin:0 auto;background:#fff;color:#0b1f3a;border:1px solid #C9A23F;border-radius:10px;box-shadow:0 8px 30px rgba(11,31,58,.15);padding:16px 18px;font:14px/1.5 inherit;display:flex;flex-wrap:wrap;gap:12px;align-items:center";
    b.innerHTML='<p style="margin:0;flex:1 1 320px">I use optional analytics cookies to understand how visitors use this site. They load only if you accept. See the <a href="legal.html" style="color:#0b1f3a;text-decoration:underline">privacy notice</a>.</p><div style="display:flex;gap:8px"><button type="button" data-c="declined" style="padding:8px 14px;border:1px solid #0b1f3a;background:#fff;color:#0b1f3a;border-radius:6px;cursor:pointer">Decline</button><button type="button" data-c="accepted" style="padding:8px 14px;border:1px solid #C9A23F;background:#C9A23F;color:#0b1f3a;border-radius:6px;cursor:pointer;font-weight:600">Accept</button></div>';
    b.addEventListener("click",function(e){var c=e.target.getAttribute&&e.target.getAttribute("data-c");if(!c)return;try{localStorage.setItem(KEY,c);}catch(x){}b.remove();if(c==="accepted")loadGA();});
    document.body.appendChild(b);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",show);else show();
})();
