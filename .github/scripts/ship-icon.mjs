// Personaliza o SVG do Galaga em dist/ com a paleta White Palace (cinza monocromático):
//  - troca a nave pelo ícone invader (única <image> de 32x35; os tiros 10x13 ficam intactos)
//  - recolore as cores verdes do tema github-dark da ação para tons de cinza
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const DIR = process.env.ARCADE_DIR || "dist";
const ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADSCAYAAAAcws+XAAACI0lEQVR4Xu3dsWoCQRhGUVfshPj+jxkhdcTUNuIPGeae0yvMrpepPjydAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGHePf+IHv+8/vBx//c/u6LnWm3ez2js67vSB4hwBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0rYbj0wMNp52G9Z4Lq+5AUgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEhbahE2tVpibSut7dwApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApI0swiy5+A8TyzI3AGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEg7jFkocwOQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQdpk4/cRf1TxZpzWs9HtxA5AmANIEQJoASBMAaQIgTQCkCYA0AZAmANIEQJoASBMAaQIgTQCkCYC0kUHMSqbGFry222jJDUCaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSjt1Ov9JgY2qcs+OZVuEGIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAWQ/uBjDu2YeI5QAAAABJRU5ErkJggg==";

// verdes do tema github-dark -> cinzas do README (ordem: do menos ao mais intenso)
const PALETTE = {
  "#0e4429": "#343A44",
  "#006d32": "#515864",
  "#26a641": "#9299A5",
  "#39d353": "#F1F2F5",
  "#aaaaaa": "#8D95A2",
  "#000000": "#08090C",
};

const files = readdirSync(DIR).filter((f) => /^galaga-contribution-graph.*\.svg$/.test(f));
if (!files.length) console.warn("ship-icon: nenhum SVG do galaga encontrado em " + DIR);

for (const f of files) {
  const path = `${DIR}/${f}`;
  let svg = readFileSync(path, "utf8");
  let swapped = 0;
  svg = svg.replace(/<image\b[^>]*\bwidth="32"[^>]*\bheight="35"[^>]*>/g, (tag) => {
    swapped++;
    return tag.replace(/href="[^"]*"/, `href="${ICON}"`);
  });
  if (swapped !== 1) console.warn(`ship-icon: ${f}: esperava 1 nave, encontrei ${swapped}`);
  for (const [from, to] of Object.entries(PALETTE)) {
    svg = svg.replace(new RegExp(from.replace("#", "#"), "gi"), to);
  }
  writeFileSync(path, svg);
  console.log(`ship-icon: ${f} -> ${swapped} nave(s) trocada(s), paleta aplicada`);
}
