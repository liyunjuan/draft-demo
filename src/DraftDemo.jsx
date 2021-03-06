import * as React from 'react'

import {
  // CompositeDecorator,
  // ContentBlock,
  ContentState,
  // DraftEditorCommand,
  // DraftHandleValue,
  // Editor,
  // EditorChangeType,
  EditorState,
  // getDefaultKeyBinding,
  // Modifier,
  // SelectionState,
  convertToRaw,
  convertFromRaw,
  RichUtils
} from 'draft-js';
import {
  getCustomStyleMap,
//   setBlockData,
//   getSelectedBlocksMetadata
} from 'draftjs-utils'
import Editor from 'draft-js-plugins-editor';
import {stateToHTML} from 'draft-js-export-html'; //这种导出行内样式没效果
// import draftToHtml from 'draftjs-to-html';//----下划线标签有差异
import draftToHtml from './draftjs-to-html'
// import htmlToDraft from 'html-to-draftjs';
// import htmlToDraft from './html-to-draftjs'
import htmlToDraft from './library';

// 加粗、下划线
import InlineTypesControl from './components/InlineTypesControl'
// 项目符号
import BlockTypesControl from './components/BlockTypesControl'
// 字体背景颜色
import TextColorControl from './components/TextColorControl'
// emoji
import EmojiControl from './components/EmojiControl'

import { inlineTypes, customColorStyleMap } from './config'


