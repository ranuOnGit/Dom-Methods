import React, { useState, useEffect } from 'react'
import './Display.css'
import Button from '../Buttons/Buttons'
import Person from '../Person/Person'
import { FaUserPlus } from 'react-icons/fa'
import { FaCoins } from 'react-icons/fa'
import { FaWallet } from 'react-icons/fa'
import { FaSortAmountDown } from 'react-icons/fa'
import { FaCalculator } from 'react-icons/fa'

const Display = () => {
  const [ user, setUser ] = useState( [] )
  const [ total, setTotal ] = useState()
  const [show, setShow] = useState(false)

  const add = async () => {
    const response = await fetch('https://randomuser.me/api')
    const data = await response.json()
    const newUser = data.results[0]

    setUser((user) => [
      ...user,
      {
        id: `${newUser.login.uuid}`,
        name: `${newUser.name.first} ${newUser.name.last}`,
        money: Math.floor(Math.random() * 1000000),
      },
    ])
  }

  useEffect( () => {
    add()
    add()
    add()
  }, [])

  const double = () => {
    setUser(
      user.map((user) => {
        return { ...user, money: user.money * 2 }
      }),
    )
  }

  const millionainers = () => {
    setUser( user.filter( ( user ) => user.money > 1000000 ) )
    
  }

  const sort = () => {
    setUser( ( user ) => {
      const usersToSort = [ ...user ]
      usersToSort.sort( ( a, b ) => Number( b.money ) - Number( a.money ) )
      return usersToSort
    })               
  }

  const calculate = () => {
    setTotal( user.reduce( ( acc, user ) => ( acc += user.money ), 0 ) )
    setShow(true)
  }

  return (
    <div className='container'>
      <div className='aside'>
        <Button clicked={add}>
          Add User <FaUserPlus />
        </Button>
        <Button clicked={double}>
          Double Money <FaCoins />
        </Button>
        <Button clicked={millionainers}>
          Show Only Millionaires <FaWallet />
        </Button>
        <Button clicked={sort}>
          Sort by Richest <FaSortAmountDown />
        </Button>
        <Button clicked={calculate}>
          Calculate entire Wealth <FaCalculator />
        </Button>
      </div>
      <div className='main'>
        <h2 className='heading2'>
          <strong>Person</strong>Wealth
        </h2>
        <Person user={ user } />
        {show ? <h3 className='heading3'>
          Total Wealth: <strong>{total}</strong>
        </h3> : null}        
      </div>
    </div>
  )
}

export default Display
