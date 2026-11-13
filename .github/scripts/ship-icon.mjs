// Troca a nave do Galaga pelo ícone escolhido (invader pixel art) nos SVGs gerados em dist/.
// A ação do arcade desenha a nave como a única <image> de 32x35 do SVG;
// as outras <image> (10x13) são os tiros e ficam intactas.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const DIR = process.env.ARCADE_DIR || "dist";
const ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADSCAYAAAAcws+XAAACMElEQVR4Xu3dQUoDQRRF0bS4PF2t7i8Sx5lIPvKpe848gerOpUaP3G4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOOu8W98wcf9dn/h47++r11nOs1p7+jttBcEfyEA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgLRVg5gJE4ONh9OGNZ7Lc24A0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0lYtwqZWS+y2aW3nBiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBtZBG2acn1dbuPvNDPmUezxonPZWJZ5gYgTQCkCYA0AZAmANIEQJoASBMAaQIgTQCkCYA0AZAmANIEQJoASBMAademMQv8NzcAaQIgTQCkCYA0AZAmANIEQJoASBMAaQIgTQCkCYA0AZAmANIEQJoASBMAae8Tp5/4q5oH67SGTb8XNwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIGxnEbDI1tuC500ZLbgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQdp12+k2Djalxzoln2sINQJoASBMAaQIgTQCkCYA0AZAmANIEQJoASBMAaQIgTQCkCYA0AZAmANIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAs34AM0MoYbAAq6UAAAAASUVORK5CYII=";

const files = readdirSync(DIR).filter((f) => /^galaga-contribution-graph.*\.svg$/.test(f));
if (!files.length) console.warn("ship-icon: nenhum SVG do galaga encontrado em " + DIR);

for (const f of files) {
  const path = `${DIR}/${f}`;
  const svg = readFileSync(path, "utf8");
  let swapped = 0;
  const out = svg.replace(/<image\b[^>]*\bwidth="32"[^>]*\bheight="35"[^>]*>/g, (tag) => {
    swapped++;
    return tag.replace(/href="[^"]*"/, `href="${ICON}"`);
  });
  if (swapped !== 1) console.warn(`ship-icon: ${f}: esperava 1 nave, encontrei ${swapped}`);
  writeFileSync(path, out);
  console.log(`ship-icon: ${f} -> ${swapped} nave(s) trocada(s)`);
}
