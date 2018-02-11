import React, { Component } from 'react';
import styled from 'styled-components';
import InputRange from 'react-input-range';
import ModePicker from '../components/modePicker';
import { getInitialData, ascii, deAscii } from '../utils';

const color1 = ['#3498db', '#1abc9c', '#F4B350', '#e74c3c', '#9b59b6'];

const color2 = ['#2980b9', '#16a085', '#f39c12', '#c0392b', '#8e44ad'];

const mobileSize = '800px';


const CharContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media(max-width: ${mobileSize}) {
    display: none;
  }
`;

const Row = styled.div`
  display: flex;
  @media(max-width: ${mobileSize}) {
    flex-direction: column;
  }
`;

const Col = styled.div`
  width: ${props => props.width};
  padding: ${props => props.padding}px;
  @media(max-width: ${mobileSize}) {
    width: 100%;
  }
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

const Box = styled.div`
  display: flex;
  width: ${props => props.width};
  padding: ${props => props.padding || 0}px;
  margin-top: ${props => props.mt || 0}px;
`;

const InputTitle = styled.label`
  margin-right: 30px;
  font-size: 20px;
  color: white;
`;

const ColorP = styled.p`
  color: ${props => props.color}
`;

const Footer = styled.div`
  display: flex;
  margin-right: 40px;
  margin-left: 40px;
  justify-content: space-between;
  p {
    color: white;
    margin: 0;
    margin-top: 5px;
  }
  a {
    color: white;
    margin-top: 5px;
    text-decoration: none;
  }
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
    const firstColor = color1[~~(this.state.shift / 5) % color1.length];
    const secondColor = color2[~~(this.state.shift / 5) % color2.length];
    return (
      <AppContainer>
        <Row>
          <Col width="50%" padding="40">
            <ModePicker 
              mode={this.state.mode}
              handleUnSelectedClicked={mode => () => { 
                this.setState({ mode }); 
              }}
            />
            <Box
              width="100%"
              padding="0"
              mt="20"
            >
              <InputTitle>Shifting</InputTitle>
              <Box
                width="50%"
                mt="8"
              >
                <InputRange
                  maxValue={25}
                  minValue={0}
                  value={this.state.shift}
                  onChange={shift => this.setState({ shift })}
                />
              </Box>
            </Box>
          </Col>
          <Col width="50%" padding="20">
            <CharContainer>
              {
                this.state.data.map(c => (
                  <CharItem key={c}>
                    <ColorP
                      color={firstColor}
                    >{`${c} `}
                    </ColorP>
                    <ColorP color="white"><i className="fas fa-angle-double-right" /></ColorP>
                    <ColorP color={firstColor}>{` ${this.shifting(c)}`}</ColorP>
                  </CharItem>
                ))
              }
            </CharContainer>
          </Col>
        </Row>
        <Background
          background={firstColor}
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
          background={secondColor}
        >
          <TextArea
            color="white"
            placeholder="Output ..."
            fontSize={this.state.fontsize}
            value={this.state.inputString.split('').map(c => this.shifting(c)).join('')} 
          />
        </Background>
        <Footer>
          <p>By Waewprach Suthirawut</p>
          <a href="https://github.com/tidjungs/cipher-tools"><i className="fab fa-github" />{'  Github'}</a>
        </Footer>
      </AppContainer>
    );
  }
}

export default App;
