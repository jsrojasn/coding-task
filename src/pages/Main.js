import React from "react"

import Navbar from "../components/Navbar"

const Main = () => {
    //simple page for  the user when he is logged in
    return (
        <>
            <Navbar/>
            <div className="container">
                <div className="section m-5">
                <div className="jumbotron">
                    <h1 className="display-4">Welcome to Hello Build Coding Task!</h1>
                    <p className="lead">Please visit My Repositories section if you want to see your repositories listed or visit My Calendar section if you want to see your upcoming events.</p>
                </div>
                
                </div>
            </div>
        </>
    )
}

export default Main