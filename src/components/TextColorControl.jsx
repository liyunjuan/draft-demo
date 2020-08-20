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
        textColor: 'rgba(0, 0, 0, 0)',
        isShowColor: false
    }

    // 颜色选择器选择的颜色改变，draft.js不支持更改文字透明度
    handleChangeComplete = (color) => {
        const newTextColor = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`
        this.setState({ textColor: newTextColor,isShowColor: false})
        console.log(newTextColor)
        const newEditState = toggleCustomInlineStyle(
            this.props.editorState,
            'color',
            newTextColor,
          )
          console.log(convertToRaw(newEditState.getCurrentContent()))
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
      const { isShowColor } = this.state;
        return (
            <div className="colorWrap">
                <button style={{ marginLeft: 8 }} onClick={this.showColor}>文本颜色</button>
                {isShowColor ? this.renderColorPicker() : null}
            </div>
        )
    }
}