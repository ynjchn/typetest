import React, { useEffect, useState } from 'react'
import TyperService from '../services/TyperService'

const ListUsersComponent = () => {

    const [typers, setTypers] = useState([])

    useEffect(() => {
        getAllTypers()
    }, [])
    
    const getAllTypers = () => {
        TyperService.getAllTypers().then((response) => {
            setTypers(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteTyper = (typerId) => {
        TyperService.deleteTyper(typerId).then((response) => {
        getAllTypers()
        }).catch(error => {
            console.log(error);
        })

    }
    
    function calculateAverage(array) {
        return array.reduce((a, b) => a + b) / array.length
    }

    function maxSpeed(array) {
        return Math.max(array)
    }

    return (
        <div className='maincontent'>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> User Id </th>
                    <th> User name </th>
                    <th> Average WPM</th>
                </thead>
                <tbody>
                    {
                        typers.map(
                            typer =>
                            <tr key={typer.id}>
                                <td> {typer.id} </td>
                                <td> {typer.username} </td>
                                <td> {calculateAverage(typer.speeds)} </td>
                                <td><button className = "btn btn-danger" onClick={() => deleteTyper(typer.id)}
                                    style = {{marginLeft:"10px"}}>Delete</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListUsersComponent