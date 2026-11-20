/*
 * Busuanzi visitor counter (corrected for anzhiyu theme).
 * The cdn.busuanzi.cc abbr script returns keys WITHOUT the "_value_" prefix
 * (e.g. busuanzi_site_uv), but the theme renders elements WITH the prefix
 * (busuanzi_value_site_uv). That mismatch left the loading spinner forever.
 * This self-hosted script maps the API response to the theme's standard IDs
 * and replaces the spinner with the returned value (raw, as-is).
 */
(function () {
  // Cache each URL's counts for the page session (handles PJAX navigations).
  // PJAX swaps render fresh spinner elements, so on revisit the cached values
  // must be re-applied — skipping the fetch alone would leave the new spinner.
  window.__busuanziData = window.__busuanziData || {};

  var API = 'https://cdn.busuanzi.cc/abbr-api.php';

  var map = {
    busuanzi_site_uv: 'busuanzi_value_site_uv',
    busuanzi_site_pv: 'busuanzi_value_site_pv',
    busuanzi_page_pv: 'busuanzi_value_page_pv'
  };

  var apply = function (data) {
    for (var key in map) {
      if (data[key] != null) {
        var el = document.getElementById(map[key]);
        if (el) el.textContent = data[key];
      }
    }
  };

  var pageKey = location.pathname + location.search;
  if (window.__busuanziData[pageKey]) {
    apply(window.__busuanziData[pageKey]);
    return;
  }

  var controller = new AbortController();
  var timer = setTimeout(function () { controller.abort(); }, 5000);

  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: location.href, referrer: document.referrer }),
    signal: controller.signal
  })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      clearTimeout(timer);
      if (!data) return;
      window.__busuanziData[pageKey] = data;
      apply(data);
    })
    .catch(function (e) { console.error('[busuanzi]', e); });
})();
