import React from 'react'
import Badge from 'react-bootstrap/Badge'

const ProviderLabel = ({ vendor }) => {
    return (
    <Badge variant="primary" id="vendorlabel">Cloud Provider: {vendor.provider}</Badge>
    )
};

export default ProviderLabel


