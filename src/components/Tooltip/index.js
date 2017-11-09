import React from 'react'
import ReactDOM from 'react-dom'
import RenderContainer from '@skbkontur/react-ui/RenderContainer'
import RenderLayer from '@skbkontur/react-ui/RenderLayer'
import Box from '@skbkontur/react-ui/components/Tooltip/Box'

export class Tooltip extends React.Component {
  static defaultProps = {
    pos: 'bottom left',
    trigger: 'hover'
  }

  _hotspotDOM
  _boxDOM
  _lastOnFocus
  _lastOnBlur

  _childRef = null
  _cachedRef

  constructor(props, context) {
    super(props, context)

    this.state = {
      opened: props.trigger === 'opened'
    }

    this._hotspotDOM = null
    this._boxDOM = null
    this._lastOnFocus = null
    this._lastOnBlur = null
  }

  render() {
    const props = {}
    const { className } = this.props

    if (this.props.trigger === 'hover') {
      props.onMouseOver = this._handleMouseOver
      props.onMouseLeave = this._handleMouseLeave
    } else if (this.props.trigger === 'click') {
      props.onClick = this._handleClick
    }

    const childProps = {}
    if (this.props.trigger === 'focus') {
      childProps.onFocus = this._handleFocus
      childProps.onBlur = this._handleBlur
    }

    let child = this.props.children
    this._lastOnFocus = null
    this._lastOnBlur = null

    const isStatefulChild = React.Component.isPrototypeOf(child.type)
    if (typeof child === 'string' || !isStatefulChild) {
      child = (
        <span ref={this._getHotspotRef(null)} {...childProps}>
          {child}
        </span>
      )
    } else {
      const onlyChild = React.Children.only(child)
      childProps.ref = this._getHotspotRef(onlyChild.ref)
      if (onlyChild.props) {
        this._lastOnFocus = onlyChild.props.onFocus
        this._lastOnBlur = onlyChild.props.onBlur
      }
      child = React.cloneElement(onlyChild, childProps)
    }

    const tooltip = (
      <span {...props} className={className}>
        {child}
        {this._renderBox()}
      </span>
    )

    if (this.props.disablePortal) {
      return (
        <span style={{ display: 'inline-block', position: 'relative' }}>
          {tooltip}
        </span>
      )
    }

    return (
      <RenderLayer
        onClickOutside={this._handleBoxClose}
        onFocusOutside={this._handleBoxClose}
        active={this.state.opened}
      >
        {tooltip}
      </RenderLayer>
    )
  }

  _renderBox() {
    if (!this.state.opened) {
      return null
    }

    const content = this.props.render()

    if (content == null) {
      return null
    }

    if (this.props.disablePortal) {
      return (
        <span
          style={{
            position: 'absolute',
            display: 'inline-block',
            top: 'calc(100% + 15px)',
            fontSize: 14,
            padding: '15px 20px',
            left: 0,
            background: 'white',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
          }}
        >
          {content}
        </span>
      )
    }

    const box = (
      <Box
        trigger={this.props.trigger}
        getTarget={this._getTarget}
        pos={this.props.pos}
        close={this._isClosed()}
        onClose={this._handleBoxClose}
      >
        {content}
      </Box>
    )

    return <RenderContainer>{box}</RenderContainer>
  }

  componentWillReceiveProps(newProps) {
    if (newProps.trigger !== this.props.trigger) {
      if (newProps.trigger === 'opened') {
        this.setState({ opened: true })
      } else if (newProps.trigger === 'closed') {
        this.setState({ opened: false })
      }
    }
  }

  _refHotspot(childRef, el) {
    if (typeof childRef === 'function') {
      childRef(el)
    }
    this._hotspotDOM = el && ReactDOM.findDOMNode(el)
  }

  _getHotspotRef(childRef) {
    if (!this._cachedRef || this._childRef !== childRef) {
      this._childRef = childRef
      this._cachedRef = this._refHotspot.bind(this, childRef)
    }
    return this._cachedRef
  }

  _getTarget = () => {
    return this._hotspotDOM
  }

  _handleMouseOver = event => {
    const target = event.target
    if (this._hotspotDOM) {
      const opened = this._hotspotDOM.contains(target)
      if (this.state.opened !== opened) {
        this._setOpened(opened)
      }
    }
  }

  _handleMouseLeave = () => {
    this._setOpened(false)
  }

  _handleClick = event => {
    event.stopPropagation()
    const target = event.target
    if (this._hotspotDOM) {
      if (!this.state.opened && this._hotspotDOM.contains(target)) {
        this._setOpened(true)
      }
    }
  }

  _handleBoxClose = () => {
    if (this.props.trigger !== 'opened') {
      this._setOpened(false)
    }

    if (this.props.onCloseClick) {
      this.props.onCloseClick.call(null)
    }
  }

  _handleFocus = event => {
    this._setOpened(true)

    const onFocus = this._lastOnFocus
    if (onFocus) {
      onFocus(event)
    }
  }

  _handleBlur = event => {
    this._setOpened(false)

    const onBlur = this._lastOnBlur
    if (onBlur) {
      onBlur(event)
    }
  }

  _setOpened(opened) {
    if (this.state.opened !== opened) {
      this.setState({ opened })
    }
  }

  _isClosed = () => {
    const trigger = this.props.trigger
    if (this.props.closeButton !== undefined) {
      return this.props.closeButton
    }

    return trigger !== 'hover' && trigger !== 'focus'
  }
}
