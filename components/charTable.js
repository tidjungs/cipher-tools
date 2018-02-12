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
`;

const ColorP = styled.p`
  color: ${props => props.color}
`;

const CharTable = ({ data, color, shifting }) => (
  <CharContainer>
    {
      data.map(c => (
        <CharItem key={c}>
          <ColorP color={color}>{`${c} `}</ColorP>
          <ColorP color="white"><i className="fas fa-angle-double-right" /></ColorP>
          <ColorP color={color}>{` ${shifting(c)}`}</ColorP>
        </CharItem>
      ))
    }
  </CharContainer>
);

CharTable.propTypes = {
  data: PropTypes.array,
  color: PropTypes.string,
  shifting: PropTypes.func,
};

export default CharTable;

