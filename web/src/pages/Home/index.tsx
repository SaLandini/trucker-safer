import React from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import './styles.css'

const Home = () => { 
    return(
        <div id="page-home">
            <div className="content">
                <header>
                </header>
                <main>
                    <h1>TRUCK SAFER</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum dicta minima aliquid.</p> 
                        <Link to="/create-problem">
                            <span>
                                <FiLogIn />
                            </span>
                            <strong>
                                Relate seu problema
                            </strong>
                        </Link>
                        <Link to="/show-problems">
                            <span>
                                <FiLogIn />
                            </span>
                            <strong>
                                Listar todos os problemas
                            </strong>
                        </Link>
                </main>
            </div>
        </div>
    )
}

export default Home