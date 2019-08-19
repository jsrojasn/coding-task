import React,{useState, useEffect} from "react"

import Navbar from "../components/Navbar"
import Event from "../components/Event"
import Spinner from "../components/Spinner"

const Calendar = () => {
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState()
    const [events, setEvents] = useState([])

    useEffect(()=>{
        //get the token from the parameters on the url
        const indexToken = window.location.href.indexOf("access_token=")+13
        if(indexToken=== -1){
            setError("Bad url, please try again!")
        }
        const indexAmpersand = window.location.href.indexOf("&", indexToken)
        const token = window.location.href.slice(indexToken,indexAmpersand)
        setToken(token)
    },[])
    useEffect(()=>{
        if(token){
            // Get today date and one month later in string to fetch the calendar api
            const todayDateString = new Date().toISOString()
            const endDate = new Date();
            const numberOfDaysToAdd = 30;
            const endDateString = new Date(endDate.setDate(endDate.getDate() + numberOfDaysToAdd)).toISOString();
            
            fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?orderBy=startTime&singleEvents=true&timeMin=${todayDateString}&timeMax=${endDateString}&maxResults=100&key=AIzaSyA7F2efLcwPMu75f6XZpc9sIF3037VxMMk`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res=>res.json())
            .then(res=>{
                setEvents(res.items)
                setLoading(false)
            })
            .catch(err=>setError("There was an error please try again later."))
        }
    },[token])

    //render error if there is an error, spinner while the calendar api is fetching and the list of events when the results are received.
    if (error) {
        return(
            <>
            <Navbar/>
            <h1 className="mb-5">Error</h1>
            </>
        )
    } else if (loading) {
        return(
            <>
            <Navbar/>
            <Spinner className="mt-5"></Spinner>
        </>
        )
    } else {
        return (
            <>
                <Navbar/>
                <div className="list__container">
                    <h2 className="mb-4">Checkout your upcoming events.</h2>
                    <div className="list-group mb-5">
                        {
                            events.map((event,index)=>(
                               <Event key={index} name={event.summary} start={event.start} description={event.description} organizer={event.organizer} url={event.htmlLink}/>
                            ))
                        }
                    </div>
                </div>
                
            </>
        )   
    }
}

export default Calendar