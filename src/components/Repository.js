import React from "react"
import moment from "moment"

const Repository = (props) => {
    return (
        <div className="list-group-item border border-dark">
            <div className="d-flex w-100 justify-content-between">
                <a href={`${props.url}`} className="mb-1"><h4>{props.name}</h4></a>
                <small>{moment(props.createdAt).format("MMM Do YY")}</small>
            </div>
            <p className="mb-1">{props.description ? props.description:"There is not description available."}</p>
            {props.primaryLanguage ? <small>{`Primary language: ${props.primaryLanguage.name}.`}</small>:""}
        </div>
    )
}

export default Repository