// 行内样式
const inlineTypes = [
  { label: '加粗', style: 'BOLD' },
  // { label: '倾斜', style: 'ITALIC' },
  { label: '下划线', style: 'UNDERLINE' },
  // { label: '删除线', style: 'STRIKETHROUGH' },
]

// 块样式
const blockTypes = [
  // { label: '普通', style: 'unstyled' },
  // { label: 'h1', style: 'header-one' },
  // { label: 'h2', style: 'header-two' },
  // { label: 'h3', style: 'header-three' },
  // { label: 'h4', style: 'header-four' },
  // { label: 'h5', style: 'header-five' },
  // { label: 'h6', style: 'header-six' },
  // { label: '引用', style: 'blockquote' },
  // { label: '代码', style: 'code-block' },
  // { label: 'atomic', style: 'atomic' },这个有问题
  // { label: '有序列表', style: 'ordered-list-item' },
  { label: '无序列表', style: 'unordered-list-item' },
]
// 支持的颜色 - 渲染用
const customColorStyleMap = {
  // 粉红色
  'bgcolor-#FFBCB2': { backgroundColor: '#FFBCB2' },
  'bgcolor-rgb(255,188,178)': { backgroundColor: 'rgb(255,188,178)' },

  'bgcolor-#FFD37E': { backgroundColor: '#FFD37E' },
  'bgcolor-rgb(255,211,126)': { backgroundColor: 'rgb(255,211,126)' },

  'bgcolor-#94EEDD': { backgroundColor: '#94EEDD' },
  'bgcolor-rgb(148,238,221)': { backgroundColor: 'rgb(148,238,221)' },

  'bgcolor-#A7CEFF': { backgroundColor: '#A7CEFF' },
  'bgcolor-rgb(167,206,255)': { backgroundColor: 'rgb(167,206,255)' },

  'bgcolor-#E9EBF2': { backgroundColor: '#E9EBF2' },
  'bgcolor-rgb(233,235,242)': { backgroundColor: 'rgb(233,235,242)' },

  'bgcolor-#FFFFFF': { backgroundColor: '#FFFFFF' },
  'bgcolor-rgb(255,255,255)': { backgroundColor: 'rgb(255,255,255)' },
};

// 支持的颜色 - 富文本组件选择用，和 customColorStyleMap 同步
const customColorStyleArr = ['#FFBCB2', '#FFD37E', '#94EEDD', '#A7CEFF', '#E9EBF2', 'seprator', '#FFFFFF'];

export { inlineTypes, blockTypes, customColorStyleMap, customColorStyleArr }