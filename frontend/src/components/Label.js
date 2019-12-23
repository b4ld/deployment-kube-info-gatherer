import React from 'react'
import Badge from 'react-bootstrap/Badge';

const Label = ({ data }) => {
    return (
        <div id="div-label">
            <Badge variant="success" id="provider-label"> Cloud Provider: <br/> DigitalOcean{data}</Badge>
        </div>
    )
};

export default Label