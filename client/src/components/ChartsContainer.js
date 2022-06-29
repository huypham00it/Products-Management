import React, {useState} from 'react'

import Wrapper from '../assets/wrappers/ChartContainer';
import {useStateValue} from '../context/StateContext';

import LineChart from './LineChart';
import BarChart from './BarChart';
import AreaChart from './AreaChart';

const ChartsContainer = () => {
  const chartTypes = ['Bar Chart', 'Area Chart', 'Line Chart'];
  const [chartIndex, setChartIndex] = useState(0)

  const {monthlyApplications: data} = useStateValue();

  const handleChange = () => {
    if(chartIndex === chartTypes.length - 1){
      setChartIndex(0);
    }else {
      setChartIndex(chartIndex + 1);
    }
  }

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button 
        type="button"
        onClick={handleChange}
      >
        {chartTypes[chartIndex]}
      </button>
      {chartTypes[chartIndex] === 'Area Chart' && <BarChart data={data} />}
      {chartTypes[chartIndex] === 'Line Chart' && <AreaChart data={data} />}
      {chartTypes[chartIndex] === 'Bar Chart' && <LineChart data={data} />}
    </Wrapper>
  )
}

export default ChartsContainer