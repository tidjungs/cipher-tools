import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import InputRange from 'react-input-range';
// import { headShake } from 'react-animations';
import ModePicker from '../components/modePicker';
import CharTable from '../components/charTable';
import { getDataWithMode, ascii, deAscii } from '../utils';


// const animation = keyframes`${headShake}`;

const color1 = ['#3498db', '#1abc9c', '#F4B350', '#e74c3c', '#9b59b6'];

const color2 = ['#2980b9', '#16a085', '#f39c12', '#c0392b', '#8e44ad'];

const mobileSize = '800px';

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
const TextArea = styled.textarea`
  width: 95%;
  height: 100px;
  border: 0;
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
  background: #282c34;
  min-height: 100vh;
`;

const Box = styled.div`
  display: flex;
  width: ${props => props.width};
  padding: ${props => props.padding || 0}px;
  margin-top: ${props => props.mt || 0}px;
`;

const Footer = styled.div`
  display: flex;
  margin-right: 40px;
  margin-left: 40px;
  justify-content: space-between;
  p {
    color: white;
    margin: 0;
    margin-top: 8px;
    font-size: 12px;
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
    data: getDataWithMode(0),
    inputString: '',
    fontsize: 40,
    active: -1,
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

  changeMode = mode => () => {
    this.setState({
      mode,
      data: getDataWithMode(mode),
    });
  }

  changeInput = (e) => {
    // const str = e.target.value.toUpperCase();
    // console.log(str.length);
    this.setState({
      inputString: e.target.value.toUpperCase(),
    });
  }

  changeActive = index => (e) => {
    const { active, data } = this.state;
    console.log(e.keyCode);
    if (e.keyCode === 37) {
      // left
      this.setState({
        active: active > 0 ? active - 1 : active,
      });
    } else if (e.keyCode === 39) {
      // right
      this.setState({
        active: active < data.length - 1 ? active + 1 : active,
      });
    } else if (e.keyCode === 38) {
      this.setState({
        active: (active - 7 >= 0) ? active - 7 : active,
      });
    } else if (e.keyCode === 40) {
      this.setState({
        active: (active + 7 <= data.length) ? active + 7 : active,
      });
    }
  }

  render() {
    const firstColor = color1[Math.floor(this.state.shift / 5) % color1.length];
    const secondColor = color2[Math.floor(this.state.shift / 5) % color2.length];
    return (
      <AppContainer>
        <Row>
          <Col width="50%" padding="40">
            <ModePicker
              mode={this.state.mode}
              handleUnSelectedClicked={this.changeMode}
            />
            <Box
              width="50%"
              padding="0"
              mt="50"
            >
              {
                this.state.mode === 0 &&
                <InputRange
                  maxValue={25}
                  minValue={0}
                  value={this.state.shift}
                  onChange={shift => this.setState({ shift })}
                />
              }
            </Box>
          </Col>
          <Col width="50%" padding="20">
            <CharTable
              active={this.state.active}
              mode={this.state.mode}
              data={this.state.data}
              color={firstColor}
              shifting={this.shifting}
              handleItemClicked={index => () => this.setState({ active: index })}
              handleKeyDown={this.changeActive}
            />
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
        <style jsx global>{`
          .input-range__slider {
            background: ${firstColor};
            border: none;
          }
          .input-range__track--active {
            background: ${firstColor};
          }
        `}
        </style>
      </AppContainer>
    );
  }
}

export default App;
