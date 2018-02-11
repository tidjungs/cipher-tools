import React, { Component } from 'react';
import styled from 'styled-components';
import InputRange from 'react-input-range';
import { getInitialData, ascii, deAscii } from '../utils';

const color1 = ['#3498db', '#1abc9c', '#f1c40f', '#e74c3c', '#9b59b6'];

const color2 = ['#2980b9', '#16a085', '#f39c12', '#c0392b', '#8e44ad'];

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
`;

const Col = styled.div`
  width: ${props => props.width};
  padding: 40px;
`;

const CharItem = styled.div`
  display: flex;
  font-size: 10px;
  margin-right: 30px;
  p {
    margin-right: 5px;
  }
`;

const TextArea = styled.textarea`
  width: 90%;
  height: 100px;
  border: 0;
  font-size: ${props => props.fontSize}px;
  resize: none;
  padding: 20px;
  color: ${props => props.color};
  margin-bottom: 20px;
  background: none;

  &:focus {
    outline: none;
  }
`;

const Background = styled.div`
  background: ${props => props.background};
  transition: 0.5s;
  padding: 20px;
`;

const AppContainer = styled.div`
  width: 100%;
`;

class App extends Component {
  state = {
    mode: 0,
    shift: 0,
    data: getInitialData(),
    inputString: '',
    fontsize: 20,
  }

  shifting = (char) => {
    const number = ascii(char);
    if (number < 65 || number > 90) {
      return char;
    }
    const nextNumber = number + this.state.shift;
    const rotateNumber = nextNumber <= 90 ? nextNumber : nextNumber - 26;
    return deAscii(rotateNumber);
  }

  changeInput = (e) => {
    this.setState({
      inputString: e.target.value.toUpperCase(),
    });
  }

  render() {
    return (
      <AppContainer>
        {/* <Title>Ciphers</Title> */}
        <Row>
          <Col width="50%">
            <InputRange
              maxValue={25}
              minValue={0}
              value={this.state.shift}
              onChange={shift => this.setState({ shift })}
            />
          </Col>
          <Col width="50%">
            <CharContainer>
              {
                this.state.data.map(c => (
                  <CharItem key={c}>
                    <p>{`${c} => `}</p>
                    <p>{this.shifting(c)}</p>
                  </CharItem>
                ))
              }
            </CharContainer>
          </Col>
        </Row>
        <Background
          background={color1[~~(this.state.shift / 5) % color1.length]}
        >
          <TextArea
            color="white"
            contenteditable="true"
            placeholder="type something here ..."
            fontSize={this.state.fontsize}
            value={this.state.inputString}
            onChange={this.changeInput}
          />
        </Background>
        <Background
          background={color2[~~(this.state.shift / 5) % color2.length]}
        >
          <TextArea
            color="white"
            fontSize={this.state.fontsize}
            value={this.state.inputString.split('').map(c => this.shifting(c)).join('')} 
          />
        </Background>
      </AppContainer>
    );
  }
}

export default App;
