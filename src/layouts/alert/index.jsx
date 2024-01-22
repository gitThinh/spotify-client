import { useEffect, useState } from "react"

import './style.css'


const index = ({ message }) => {

    return message && (
        <div className='bouder_alert noone_coppy'>
            <div className={`show_alert`}>
                <p className="alert_text">{message}</p>
            </div>
        </div>
    )
}

export default index