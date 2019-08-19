import React, {useRef, useState} from "react"
import {Link} from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

import "../styles/auth.css"

const Signup = (props) => {
    const userRef = useRef("")
    const passwordRef = useRef("")
    const [message, setMessage] = useState("")


    const signupHandler = (e) => {
        e.preventDefault()
        localStorage.setItem("user", userRef.current.value)
        localStorage.setItem("password", passwordRef.current.value)
        setMessage("Account created succesfully!")
        setTimeout(()=>props.history.push("/login"), 2500) 
        
    }


    return (
        <div className="auth__background">
            <div className="card">
                <article className="card-body">
                    <h4 className="card-title text-center mb-4 mt-1">Sign Up</h4>
                    <hr/>
                    <p className="text-success text-center">{message}</p>
                    <form>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <FontAwesomeIcon icon={faUser} /> </span>
                                </div>
                                <input className="form-control" placeholder="Username" type="text" ref={userRef} required/>
                            </div> 
                        </div> 
                        <div className="form-group">
                            <div className="input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text"> <FontAwesomeIcon icon={faLock} /> </span>
                                </div>
                                <input className="form-control"  placeholder="********" type="password" ref={passwordRef} required/>
                           </div> 
                        </div> 
                        <div className="form-group">
                            <button onClick={(e)=>signupHandler(e)} type="submit" className="btn btn-dark btn-block"> SIGN UP  </button>
                        </div> 
                        <span className="text-center"><Link to="/login" className="btn btn-link">Already have account? Login</Link></span>
                    </form>
                </article>
            </div> 
        </div>  
    )
}

export default Signup