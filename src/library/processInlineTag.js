const inlineTags = {
  code: 'CODE',
  del: 'STRIKETHROUGH',
  em: 'ITALIC',
  strong: 'BOLD',
  ins: 'UNDERLINE',
  sub: 'SUBSCRIPT',
  sup: 'SUPERSCRIPT',
};
function getDefaultStyle(obj,attribute){

  return obj.currentStyle?obj.currentStyle[attribute] : document.defaultView.getComputedStyle(obj,false)[attribute];  

}

function aa(bg) {
  bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
}

export default function processInlineTag(
  tag: string,
  node: Object,
  currentStyle: Object
): Object {
  const styleToCheck = inlineTags[tag];
  let inlineStyle;
  if (styleToCheck) {
    inlineStyle = currentStyle.add(styleToCheck).toOrderedSet();
  } else if (node instanceof HTMLElement) {
    inlineStyle = currentStyle;
    const htmlElement = node;
    inlineStyle = inlineStyle.withMutations((style) => {
      const color = htmlElement.style.color;
      const backgroundColor = htmlElement.style.backgroundColor;
      const fontSize = htmlElement.style.fontSize;
      const fontFamily = htmlElement.style.fontFamily.replace(/^"|"$/g, '');
      const fontWeight = htmlElement.style.fontWeight;
      const textDecoration = htmlElement.style.textDecoration;
      const fontStyle = htmlElement.style.fontStyle;
      if (color) {
        console.log('李------',color)
        style.add(`color-${color.replace(/ /g, '')}`);
      }
      if (backgroundColor) {
        let str = [];
        var rgb = backgroundColor.split('(')[1]; 
        for(var k = 0; k < 3; k++){
          str[k] = parseInt(rgb .split(',')[k]).toString(16);//str 数组保存拆分后的数据
        }
        str = '#'+str[0]+str[1]+str[2];

        let str1 = aa(backgroundColor)
      
        console.log('李------',htmlElement,htmlElement.style,str,str1,htmlElement.style.backgroundColor)
        // style.add(`bgcolor-${backgroundColor.replace(/ /g, '')}`);
        style.add(`bgcolor-${str1}`);
      }
      if (fontSize) {
        style.add(`fontsize-${fontSize.replace(/px$/g, '')}`);
      }
      if (fontFamily) {
        style.add(`fontfamily-${fontFamily}`);
      }
      if(fontWeight === 'bold'){
        style.add(inlineTags.strong)
      }
      if(textDecoration === 'underline'){
          style.add(inlineTags.ins)
      }
      if(fontStyle === 'italic'){
          style.add(inlineTags.em)
      }
    }).toOrderedSet();
  }
  return inlineStyle;
}
