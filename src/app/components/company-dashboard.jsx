'use client';

import StatsTile from "./stats-tile";


export default function CompanyDashboard() {
  return (
    <div className="px-10 flex flex-row" >
       <StatsTile />
       <StatsTile />
       <StatsTile />
       <StatsTile />
       <StatsTile />
       <StatsTile />
    </div>
  )
}
