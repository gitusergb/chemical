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
  let selectedRow =null;
  // load
  function loadTable(data) {
    tableBody.innerHTML = '';
    data.forEach((row, index) => {

      let tr = document.createElement('tr');
      tr.setAttribute('data-index', index);
      tr.className='chem'
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
      selectedRow=row;
      selectedRowIndex = index; 
    });
      tableBody.appendChild(tr);
    });
  }
  
  loadTable(chemicalData);

  // Sorting  Chemicals
  document.querySelectorAll('th').forEach((header) => {
    header.addEventListener('click', () => {
      const column = header.getAttribute('data-column');
      const sortedData = chemicalData.sort((a, b) => (a[column] > b[column] ? 1 : -1));
      loadTable(sortedData);
    });
  });
  // Search Chemiicals
function srchChemical() {
  const query = document.getElementById('searchQuery').value.toLowerCase();
  const chemicals= document.querySelectorAll('.chem');

  chemicals.forEach(chemical => {
    const chemicalName = chemical.querySelector('td:nth-child(3)').textContent.trim().toLowerCase();
      
    if (chemicalName.includes(query)) {
      chemical.style.display = 'flex';  
  } else {
      chemical.style.display = 'none'; 
  }
  });
}
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
    // Move row down 
document.getElementById("move_row_down").addEventListener("click",()=>{
  if (selectedRowIndex === null) {
    alert("Select a row first");
    return;
  }

  if (selectedRowIndex<chemicalData.length - 1) {
    [chemicalData[selectedRowIndex], chemicalData[selectedRowIndex+ 1]] = [chemicalData[selectedRowIndex+ 1], chemicalData[selectedRowIndex]];
    selectedRowIndex++;
    loadTable(chemicalData);
    selectedRow = document.querySelector(`tr[data-index="${selectedRowIndex}"]`);
    selectedRow.classList.add('selected');
  } else {
    alert("Cannot move down");
  }
});

// Move row up 
document.getElementById("move_row_up").addEventListener("click",()=>{
  if (selectedRowIndex === null) {
    alert("Select a row");
    return;
  }

  if (selectedRowIndex>0) {
    [chemicalData[selectedRowIndex],chemicalData[selectedRowIndex-1]] = [chemicalData[selectedRowIndex-1], chemicalData[selectedRowIndex]];
    selectedRowIndex--;
    loadTable(chemicalData);
    selectedRow = document.querySelector(`tr[data-index="${selectedRowIndex}"]`);
    selectedRow.classList.add('selected');
  } else {
    alert("Cannot move up");
  }
});
  //Delete
document.getElementById('delete_row').addEventListener('click',()=>{
  if (selectedRowIndex !== null) {
    chemicalData.splice(selectedRowIndex, 1); 
    loadTable(chemicalData);
    selectedRowIndex = null; 
    selectedRow = null;
  } else {
    alert('Please select a row to delete.');
  }
});


// Refresh
document.getElementById('refresh_data').addEventListener('click',()=>{
  loadTable(chemicalData);
  window.location.reload();
  alert('Refreshed');
});

// Save data functionality 
document.getElementById("save_data").addEventListener("click",()=>{
  console.log("Chemical Data saved...", chemicalData);
  alert("Data saved !");
});

///edit cell 
tableBody.addEventListener('click', (event) => {
  const clickedCell = event.target;
  if (clickedCell.tagName === 'TD') {
    const rowIndex = clickedCell.parentElement.getAttribute('data-index');
    const columnKey = Object.keys(chemicalData[0])[clickedCell.cellIndex]; 
    const input = document.createElement('input');
    input.type = 'text';
    input.value = clickedCell.innerText;
    clickedCell.innerHTML = '';
    clickedCell.appendChild(input);
    input.focus();
    input.addEventListener('blur', () => {
      chemicalData[rowIndex][columnKey] = input.value;
      clickedCell.innerHTML = input.value;
      loadTable(chemicalData);
    });
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        input.blur();
      }
    });
  }
});
