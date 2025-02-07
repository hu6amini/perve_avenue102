//Menuwrap Icons
function waitForElement(e,t){const n=new MutationObserver((i=>{for(const o of i)if("childList"===o.type&&document.querySelector(e)){n.disconnect(),t(document.querySelector(e));break}})),i=document.querySelector(".menuwrap");i&&n.observe(i,{childList:!0,subtree:!0})}function addIdsToMenuItems(e){const t=e.querySelector(".left");t&&(t.style.visibility="visible"),e.querySelectorAll(".left li.menu").forEach((e=>{const t=e.querySelector("a");if(t){const n=t.getAttribute("href"),i=(t.innerHTML.trim(),t.querySelector("span")?.innerHTML.trim());e.querySelector(".nick")?e.id="nick":"https://msg.forumcommunity.net/?act=Msg&CODE=01&c=655775"===n?e.id="messenger":"https://msg.forumcommunity.net/?act=UserCP&CODE=26&c=655775"===n?e.id="topics":"#notifications"===n?e.id="notif":e.querySelector('form[action="/?act=Mod"]')||["&nbsp;Moderation","&nbsp;Moderazione","&nbsp;Moderación","&nbsp;Modération","&nbsp;Mäßigung","&nbsp;Moderação"].includes(i)?e.id="mod":(["&nbsp;Administration","&nbsp;Amministrazione","&nbsp;Administración","&nbsp;Verwaltung","&nbsp;Administração"].includes(i)||"https://www.forumcommunity.net/?cid=655775"===n)&&(e.id="admin"),"&nbsp;Messenger"===i&&(e.id="messenger")}})),e.querySelectorAll(".left li:not(.menu)").forEach((e=>{const t=e.querySelector("a");t&&("HOME"===t.textContent.trim()?e.id="pahome":"/latestupdates"===t.getAttribute("href")&&(e.id="updates"))}))}waitForElement(".menuwrap",addIdsToMenuItems);
//Slideshow - non blocking !function(){const e=document.querySelector(".slider").children,t=document.querySelector(".prev"),n=document.querySelector(".next"),i=document.querySelector(".indicator");let c,r=0;function updateCircleIndicator(){const e=document.querySelector(".indicator .active");e&&e.classList.remove("active"),i.children[r]&&i.children[r].classList.add("active")}function nextSlide(){r=r===e.length-1?0:r+1,changeSlide()}function changeSlide(){for(let t of e)t.classList.remove("active");e[r]&&e[r].classList.add("active")}function resetTimer(){clearInterval(c),c=setInterval(autoPlay,4e3)}function autoPlay(){nextSlide(),updateCircleIndicator()}e.length>0&&i&&t&&n?function initializeSlider(){t.addEventListener("click",(()=>{r=0===r?e.length-1:r-1,changeSlide(),updateCircleIndicator(),resetTimer()})),n.addEventListener("click",(()=>{nextSlide(),updateCircleIndicator(),resetTimer()})),function createIndicatorCircles(){i.innerHTML="";for(let t=0;t<e.length;t++){const e=document.createElement("div");e.addEventListener("click",(()=>{r=t,changeSlide(),updateCircleIndicator(),resetTimer()})),e.id=t,0===t&&e.classList.add("active"),i.appendChild(e)}}(),resetTimer()}():console.warn("Slider elements not found. Ensure the .slider, .prev, .next, and .indicator elements are in place.")}();
//Image Async 
function addAsyncDecoding(){document.querySelectorAll("img").forEach(t=>{t.hasAttribute("decoding")||t.setAttribute("decoding","async"),t.hasAttribute("loading")||t.hasAttribute("data-src")||t.classList.contains("lazyload")||t.closest("#pa_slideshow")||t.setAttribute("loading","lazy")}),document.querySelectorAll("iframe:not([loading])").forEach(t=>t.setAttribute("loading","lazy"))}let debounceTimeout;function debounceMutation(){clearTimeout(debounceTimeout),debounceTimeout=setTimeout(()=>{addAsyncDecoding()},200)}const imasyncObserver=new MutationObserver(debounceMutation);imasyncObserver.observe(document.body,{childList:!0,subtree:!0,attributes:!1,characterData:!1});
//Enhancer

