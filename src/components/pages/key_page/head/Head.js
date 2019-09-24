import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select, MenuItem, Container, Grid } from '@material-ui/core'

import theme from './theme.scss'


export default class Head extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tone: props.tone,
      octave: props.octave
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      tone: newProps.tone,
      octave: newProps.octave
    })
  }


  onTonesChange = (event) => {
    this.props.selectTone(event.target.value)
  }

  onOctavesChange = (event) => {
    this.props.selectOctave(event.target.value)
  }


  render() {
    const { i18n, tones, octaves } = this.props
    const { tone, octave } = this.state

    return (
      <Container>
        <Grid className={theme.TonesContainer}>
          <Select
            value={tone}
            label={i18n.get('select_tone')}
            onChange={this.onTonesChange}
          >
            {tones.map((item) => (
              <MenuItem
                key={item}
                value={item}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid className={theme.OctavesContainer}>
          <Select
            value={octave.toString()}
            label={i18n.get('select_tone')}
            onChange={this.onOctavesChange}
          >
            {octaves.map((item) => (
              <MenuItem
                key={item}
                value={item}
              >
                {item.toString()}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Container>
    )
  }
}

Head.propTypes = {
  i18n: PropTypes.object.isRequired,
  tones: PropTypes.object.isRequired,
  octaves: PropTypes.object.isRequired,
  octave: PropTypes.number.isRequired,
  tone: PropTypes.string.isRequired,

  selectOctave: PropTypes.func.isRequired,
  selectTone: PropTypes.func.isRequired
}
