
function renderVolcanoPlot() {
    fetch('data4.json')
        .then(response => response.json())
        .then(data => {
            const gene_data = data.data; // Access the "data" array
            
            // Split the values into x, y, z axes
            let log2fc = gene_data.map(row => row[0]);  // Log2 Fold Change
            let log10pval = gene_data.map(row => row[1]);  // -log10(p-value)
            let expression = gene_data.map(row => row[2]);  // Expression
            
            // Create trace for all genes
            let all_genes_trace = {
                x: log2fc,
                y: log10pval,
                z: expression,
                mode: 'markers',
                marker: {
                    size: 5,
                    color: expression, // Color by expression levels
                    colorscale: 'Viridis',
                    opacity: 0.8,
                    colorbar: { title: 'Expression Level' }
                },
                name: 'All Genes',
                type: 'scatter3d'
            };

            // Filter for significant genes
            let significant = gene_data.filter(row => row[1] > 1.3 && Math.abs(row[0]) > 1);

            // Create trace for significant genes
            let significant_genes_trace = {
                x: significant.map(row => row[0]),
                y: significant.map(row => row[1]),
                z: significant.map(row => row[2]),
                mode: 'markers',
                marker: {
                    size: 6,
                    color: 'red',
                    opacity: 0.9
                },
                name: 'Significant Genes',
                type: 'scatter3d'
            };

            // Set the layout with no grid lines and black background
            let layout = {
                title: '',
                scene: {
                    xaxis: {
                        title: 'Log2 Fold Change',
                        showgrid: false,  // Remove grid lines
                        backgroundcolor: 'black',  // Set black background
                        color: '#ffffff'  // White axis labels
                    },
                    yaxis: {
                        title: '-Log10(p-value)',
                        showgrid: false,  // Remove grid lines
                        backgroundcolor: 'black',  // Set black background
                        color: '#ffffff'  // White axis labels
                    },
                    zaxis: {
                        title: 'Expression Level',
                        showgrid: false,  // Remove grid lines
                        backgroundcolor: 'black',  // Set black background
                        color: '#ffffff'  // White axis labels
                    },
                    bgcolor: 'black'  // Set overall background to black
                },
                paper_bgcolor: 'black',  // Set paper background to black
                plot_bgcolor: 'black',   // Set plot background to black
                legend: {
                    x: 0,
                    y: 1.0,
                    bgcolor: 'rgba(255, 255, 255, 0)',
                    bordercolor: 'rgba(255, 255, 255, 0)',
                    font: { color: '#ffffff' }  // White legend text
                },
                font: { color: '#ffffff' },  // White title and text
                margin: {
                    l: 0,
                    r: 0,
                    b: 0,
                    t: 50
                }
            };

            // Render the plot
            Plotly.newPlot('plotly-3d-chart-4', [all_genes_trace, significant_genes_trace], layout);
        })
        .catch(error => console.error('Error loading volcano plot data:', error));
}

function render3DSurfacePlot() {
    fetch('data5.json')
        .then(response => response.json())
        .then(data => {
            // Extracting the values for the surface plot
            let data_matrix = data.data;
            let x_labels = data.columns;  // Conditions
            let y_labels = data.index;    // Genes

            // Create a 3D Surface plot with Plotly
            let surface_trace = {
                z: data_matrix,  // Expression level matrix
                x: x_labels,     // X-axis: Conditions
                y: y_labels,     // Y-axis: Genes
                type: 'surface'  // 3D surface plot
            };

            // Define layout for the 3D plot
            let layout = {
                title: '',
                scene: {
                    xaxis: {
                        title: 'Conditions',
                        showgrid: false,  // No grid lines
                        backgroundcolor: 'rgba(0, 0, 0, 0.8)',  // Black background
                        color: '#ffffff'  // White axis labels
                    },
                    yaxis: {
                        title: 'Genes',
                        showgrid: false,
                        backgroundcolor: 'rgba(0, 0, 0, 0.8)',
                        color: '#ffffff'
                    },
                    zaxis: {
                        title: 'Expression Level',
                        showgrid: false,
                        backgroundcolor: 'rgba(0, 0, 0, 0.8)',
                        color: '#ffffff'
                    }
                },
                paper_bgcolor: 'rgba(0, 0, 0, 0.8)',
                plot_bgcolor: 'rgba(0, 0, 0, 0.8)',
                width: 800,
                height: 800,
                autosize: false
            };

            // Render the 3D surface plot into the div with id 'plotly-3d-chart-4'
            Plotly.newPlot('plotly-3d-chart-5', [surface_trace], layout);
        })
        .catch(error => console.error('Error loading 3D surface plot data:', error));
}

window.addEventListener('load', function() {
    renderVolcanoPlot();
    render3DSurfacePlot();
});


document.getElementById('menu').addEventListener('click', function() {
    window.location.href = '../story3/story3.html';
});