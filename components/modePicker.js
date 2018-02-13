import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { pulse } from 'react-animations';

const pulseAnimation = keyframes`${pulse}`;

const Container = styled.div`
  display: flex;
`;

const Selected = styled.p`
  color: #F4B350;
  font-size: 16px;
  margin: 0px;
  margin-right: 20px;
  animation: 0.5s ${pulseAnimation};
`;

const UnSelected = styled.a`
  color: white;
  opacity: 0.5;
  font-size: 14px;
  cursor: pointer;
  margin: 0px;
  margin-right: 20px;
  margin-top: 2px;
  &:hover {
    opacity: 1;
  }
`;

const nameList = [
  { text: 'Julius Caesar', icon: 'fa-chess-king' },
  { text: 'Substitution', icon: 'fa-chess-knight' },
  { text: 'Base64', icon: 'fa-chess-rook' },
];

const ModePicker = ({ mode, handleUnSelectedClicked }) => (
  <Container>
    {
      nameList.map((name, index) => (
        mode === index ? (
          <Selected key={name.text}><i className={`fas ${name.icon}`} />{`  ${name.text}`}</Selected>
        ) : (
          <UnSelected key={name.text} onClick={handleUnSelectedClicked(index)}>{name.text}</UnSelected>
        )
      ))
    }
  </Container>
);

ModePicker.propTypes = {
  mode: PropTypes.number,
  handleUnSelectedClicked: PropTypes.func,
};

export default ModePicker;

