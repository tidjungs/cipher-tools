import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const mobileSize = '800px';

const CharContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media(max-width: ${mobileSize}) {
    display: none;
  }
`;

const CharItem = styled.div`
  display: flex;
  font-size: 14px;
  margin-right: 30px;
  p {
    margin-right: 5px;
  }
  cursor: pointer;
  ${props => props.active && `
    background: ${props.color};
  `}
  
  &:focus {
    outline: 0;
  }
`;

const ColorP = styled.p`
  color: ${(props) => {
    if (props.isChange) {
      return '#F4B350';
    }
    if (props.active) {
      return 'white';
    }
    return props.color;
  }}
`;

const CharTable = ({
  active, mode, data, color,
  shifting, handleItemClicked,
  handleKeyDown,
}) => (
  <CharContainer>
    {
      mode === 0 &&
      data.map(c => (
        <CharItem key={c}>
          <ColorP color={color}>{`${c} `}</ColorP>
          <ColorP color="white"><i className="fas fa-angle-double-right" /></ColorP>
          <ColorP color={color}>{` ${shifting(c)}`}</ColorP>
        </CharItem>
      ))
    }
    {
      mode === 1 &&
      data.map((c, index) => (
        <CharItem
          tabIndex="0"
          key={index}
          autoFocus
          active={active === index}
          color={color}
          onClick={handleItemClicked(index)}
          onKeyDown={handleKeyDown}
        >
          <ColorP color={color} active={active === index}>{c.before}</ColorP>
          <ColorP color="white"><i className="fas fa-angle-double-right" /></ColorP>
          <ColorP
            isChange={c.before !== c.after}
            color={color}
            active={active === index}
          >
            {c.after}
          </ColorP>
        </CharItem>
      ))
    }
  </CharContainer>
);

CharTable.propTypes = {
  active: PropTypes.number,
  mode: PropTypes.number,
  data: PropTypes.array,
  color: PropTypes.string,
  shifting: PropTypes.func,
  handleItemClicked: PropTypes.func,
  handleKeyDown: PropTypes.func,
};

export default CharTable;

