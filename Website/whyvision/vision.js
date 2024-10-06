fetch('data/data.json')
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(data => {
        console.log(data);  // Cek isi data
        // Lanjutkan proses plot
    })
    .catch(error => console.error('Error loading data:', error));

// Function to render the first 3D Plotly chart using data.json
function renderFirstPlotlyChart() {
    fetch('data/data.json')  // Fetch data from data.json
        .then(response => response.json())
        .then(data => {
            let flight_gc = data.flight_gc;
            let flight_dup = data.flight_dup;
            let flight_seq = data.flight_seq;

            let hgc_gc = data.hgc_gc;
            let hgc_dup = data.hgc_dup;
            let hgc_seq = data.hgc_seq;

            let n_metrics = flight_gc.length;

            let x_labels_flight = new Array(n_metrics).fill(1);
            let x_labels_hgc = new Array(n_metrics).fill(2);

            let flight_trace = {
                x: x_labels_flight,
                y: flight_gc,
                z: flight_dup,
                mode: 'lines+markers',
                line: { color: 'red', width: 4 },
                marker: { size: 8, color: 'red' },
                name: 'Flight',
                text: flight_seq,
                hoverinfo: 'x+y+z+text',
                type: 'scatter3d'
            };

            let hgc_trace = {
                x: x_labels_hgc,
                y: hgc_gc,
                z: hgc_dup,
                mode: 'lines+markers',
                line: { color: 'green', width: 4 },
                marker: { size: 8, color: 'green' },
                name: 'HGC',
                text: hgc_seq,
                hoverinfo: 'x+y+z+text',
                type: 'scatter3d'
            };

            let layout1 = {
                scene: {
                    xaxis: { title: 'Groups', tickvals: [1, 2], ticktext: ['Flight', 'HGC'], showgrid: false, backgroundcolor: 'rgba(0, 0, 0, 0.8)', color: '#ffffff' },
                    yaxis: { title: 'GC Content (%)', showgrid: false, backgroundcolor: 'rgba(0, 0, 0, 0.8)', color: '#ffffff' },
                    zaxis: { title: 'Duplication Rate (%)', showgrid: false, backgroundcolor: 'rgba(0, 0, 0, 0.8)', color: '#ffffff' },
                    bgcolor: 'rgba(0, 0, 0, 0.8)'
                },
                paper_bgcolor: 'rgba(0, 0, 0, 0.8)',
                plot_bgcolor: 'rgba(0, 0, 0, 0.8)',
                legend: { font: { color: '#ffffff' }, x: 0, y: 1 },
                showlegend: false,
                margin: { l: 0, r: 0, b: 0, t: 0 }
            };

            let data_traces = [flight_trace, hgc_trace];

            // Render the first plot in the div with id 'plotly-3d-chart-1'
            Plotly.newPlot('plotly-3d-chart-1', data_traces, layout1);
        })
        .catch(error => console.error('Error loading data:', error));
}

// Function to render the second 3D Plotly chart using data2.json
function renderSecondPlotlyChart() {
    fetch('data/data2.json')  // Fetch data from data2.json
        .then(response => response.json())
        .then(data => {
            let gc_samples = data.gc_samples_raw;  // Extract GC (Ground Control) samples
            let spaceflight_samples = data.spaceflight_samples_raw;  // Extract Spaceflight samples
            let traces = [];

            // Function to extract and map data for 3D plot with different colors
            function createTrace(samples, group_name, colorList, x_offset) {
                samples.forEach((sample_data, idx) => {
                    let base_positions = sample_data.data.map(item => item[0] + x_offset); // X-axis: Base positions + offset
                    let quality_scores = sample_data.data.map(item => item[1]);  // Y-axis: Quality scores
                    let z_values = new Array(base_positions.length).fill(idx);   // Z-axis: Sample 

                    traces.push({
                        x: base_positions,
                        y: quality_scores,
                        z: z_values,
                        mode: 'lines',
                        name: `${group_name} - ${sample_data.name}`,  // Include group name in the trace name
                        type: 'scatter3d',
                        line: { color: colorList[idx] } // Assign different color to each trace
                    });
                });
            }

            // Generate a list of colors for the Ground Control and Spaceflight samples
            const colorListGC = [
                '#FF5733', '#33FF57', '#3357FF', '#FF33A5', '#A533FF', '#33FFF7',
                '#F3FF33', '#FFAF33', '#33FF77', '#7733FF', '#FF3373', '#33FFB5',
                '#D933FF', '#33FF77', '#FF9A33', '#337AFF'
            ];

            const colorListSpaceflight = [
                '#E74C3C', '#1ABC9C', '#8E44AD', '#2980B9', '#F39C12', '#2ECC71',
                '#C0392B', '#16A085', '#9B59B6', '#34495E', '#F1C40F', '#27AE60',
                '#E67E22', '#D35400', '#95A5A6', '#2C3E50'
            ];

            // Offset the Spaceflight samples so they are plotted next to the GC samples on the X-axis
            const x_offset = 150; // This value will ensure the Spaceflight samples are plotted to the right of the GC samples

            // Create traces for GC (Ground Control) samples
            createTrace(gc_samples, 'GC (Ground Control)', colorListGC, 0);

            // Create traces for Spaceflight samples (with X-axis offset)
            createTrace(spaceflight_samples, 'Spaceflight', colorListSpaceflight, x_offset);

            let layout2 = {
                scene: {
                    xaxis: {
                        title: 'Base Position (GC and Spaceflight)',
                        showgrid: false,
                        backgroundcolor: 'rgba(0, 0, 0, 0.8)',
                        color: '#ffffff',
                        tickvals: [0, x_offset],  // Indicate separation between GC and Spaceflight
                    },
                    yaxis: { title: 'Quality Score', showgrid: false, backgroundcolor: 'rgba(0, 0, 0, 0.8)', color: '#ffffff' },
                    zaxis: { title: 'Sample Index', showgrid: false, backgroundcolor: 'rgba(0, 0, 0, 0.8)', color: '#ffffff' },
                    bgcolor: 'rgba(0, 0, 0, 0.8)'
                },
                paper_bgcolor: 'rgba(0, 0, 0, 0.8)',
                plot_bgcolor: 'rgba(0, 0, 0, 0.8)',
                showlegend: false,  // Remove the legend
                margin: { l: 0, r: 0, b: 0, t: 0 }
            };

            // Render the second plot in the div with id 'plotly-3d-chart-2'
            Plotly.newPlot('plotly-3d-chart-2', traces, layout2);
        })
        .catch(error => console.error('Error loading data2:', error));
}



