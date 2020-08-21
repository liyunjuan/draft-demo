import * as React from 'react'
import {
    RichUtils
} from 'draft-js'
import { blockTypes } from '../config'
import classNames from 'classnames';

export default class BlockTypesControl extends React.Component {

    // 点击菜单
    clickMenu = (e) => {
      const { key } = e.currentTarget.dataset;
        const newEditState = RichUtils.toggleBlockType(
            this.props.editorState,
            key
        )
        this.props.onBlockTypeChange(newEditState)
    }

    // 得到当前块样式的label
    getCurrentBlockLabel = () => {
        const editorState = this.props.editorState
        const selection = editorState.getSelection()
        const blockStyle = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType()
        let blockLabel = ''
        blockTypes.forEach((blockType) => {
            if (blockType.style === blockStyle) {
                blockLabel = blockType.label
                return
            }
        })
        return blockLabel
    }

    render() {
        const currentStyle = this.props.editorState.getCurrentInlineStyle()

        return (
          blockTypes.map(blockType => (
            <span className={classNames((this.getCurrentBlockLabel() === blockType.label ? 'activeButton' : '') ,'s-btn')}
                key={blockType.style}
                onMouseDown={this.clickMenu}
                style={{ marginRight: 8 }}
                data-key={blockType.style}
            >
                {blockType.label}
            </span>
          ))
        )
    }
}