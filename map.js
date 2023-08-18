import * as d3 from "d3";

const svgMap = d3.select("svg.densityMap")


svgMap.attr("viewBox", "0 0 1000 600")

const worldGroup = svgMap.append("g")

const projection = d3.geoEqualEarth()
    // place in middle of viewbox
    .translate([500,300])
    .scale(180)


const mapGenerator = d3.geoPath()
    .projection(projection)

const colorScale = d3.scaleSequentialPow(d3.interpolateMagma)
    .domain([2000,0])
    .exponent(0.3)

    const legend = svgMap.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(0, 50)");

// create legend
const legendWidth = 20;
const legendHeight = 14;
const legendData = [0, 10, 20, 50, 100, 200, 400]; 

legend.selectAll("rect")
    .data(legendData)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => i * (legendHeight + 5))
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .attr("fill", d => colorScale(d));

// legend labels
legend.selectAll("text")
    .data(legendData)
    .enter()
    .append("text")
    .style("font-size", "10px")
    .attr("x", legendWidth + 5)
    .attr("y", (d, i) => i * (legendHeight + 5) + legendHeight / 2)
    .text(d => "> " + d);


// load data.json then load world geojson
d3.json("/density.json?url").then(function(data){
    d3.json("/world-110m2.json?url").then(function(mapData){

        const slider = document.getElementById("slider")

        const initialThreshold = 10

        slider.value = initialThreshold
        d3.select("span.counter").text(initialThreshold)


        // highlight countries with a density higher than initialThreshold
        worldGroup
            .selectAll("path")
            .data(mapData.features)
            .enter()
            .append("path")
            .attr("d", mapGenerator)
            .style("fill", (d,i)=>{
                // check that country name in density dataset matches with name of country in map dataset
                const country = data.find((country)=>{ return country.name == d.properties.name})

                if (country && country.density > initialThreshold) {
                    return colorScale(country.density)
                } else {
                    return "#111111"
                }
            })

        
        // update map based on slider value
            slider.addEventListener("input", function() {
                const value = +this.value;
                const format = d3.format('.1f');
                d3.select("span.counter").text(format(value))
            
                worldGroup
                    .selectAll("path")
                    .style("fill", (d,i) => {
                        const country = data.find(country => country.name === d.properties.name);
            
                        if (country && country.density > value) {
                            return colorScale(country.density);
                        } else {
                            return "#111111";
                        }
                    });
            });

    })
})

