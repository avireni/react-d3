# Altana Search and Traverse

Altana's Atlas is a knowledge graph of companies connected to each other via trade relationships. 
This product is provides a user interface with a visualization of the graph network, and a way to discover entities and traverse the graph.

This is a Single Page Application with Routes to main page and Graph visualization Page showing trading partners network.

View the project live at https://react-d3-poc.netlify.app

### Step 1: Search for a Company 
Search for a Company Name on Atlas API with `/company/search/:query`, retrieves the list of companies that match the search string.
The retreived data is shown in a Data Table. Used `react-data-table-component`. 
Click on the desired company to visualize the company and its trading partner network.

### Step 2: Visualize the Company Trading partner network.
Selecting a Company from the Data Table takes to a Page with a Graphical display of the Company and its trading partners.
In the background, the Endpoint `/company/id/:company_id/trading-partners` is hit with the selected company id.
Further clicking the each of the trading partner nodes will retrieve data of their partners. This can go deep upto 3 levels.
Used `react-d3-tree` for Graph Display.

### Build and Run Altana Search
Ensure you are using latest version of node.

```
cd altana-search
npm install
npm run start
```
