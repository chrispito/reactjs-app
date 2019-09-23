import React, { Component } from 'react'
import { Synth } from 'tone'
import PropTypes from 'prop-types'
import { Row, Col, Button, Icon, Divider, Badge } from 'antd'

import Head from 'containers/pages/key_page/Head'

import theme from './theme.scss'


export default class KeyPage extends Component {
  constructor(props) {
    super(props)

    // this.handleClick = this.handleClick.bind(this)

    this.synth = new Synth()
    this.synth.oscillator.type = 'sine'
    this.synth.toMaster()
  }

  // getPattern(mainKey) {
  //   const list = [1, 2, 3, 4, 5, 6, 7, 8]

  //   return list.map((index) => {
  //     const keyValue = this.getKeyValue(mainKey, index)
  //     const colStyle = {
  //       backgroundColor: keyValue.get('color')
  //     }


  //     return (
  //       <Col
  //         key={keyValue.get('pos')}
  //         span={1}
  //       >
  //         <Badge
  //           count={keyValue.get('key')}
  //         >
  //           <Button
  //             style={colStyle}
  //             onClick={() => this.handleClick(keyValue)}
  //           >
  //             <Icon type="play-circle" />
  //           </Button>
  //         </Badge>
  //       </Col>
  //     )
  //   })
  // }

  // handleClick(key) {
  //   this.synth.triggerAttack(key.get('key'))
  //   setTimeout(() => {
  //     this.synth.triggerRelease()
  //   }, 500)
  // }

  // renderHead() {
  //   const { i18n, tones, octaves } = this.props

  //   return (
  //     <Row gutter={16}>
  //       <Col className={theme.TonesContainer} span={6} offset={6}>
  //         <span>{i18n.get('tones')}</span>

  //       </Col>
  //       <Col className={theme.OctavesContainer} span={6} offset={6}>
  //         <span>{i18n.get('octaves')}</span>
  //       </Col>
  //    </Row>
  //   )
  // }

  render() {
    const { i18n, selectedKey } = this.props

    return (
      <div className={theme.content}>
        <Head />
        <Row
          gutter={16}
          type="flex"
          justify="center"
        >
          <Col span={8}>
            <span>{i18n.get('selected_key')}:</span>
            <span>{selectedKey.get('key')}</span>
          </Col>
        </Row>
      </div>
    )
  }
}

KeyPage.propTypes = {
  i18n: PropTypes.object.isRequired,
  selectedKey: PropTypes.object.isRequired
}
