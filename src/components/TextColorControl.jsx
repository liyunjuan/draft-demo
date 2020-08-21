import * as React from 'react'
import {
    EditorState,
    Entity,
    RichUtils,
    Modifier,
    convertToRaw
} from 'draft-js'
import {
    toggleCustomInlineStyle,
    getSelectionCustomInlineStyle,
  } from 'draftjs-utils'
import { SketchPicker } from 'react-color'

export default class TextColorControl extends React.Component {

    state = {
        textColor: 'rgba(236,231,231,1)',
        isShowColor: false
    }

    // 颜色选择器选择的颜色改变，draft.js不支持更改文字透明度
    handleChangeComplete = (color) => {
        const newTextColor = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`
        this.setState({ textColor: newTextColor,isShowColor: false})
        const newEditState = toggleCustomInlineStyle(
            this.props.editorState,
            'bgcolor',
            newTextColor,
          )
        this.props.onTextColorChange(newEditState)
    }

    // 渲染颜色选择器
    renderColorPicker = () => {
        return (
          <div className="colorPop">
            <SketchPicker color={this.state.textColor} onChangeComplete={this.handleChangeComplete} />
          </div>
        )

    }

    showColor = () => {
      this.setState({
        isShowColor: true
      })
    }

    render() {
      const { isShowColor, textColor } = this.state;
        return (
            <div className="colorWrap">
                <span className="s-btn" style={{ marginLeft: 8, background: `${textColor}` }} onClick={this.showColor}>文本高亮</span>
                {isShowColor ? this.renderColorPicker() : null}
            </div>
        )
    }
}