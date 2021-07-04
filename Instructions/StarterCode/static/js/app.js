function buildBarChart(sample) {
    // Use the D3 library to read in samples.json.
    d3.json("samples.json").then(function (data) {
        console.log(data);
        // create object variable for data samples
        var sample_value = data.samples;
        console.log(sample_value);
        var sample_array = sample_value.filter(sample_object => sample_object.id == sample);
        console.log(sample_array[0]);
        var sample_result = sample_array[0];
        console.log(sample_result);

        // create variables to build bar chart
        var otu_ids = sample_result.otu_ids;

        var otu_labels = sample_result.otu_labels;

        var sample_values = sample_result.sample_values;
        console.log(sample_values.slice(0, 10));
        // build plotly chart in id = bar
        var bar_chart = d3.select('#bar');
        bar_chart.html('');
        
        var bar_data = [{

            x: sample_values.slice(0, 10),
            y: otu_ids.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h'
        }];

        var bar_layout = {
            title: 'Top 10 Bacteria Cultures Found',
            margin: {
                t: 35,
                r: 0,
                b: 0,
                l: 175
            }

        };

        Plotly.newPlot('bar', bar_data, bar_layout);

    });
}

function init() {

    // Use the D3 library to read in samples.json.
    d3.json("samples.json").then(function (data) {
        console.log(data);
        // created variable for dropdown
        var dropdown = d3.select("#selDataset");
        // variable for all the names in the array
        var sampleNames = data.names;
        console.log(sampleNames);
        // iterate over the array and create option values and text
        sampleNames.forEach((sampleName)=> {
            dropdown
                .append('option')
                .property('value', sampleName)
                .text(sampleName);
        });

        // get the first sample
        var firstSample = sampleNames[0];

        // build bar chart
        buildBarChart(firstSample);
        // build bubble chart
    });
}

function optionChanged(next_sample) {
    buildBarChart(next_sample);
// build bubble chart
}



init();
