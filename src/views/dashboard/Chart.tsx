

import MyChart from './Mychart';

const Chart = () => {
  return <div >
      <MyChart />
      <style jsx>{`
                main {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }
            `}</style>
  </div> 
};

export default Chart;
