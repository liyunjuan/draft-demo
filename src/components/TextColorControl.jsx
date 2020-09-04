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
import { customColorStyleArr } from '../config'

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
            {
              customColorStyleArr.map(color => {
                if(color === 'seprator') {
                  return <span className="color-seprator"></span>
                }
                return <span className="color-pick" data-color={color} onClick={this.handleChangeComplete} style={{backgroundColor: `${color}`}}></span>
              })
            }
            {/* <SketchPicker color={this.state.textColor} onChangeComplete={this.handleChangeComplete} /> */}
            {/* <span className="color-pick" data-color='#ffbcb2' onClick={this.handleChangeComplete} style={{backgroundColor: '#ffbcb2'}}>color1</span>
            <span className="color-pick" data-color='rgb(255,211,126)' onClick={this.handleChangeComplete} style={{backgroundColor: 'rgb(255,211,126)'}}>color2</span>
            <span className="color-pick" data-color='rgb(148,238,221)' onClick={this.handleChangeComplete} style={{backgroundColor: 'rgb(148,238,221)'}}>color3</span>
            <span className="color-pick" data-color='rgb(167,206,255)' onClick={this.handleChangeComplete} style={{backgroundColor: 'rgb(167,206,255)'}}>color4</span>
            <span className="color-pick" data-color='rgb(233,235,242)' onClick={this.handleChangeComplete} style={{backgroundColor: 'rgb(233,235,242)'}}>color5</span>
            <span className="color-pick" data-color='rgb(255,255,255)' onClick={this.handleChangeComplete} style={{backgroundColor: 'rgb(255,255,255)', border: '1px solid #eee'}}>none</span>
            <span className="color-pick" data-color='#ff00ff' onClick={this.handleChangeComplete} style={{backgroundColor: '#ff00ff'}}>try</span> */}
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