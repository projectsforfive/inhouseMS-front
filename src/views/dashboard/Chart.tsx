

import MyChart from './MainChart';
import TeamChart from './TeamChart';

const Chart = () => {
  const teamData = [
    { name: "Team 1", average_income: 2000 },
    { name: "Team 2", average_income: 1500 },
    { name: "Team 3", average_income: 1200 },
    { name: "Team 4", average_income: 500 },
];
  return <div className='flex flex-row gap-5'>
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
