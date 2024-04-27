import React from 'react'
import ResponseCard from './responseCard'
const response = ({data}) => {
  return (
    <div className="ResponseContainer">
      <ResponseCard
            data = {data}
          />
    </div>
  )
}

export default response
