import React, { Fragment, useState } from 'react';
import DataTable from "react-data-table-component";

export default function Search() {
  const [name, setName] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);
  const columns = [
    {
      name: "Company Name",
      selector: "company_name",
    },
    {
      name: "Trading Partners",
      selector: (row) => row.company_context.suppliers.length
    }
  ];


  function updateName(event) {
    setName(event.target.value);
  }
  function hanldeRowClicked(data) {

    //get trading partners in Companies Array
    console.log('company ID', data.altana_canon_id);
    const url = `https://api.altana.ai/atlas/v1/company/id/${data.altana_canon_id}/trading-partners`
    const opts = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'method': 'GET',
        'x-api-key': 'MTpJbnRlcnZpZXclMjAyMDIxLTA5LTIyOjE2MzIzNTk2NTU6NWNhMzViYjk.ZmEwZWI5OTdmYWJjYWFlZWJmY2YyNGYyN2FkMmQ5YzkwODQ4NWNiYg',
      },
    };
    fetch(url, opts)
    .then(response => response.json())
    .then((result => {
      console.log('RESULT ON COMP ID', result);
    }))
    .catch((error) => {
      console.log('error', error);
    });
  }

  function createTable(res) {
 console.log("CREATE TABLE");
 console.log('data', res);

    setData(res.companies);
    // console.log('data', data);
  }

  function submitNameSearch(event) {
    event.preventDefault();
    if (name.length > 0) {
      const url = `https://api.altana.ai/atlas/v1/company/search/${name}`;
      const opts = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'method': 'GET',
          'x-api-key': 'MTpJbnRlcnZpZXclMjAyMDIxLTA5LTIyOjE2MzIzNTk2NTU6NWNhMzViYjk.ZmEwZWI5OTdmYWJjYWFlZWJmY2YyNGYyN2FkMmQ5YzkwODQ4NWNiYg',
        },
      };

      fetch(url, opts)
        .then(response => response.json()).then((result => {
          console.log(result);
          setLoaded(true);
          createTable(result);
        }))
        .catch((error) => {
          setLoaded(false);
          // alert("Please type a valid city");
          console.log(error);
        });
    } else {
      alert("Please type a city");
      setLoaded(false);
    }
  }
  return (
    <Fragment>
    <div className="SearchEngine">
      <form onSubmit={submitNameSearch}>
        <input type="search" placeholder="search with name" onChange={updateName} />
        <button type="submit">Search</button>
      </form>
      </div>
       {loaded && (
         <div className=''>
         <DataTable 
          title ="Companies"
          columns={columns}
          data={data}
          pagination
          onRowClicked={hanldeRowClicked}
         />
         </div>
       )}

    </Fragment>
  )
}