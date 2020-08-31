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
    handleChangeComplete = (e) => {
      console.log(e)
      const { color } = e.currentTarget.dataset
        const newTextColor = color
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
            {/* <SketchPicker color={this.state.textColor} onChangeComplete={this.handleChangeComplete} /> */}
            <span className="color-pick" data-color='red' onClick={this.handleChangeComplete} style={{backgroundColor: 'red'}}>红色</span>
            <span className="color-pick" data-color='blue' onClick={this.handleChangeComplete} style={{backgroundColor: 'blue'}}>blue</span>
            <span className="color-pick" data-color='orange' onClick={this.handleChangeComplete} style={{backgroundColor: 'orange'}}>orange</span>
            <span className="color-pick" data-color='green' onClick={this.handleChangeComplete} style={{backgroundColor: 'green'}}>green</span>
          </div>
        )

    }

    showColor = () => {
      this.setState({
        isShowColor: !this.state.isShowColor
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