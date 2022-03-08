import React from 'react'
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom";

const customStyles = {
  headCells: {
    style: {
        fontSize: '18px'
    },
},
  rows: {
    style: {
      fontSize: '18px'
    },
  }
};

function CompanyDataTable({ data }) {

  const navigate = useNavigate()
  const columns = [
    {
      name: "Company Name",
      selector: "company_name",
    },
    {
      name: "Trading Partners",
      selector: (row) => row.company_context.suppliers.length
    },
    {
      name: "Countries of Operation",
      selector: (row) => row.company_context.countries_of_operation.join(", ")
    }
  ];

  const handleRowClicked = (data) => {
    // navigate to the next page
    navigate(`/company/${data.altana_canon_id}`, {
      state: {
        companyName: data.company_name,
        id: data.altana_canon_id,
        countries: data.company_context.countries_of_operation
      }
    })
  }

  return (
    <div className='data-table row'>
      <DataTable
        columns={columns}
        data={data}
        pagination
        onRowClicked={handleRowClicked}
        customStyles={customStyles}
      />
    </div>
  )
}

export default CompanyDataTable;