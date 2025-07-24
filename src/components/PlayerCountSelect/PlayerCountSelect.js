import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '../Button/Button'
import Guide from '../Guide/Guide'

export class PlayerCountSelect extends Component {

  handleClick(newPlayerCount) {
    this.props.changePlayerCount(newPlayerCount)
  }

  render() {
    const baseColour = 'blue'

    return (
      <Container>
        <Guide colour='blue' shade='medium' guideText='How many players?' />
        <Row>
          <Button
            colour={baseColour}
            shade={this.props.numberOfPlayers === 1 ? 'light' : 'dark'}
            onClick={() => this.handleClick(1)} buttonText='2' />
          <Button
            colour={baseColour}
            shade={this.props.numberOfPlayers === 2 ? 'light' : 'dark'}
            onClick={() => this.handleClick(2)} buttonText='3' />
        </Row>
        <Row>
          <Button
            colour={baseColour}
            shade={this.props.numberOfPlayers === 3 ? 'light' : 'dark'}
            onClick={() => this.handleClick(3)} buttonText='4' />
          <Button
            colour={baseColour}
            shade={this.props.numberOfPlayers === 4 ? 'light' : 'dark'}
            onClick={() => this.handleClick(4)} buttonText='5' />
        </Row>
        {/* <Row>
          <Button
            colour={baseColour}
            shade={this.props.numberOfPlayers === 5 ? 'light' : 'dark'}
            onClick={() => this.handleClick(5)} buttonText='5' />
          <Button
            colour={baseColour}
            shade={this.props.numberOfPlayers === 6 ? 'light' : 'dark'}
            onClick={() => this.handleClick(6)} buttonText='6' />
        </Row> */}
      </Container>
    )
  }
}

export default PlayerCountSelect

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;
