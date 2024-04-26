import React from 'react'

const response = ({data}) => {
  return (
    <div className="ResponseContainer">
        <div className="ResponseSet">
        {
            data && data.map((pred, index) => (
            <div className="ResponseTile">
                <p><strong>Question : </strong>{pred.question}</p>
                <p><strong>Answer : </strong>{pred.answer}</p>
            </div>
            ))
        }
        </div>
    </div>
  )
}

export default response
