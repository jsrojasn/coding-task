import React from "react"
import moment from "moment"

const Event = (props) => {
    console.log(props)
    return (
        <div className="list-group-item border border-dark">
            <div className="d-flex w-100 justify-content-between">
                <a href={`${props.url}`} className="mb-1"><h4>{props.name}</h4></a>
                <small>{props.start.dateTime ? moment(props.start.dateTime).format("MMMM Do YYYY, h:mm a"):moment(props.start.date).format("MMM Do YY")}</small>
                
            </div>
            <p className="mb-1">{props.description ? props.description:"There is not description available."}</p>
            {props.organizer && props.organizer.email ? <small>{`Organizer: ${props.organizer.email}.`}</small>:""}
        </div>
    )
}

export default Event