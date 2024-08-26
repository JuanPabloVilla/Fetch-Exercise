document.addEventListener('DOMContentLoaded', function() {
    const apiURL = 'https://api-colombia.com/api/v1/Department';
    const departmentsContainer = document.getElementById('departments-container');
    const sortSelect = document.getElementById('sortSelect');
    const searchInput = document.getElementById('searchInput');

    let departmentsData = [];

    // Fetch departments data
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            departmentsData = data;
            displayDepartments(departmentsData);
            
            // Listener para cambiar el orden
            sortSelect.addEventListener('change', () => {
                const sortedData = departmentsData.sort((a, b) => {
                    if (sortSelect.value === 'asc') {
                        return a.name.localeCompare(b.name);
                    } else {
                        return b.name.localeCompare(a.name);
                    }
                });
                displayDepartments(sortedData);
            });

            // Listener para buscar departamentos
            searchInput.addEventListener('input', () => {
                const filteredData = departmentsData.filter(dept => 
                    dept.name.toLowerCase().includes(searchInput.value.toLowerCase())
                );
                displayDepartments(filteredData);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    function displayDepartments(departments) {
        departmentsContainer.innerHTML = '';
        departments.forEach(dept => {
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4');
            card.innerHTML = `
                <div class="card">
                    <img src="sources/maps/${dept.name}.jpg" class="card-img-top" alt="Mapa de ${dept.name}">
                    <div class="card-body">
                        <h5 class="card-title">${dept.name}</h5>
                        <p class="card-text">Capital: ${dept.cityCapital}</p>
                        <a href="pages/details.html?deptId=${dept.id}" class="btn btn-primary">Ver detalles</a>
                    </div>
                </div>
            `;
            departmentsContainer.appendChild(card);
        });
    }
});
