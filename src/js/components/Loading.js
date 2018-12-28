import React from 'react'
import Loading from 'react-loading'
import styled from 'styled-components'

const Contents = styled.div`
  & {
    width: 100%;
    height: 100%;
    background-color: #eee;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export default () => (
  <Contents>
    <Loading type="spinningBubbles" color="#888" height={120} width={120} />
  </Contents>
)
