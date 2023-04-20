import { encodeAsync, decodeAsync } from 'figma-node-decoder'

import data from './data';

figma.showUI(__html__, { themeColors: true, height: 300 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "create-rectangles") {
    const nodes = [];

    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  if (msg.type === 'encode') {
    encodeAsync(figma.currentPage.selection[0]).then((result) => {
      console.log(result);
    });
  }

  if (msg.type === 'decode') {
    const dataStr = JSON.stringify(data);
    decodeAsync(dataStr).then((result) => {
      console.log(result);
    });
  }

  figma.closePlugin();
};
