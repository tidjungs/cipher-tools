import React, { Component } from 'react';
import styled from 'styled-components';
import { getInitialData, ascii, deAscii } from '../utils';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const CharContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

class App extends Component {
  state = {
    mode: 0,
    shift: 0,
    data: getInitialData(),
  }
  render() {
    return (
      <div>
        <Title>Ciphers</Title>
        <CharContainer>
          {
            this.state.data.map(c => (
              <div key={c.before}>
                <p>{c.before}</p>
                <p>{c.after}</p>
              </div>
            ))
          }
        </CharContainer>
      </div>
    );
  }
}

export default App;
