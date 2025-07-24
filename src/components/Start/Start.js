import React, { Component } from 'react'
import Button from '../Button/Button'
import styled from 'styled-components';
import colours from '../../utils/colours'
import PlayerCountSelect from '../PlayerCountSelect/PlayerCountSelect'
import Guide from '../Guide/Guide'

export class Start extends Component {

  render() {
    return (
      <Container>
        <PlayerCountSelect
          numberOfPlayers={this.props.numberOfPlayers}
          changePlayerCount={(newPlayerCount) => this.props.changePlayerCount(newPlayerCount)} />
        <Guide colour='blue' shade='medium' guideText='Guide enabled?' />
        <Row>
          <Button colour='blue' buttonText='Off' shade={this.props.guideEnabled ? 'dark' : 'light'} onClick={() => this.props.toggleGuide(false)} />
          <Button colour='blue' buttonText='On' shade={this.props.guideEnabled ? 'light' : 'dark'} onClick={() => this.props.toggleGuide(true)} />
        </Row>
        <Guide colour='blue' shade='medium' guideText='Begin' />
        <Button colour='blue' shade='dark' activeShade='light' onClick={() => this.props.onAdvance('record')} buttonText='GO!' />
      </Container>
    )
  }
}

export default Start

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${colours.blue.medium};
  height: 100vh;

  h2 {
    color: white;
  }
`;

const Row = styled.div`
  display: flex;
`;
