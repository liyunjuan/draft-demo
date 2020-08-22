import * as React from 'react'

import {
  // CompositeDecorator,
  // ContentBlock,
  // ContentState,
  // DraftEditorCommand,
  // DraftHandleValue,
  // Editor,
  // EditorChangeType,
  EditorState,
  // getDefaultKeyBinding,
  // Modifier,
  // SelectionState,
  convertToRaw,
  // convertFromRaw,
  RichUtils
} from 'draft-js';
import {
  getCustomStyleMap,
//   setBlockData,
//   getSelectedBlocksMetadata
} from 'draftjs-utils'
import Editor from 'draft-js-plugins-editor';
import {stateToHTML} from 'draft-js-export-html';
import draftToHtml from 'draftjs-to-html';

// 加粗、下划线
import InlineTypesControl from './components/InlineTypesControl'
// 项目符号
import BlockTypesControl from './components/BlockTypesControl'
// 字体背景颜色
import TextColorControl from './components/TextColorControl'
// emoji
import EmojiControl from './components/EmojiControl'

import { inlineTypes } from './config'


class DraftDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      dymanicCssList: [],
      exportToHtml: ''
    }
  }
  componentDidMount() {
    this.onEditorFocus()
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
        exportToHtml: draftToHtml(convertToRaw(editorState.getCurrentContent()))
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
    // setTimeout(() => {
    //   this.onEditorFocus()
    // }, 0);
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

  render() {
    const { exportToHtml } = this.state
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
            <EmojiControl
                editorState={this.state.editorState}
                onAddEmoji={this.onAddEmoji}
            />
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
                  customStyleMap={getCustomStyleMap()}
                  // @ts-ignore
                  handleKeyCommand={this.handleKeyCommand}
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
            </div>
          </div>
      </div>
    )
  }
}

export default DraftDemo;