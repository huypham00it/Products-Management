import React from 'react';

import {useStateValue} from '../context/StateContext';
import StatusItem from './StatusItem';
import {MdPendingActions} from 'react-icons/md';
import {GiConfirmed} from 'react-icons/gi';
import {MdOutlineCancelPresentation} from 'react-icons/md';

import Wrapper from '../assets/wrappers/StatusContainer'

const StatusContainer = () => {
    const {productsStatus} = useStateValue();

    const defaultStatus = [
        {
            title: 'Delivering Products',
            icon: <MdPendingActions />,
            count: productsStatus.delivering || 0,
            color: '#017bc1'
        },
        {
            title: 'Delivered Products',
            icon: <GiConfirmed />,
            count: productsStatus.delivered || 0,
            color: '#22a579'
        },
        {
            title: 'Cancelled Products',
            icon: <MdOutlineCancelPresentation />,
            count: productsStatus.cancelled || 0,
            color: '#eeac35'
        },
    ]

  return (
    <Wrapper>
        {defaultStatus.map((status, index) => <StatusItem key={index} status={status} />)}
    </Wrapper>
  )
}

export default StatusContainer