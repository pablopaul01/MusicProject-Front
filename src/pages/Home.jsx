import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Link to={"/upload"}>
            Upload Song
        </Link>
    </div>
  )
}

export default Home