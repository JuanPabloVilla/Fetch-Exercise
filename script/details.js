document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const departmentId = urlParams.get('id');

    fetch(`https://api-colombia.com/api/v1/Department`)
        .then(response => response.json())
        .then(department => {
            const departmentDetailsContainer = document.getElementById('department-details');
            
            const departmentDetails = `
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">${department.name}</h2>
                        <img src="../sources/antioquia.png" alt="Mapa de ${department.name}" class="img-fluid mb-3">
                        <p><strong>Capital:</strong> ${department.cityCapital}</p>
                        <p><strong>Descripción:</strong> ${department.description || 'Descripción no disponible.'}</p>
                    </div>
                </div>
            `;

            departmentDetailsContainer.innerHTML = departmentDetails;
        })
        .catch(error => console.error('Error fetching department details:', error));
});
