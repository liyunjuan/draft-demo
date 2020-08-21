import * as React from 'react'
import {
    RichUtils
} from 'draft-js'
import { inlineTypes } from '../config'
import classNames from 'classnames';

export default class InlineTypesControl extends React.Component {

    // 点击按钮
    clickBtn = (e, style) => {
        // 阻止点击按钮后editor失去了焦点，而且按钮的事件必须是onMouseDown，onClick调用该方法editor还是会失去焦点
        // e.preventDefault()
        const newEditState = RichUtils.toggleInlineStyle(
            this.props.editorState,
            style
        )
        this.props.onInlineTypeChange(newEditState)
    }

    render() {

        const currentStyle = this.props.editorState.getCurrentInlineStyle()

        return (
            <div style={{ display: 'inline-block', margin: '15px 0' }}>
                {
                    inlineTypes.map(inlineType =>
                        <span
                            key={inlineType.style}
                            onMouseDown={(e) => this.clickBtn(e, inlineType.style)}
                            className={classNames((currentStyle.has(inlineType.style) ? 'activeButton' : '') ,'s-btn')}
                            style={{ marginRight: 8 }}
                        >
                             {inlineType.label}
                        </span>
                    )
                }
            </div>
        )
    }
}