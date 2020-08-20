import * as React from 'react'
import {
    RichUtils
} from 'draft-js'
import { blockTypes } from '../config'

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

    render() {

        return (
          blockTypes.map(blockType => (
            <button
                key={blockType.style}
                onMouseDown={this.clickMenu}
                style={{ marginRight: 8 }}
                data-key={blockType.style}
            >
                {/* {this.getCurrentBlockLabel()} */}
                {blockType.label}
            </button>
          ))
        )
    }
}