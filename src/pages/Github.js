import React, {useState, useEffect} from "react"

import Navbar from "../components/Navbar"
import Repository from "../components/Repository"
import Spinner from "../components/Spinner"
import "../styles/github.css"

const CLIENT_ID = "6341f7b83283b6c60917";
// const CLIENT_SECRET= "d9d53eb0c1d3ded6a7407077de5405c73808d229"
const REDIRECT_URI = "http://localhost:3000/github";
const GITHUB_LINK = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`

const Github = (props) => {
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState()
    const [user, setUser] = useState()
    const [repositories, setRepositories] = useState()

    useEffect(()=>{
        //get the code from the url returned then fetch a gatekeepr in order
        // to avoid cors errors and get the tokenfrom github api because it 
        //doesnt allow fetch from client-side apps, 
        const code = window.location.href.slice(window.location.href.indexOf("?code=")+6, window.location.href.length)
        fetch(`https://hbgatekeeper.herokuapp.com/authenticate/${code}`)
        .then(res=>res.json())
        .then(datos=>{
            if (datos.token) {
                setToken(datos.token)   
            } else {
                window.location.href = GITHUB_LINK
            }        
        })
        .catch(err=>{
            setError("Error acessing Github Api, try again!")
        })
    },[])
    useEffect(()=>{
        //whit the token get the current username on github to fecth its repositories
        if(token){
            const requestBody = {
                query: `
                  query {
                    viewer{
                      login
                    }
                  }       
                `
            }
            fetch('https://api.github.com/graphql',{
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res=>res.json())
            .then(res=>{
                if(res.data.viewer.login){
                    setUser(res.data.viewer.login)
                } else {
                    throw new Error()
                }
            })
            .catch(err=>setError("Error acessing Github Api, try again!"))
        }
    }, [token])

    useEffect(()=>{
        //fetch the repositories from the current user
        if(user && token){
            const requestBody = {
                query: `
                    query {
                        user(login:"jsrojasn"){
                            avatarUrl
                            repositories(orderBy:{
                                field:CREATED_AT,
                                direction: DESC
                            }, first: 100
                            ){
                                nodes{
                                    name
                                    createdAt
                                      description
                                      primaryLanguage {
                                        name
                                      }
                                    url
                                }
                            }
                        }
                    }          
                `
            }
            fetch('https://api.github.com/graphql',{
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res=>res.json())
            .then(res=>{
                if(res.data){
                    setRepositories(res.data.user.repositories.nodes)
                    setLoading(false)
                } else {
                    setError("Error acessing Github Api, try again!")
                }
            })
            .catch(err=>console.log(err))
        }
    },[user])

    //render error if there is an error, spinner while the github api is fetching and the list of repos when the results are received.
    if (error) {
        return (
            <>
                <Navbar/>
                <h1 className="mt-5">{error}</h1>
            </>
        )
    } else if (loading) {
        return (
            <>
                <Navbar/>
                <Spinner className="mt-5"></Spinner>
            </>
        )
    } 
    else {
        return (
            <>
                <Navbar/>
                <div className="list__container">
                <h2 className="mb-4">Checkout your repositories.</h2>
                <div className="list-group mb-5">
                {repositories.map(({name, createdAt, description, primaryLanguage, url}, index)=>{
                    return (
                        <Repository key={index} name={name} createdAt={createdAt} description={description} primaryLanguage={primaryLanguage} url={url}/>
                    )
                })}
                </div>
                </div>
            </>
        )
    } 
}

export default Github