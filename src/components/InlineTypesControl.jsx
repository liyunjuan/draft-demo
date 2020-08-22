import * as React from 'react'
import {
    RichUtils
} from 'draft-js'
import classNames from 'classnames';

export default class InlineTypesControl extends React.Component {

    // 点击按钮
    clickBtn = (e, style) => {
        // 阻止点击按钮后editor失去了焦点，而且按钮的事件必须是onMouseDown，onClick调用该方法editor还是会失去焦点
        e.preventDefault()
        const newEditState = RichUtils.toggleInlineStyle(
            this.props.editorState,
            style
        )
        this.props.onInlineTypeChange(newEditState)
    }

    render() {

        const currentStyle = this.props.editorState.getCurrentInlineStyle()
        console.log('111111111', currentStyle.has("BOLD"))

        const { style, label } = this.props

        return (
            <div style={{ display: 'inline-block', margin: '15px 0' }}>
                {
                    // inlineTypes.map(inlineType =>
                        <span
                            onMouseDown={(e) => this.clickBtn(e, style)}
                            className={classNames((currentStyle.has(style) ? 'activeButton' : '') ,'s-btn')}
                            style={{ marginRight: 8 }}
                        >
                             {label}
                        </span>
                    // )
                }
            </div>
        )
    }
}