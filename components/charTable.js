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
  background: ${props => (props.active ? 'red' : 'none')}
`;

const ColorP = styled.p`
  color: ${props => props.color}
`;

const CharTable = ({
  active, mode, data, color,
  shifting, handleItemClicked,
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
        <CharItem key={index} onClick={handleItemClicked(index)} active={active === index}>
          <ColorP color={color}>{c.before}</ColorP>
          <ColorP color="white"><i className="fas fa-angle-double-right" /></ColorP>
          <ColorP color={color}>{c.after}</ColorP>
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
};

export default CharTable;

