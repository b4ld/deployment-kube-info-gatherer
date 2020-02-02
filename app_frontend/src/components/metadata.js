import React from 'react'

const Metadata = ({ metadata }) => {
    return Object.entries(metadata).map(([key, value], i) => {
        return (
            <table id="metatable" className="table">
                <tr id="metatr">
                    <td id="metakey">{key}</td>
                    <td id="metavalue">{value}</td>
                </tr>
            </table>
        )
    })
};

export default Metadata