// Fetch the PCA data from data3.json and render the 3D PCA plot
function renderThirdPCAPlot() {
    fetch('data/data3.json')
        .then(response => response.json())
        .then(data => {
            // Assuming data is an array of objects with keys: 'PC1', 'PC2', 'PC3', and 'Group'
            let pc1 = data.map(d => d.PC1);
            let pc2 = data.map(d => d.PC2);
            let pc3 = data.map(d => d.PC3);
            let groups = data.map(d => d.Group); // Group labels (e.g., "GC", "Spaceflight", etc.)

            // Define a mapping of groups to colors (a custom discrete color scale)
            let groupColors = {
                "GC": "#FF6347",           // Example color for GC
                "Spaceflight": "#4682B4",  // Example color for Spaceflight
                "VIV": "#32CD32"           // Example color for VIV
            };

            // Map the colors based on the group
            let colors = groups.map(group => groupColors[group]);

            // Define the scatter plot trace with group-based colors
            let pca_trace = {
                x: pc1,      // PC1 as x-axis
                y: pc2,      // PC2 as y-axis
                z: pc3,      // PC3 as z-axis
                mode: 'markers',
                marker: {
                    size: 8,
                    color: colors,  // Assign the colors based on the group
                },
                text: groups,  // Tooltip information (Group labels)
                type: 'scatter3d'
            };

            // Define the layout for the PCA plot with no gridlines and black background
            let pca_layout = {
                title: '',
                scene: {
                    xaxis: {
                        title: 'PC1',
                        showgrid: false,  // Remove gridlines
                        color: '#ffffff'  // White text for axis labels
                    },
                    yaxis: {
                        title: 'PC2',
                        showgrid: false,  // Remove gridlines
                        color: '#ffffff'  // White text for axis labels
                    },
                    zaxis: {
                        title: 'PC3',
                        showgrid: false,  // Remove gridlines
                        color: '#ffffff'  // White text for axis labels
                    }
                },
                paper_bgcolor: 'rgba(0, 0, 0, 0.8)',
                plot_bgcolor: 'rgba(0, 0, 0, 0.8)',
                margin: {
                    l: 0,
                    r: 0,
                    b: 0,
                    t: 50
                }
            };

            // Create the figure with the PCA trace
            let data_traces = [pca_trace];

            // Render the plot to the div with id 'plotly-3d-chart-3'
            Plotly.newPlot('plotly-3d-chart-3', data_traces, pca_layout);
        })
        .catch(error => console.error('Error loading PCA data:', error));
}


// Render both charts when the page loads
window.addEventListener('load', function() {
    renderFirstPlotlyChart();
    renderSecondPlotlyChart();
    renderThirdPCAPlot();
});


// Menu button click event to navigate to story2.html
document.getElementById('menu').addEventListener('click', function() {
    window.location.href = '../whyliver/liver.html';
});

// document.getElementById('menu').addEventListener('click', function() {
//     window.location.href = '../story3/story3.html';
// });

