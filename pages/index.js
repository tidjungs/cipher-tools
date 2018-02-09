import React, { Component } from 'react';
import styled from 'styled-components';
import InputRange from 'react-input-range';
import { getInitialData, ascii, deAscii } from '../utils';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const CharContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Row = styled.div`
  display: flex;
  margin-left: 30px;
  p {
    margin-right: 5px;
  }
`;

const AppContainer = styled.div`
  padding: 40px;
`;

class App extends Component {
  state = {
    mode: 0,
    shift: 0,
    data: getInitialData(),
  }

  shifting = (char) => {
    const number = ascii(char);
    const nextNumber = number + this.state.shift;
    const rotateNumber = nextNumber <= 90 ? nextNumber : nextNumber - 26;
    return deAscii(rotateNumber);
  }

  render() {
    return (
      <AppContainer>
        <Title>Ciphers</Title>
        <InputRange
          maxValue={25}
          minValue={0}
          value={this.state.shift}
          onChange={shift => this.setState({ shift })}
        />
        <CharContainer>
          {
            this.state.data.map(c => (
              <Row key={c.before}>
                <p>{c.before}</p>
                <p>{this.shifting(c.before)}</p>
              </Row>
            ))
          }
        </CharContainer>
      </AppContainer>
    );
  }
}

export default App;
