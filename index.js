const chemicalData = [
    {tick:'✓', id: 1, chemicalName: 'Chemical A', vendor: 'Vendor X', density: 1.2, viscosity: 5.3, packaging: 'Bottle', packSize: 500, unit: 'ml', quantity: 50 },
    { tick:'✓',id: 2, chemicalName: 'Chemical B', vendor: 'Vendor Y', density: 0.8, viscosity: 4.7, packaging: 'Canister', packSize: 1000, unit: 'ml', quantity: 20 },
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