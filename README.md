#  Altana's Atlas is a knowledge graph of companies connected to each other via trade relationships. Our customers may consume our APIs, but the product we would like to present for them should include a user interface with a visualization of the graph network, and a way to discover entities and traverse the graph.

This is a Single Page Application with Routes to main page and Graph visualization Page showing trading partners network.

Search for a Company Name on Atlas API with `/company/search/:query`, retrieves the list of companies that match the search string.
The retreived data is shown in a Data Table. Used `react-data-table-component`.

Selecting a Company from the Data Table takes to a Page with a Graphical display of the Company and its trading partners.
In the background, the Endpoint `/company/id/:company_id/trading-partners` is hit with the selected company id.
Further clicking the each of the trading partner nodes will retrieve data of their partners. This can go deep upto 3 levels. Used `react-d3-tree` for Graph Display. 
