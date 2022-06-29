import React from 'react';

import Wrapper from '../assets/wrappers/StatusItem'

const StatusItem = ({status}) => {
  return (
    <Wrapper color={status.color}>
        <header>
            <span className="count">{status.count}</span>
            <span className="icon">{status.icon}</span>
        </header>
        <h5 className="title">{status.title}</h5>
    </Wrapper>
  )
}

export default StatusItem