import React from 'react'
import CoinItem from './CoinItem'
import Coin from '../routes/Coin'
import { Link } from 'react-router-dom'
import { useState } from "react"
import './Coins.css'

const Coins = (props) => {

    const [query, setQuery] = useState("");

  return (
    <>
        
        
        <div className='container'>

            <div className='searchdiv'>
                
                <input className='searchbar' placeholder="search coins" type="text" onChange={e => setQuery(e.target.value)} />
            </div>

            <div>
                <div className='heading'>
                    <p>#</p>
                    <p className='coin-name'>Coin</p>
                    <p>Price</p>
                    <p>24h</p>
                    <p className='hide-mobile'>Volume</p>
                    <p className='hide-mobile'>Mkt Cap</p>
                </div>
                
                    {props.coins.map(coins => {    
                        if (!query){
                            return (
                                <Link to={`/coin/${coins.id}`} element={<Coin />} key={coins.id}>
                                    <CoinItem coins={coins} />
                                </Link>
    
                            )
                        } else if (coins.name.toLowerCase().includes(query)){
                            return (
                                <Link to={`/coin/${coins.id}`} element={<Coin />} key={coins.id}>
                                    <CoinItem coins={coins} />
                                </Link>
                                
                            )
                        }
                    })}

            </div>
        </div>
    </>
    
  )
}

export default Coins
