import React from 'react'

const DockerContainersImage = ({ containers }) => {
    return (
        <table id="systable" className="table">

            {containers.map(cont => <tr id="systr"><td>{cont.image} </td></tr>)}

        </table>
    )
};

export default DockerContainersImage