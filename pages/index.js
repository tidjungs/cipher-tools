import React, { Component } from 'react';
import styled from 'styled-components';
import InputRange from 'react-input-range';
import { getInitialData, ascii, deAscii } from '../utils';

const color1 = ['#3498db', '#1abc9c', '#F4B350', '#e74c3c', '#9b59b6'];

const color2 = ['#2980b9', '#16a085', '#f39c12', '#c0392b', '#8e44ad'];

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const CharContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  color: ${props => props.color};
`;

const Row = styled.div`
  display: flex;
`;

const Col = styled.div`
  width: ${props => props.width};
  padding: ${props => props.padding}px;
`;

const CharItem = styled.div`
  display: flex;
  font-size: 14px;
  margin-right: 30px;
  p {
    margin-right: 5px;
  }
`;

const TextArea = styled.textarea`
  width: 90%;
  height: 100px;
  border: 0;
  // font-family: 'Roboto';
  font-size: ${props => props.fontSize}px;
  resize: none;
  padding: 20px;
  color: ${props => props.color};
  background: none;

  &:focus {
    outline: none;
  }
  ::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Background = styled.div`
  background: ${props => props.background};
  transition: 0.5s;
  padding: 20px;
`;

const AppContainer = styled.div`
  background: #2c3e50;
  min-height: 100vh;
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
          <Col width="50%" padding="20">
            <p>Julius Caesar Cipher</p>
            <p>Shift: {this.state.shift}</p>
            <InputRange
              maxValue={25}
              minValue={0}
              value={this.state.shift}
              onChange={shift => this.setState({ shift })}
            />
          </Col>
          <Col width="50%" padding="0">
            <CharContainer
              color={color1[~~(this.state.shift / 5) % color1.length]}
            >
              {
                this.state.data.map(c => (
                  <CharItem key={c}>
                    <p>{`${c} `}<i className="fas fa-angle-double-right" /></p>
                    <p>{` ${this.shifting(c)}`}</p>
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
            placeholder="Type something here ..."
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
            placeholder="Output ..."
            fontSize={this.state.fontsize}
            value={this.state.inputString.split('').map(c => this.shifting(c)).join('')} 
          />
        </Background>
      </AppContainer>
    );
  }
}

export default App;
