import React, { useEffect, useState } from 'react'
import Tree from 'react-d3-tree';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axiosConfig from '../../config/axios.config';
import useCenteredTree from '../../hooks/useCenteredTree';
import { CompaniesContainer, Button } from './styles.js';


const containerStyles = {
  width: "100%",
  height: "100vh"
};

function CompanyDetails() {
  const { companyId } = useParams();
  const { state: { companyName, countries } } = useLocation();
  const [translate, containerRef] = useCenteredTree();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({
    name: companyName,
    id: companyId,
    children: [],
    countries,
  });

  function categorizeDataforTree(result) {

    const supplierList = result.companies.map(company => ({
      name: company.company_name,
      id: company.altana_canon_id,
      countries: company.company_context.countries_of_operation
    }));
    return supplierList;
  }

  const addChildrenToNode = (nestedArray = [], id, chidrenToAdd) => {
    return nestedArray.map(ele => {
      // first node
      if (ele.id === id) {
        return {
          ...ele,
          attributes: {
            countries: ele.countries,
          },
          children: chidrenToAdd
        };
      } else {
        // all child nodes
        return {
          ...ele,
          attributes: {
            countries: ele.countries,
          },
          children: addChildrenToNode(ele.children, id, chidrenToAdd)
        }
      }
    });
  }

  const fetchCompanyDetails = async (id) => {

    //get trading partners in Companies Array
    try {
      const compTradingPartners = await axiosConfig.get(`company/id/${id}/trading-partners`);
      const childData = categorizeDataforTree(compTradingPartners.data);

      const children = childData.slice(0, 5);

      const result = addChildrenToNode([initialData], id, children);

      setInitialData(result[0])
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    fetchCompanyDetails(companyId)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId])

  const handleNodeClick = (node) => {
    fetchCompanyDetails(node.data.id);
  }

  const goback = () => {
    navigate('/')
  }

  return (
    <CompaniesContainer>
      <Button type="button" onClick={goback}>Back</Button>
      <div style={containerStyles} ref={containerRef}>
        {initialData?.children?.length ?
          <Tree
            data={initialData}
            translate={translate}
            nodeSize={{ x: 225, y: 200 }}
            orientation="vertical"
            onNodeClick={(node) => handleNodeClick(node)}
            initialDepth={5}
          /> : null}
      </div>
    </CompaniesContainer>
  )
}

export default CompanyDetails