class DraftDemo extends React.Component {
  constructor(props) {
    super(props);

    // ----- 这是一种方式，加载完成之后会自动聚焦到末尾
    const entity = {"blocks":[{"key":"a4v4c","text":"今天是个好日子","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"l31v","text":"1哒哒哒哒哒哒","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":2,"length":4,"style":"bgcolor-#94EEDD"}],"entityRanges":[],"data":{}},{"key":"3mvta","text":"2点点滴滴打打","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":3,"length":4,"style":"bgcolor-#FFBCB2"}],"entityRanges":[],"data":{}},{"key":"eh7br","text":"3嘿嘿嘿嘿嘿嘿嘿","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cv5a4","text":"123434232342432abcxyzxyzddddd","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":6,"length":23,"style":"UNDERLINE"},{"offset":21,"length":8,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"4kr88","text":"哈哈哈哈哈哈","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}
    const _state = EditorState.moveFocusToEnd(EditorState.createWithContent(convertFromRaw(entity)));
    //---

    // --- 这是和导出相对应的，加载完成之后需要手动聚焦到末尾
    const entity1 = '<p>今天是个好日子</p> <ul> <li>1哒<span style="background-color: #ff00ff;">哒哒哒哒</span>哒</li> <li>2点点<span style="background-color: #ffbcb2;">滴滴打打</span></li> <li>3嘿嘿嘿嘿嘿嘿嘿</li> </ul> <p>123434<ins>232342432abcxyz</ins><strong><ins>xyzddddd</ins></strong></p> <p>哈哈哈哈哈哈</p>'
    const blocksFromHtml = htmlToDraft(entity1);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const _editorState = EditorState.createWithContent(contentState);
    // ----                                                                         

    this.state = {
      // editorState: EditorState.createEmpty(),
      editorState: _state,  // entiy恢复的方式
      // editorState: _editorState,
      dymanicCssList: [],
      exportToHtml: '',
      aaa:'',
      exportToHtml1: ''
    }
  }
  componentDidMount() {
    this.onEditorFocus()

    // 对于第二种方式自动聚焦到末尾
    const _ent = EditorState.moveFocusToEnd(this.state.editorState);
    this.setState({
      editorState: _ent
    })
  }
  onEditorFocus = () => {
    const editor = this.refs.editor 
    editor.focus()
  }

  // editorState改变
  onEditorStateChange = editorState => {
    this.setState(
      { 
        editorState,
        exportToHtml: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        exportToHtml1: stateToHTML(editorState.getCurrentContent()),   //这种方式导出，对于背景色没有特殊导出
        aaa: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      }
    )

    // const { onChange } = this.props
    // if (onChange) {
    //     onChange(editorState)
    // }

  }

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
        this.onEditorStateChange(newState)
        return true
    }
    return false
  }

  // image,mp3,mp4的渲染组件匹配
  // mediaBlockRenderer = block => {
  //   if (block.getType() === 'atomic') {
  //       return {
  //           component: Media,
  //           editable: false
  //       }
  //   }
  //   return null
  // }

  // 自定义样式匹配
  myBlockStyleFn = contentBlock => {
    const type = contentBlock.getType()
    const metaData = contentBlock.getData()

    const textIndent = metaData.get('text-indent')
    const lineHeight = metaData.get('line-height')
    const letterSpacing = metaData.get('letter-spacing')
    const textAlign = metaData.get('text-align')

    if (textIndent || lineHeight || letterSpacing || textAlign) {
        let letterSpacingName = ''
        if (!letterSpacing) {
            letterSpacingName = letterSpacing
        } else {
            letterSpacingName = Math.round(
                Number(
                    letterSpacing.substring(0, letterSpacing.indexOf('px'))
                ) * 100
            ).toString()
        }

        const className =
            'custom' +
            textIndent +
            Math.round(lineHeight * 100) +
            letterSpacingName +
            textAlign
        const { dymanicCssList } = this.state
        let classIsExist = false

        for (const dymanicCss of dymanicCssList) {
            if (dymanicCss === className) {
                classIsExist = true
                break
            }
        }

        // for (let i = 0; i < dymanicCssList.length; i++) {
        //     if (dymanicCssList[i] === className) {
        //         classIsExist = true
        //         break
        //     }
        // }
        if (!classIsExist) {
            dymanicCssList.push(className)
            this.loadCssCode(`.${className} {
                text-indent: ${textIndent};
                line-height: ${lineHeight};
                letter-spacing: ${letterSpacing};
                text-align: ${textAlign};
            }`)
        }
        return className
    }
  }
  // 行内样式改变
  onInlineTypeChange = editorState => {
    this.onEditorStateChange(editorState)
  }

  // 块样式改变
  onBlockTypeChange = editorState => {
    this.setState({ editorState }, () => {
        setTimeout(() => {
          this.onEditorFocus()
        }, 0);
        
    })
  }

  // 文字颜色改变
  onTextColorChange = editorState => {
    this.setState(
        {
            editorState
        },
        () => {
          setTimeout(() => {
            this.onEditorFocus()
          }, 0);
        }
    )
  }

  // 添加emoji
  onAddEmoji = editorState => {
    this.onEditorStateChange(editorState)
    setTimeout(() => {
        this.onEditorFocus()
      }, 0);
  }

  customColorStyleMap = {
    ...customColorStyleMap,
    ...getCustomStyleMap()
  };
  componentDidUpdate(){

  }

  render() {
    const { exportToHtml, aaa, exportToHtml1 } = this.state
    return (
      <div className="contentWrap" style={{ border: '1px solid #fff', lineHeight: 1.5 }}>
          <div
            style={{
              padding: '0 15px',
              backgroundColor: 'white',
              borderBottom: '1px solid #ccc'
            }}
          >
            {
              inlineTypes.map(inlineTypes => (
                <InlineTypesControl
                    key={inlineTypes.style}
                    editorState={this.state.editorState}
                    onInlineTypeChange={this.onInlineTypeChange}
                    label={inlineTypes.label}
                    style={inlineTypes.style}
                />
              ))
            }

            <BlockTypesControl
                editorState={this.state.editorState}
                onBlockTypeChange={this.onBlockTypeChange}
            />

            <TextColorControl
              editorState={this.state.editorState}
              onTextColorChange={this.onTextColorChange}
            />
            {/* <EmojiControl
                editorState={this.state.editorState}
                onAddEmoji={this.onAddEmoji}
            /> */}
          </div>

          <div
              style={{
                  padding: 15,
                  backgroundColor: 'white',
                  overflow: 'scroll'
              }}
              onClick={this.onEditorFocus}
          >
              <Editor
                  ref="editor"
                  editorState={this.state.editorState}
                  onChange={this.onEditorStateChange}
                  // customStyleMap={getCustomStyleMap()}
                  customStyleMap={this.customColorStyleMap}
                  handleKeyCommand={this.handleKeyCommand}  //这写了支持快捷键
                  // blockRendererFn={this.mediaBlockRenderer}
                  blockStyleFn={this.myBlockStyleFn}
              />
          </div>
          <div
            style={{
              padding: 15,
              backgroundColor: 'white',
              overflow: 'scroll'
            }}
          >
            <p>转换为html：</p>
            <div className="htmlWrap">
              {exportToHtml}
              {/* <p></p>
              {aaa}
              <p></p>
              {exportToHtml1} */}
            </div>
          </div>
      </div>
    )
  }
}

export default DraftDemo;