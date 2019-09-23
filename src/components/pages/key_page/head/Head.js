import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button, Icon, AutoComplete } from 'antd'
import { Select, MenuItem } from '@material-ui/core'

import theme from './theme.scss'


export default class Head extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tone: props.tone,
      octave: props.octave
    }
  }


  onTonesChange = (tone) => {
    this.props.selectTone(tone)
  }

  onOctavesChange = (octave) => {
    this.props.selectOctave(octave)
  }


  render() {
    const { i18n, tones, octaves } = this.props
    const { tone, octave } = this.state

    return (
      <Row
        gutter={16}
        type="flex"
        justify="center"
      >
        <Col
          className={theme.TonesContainer}
          span={4}
        >
          <span>{i18n.get('tones')}</span>
          <Select
            defaultValue={tone}
            placeholder={i18n.get('select_tone')}
            onChange={this.onTonesChange}
          >
            {tones.map((tone) => {
              <MenuItem
                key={tone}
                value={tone}
              >
                {tone}
              </MenuItem>
            })}
          </Select>
        </Col>
        <Col
          className={theme.OctavesContainer}
          span={4}
        >
          <span>{i18n.get('octaves')}</span>
          <Select
            defaultValue={tone}
            placeholder={i18n.get('select_tone')}
            onChange={this.onTonesChange}
          >
            {octaves.map((octave) => {
              <MenuItem
                key={octave}
                value={octave}
              >
                {octave}
              </MenuItem>
            })}
          </Select>
        </Col>
      </Row>
    )
  }
}

Head.propTypes = {
  i18n: PropTypes.object.isRequired,
  tones: PropTypes.object.isRequired,
  octaves: PropTypes.object.isRequired,
  octave: PropTypes.string.isRequired,
  tone: PropTypes.string.isRequired,

  selectOctave: PropTypes.func.isRequired,
  selectTone: PropTypes.func.isRequired
}
