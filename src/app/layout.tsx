const ThemeScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
(function() {
  try {
    var stored = localStorage.getItem('theme'); // 'dark' | 'light' | null
    var sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (sysDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    if (!stored) {
      var mql = window.matchMedia('(prefers-color-scheme: dark)');
      var handler = function(e) {
        document.documentElement.classList.toggle('dark', e.matches);
      };
      mql.addEventListener ? mql.addEventListener('change', handler) : mql.addListener(handler);
    }
  } catch(_) {}
})();`,
    }}
  />
);
