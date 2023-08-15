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


// load data.json then load world geojson
d3.json("../public/density.json").then(function(data){
    d3.json("../public/world-110m2.json").then(function(mapData){

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

