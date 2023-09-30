import React, { useState } from 'react'

export default function GetLogo() {

    const [file, setFile] = useState([]);
    
    return (
        <div>
            <label htmlFor='logo'></label>
            <input type='file' onChange={(e) => (setFile(e.target.files[0]))}></input>
        </div>
    )
}
