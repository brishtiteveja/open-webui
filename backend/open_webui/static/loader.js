/* DGX Spark: "Decision models" tab for Open WebUI.
   Installed into the container's /static/loader.js by owui/install-loader.sh.
   Adds one edge tab; clicking it opens the router's /decisions panel in an
   overlay (same origin, so the panel reuses the Open WebUI admin session). */
(function () {
  if (window.__dgxDecisionTab || window.top !== window.self) return;
  window.__dgxDecisionTab = true;
  var css = document.createElement('style');
  css.textContent =
    '#dgx-dm-tab{position:fixed;right:0;top:42%;z-index:9998;writing-mode:vertical-rl;' +
    'background:#2f6f4f;color:#fff;border:0;border-radius:8px 0 0 8px;padding:12px 7px;' +
    'font:600 12px system-ui,sans-serif;letter-spacing:.03em;cursor:pointer;opacity:.9;box-shadow:0 1px 6px rgba(0,0,0,.25)}' +
    '#dgx-dm-tab:hover{opacity:1}' +
    '#dgx-dm-ov{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.45);display:none}' +
    '#dgx-dm-box{position:absolute;top:2vh;bottom:2vh;right:1vw;width:min(1150px,98vw);background:#fff;' +
    'border-radius:12px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,.4)}' +
    '#dgx-dm-box iframe{width:100%;height:100%;border:0;display:block}' +
    '#dgx-dm-x{position:absolute;top:8px;right:12px;z-index:2;width:32px;height:32px;border-radius:16px;border:0;' +
    'background:rgba(0,0,0,.55);color:#fff;font-size:18px;line-height:32px;cursor:pointer}';
  function build() {
    if (document.getElementById('dgx-dm-tab')) return;
    document.head.appendChild(css);
    var tab = document.createElement('button');
    tab.id = 'dgx-dm-tab'; tab.type = 'button'; tab.textContent = 'Decision models';
    tab.title = 'Decision models, unload and swap lock';
    var ov = document.createElement('div'); ov.id = 'dgx-dm-ov';
    var box = document.createElement('div'); box.id = 'dgx-dm-box';
    var x = document.createElement('button'); x.id = 'dgx-dm-x'; x.type = 'button';
    x.textContent = '×'; x.setAttribute('aria-label', 'Close decision models');
    var frame = null;
    function open() {
      if (!frame) { frame = document.createElement('iframe'); frame.title = 'Decision models'; box.appendChild(frame); }
      frame.src = '/decisions'; ov.style.display = 'block';
    }
    function close() { ov.style.display = 'none'; }
    tab.addEventListener('click', open);
    x.addEventListener('click', close);
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    box.appendChild(x); ov.appendChild(box);
    document.body.appendChild(tab); document.body.appendChild(ov);
  }
  if (document.body) build(); else document.addEventListener('DOMContentLoaded', build);
})();
