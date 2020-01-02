import React from 'react'

const DockerContainersState = ({ containers }) => {
    return (
        <table id="systable" className="table">

            {containers.map(cont => <tr id="systr" ><td>{cont.state} </td></tr>)}

        </table>
    )
};

export default DockerContainersState
