

import MyChart from './MainChart';
import TeamChart from './TeamChart';

const Chart = () => {
  const teamData = [
    { name: "John", average_income: 2000 },
    { name: "Jane", average_income: 1500 },
    { name: "Bob", average_income: 1200 },
    { name: "Alice", average_income: 500 },
];
  return <div className='flex flex-row'>
      <MyChart />
      <TeamChart teams={teamData} />
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
