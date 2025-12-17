// Test to check API response structure
fetch('http://localhost:3000/api/v1/product/searchBar?q=nike')
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => console.error(err));
