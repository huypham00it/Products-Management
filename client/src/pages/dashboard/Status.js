import React, {useEffect} from 'react';

import {useStateValue} from '../../context/StateContext';
import { StatusContainer, ChartsContainer, Loading } from '../../components';

const status = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {isLoading, showStatus, monthlyApplications} = useStateValue();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    showStatus()
    // eslint-disable-next-line 
  },[])


  if(isLoading){
    return <Loading />
  }

  return (
    <>
      <StatusContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  )
}

export default status