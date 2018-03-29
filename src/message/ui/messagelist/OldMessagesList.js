import React from 'react'

const OldMessagesList = ({ messageList }) => {
    return(<ul>
            {messageList.map( (listItem,index) =>  <li key={index}> {listItem} </li>)}
        </ul>

    )
}

export default OldMessagesList
