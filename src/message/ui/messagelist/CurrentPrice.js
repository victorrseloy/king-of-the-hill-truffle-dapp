import React from 'react'

const CurrentPrince = ({ currentPrice }) => {
    return(
        <h1>Price: {currentPrice.toString()} ETH</h1>
    )
}

export default CurrentPrince
