import React from 'react'

const DockerContainers = ({ containers }) => {
    return (
        <table id="systable" className="table">

            {containers.map(cont => <tr id="systr"><td>{cont.name} </td></tr>)}

        </table>
    )
};

export default DockerContainers
