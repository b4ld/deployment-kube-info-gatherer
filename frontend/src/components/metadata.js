import React from 'react'
// import Table from 'react-bootstrap/Table'

const Metadata = ({ metadata }) => {
    return  Object.entries(metadata).map(([key, value], i) => {
        return (
                <table>
                    <tbody>
                        <tr>
                            <td>{key} -- </td>
                            <td> > {value}</td>
                        </tr>
                    </tbody>

                </table>
        )
    })
};

export default Metadata
