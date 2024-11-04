import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from 'react'

export default function SubscriptionFeature({ icon, title,  description }) {
  return (
    <div className="flex flex-col items-center text-center gap-y-2 w-[25%]">
        <FontAwesomeIcon icon={icon} style={{height: "60px", width: "60px"}}/>
        <h1 className="text-sm font-semibold text-slate-800">{title}</h1>
        <p className="text-sm">{description}</p>
    </div>
  )
}