//Emojione 
function applyEmojiTransformation(e){e.classList.contains("[class*=e1a-]")||(e.innerHTML=emojione.toImage(emojione.shortnameToUnicode(emojione.toShort(e.innerHTML))))}function observeElements(e){document.querySelectorAll(e).forEach(applyEmojiTransformation);new MutationObserver((o=>{o.forEach((o=>{"childList"===o.type&&o.addedNodes.forEach((o=>{o.nodeType===Node.ELEMENT_NODE&&(o.matches(e)||o.querySelector(e))&&applyEmojiTransformation(o.matches(e)?o:o.querySelector(e))}))}))})).observe(document.body,{childList:!0,subtree:!0})}observeElements(".post .color,.post .quote span,.tmsg,.profile-interests,.web a,.mtitle,.notification-text,#loading .color,.color span");
//WYSIWYG Emojione const parentSelectors=["ul.List.st-editor-area.st-editor-area-desktop.st-editor-area-active","ul.list.st-editor-area.st-editor-area-desktop.st-editor-area-active"],editorSelector=".tiptap.ProseMirror";function waitForParent(e){return new Promise((t=>{const r=new MutationObserver((()=>{for(let o of e){const e=document.querySelector(o);if(e){r.disconnect(),t(e);break}}}));r.observe(document.body,{childList:!0,subtree:!0})}))}function placeCursorAfter(e){const t=document.createRange(),r=window.getSelection();t.setStartAfter(e),t.collapse(!0),r.removeAllRanges(),r.addRange(t)}function convertEmojis(e){e.querySelectorAll("p").forEach((e=>{if(""===e.textContent.trim())return;const t=emojione.toImage(e.innerHTML);if(t!==e.innerHTML){e.innerHTML="";const r=document.createElement("p");r.innerHTML=t,e.replaceWith(r),placeCursorAfter(r)}}))}waitForParent(parentSelectors).then((()=>{const e=document.querySelector(editorSelector);if(e){new MutationObserver((()=>convertEmojis(e))).observe(e,{childList:!0,subtree:!0,characterData:!0}),e.addEventListener("keyup",(()=>convertEmojis(e))),e.addEventListener("paste",(()=>{setTimeout((()=>convertEmojis(e)),0)})),convertEmojis(e)}}));
//Reply Counter
function processPostElements(){const e=document.querySelectorAll(".post"),t=(()=>{const e=new URLSearchParams(window.location.search);return parseInt(e.get("st")||0)+1})();e.forEach(((e,r)=>{createReplyCounter(e,t+r,"after")}))}function createReplyCounter(e,t,r){if(e.querySelector(".reply_counter"))return;const o=document.createElement("b");o.className="reply_counter",o.textContent="#"+t;const s=e.querySelector(".mini_buttons.rt.Sub");s&&("after"===r?s.appendChild(o):s.insertBefore(o,s.firstChild))}processPostElements();const postObserver=new MutationObserver((e=>{e.forEach((e=>{e.addedNodes.forEach((e=>{e.nodeType===Node.ELEMENT_NODE&&e.matches(".post")&&processPostElements()}))}))}));postObserver.observe(document.body,{childList:!0,subtree:!0});
//Favicons
function updateFaviconsForLinks(e){e.forEach((e=>{if(!(e.closest(".spoiler .code_top a")||e.closest(".fancyborder a")||e.closest(".quote_top a")||e.closest(".ve-content [data-type=mention]")||e.querySelector("img"))){var o=e.href.includes("youtu.be")?"https://www.google.com/s2/favicons?domain=youtube.com":"https://www.google.com/s2/favicons?domain="+e.href;e.style.backgroundImage="url('"+o+"')",e.style.backgroundSize="16px 16px",e.style.backgroundPosition="left center",e.style.backgroundRepeat="no-repeat",e.style.paddingLeft="19px",e.matches(".quote a, .tmsg a")&&(e.style.backgroundSize="14px 14px",e.style.paddingLeft="17px")}}))}updateFaviconsForLinks(document.querySelectorAll(".color a, span.tmsg a"));const faviconObserver=new MutationObserver((e=>{e.forEach((e=>{updateFaviconsForLinks(e.target.querySelectorAll(".color a, span.tmsg a"))}))}));faviconObserver.observe(document.body,{childList:!0,subtree:!0});
//Textarea Autogrow 
function resizeTextarea(){const e=document.querySelector("textarea#Post");function updateTextareaHeight(){e.style.height="0",e.style.height=e.scrollHeight+"px",e.style.maxHeight="650px"}e&&(updateTextareaHeight(),e.addEventListener("input",updateTextareaHeight),window.addEventListener("load",updateTextareaHeight),e.addEventListener("paste",(()=>{setTimeout(updateTextareaHeight,0)})))}resizeTextarea();const textareaObserver=new MutationObserver((e=>{e.forEach((e=>{e.addedNodes.forEach((e=>{e.nodeType===Node.ELEMENT_NODE&&e.matches("textarea#Post")&&resizeTextarea()}))}))}));textareaObserver.observe(document.body,{childList:!0,subtree:!0});
//Quote - non blocking 
function isInsideVeContentColor(e){return e.closest(".ve-content.color")!==null}function debounce(e,t){let n;return function(...i){clearTimeout(n),n=setTimeout(()=>e.apply(this,i),t)}}function expandQuotes(e){if(!isInsideVeContentColor(e)){const t=()=>{const n=e.querySelector(".quotebtn button");if(!n&&e.scrollHeight>170){e.style.maxHeight="170px",e.style.overflow="hidden";const i=document.createElement("div");i.className="quotebtn";const o=document.createElement("button");o.textContent="Show More...",i.appendChild(o),e.appendChild(i),o.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),e.style.transition="max-height 0.382s ease-in-out",e.style.maxHeight=e.scrollHeight+"px",i.style.display="none",setTimeout(()=>{e.style.maxHeight="none"},382)})}else n&&e.scrollHeight<=170&&(n.parentNode.remove(),e.style.maxHeight="none")};t(),resizeObserver.observe(e);const n=e.querySelector(".spoiler .code_top a");n&&n.addEventListener("click",()=>{e.style.maxHeight="none",resizeObserver.unobserve(e)})}}const resizeObserver=new ResizeObserver(debounce(e=>{e.forEach(e=>expandQuotes(e.target))},100)),quotes=document.querySelectorAll(".post .quote, #loading .quote");for(let e=0;e<quotes.length;e++)expandQuotes(quotes[e]);const quoteObserver=new MutationObserver(e=>{for(const t of e)for(const n of t.addedNodes)n.nodeType===Node.ELEMENT_NODE&&(n.matches(".quote")?expandQuotes(n):n.querySelectorAll(".quote").forEach(e=>expandQuotes(e)))});quoteObserver.observe(document.body,{childList:!0,subtree:!0});function modifyQuoteTop(e){if(!isInsideVeContentColor(e)){const t=e.textContent,n=e.querySelector("a");if(t.includes("@")){const i=t.replace(/(.*)\s*\(([^@]+)@[^)]+\)\s*/,"$2 said:");e.innerHTML=i,e.style.color="var(--mdcol)",n&&(e.appendChild(n),n.style.color="var(--mdcol)")}else{const t=e.querySelector(".quote_top b");t&&(t.style.opacity=1)}}}const quoteTops=document.querySelectorAll(".post .quote_top, #loading .quote_top");for(let e=0;e<quoteTops.length;e++)modifyQuoteTop(quoteTops[e]);const quoteTopObserver=new MutationObserver(e=>{for(const t of e)for(const n of t.addedNodes)n.nodeType===Node.ELEMENT_NODE&&n.querySelectorAll(".quote_top").forEach(e=>modifyQuoteTop(e))});quoteTopObserver.observe(document.body,{childList:!0,subtree:!0});
//Goto
let timeoutId;function scrollToSmooth(o){window.scrollTo({top:o,behavior:"smooth"})}function showGotoElement(o){o.classList.add("active"),o.style.zIndex="9999"}function hideGotoElement(o){o.classList.remove("active")}function initSmoothScrolling(){document.querySelector(".p_up").addEventListener("click",(()=>{scrollToSmooth(0)})),document.querySelector(".p_down").addEventListener("click",(()=>{scrollToSmooth(document.body.scrollHeight)}));const o=document.querySelector(".goto");window.addEventListener("scroll",(()=>{clearTimeout(timeoutId),showGotoElement(o),timeoutId=setTimeout((()=>{hideGotoElement(o)}),3e3)})),o.addEventListener("mouseenter",(()=>{clearTimeout(timeoutId),showGotoElement(o)})),o.addEventListener("mouseleave",(()=>{timeoutId=setTimeout((()=>{hideGotoElement(o)}),3e3)}))}initSmoothScrolling();const smoothScrollObserver=new MutationObserver((o=>{o.forEach((o=>{o.addedNodes.forEach((o=>{o.nodeType===Node.ELEMENT_NODE&&o.matches(".p_up, .p_down, .goto")&&initSmoothScrolling()}))}))}));smoothScrollObserver.observe(document.body,{childList:!0,subtree:!0});
//Gallery 
const postColors=document.querySelectorAll(".post .color");postColors.forEach(t=>{t.querySelectorAll('img:not(.emojione):not(.signature img):not([src^="https://img.forumfree.net/html/emoticons/new"]):not([src^="https://img.forumfree.net/html/mime_types"])').forEach(t=>{if(!(t.alt&&t.alt.startsWith(":")||"a"===t.parentNode.tagName.toLowerCase()&&t.src.startsWith("https://www.google.com/s2/favicons"))){const e=t.parentNode;if("a"===e.tagName.toLowerCase())t.classList.contains("lazyload")&&t.hasAttribute("data-src")?e.setAttribute("data-lightbox","gallery"):e.href!==t.src?e.setAttribute("href",t.src):e.setAttribute("data-lightbox","gallery");else{const o=document.createElement("a");o.href=t.src||t.getAttribute("data-src"),o.setAttribute("data-lightbox","gallery"),e.insertBefore(o,t),o.appendChild(t)}}}),lightGallery(t,{selector:'a[data-lightbox="gallery"]'})});
//Youtube iframe
function replaceYouTubeFrames(){document.querySelectorAll('iframe[src*="youtube.com/embed/"]').forEach((function(e){var t=e.src.split("/").pop().split("?")[0],a=e.src.match(/[?&]start=([^&]*)/),l=a?a[1]:null;fetch("https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+t+"&key=AIzaSyCFhniclB06-OF1kOeL6t0g-KF7_qYVslI").then((e=>e.json())).then((a=>{var r=a.items[0].snippet.title,o=a.items[0].snippet.thumbnails,s=o.maxres?o.maxres.url:o.standard?o.standard.url:o.medium?o.medium.url:"",i=document.createElement("img");i.src=s,i.width="560",i.height="315",i.alt="YouTube Video Thumbnail";var n=document.createElement("span");n.textContent=r;var c=document.createElement("button");c.className="ytp-button",c.setAttribute("aria-label","Play"),c.setAttribute("title","Play"),c.style.width="68px",c.style.height="48px",c.style.background="none",c.style.border="none",c.style.position="absolute",c.style.top="50%",c.style.left="50%",c.style.transform="translate(-50%, -50%)",c.innerHTML='<svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path class="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>';var p=document.createElement("div");p.className="res_tmb",p.appendChild(i),p.appendChild(n),p.appendChild(c),p.onclick=function(){var e=document.createElement("iframe");e.width="560",e.height="315",e.src="https://www.youtube.com/embed/"+t+"?autoplay=1",e.title="YouTube video player",e.frameborder="0",e.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",e.allowFullscreen="true",l&&(e.src+="&start="+l),p.parentNode.replaceChild(e,p)},e.parentNode.replaceChild(p,e)})).catch((e=>console.error(e)))}))}replaceYouTubeFrames();
//Pamedia
const videoPlatforms=["anchor.fm","bitchute.com","dailymotion.com","gfycat.com","drive.google.com","imgur.com","archive.org","sendvid.com","store.steampowered.com","streamable.com","tiktok.com","tumblr.com","vimeo.com","vk.com","youtube.com"];function isVideoIframe(e){if(!e.src)return!1;const a=videoPlatforms.some((a=>e.src.includes(a))),o=e.hasAttribute("allowfullscreen");return a||o}function wrapIframe(e){let a=e.parentElement;if(!(a&&a.classList&&a.classList.contains("pamedia")))if(a&&"DIV"===a.tagName){const e=document.createElement("div");e.className="pamedia",a.replaceWith(e),e.appendChild(a)}else{const a=document.createElement("div");a.className="pamedia",e.replaceWith(a),a.appendChild(e)}}function processIframes(){document.querySelectorAll("iframe").forEach((e=>{isVideoIframe(e)&&!e.closest(".pamedia")&&wrapIframe(e)}))}let lastMutationTime=0;const videoIframeObserver=new MutationObserver((e=>{const a=Date.now();a-lastMutationTime<100||(lastMutationTime=a,e.forEach((e=>{e.addedNodes.forEach((e=>{if("IFRAME"===e.tagName&&isVideoIframe(e))wrapIframe(e);else if(e.querySelectorAll){e.querySelectorAll("iframe").forEach((e=>{isVideoIframe(e)&&!e.closest(".pamedia")&&wrapIframe(e)}))}}))})))}));videoIframeObserver.observe(document.body,{childList:!0,subtree:!0}),processIframes();
//Skin
const root=document.documentElement,button=document.getElementById("theme-toggle-button");button.addEventListener("click",(()=>{"second"===root.getAttribute("data-theme")?(root.removeAttribute("data-theme"),localStorage.removeItem(storageKey)):(root.setAttribute("data-theme","second"),localStorage.setItem(storageKey,"second"))}));
//Profile Tooltips

//Clickable Images 
function createCustomDialog(){const e=document.querySelector(".imgen-backdrop"),t=document.querySelector(".imgen"),n=document.querySelector(".imgen-alert");if(t){t.style.display="block",e.style.display="block",n.style.display="none";const a=t.querySelector("input");a&&a.focus()}else{const e=document.createElement("div");e.className="imgen",e.style.zIndex=9999;const t=document.createElement("div");t.className="imgen-backdrop",t.addEventListener("click",(()=>{e.style.display="none",t.style.display="none",document.querySelector(".imgen-alert").style.display="none",document.querySelector(".imgen input").value=""}));const n=document.createElement("div");n.className="header",n.innerHTML='<i class="fa-regular fa-image"></i> Generate Image Thumbnail',e.appendChild(n);const a=document.createElement("div");a.className="imgen-alert",a.innerHTML='<i class="fa-regular fa-circle-exclamation"></i> Please enter a valid URL',e.appendChild(a),a.style.display="none";const l=document.createElement("input");l.type="text",l.placeholder="Insert image link...",l.setAttribute("aria-label","Image URL"),e.appendChild(l);const c=document.createElement("button");c.className="codebuttons",c.textContent="INSERT",c.addEventListener("click",(()=>{const n=l.value;validateImageURL(n,(c=>{if(c){const a=new Image;a.onload=function(){const container=document.createElement("div");container.classList.add("lz-container"),container.setAttribute("width",a.width),container.setAttribute("height",a.height);const anchor=document.createElement("a");anchor.target="_blank",anchor.href=n;const img=document.createElement("img");img.className="color_img lazyload",img.setAttribute("data-src",n),img.setAttribute("decoding","async"),img.setAttribute("height",a.height),img.setAttribute("width",a.width),anchor.appendChild(img),container.appendChild(anchor),tag(container.outerHTML,""),triggerInputEvent(),e.style.display="none",t.style.display="none",l.value=""},a.src=n}else a.style.display="block"}))})),e.appendChild(c),c.setAttribute("aria-label","Insert"),l.addEventListener("click",(()=>{l.select()})),document.body.appendChild(t),document.body.appendChild(e),e.style.display="block",l.focus()}}function triggerInputEvent(){const e=document.querySelector("textarea#Post");if(e){const t=new Event("input",{bubbles:!0,cancelable:!0});e.dispatchEvent(t)}}function validateImageURL(e,t){const n=new Image;n.src=e,n.onload=()=>{t(!0)},n.onerror=()=>t(!1)}function tag_image(){createCustomDialog()}if(document.URL.includes("?act=Post")||document.URL.includes("?t="));else{const e=document.querySelector('.codebuttons[value*="IMG"]');e&&e.addEventListener("click",tag_image)}
//Link Generator
let linkgenInput;function createCustomLinkDialog(){const e=document.querySelector(".linkgen"),n=document.querySelector(".linkgen-backdrop"),t=document.querySelector(".linkgen-alert");if(e)e.style.display="block",n.style.display="block",t.style.display="none",linkgenInput.value="",linkgenInput.focus();else{const e=document.createElement("div");e.className="linkgen",e.style.zIndex=9999;const n=document.createElement("div");n.className="header",n.innerHTML='<i class="fa-regular fa-link"></i> Generate Link',e.appendChild(n);const t=document.createElement("div");t.className="linkgen-alert",t.innerHTML='<i class="fa-regular fa-circle-exclamation"></i> Please enter a valid URL',t.style.display="none";const l=document.createElement("div");l.className="linkgen-backdrop",l.addEventListener("click",(function(){e.style.display="none",l.style.display="none",linkgenInput.value="",a.value="",t.style.display="none"})),linkgenInput=document.createElement("input"),linkgenInput.type="text",linkgenInput.placeholder="Insert link...",linkgenInput.setAttribute("aria-label","URL"),linkgenInput.addEventListener("click",(function(){linkgenInput.value&&linkgenInput.select()}));const a=document.createElement("input");a.type="text",a.placeholder="Custom text...",a.setAttribute("aria-label","Custom Text");const i=document.createElement("button");i.className="codebuttons",i.textContent="INSERT",i.addEventListener("click",(function(){const n=linkgenInput.value,i=a.value;if(isValidURL(n)&&!containsHTMLorBBCode(n)){let t="";t=i?'<a target="_blank" href="'+n+'">'+i+"</a>":'<a target="_blank" href="'+n+'">'+n+"</a>",tag(t,""),triggerInputEvent(),e.style.display="none",l.style.display="none",linkgenInput.value="",a.value=""}else t.style.display="block"})),e.appendChild(t),e.appendChild(linkgenInput),e.appendChild(a),e.appendChild(i),document.body.appendChild(e),document.body.appendChild(l),e.style.display="block",linkgenInput.focus()}}function triggerInputEvent(){const e=document.querySelector("textarea#Post");if(e){const n=new Event("input",{bubbles:!0,cancelable:!0});e.dispatchEvent(n)}}function isValidURL(e){return/^https?:\/\/|^ftp:\/\//.test(e)}function containsHTMLorBBCode(e){return/<[^>]+>|\[.*?\]/.test(e)}const urlButton=document.querySelector('input[accesskey="w"]');urlButton&&(urlButton.removeAttribute("onclick"),urlButton.addEventListener("click",(function(){createCustomLinkDialog()})));
//HTML Colors
var colors=["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","BlanchedAlmond","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkCyan","DarkGoldenRod","DarkGray","DarkKhaki","Darkorange","DarkSalmon","DarkSeaGreen","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DodgerBlue","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","GreenYellow","HoneyDew","HotPink","IndianRed","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","MediumAquaMarine","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MintCream","MistyRose","Moccasin","NavajoWhite","OldLace","Olive","OliveDrab","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","RosyBrown","RoyalBlue","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","WhiteSmoke","YellowGreen"];document.querySelectorAll('.send select[title="Insert Font Color tags"]').forEach((function(e){colors.forEach((function(l){var o=document.createElement("option");o.text=l,o.value=l,o.style.color=l,e.add(o)}))}));var selectElement=document.querySelector(".tag select.codebuttons");selectElement&&colors.forEach((function(e){var l=document.createElement("option");l.text=e,l.value=e,l.style.color=e,selectElement.add(l)})); 
//Preview 
function handleLoadingElement(){document.querySelectorAll(".send").forEach((e=>{var n=e.querySelectorAll("ul li.Item");if(n.length>=2){var t=document.getElementById("loading");t&&n[1].appendChild(t)}}))}const preview=new MutationObserver((e=>{e.forEach((e=>{e.addedNodes.length>0&&e.target.querySelector(".send")&&handleLoadingElement()}))}));preview.observe(document.body,{childList:!0,subtree:!0}),handleLoadingElement();
//Fast Send Buttons 
var e=document.createElement('select');e.title="Insert Font Size tags",e.className="codebuttons",e.setAttribute('onchange',"tag('[size='+this.options[this.selectedIndex].value+']','[/size]'); this.selectedIndex=0");var t=[{value:"0",text:"SIZE"},{value:"2",text:"Very Small"},{value:"3.5",text:"Small"},{value:"5",text:"Regular"},{value:"8",text:"Large"},{value:"12.5",text:"Extra Large"}];t.forEach(function(t){var n=document.createElement('option');n.value=t.value,n.textContent=t.text,e.appendChild(n)});var n=document.querySelector('.fast.send select[title="Insert Font Color tags"]');n&&n.parentNode.insertBefore(e,n);var o=document.querySelector('#send .send select[title="Insert Font Size tags"]');o&&(o.innerHTML='',t.forEach(function(e){var t=document.createElement('option');t.value=e.value,t.textContent=e.text,o.appendChild(t)}));var i=`<button type="button" accesskey="s" title="Insert Strikethrough Text (alt + s)" onclick="tag('<del>','</del>')" class="codebuttons"><del>&nbsp;S&nbsp;</del></button><button type="button" accesskey="a" title="Insert superscript (alt + a)" onclick="tag('<sup>','</sup>')" class="codebuttons">&nbsp;x²<span style="font-size:6px">&nbsp;</span></button><button type="button" accesskey="p" title="Insert subscript (alt + p)" onclick="tag('<sub>','</sub>')" class="codebuttons">&nbsp;x<span style="position:relative;top:0.5em">²</span><span style="font-size:6px">&nbsp;</span></button><button type="button" accesskey="l" title="Create a list (alt + l)" onclick="tag_list()" class="codebuttons"><img src="https://img.forumfree.net/index_file/bb_ol.gif" style="width:22px;height:14px" alt=""></button>`;var c=document.querySelector('.fast.send button[title="Insert Underlined Text (alt + u)"]');c&&c.insertAdjacentHTML('afterend',i);var a=document.createElement('select');a.title="Insert Font Face tags",a.className="codebuttons",a.setAttribute('onchange',"tag('[font='+this.options[this.selectedIndex].value+']','[/font]'); this.selectedIndex=0");var r=[{value:"0",text:"FONT"},{value:"Arial",text:"Arial"},{value:"Times",text:"Times"},{value:"Courier",text:"Courier"},{value:"Impact",text:"Impact"},{value:"Geneva",text:"Geneva"},{value:"Optima",text:"Optima"}];r.forEach(function(e){var t=document.createElement('option');t.value=e.value,t.textContent=e.text,a.appendChild(t)});var l=document.querySelector('.fast.send input[type="button"][accesskey="t"][value="@Tag"]');l&&l.insertAdjacentElement('afterend',a);
//Loader Icon
function replaceElements(){document.querySelectorAll(".emoji_loading").forEach((e=>{"&nbsp;"===e.innerHTML.trim()&&(e.innerHTML='<i class="fa-regular fa-loader fa-spin"></i>')})),document.querySelectorAll("img").forEach((e=>{if("https://img.forumfree.net/index_file/loads3.gif"===e.src){const t=document.createElement("i");t.className="fa-regular fa-loader fa-spin",e.replaceWith(t)}})),document.querySelectorAll(".st-emoji-spinner-border").forEach((e=>{const t=document.createElement("i");t.className="fa-regular fa-loader fa-spin",e.replaceWith(t)}));const e=document.querySelector("#notifications-more");if(e&&!e.querySelector(".fa-spin")){const t=document.createElement("i");t.className="fa-regular fa-loader fa-spin",e.appendChild(t)}const t=document.querySelector("#popupmod");if(t){const e=t.querySelector("#Cronmod");if(e){const t=e.querySelector('img[src="https://img.forumfree.net/index_file/load.gif"]');if(t){const e=document.createElement("i");e.className="fa-regular fa-loader fa-spin",t.replaceWith(e)}}}}function waitForElement(e,t){const r=new MutationObserver((o=>{for(const n of o)if("childList"===n.type&&document.querySelector(e)){r.disconnect(),t(document.querySelector(e));break}})),o=document.body;r.observe(o,{childList:!0,subtree:!0});const n=document.querySelector(e);n&&(r.disconnect(),t(n))}replaceElements();const dynamicLoadingObserver=new MutationObserver((e=>{let t=!1;e.forEach((e=>{"childList"===e.type&&e.addedNodes.length&&(t=!0)})),t&&replaceElements()}));dynamicLoadingObserver.observe(document.body,{childList:!0,subtree:!0});
//Attachment Preview 
const fileInput=document.querySelector('body#send #attach input[name="FILE_UPLOAD"]');if(fileInput){const e=document.createElement("div");e.id="attachments-preview",e.style.marginTop="12px",e.style.textAlign="center",e.style.display="flex",fileInput.closest("td").appendChild(e),fileInput.addEventListener("change",(()=>{e.innerHTML="";const t=fileInput.files;if(t&&t.length>0)Array.from(t).forEach((t=>{if(t.type.startsWith("image/")){const n=new FileReader;n.onload=n=>{const l=document.createElement("img");l.src=n.target.result,l.alt=t.name,l.style.maxWidth="100px",l.style.maxHeight="100px",l.style.borderRadius="4px",l.title=t.name,e.appendChild(l)},n.readAsDataURL(t)}else{const n=document.createElement("i");n.className="fa-regular fa-file-zipper",n.style.fontSize="66px",n.style.color="var(--mdcol)",n.style.margin="10px";const l=document.createElement("p");l.textContent=t.name,l.style.fontSize=".875rem",l.style.margin="0";const a=document.createElement("div");a.style.display="inline-block",a.style.textAlign="center",a.style.margin="0",a.appendChild(n),a.appendChild(l),e.appendChild(a)}}));else{const t=document.createElement("p");t.textContent="No file selected.",e.appendChild(t)}}))}
//Tooltips
function waitForElement(t,e,i=1e4){const o=Date.now(),checkForElement=()=>{const n=document.querySelectorAll(t);n.length>0?n.forEach(e):Date.now()-o<i?requestAnimationFrame(checkForElement):console.warn('Element with selector "'+t+'" did not appear within '+i+"ms.")};checkForElement()}function initTippy(t){t._tippy||tippy(t,{placement:"bottom",theme:"dark",animation:"fade",offset:[0,10],observe:!0,arrow:!1,onCreate(t){t.popper.classList.add("tippy-custom")}})}function addTooltip(t){waitForElement(t,(t=>{if(!t.hasAttribute("data-tippy-content")&&t.getAttribute("title")){const e=t.getAttribute("title");t.setAttribute("data-tippy-content",e),t.removeAttribute("title")}initTippy(t)}))}const tooltipObserver=new MutationObserver((t=>{t.forEach((t=>{t.addedNodes.forEach((t=>{t.nodeType===Node.ELEMENT_NODE&&t.hasAttribute("data-tippy-content")&&initTippy(t)}))}))}));function isMobileDevice(){return window.matchMedia("(max-width: 768px)").matches}isMobileDevice()||(tooltipObserver.observe(document.body,{childList:!0,subtree:!0}),waitForElement("body",(()=>{addTooltip(".st-editor-toggle"),addTooltip('button[name="full"]'),addTooltip("#preview_button"),waitForElement('.top-button .topbutton input[type="submit"]',(t=>{const e=t.closest("form").querySelector('input[type="submit"]').value,i=t.closest(".top-button");i.setAttribute("data-tippy-content",e),initTippy(i)})),waitForElement("#mark-send button",(t=>{t.setAttribute("data-tippy-content","Find"),initTippy(t)})),waitForElement('.menuwrap a[href="#notifications"]',(t=>{t.setAttribute("data-tippy-content","Notifications"),initTippy(t)})),waitForElement(".menuwrap a.st-emoji-link-void.st-emoji-notice-modal-toggle",(t=>{t.setAttribute("data-tippy-content","Reactions"),initTippy(t)})),waitForElement(".navsub .lastpost a",(t=>{t.setAttribute("data-tippy-content","Go to first unread post"),initTippy(t)})),waitForElement(".navsub .last a",(t=>{t.setAttribute("data-tippy-content","Go to last page"),initTippy(t)})),waitForElement(".navsub .first a",(t=>{t.setAttribute("data-tippy-content","Go to first page"),initTippy(t)})),waitForElement('.big_list .zz input[type="checkbox"]',(t=>{t.setAttribute("data-tippy-content","Select topic"),initTippy(t)})),waitForElement('#send .send .darkbar button[name="preview"]',(t=>{t.setAttribute("data-tippy-content","Preview"),initTippy(t)})),waitForElement(".menuwrap .log",(t=>{t.setAttribute("data-tippy-content","Log in"),initTippy(t)})),waitForElement('.tag img[alt="x"]',(t=>{t.setAttribute("data-tippy-content","Delete"),t.removeAttribute("title"),initTippy(t)})),addTooltip('.menuwrap a[href="#notifications"]'),addTooltip(".menuwrap a.st-emoji-link-void.st-emoji-notice-modal-toggle"),addTooltip(".menuwrap .log"),addTooltip('#send .send .darkbar button[name="preview"]'),addTooltip(".navsub .lastpost a"),addTooltip(".navsub .last a"),addTooltip(".navsub .first a"),addTooltip('.big_list .zz input[type="checkbox"]'),addTooltip('#send .send .right.Sub img[alt="File Attachments"]'),addTooltip('.tag img[alt="x"]'),addTooltip('.post .title2.bottom .right.Item.Justify .rt.Sub input[type="checkbox"],.post .title2.bottom .right.Item.Justify .rt.Sub label'),addTooltip('#send .send button[name="preview"]'),addTooltip(".post .title2.top .right img.bullet_delete"),addTooltip('#send .send .right.Sub img[data-emojipicker="#Post"]');document.querySelectorAll("[data-tippy-content]").forEach((t=>{initTippy(t)}))})));

$(document).ready(function() {
    // Remove the inner <span> (e.g., "Posted on") in .post .when elements
    $('.post .when span').each(function() {
        $(this).remove();  // Remove the inner span
    });

    // Select all the '.post .when' elements
    $('.post .when, .big_list .when').each(function() {
        var dateText = $(this).text().trim();  // Get the text content and trim extra spaces
        var formattedDate;

        // Check if the date follows US format (MM/DD/YYYY, HH:MM AM/PM)
        var usDatePattern = /(\d{1,2})\/(\d{1,2})\/(\d{4}),\s*(\d{1,2}):(\d{2})\s*(AM|PM)/;

        // Check for European format (DD/MM/YYYY, HH:MM)
        var europeanDatePattern = /(\d{1,2})\/(\d{1,2})\/(\d{4}),\s*(\d{2}):(\d{2})/;

        // Check for YYYY/MM/DD HH:MM format (e.g., 2025/01/25 20:50)
        var customDatePattern = /(\d{4})\/(\d{1,2})\/(\d{1,2})\s*(\d{2}):(\d{2})/;

        // Check for ISO format (YYYY-MM-DDTHH:mm:ss)
        var isoDatePattern = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;

        // Check for RFC 2822 format (e.g., Fri, 25 Jan 2025 14:30:00 +0000)
        var rfc2822DatePattern = /([A-Za-z]+),\s*(\d{1,2})\s([A-Za-z]+)\s(\d{4})\s(\d{2}):(\d{2}):(\d{2})\s([+\-]\d{4})/;

        // Check for Hebrew format (e.g., 25 Tevet 5785)
        var hebrewDatePattern = /(\d{1,2})\s([A-Za-z]+)\s(\d{4})/;

        // Check for Japan/Chinese format (e.g., 2025年01月25日)
        var japanChineseDatePattern = /(\d{4})年(\d{2})月(\d{2})日/;

        // Check for Cyrillic month names (e.g., 25 Января 2025)
        var cyrillicMonthDatePattern = /(\d{1,2})\s([А-Яа-я]+)\s(\d{4})/;

        // Check for Spanish month names (e.g., 25 enero 2025)
        var spanishMonthDatePattern = /(\d{1,2})\s([a-zA-Z]+)\s(\d{4})/;

        // Check for Russian short format (DD-МММ-YY HH:MM)
        var russianShortPattern = /(\d{1,2})-(\p{L}{3})-(\d{2})\s*(\d{2}):(\d{2})/u;

        // Handle US format
        if (usDatePattern.test(dateText)) {
            var match = usDatePattern.exec(dateText);
            var month = match[1];
            var day = match[2];
            var year = match[3];
            var hour = match[4];
            var minute = match[5];
            var ampm = match[6];
            if (ampm === 'PM' && hour < 12) {
                hour = parseInt(hour) + 12;
            } else if (ampm === 'AM' && hour === '12') {
                hour = 0;
            }
            formattedDate = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':00';
        }
        // Handle European format
        else if (europeanDatePattern.test(dateText)) {
            var match = europeanDatePattern.exec(dateText);
            var day = match[1];
            var month = match[2];
            var year = match[3];
            var hour = match[4];
            var minute = match[5];
            formattedDate = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':00';
        }
        // Handle custom format
        else if (customDatePattern.test(dateText)) {
            var match = customDatePattern.exec(dateText);
            var year = match[1];
            var month = match[2];
            var day = match[3];
            var hour = match[4];
            var minute = match[5];
            formattedDate = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':00';
        }
        // Handle ISO format
        else if (isoDatePattern.test(dateText)) {
            var match = isoDatePattern.exec(dateText);
            formattedDate = dateText;  // It's already in ISO format
        }
        // Handle RFC 2822 format
        else if (rfc2822DatePattern.test(dateText)) {
            var match = rfc2822DatePattern.exec(dateText);
            var day = match[2];
            var month = match[3];
            var year = match[4];
            var hour = match[5];
            var minute = match[6];
            var second = match[7];
            formattedDate = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + ':00';
        }
        // Handle Hebrew format
        else if (hebrewDatePattern.test(dateText)) {
            var match = hebrewDatePattern.exec(dateText);
            var day = match[1];
            var month = match[2];
            var year = match[3];
            formattedDate = year + '-' + month + '-' + day + 'T00:00:00';
        }
        // Handle Japan/Chinese format
        else if (japanChineseDatePattern.test(dateText)) {
            var match = japanChineseDatePattern.exec(dateText);
            var year = match[1];
            var month = match[2];
            var day = match[3];
            formattedDate = year + '-' + month + '-' + day + 'T00:00:00';
        }
        // Handle Cyrillic month format (Russian/Arabic)
        else if (cyrillicMonthDatePattern.test(dateText)) {
            var match = cyrillicMonthDatePattern.exec(dateText);
            var day = match[1];
            var month = match[2];
            var year = match[3];
            formattedDate = year + '-' + month + '-' + day + 'T00:00:00';
        }
        // Handle Spanish month format (Latin America)
        else if (spanishMonthDatePattern.test(dateText)) {
            var match = spanishMonthDatePattern.exec(dateText);
            var day = match[1];
            var month = match[2];
            var year = match[3];
            // Convert the month name to lowercase and capitalize it for consistency
            var monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
            var monthIndex = monthNames.indexOf(month.toLowerCase());
            month = (monthIndex + 1).toString().padStart(2, '0');  // Convert to two-digit format
            formattedDate = year + '-' + month + '-' + day + 'T00:00:00';
        }
        // Handle Russian short format
        else if (russianShortPattern.test(dateText)) {
            var match = russianShortPattern.exec(dateText);
            var day = match[1];
            var month = match[2];
            var year = match[3];
            var hour = match[4];
            var minute = match[5];

            // Russian month names mapping
            var russianMonths = {
                'Янв': '01',
                'Фев': '02',
                'Мар': '03',
                'Апр': '04',
                'Май': '05',
                'Июн': '06',
                'Июл': '07',
                'Авг': '08',
                'Сен': '09',
                'Окт': '10',
                'Ноя': '11',
                'Дек': '12'
            };

            var numericMonth = russianMonths[month] || '01';  // Default to January if not found
            year = '20' + year;  // Convert to full year
            formattedDate = year + '-' + numericMonth + '-' + day + 'T' + hour + ':' + minute + ':00';
        }

        // Only update the element if a valid date format is found
        if (formattedDate) {
            var timeElement = $('<time>').attr('datetime', formattedDate).text(dateText);
            $(this).html(timeElement);
        }
    });

    // Initialize timeago on elements with the datetime attribute
    $('time').timeago();
});
