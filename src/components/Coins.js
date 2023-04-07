import React from 'react'
import CoinItem from './CoinItem'
import Coin from '../routes/Coin'
import { Link } from 'react-router-dom'
import { useState } from "react"
import './Coins.css'

const Coins = (props) => {

    const [query, setQuery] = useState("");
    const coinList = props.coins;
    const filteredCoins = coinList.filter(coin => coin.name.includes(query));


  return (
    <>
        
        
        <div className='container'>

            <div className='searchdiv'>
                <label>Search</label>
                <input className='searchbar' type="text" onChange={e => setQuery(e.target.value)} />
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
                            console.log(coins.name);
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
