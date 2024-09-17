const chemicalData = [
    {tick:'✓', 
      id: 1, 
      chemicalName: 'Ammonium Persulfate', 
      vendor: 'LG Chem', 
      density: 3525.92, 
      viscosity: 60.63, 
      packaging: 'Bag', 
      packSize: 100.00 , 
      unit: 'kg', 
      quantity: 6495.18},
    { tick:'✓',
      id: 2, 
      chemicalName: 'Caustic Potash', 
      vendor: 'Formosa', 
      density: 3172.15, 
      viscosity: 48.22, 
      packaging: 'Bag', 
      packSize: 100.00 , 
      unit: 'kg', 
      quantity:8751.90},
      { tick:'✓',
      id: 3, 
      chemicalName: 'Dimethylaminopropylamino', 
      vendor: 'LG Chem', 
      density:8435.37, 
      viscosity:12.62, 
      packaging: 'Barrel', 
      packSize:75.00 , 
      unit: 'L', 
      quantity:5964.61},
      { tick:'✓',
      id: 4, 
      chemicalName: 'Mono Ammonium Phosphate', 
      vendor: 'Sinopec', 
      density:1597.65, 
      viscosity:76.51, 
      packaging: 'Bag', 
      packSize:105.00, 
      unit: 'kg', 
      quantity:8183.73},
      { tick:'✓',
      id: 5, 
      chemicalName: 'Ferric Nitrate', 
      vendor: 'DowDuPont', 
      density:364.04, 
      viscosity:14.90, 
      packaging: 'Bag', 
      packSize:105.00, 
      unit: 'kg', 
      quantity:4154.33},
      { tick:'✓',
      id: 6, 
      chemicalName: 'n-Pentane', 
      vendor: 'Sinopec', 
      density:4535.26, 
      viscosity:66.76, 
      packaging: 'N/A', 
      packSize:"N/A", 
      unit: 't', 
      quantity:6272.34},
      { tick:'✓',
      id: 7, 
      chemicalName: 'Glycol Ether PM', 
      vendor: 'LG Chem', 
      density:6495.18, 
      viscosity:72.12, 
      packaging: 'Bag', 
      packSize:250.00, 
      unit: 'kg', 
      quantity:8749.54},
  ];
  
  let tableBody = document.querySelector('#chemicals tbody');
  const modal = document.getElementById('addRowModal');
  const submitButton = document.getElementById('submitNewRow');
  const cancelButton = document.getElementById('cancelModal');
  let selectedRowIndex = null;

  // load
  function loadTable(data) {
    tableBody.innerHTML = '';
    data.forEach((row, index) => {

      let tr = document.createElement('tr');
      tr.setAttribute('data-index', index);
      for (let key in row) {
        let td = document.createElement('td');
        td.innerText = row[key];
        tr.appendChild(td);
      }
    
    tr.addEventListener('click', function() {
      const previouslySelected = document.querySelector('tr.selected');
      if (previouslySelected) {
        previouslySelected.classList.remove('selected');
      }
      tr.classList.add('selected');
      selectedRowIndex = index; 
    });
      tableBody.appendChild(tr);
    });
  }
  
  loadTable(chemicalData);

  // Sorting 
  document.querySelectorAll('th').forEach((header) => {
    header.addEventListener('click', () => {
      const column = header.getAttribute('data-column');
      const sortedData = chemicalData.sort((a, b) => (a[column] > b[column] ? 1 : -1));
      loadTable(sortedData);
    });
  });
  
  // Add Row 
  document.getElementById('add_row').addEventListener('click',()=>{
    modal.style.display = 'flex';
  });
  submitButton.addEventListener('click',()=>{
    const newRow = {
        tick:'✓',
      id: chemicalData.length + 1,
      chemicalName:document.getElementById('chemicalName').value,
      vendor:document.getElementById('vendor').value,
      density:parseFloat(document.getElementById('density').value),
      viscosity:parseFloat(document.getElementById('viscosity').value),
      packaging:document.getElementById('packaging').value,
      packSize:parseFloat(document.getElementById('packSize').value),
      unit: document.getElementById('unit').value,
      quantity: parseInt(document.getElementById('quantity').value, 10),
   
    };
    chemicalData.push(newRow);
    loadTable(chemicalData);
     //clear input fields
  modal.style.display = 'none';
  clearModalFields();
  });
  
 // Close
  cancelButton.addEventListener('click',()=>{
    modal.style.display='none';
    clearModalFields();
  });

  // Function to clear input 
function clearModalFields() {
  document.getElementById('chemicalName').value = '';
  document.getElementById('vendor').value = '';
  document.getElementById('density').value = '';
  document.getElementById('viscosity').value = '';
  document.getElementById('packaging').value = '';
  document.getElementById('packSize').value = '';
  document.getElementById('unit').value = '';
  document.getElementById('quantity').value = '';
}
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
    clearModalFields();
  }
};
    
  //Delete
document.getElementById('delete_row').addEventListener('click',()=>{
  if (selectedRowIndex !== null) {
    chemicalData.splice(selectedRowIndex, 1); 
    loadTable(chemicalData);
    selectedRowIndex = null; 
  } else {
    alert('Please select a row to delete.');
  }
});