import React from 'react'

const Sys = ({ sys }) => {
    return Object.entries(sys).map(([key, value], i) => {
        return (
            <table id="systable" className="table">
                <tr id="systr">
                    <td id="syskey">{key}</td>
                    <td id="sysvalue">{value}</td>
                </tr>
            </table>
        )
    })
};

export default Sys