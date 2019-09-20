import React, { Component } from 'react'
import { Synth } from 'tone'
import PropTypes from 'prop-types'
import { Row, Col, Button, Icon, Divider, Badge } from 'antd'

import theme from './theme.scss'


export default class Keys extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)

    this.synth = new Synth()
    this.synth.oscillator.type = 'sine'
    this.synth.toMaster()
  }

  getPattern(mainKey, pos) {
    const { keys } = this.props
  }

  getPattern(mainKey) {
    const list = [1, 2, 3, 4, 5, 6, 7, 8]

    return list.map((index) => {
      const keyValue = this.getKeyValue(mainKey, index)
      const colStyle = {
        backgroundColor: keyValue.get('color')
      }


      return (
        <Col
          key={keyValue.get('pos')}
          span={1}
        >
          <Badge
            count={keyValue.get('key')}
          >
            <Button
              style={colStyle}
              onClick={() => this.handleClick(keyValue)}
            >
              <Icon type="play-circle" />
            </Button>
          </Badge>
        </Col>
      )
    })
  }

  handleClick(key) {
    this.synth.triggerAttack(key.get('key'))
    setTimeout(() => {
      this.synth.triggerRelease()
    }, 500)
  }

  render() {
    const { i18n, keys } = this.props

    return (
      <div className={theme.content}>
        <Divider orientation="left">{i18n.get('keys_intro_text')}</Divider>
        {keys.map((key) => [
          <Row
            gutter={16}
            key={key.get('pos')}
          >
            <Col span={4}> {key.get('key')} </Col>
            { this.getPattern(key) }
          </Row>
        ])}
      </div>
    )
  }
}

Keys.propTypes = {
  i18n: PropTypes.object.isRequired,
  keys: PropTypes.object.isRequired
}
