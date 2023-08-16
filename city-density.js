import * as d3 from "d3";
import * as Plot from "@observablehq/plot";

document.addEventListener("DOMContentLoaded", function() {
    d3.json("/city-density.json?url").then(function(cityDensity){
        // show only top 20 cities
        const topCities = cityDensity.slice(0, 20);
        
        const plotFirst = Plot.plot({
            style: {
                backgroundColor: "#f8f8ec",
                fontSize: "16"
            },
            y: {
                grid: true,
            },
            marks: [
                Plot.ruleY([0]),
                Plot.barY(topCities, { x: "Entity", y: "Population density by city", sort: { x: "y", reverse: false }, fill:"#fa7f5e", tip:true }),
                Plot.axisX({anchor: "bottom", label: null, tickRotate: -45}),
                Plot.axisY({label: "Population density by city/km2"})
            ],
        });
    
        // append chart to div element
        const chart1 = document.getElementById("migrationChart1");
        chart1.append(plotFirst);
    
    })

    d3.json("/urban-rural.json?url").then(function(urbanRural){
        const plotSecond = Plot.plot({
            marginBottom: 80,
            color: { legend: true },
            style: {
                backgroundColor: "#f8f8ec",
                fontSize: "16"
            },
            y: {
                label: "World population living in rural or urban areas",
            },
            x: {
                grid: true,
                tickFormat: "d"
            },
            marks: [
                Plot.lineY(urbanRural, {x: "Year", y: "Urban population", stroke: "Red", strokeWidth: 2.5}),
                Plot.lineY(urbanRural, {x: "Year", y: "Rural population", stroke: "Green", strokeWidth: 2.5}),
                Plot.text(urbanRural, Plot.selectFirst({x: "Year", y: "Urban population", text: ["Urban"], textAnchor: "start", dx: 20, dy: -40})),
                Plot.text(urbanRural, Plot.selectFirst({x: "Year", y: "Rural population", text: ["Rural"], textAnchor: "start", dx: 20, dy: -40})),
                Plot.crosshairY(urbanRural, {y: "Urban population"}),
            ]
        })
    
        // append chart to div element
        const chart2 = document.getElementById("migrationChart2");
        chart2.append(plotSecond);
    
    })

});