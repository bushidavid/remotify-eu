'use client';

import StatsTile from "./stats-tile";


export default function CompanyDashboard() {
  return (
    <div className="px-10 flex flex-row gap-5" >
      <div className="w-full flex flex-row gap-5 justify-between">
          <StatsTile title={"stat title"} stat={7}/>
          <StatsTile title={"stat title"} stat={7}/>
          <StatsTile title={"stat title"} stat={7}/>
          <StatsTile title={"stat title"} stat={7}/>
          <StatsTile title={"stat title"} stat={7}/>
          <StatsTile title={"stat title"} stat={7}/>
       </div>
       <div>
          
       </div>
    </div>
  )
}
