import React, { Component } from 'react'
import styled from 'styled-components';
import colours from '../../utils/colours'

export class Guide extends Component {
  render() {
    if (this.props.guideOnly && !this.props.guideEnabled) {
      return false
    }

    var content = []

    if (this.props.guideText.constructor === Array) {
      for (let i = 0; i < this.props.guideText.length; i++) {
        content.push(<h3 key={i}>{this.props.guideText[i]}</h3>)
      }
    } else {
      content = <h3>{this.props.guideText}</h3>
    }

    return (
      <Container colour={this.props.colour} shade={this.props.shade}>
        {content}
      </Container>
    )
  }
}

export default Guide

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 30px;
  max-width:400px;
  min-width: 200px;
  margin: 10px 20px;
  
  h3 {
    font-size: 16px;
    padding: 0 20px 20px 20px;
    color: ${props => colours[props.colour || 'red'][props.shade || 'light']};
    text-align: center;
    &:first-child {
      padding-top: 20px;
    }
  }
`;