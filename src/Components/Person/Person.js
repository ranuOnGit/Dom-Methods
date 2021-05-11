import React from 'react'
import './Person.css'

const Person = ({ user }) => {
  return (
    <div>
      {user.map((person) => {
        const { id, name, money } = person
        return (
          <div className='person' key={id}>
            <strong>{name}</strong>
            {money}
          </div>
        )
      })}
    </div>
  )
}

export default Person
