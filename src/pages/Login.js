import React, {useRef, useState} from "react"
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

import "../styles/auth.css"

const Login = (props) => {
    const userRef = useRef("")
    const passwordRef = useRef("")
    const [message, setMessage] = useState("")

    const loginHandler = (e) => {
        e.preventDefault()
        const emailUser = localStorage.getItem("user")
        const passwordUser = localStorage.getItem("password")
        if (emailUser === userRef.current.value && passwordUser === passwordRef.current.value) {
            setMessage("")
            //faking a fetch to a database
            setTimeout(()=>props.history.push("/"),2500)
        } else {
            setMessage("Bad combination of user and password, try again!")
        }
    }    
    return (
        <div className="auth__background">
            <div className="card">
                <article className="card-body">
                    <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
                    <hr/>
                    <small className="text-warning text-center mb-2">{message}</small>
                    <form>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <FontAwesomeIcon icon={faUser} /> </span>
                                </div>
                                <input name="" className="form-control" placeholder="Username" type="text" ref={userRef} required/>
                            </div> 
                        </div> 
                        <div className="form-group">
                            <div className="input-group">
                <               div className="input-group-prepend">
                                    <span className="input-group-text"> <FontAwesomeIcon icon={faLock} /> </span>
                                </div>
                                <input className="form-control" placeholder="********" type="password" ref={passwordRef} required/>
                           </div> 
                        </div> 
                        <div className="form-group">
                            <button onClick={(e)=>loginHandler(e)} type="submit" className="btn btn-dark btn-block"> LOGIN  </button>
                        </div> 
                        <span className="text-center"><Link to="/signup" className="btn btn-link">Doesnt have an account? Sign up</Link></span>
                    </form>
                </article>
            </div> 
        </div>
    )
}

export default Login