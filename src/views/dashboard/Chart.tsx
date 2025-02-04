

import MyChart from './Mychart';

const Chart = () => {
  return <div className="basis-1/2">
      <h1>Chart</h1>
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
