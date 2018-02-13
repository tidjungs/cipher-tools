import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import InputRange from 'react-input-range';
import ToggleButton from 'react-toggle-button';
import { Base64 } from 'js-base64';
// import { headShake } from 'react-animations';
import ModePicker from '../components/modePicker';
import CharTable from '../components/charTable';
import { getDataWithMode, ascii, deAscii, replaceString } from '../utils';


// const animation = keyframes`${headShake}`;

const color1 = ['#3498db', '#1abc9c', '#F4B350', '#e74c3c', '#9b59b6'];

const color2 = ['#2980b9', '#16a085', '#f39c12', '#c0392b', '#8e44ad'];


const Row = styled.div`
  display: flex;
`;

const Col = styled.div`
  width: ${props => props.width};
  padding: ${props => props.padding}px;
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
  position: relative;
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
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
  p {
    color: white;
    margin: 0;
    font-size: 12px;
    margin-left: 30px;
    margin-bottom: 5px;
  }
  a {
    color: white;
    text-decoration: none;
    margin-right: 30px;
    margin-bottom: 5px;
  }
`;

const InputLabel = styled.label`
  color: white;
  margin-right: 10px;
`;

class App extends Component {
  state = {
    mode: 0,
    shift: 0,
    data: getDataWithMode(0),
    inputString: '',
    fontsize: 40,
    active: -1,
    decode: false,
  }

  getOutput = () => {
    if (this.state.mode === 0) {
      return this.state.inputString.split('').map(c => this.shifting(c)).join('');
    }
    if (this.state.mode === 1) {
      return this.state.mode === 1 && replaceString(this.state.inputString, this.state.data);
    }
    if (this.state.decode) {
      return Base64.decode(this.state.inputString);
    }
    return Base64.encode(this.state.inputString);
  }

  changeMode = mode => () => {
    this.setState({
      mode,
      data: getDataWithMode(mode),
      active: -1,
    });
  }

  changeInput = (e) => {
    const inputString = this.state.mode === 2 ? e.target.value : e.target.value.toUpperCase();
    this.setState({
      inputString,
    });
  }

  changeActive = (e) => {
    const { active, data } = this.state;
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
      // up
      this.setState({
        active: (active - 6 >= 0) ? active - 6 : active,
      });
    } else if (e.keyCode === 40) {
      // down
      this.setState({
        active: (active + 6 <= data.length) ? active + 6 : active,
      });
    } else if (e.keyCode >= 65 && e.keyCode <= 90) {
      const nextData = data.map((c, index) => (
        index === active ? { ...c, after: deAscii(e.keyCode) } : c
      ));
      this.setState({
        data: nextData,
      });
    }
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

  render() {
    const firstColor = color1[Math.floor(this.state.shift / 5) % color1.length];
    const secondColor = color2[Math.floor(this.state.shift / 5) % color2.length];
    //const nextColor = color1[(Math.floor(this.state.shift / 5) + 1) % color1.length];
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
              {
                this.state.mode === 2 &&
                <Row>
                  <InputLabel>DECODE</InputLabel>
                  <ToggleButton
                    value={this.state.decode}
                    onToggle={(value) => {
                      this.setState({
                        decode: !value,
                      });
                    }}
                  />
                </Row>
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
            value={this.getOutput()}
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
