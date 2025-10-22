// Helper to embed a spec file into an element id
async function show(id, specPath, opts = {}) {
  const defaultOpts = { actions: false };
  return vegaEmbed(id, specPath, { ...defaultOpts, ...opts });
}

// 1) MAP (uses your working blue-threshold spec)
show("#map", "specs/map.json");

// 2) ACTIVITY
show("#activity", "specs/activity.json");

// 3) BUBBLE
show("#bubble", "specs/bubble.json");

// 4) TREEMAP with year toggle (Vega spec + signal)
let treeView;
(async () => {
  const res = await vegaEmbed("#treemap", "specs/treemap_vega.json", { actions: false });
  treeView = res.view;
})();

document.querySelectorAll('input[name="treeYear"]').forEach(r => {
  r.addEventListener('change', (e) => {
    if (treeView) treeView.signal("yearSig", +e.target.value).runAsync();
  });
});
