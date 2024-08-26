const apiURL = 'https://api-colombia.com/api/v1/InvasiveSpecies';

fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('especies-table');
        data.forEach(especie => {
            const row = document.createElement('tr');
            if (especie.riskLevel === 1) {
                row.style.backgroundColor = 'blue';
            } else if (especie.riskLevel === 2) {
                row.style.backgroundColor = 'green';
            }

            row.innerHTML = `
                <td>${especie.name}</td>
                <td>${especie.scientificName}</td>
                <td>${especie.impact}</td>
                <td>${especie.management}</td>
                <td>${especie.riskLevel}</td>
                <td><img src="${especie.image}" alt="${especie.name}" width="100"></td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error al obtener los datos:', error));
