import React, { useEffect, useState } from 'react'
import CompanyDataTable from '../../components/CompanyDataTable';
import Search from '../../components/Search';
import axiosConfig from '../../config/axios.config';
import { SearchContainer } from './styles';

function SearchPage() {
	// using useState to set data for the search string and response from search api call
	const [name, setName] = useState('north');
	const [companiesData, setCompaniesData] = useState([]);

	const handleClick = async (event) => {
		// set search string to name prop
		setName(event);

		if (!name.length) {
			alert("Please type a company name");
			return;
		}

		// hit the company search api with the search string
		try {
			const result = await axiosConfig.get(`/company/search/${event}`);

			// set response to companiesData, which is passed as props to CompanyDataTable
			setCompaniesData(result.data.companies);
		} catch (error) {
			setCompaniesData([]);
		}
	}

	useEffect(() => {
		handleClick(name)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<SearchContainer>
			<Search value={name} handleClick={handleClick} />
			{companiesData.length ? (
				<CompanyDataTable data={companiesData} />
			) : null}
		</SearchContainer>
	)
}

export default SearchPage