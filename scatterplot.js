const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 600,
    height = 400 - margin.top - margin.bottom;

scatterplotAdj("./csv/adjEng.csv", "adj")
scatterplotNp("./csv/adjNep.csv", "adjNp")

let border = ["elegant", "leader", "boss", "ugly", "poor", "honest",
    "strange", "intelligent", "shy", "doctor", "nurse", "engineer",
    "illustrator", "pilot", "teacher", "designer", "army", "astronaut",
"स्मार्ट","शक्तिशाली","बलियो","सुन्दर","शर्मीला","कुरूप","इन्जिनियर","शासक","चित्रकार","डाक्टर","नर्स","संस्थापक"
]

function scatterplotAdj(path, btn) {
    if(btn === "adj"){
        $('#'+btn).removeClass("btn-secondary")
        $('#'+btn).addClass("btn-success")
        $('#prf').removeClass("btn-success")
        $('#prf').addClass("btn-secondary")
    } else {
        $('#'+btn).removeClass("btn-secondary")
        $('#'+btn).addClass("btn-success")
        $('#adj').removeClass("btn-success")
        $('#adj').addClass("btn-secondary")
    }

    d3.selectAll("#engPlot svg").remove();

// append the svg object to the body of the page
    const svg = d3.select("#engPlot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var ttp = d3.select("body").append("div")
        .attr("class", "tooltip").style("font-size", "15px").style("width", "auto").style("padding", "5px")

//Read the data
    d3.csv(path).then(function (data) {

        x1Line = d3.min(data, function (d) {
            return d.boy;
        })
        y1Line = d3.min(data, function (d) {
            return d.girl;
        })
        x2Line = d3.max(data, function (d) {
            return d.boy;
        })
        y2Line = d3.max(data, function (d) {
            return d.girl;
        })


        // Add X axis
        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => d.boy))
            .range([0, width]);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        // Add Y axis
        const y = d3.scaleLinear()
            .domain(d3.extent(data, d => d.girl))
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));


        svg.append('line')
            .style("stroke", "lightgreen")
            .style("stroke-width", 2)
            .attr("x1", x(x1Line))
            .attr("y1", y(y1Line))
            .attr("x2", x(x2Line))
            .attr("y2", y(y2Line))

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .on("mouseover", function (event, d, i) {
                d3.select(this).attr("r", 10).style("opacity", 1);

                ttp.transition()
                    .duration(200)
                    .style("opacity", .9);
                ttp.html(d.word)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY + 10) + "px");
            })
            .on("mouseout", function (d) {
                d3.select(this).attr("r", 7).style("opacity", "0.5");

                ttp.transition()
                    .duration(500)
                    .style("opacity", 0);
            })

            .transition()
            .delay(function(d,i){return(i*3)})
            .duration(2000)
            .attr("cx", function (d) {
                return x(d.boy);
            })
            .attr("cy", function (d) {
                return y(d.girl);
            })
            .attr("r", 7)
            .style("fill", "#69b3a2")
            .style("opacity",0.5)


        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width/2 + margin.left)
            .attr("y", height + margin.top + 20)
            .text("HE");

        // Y axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -margin.top - height/2 + 20)
            .text("SHE");

        // svg.selectAll("circle")
        //     .transition()
        //     .delay(function(d,i){return(i*3)})
        //     .duration(2000)
        //     .attr("cx", function (d) { return x(d.boy); } )
        //     .attr("cy", function (d) { return y(d.girl); } )

        svg.append('g').selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .transition()
            .delay(function(d,i){return(i*3)})
            .duration(2000)
            .attr("x", function (d) {
                return x(d.boy);
            })
            .attr("y", function (d) {
                return y(d.girl);
            })
            .text(function (d, i) {
                if (border.includes(d.word)) {
                    return d.word;
                } else {
                    return ""
                }
            })
            .style("font-size", "15px")
            .style("stroke", "#808080")




    })
}




function scatterplotNp(path, btn) {
    if(btn === "adjNp"){
        $('#'+btn).removeClass("btn-secondary")
        $('#'+btn).addClass("btn-success")
        $('#prfNp').removeClass("btn-success")
        $('#prfNp').addClass("btn-secondary")
    } else {
        $('#'+btn).removeClass("btn-secondary")
        $('#'+btn).addClass("btn-success")
        $('#adjNp').removeClass("btn-success")
        $('#adjNp').addClass("btn-secondary")
    }

    d3.selectAll("#nepPlot svg").remove();

// append the svg object to the body of the page
    const svg = d3.select("#nepPlot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var ttp2 = d3.select("body").append("div")
        .attr("class", "tooltip").style("font-size", "15px").style("width", "auto").style("padding", "5px")

//Read the data
    d3.csv(path).then(function (data) {

        x1Line = d3.min(data, function (d) {
            return d.boy;
        })
        y1Line = d3.min(data, function (d) {
            return d.girl;
        })
        x2Line = d3.max(data, function (d) {
            return d.boy;
        })
        y2Line = d3.max(data, function (d) {
            return d.girl;
        })


        // Add X axis
        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => d.boy))
            .range([0, width]);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));


        // Add Y axis
        const y = d3.scaleLinear()
            .domain(d3.extent(data, d => d.girl))
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));


        svg.append('line')
            .style("stroke", "lightgreen")
            .style("stroke-width", 2)
            .attr("x1", x(x1Line))
            .attr("y1", y(y1Line))
            .attr("x2", x(x2Line))
            .attr("y2", y(y2Line))

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .on("mouseover", function (event, d, i) {
                d3.select(this).attr("r", 10).style("opacity", 1);
                ttp2.transition()
                    .duration(200)
                    .style("opacity", .9);
                ttp2.html(d.word)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY + 10) + "px");
            })
            .on("mouseout", function (d) {
                d3.select(this).attr("r", 7).style("opacity", 0.5);
                ttp2.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .transition()
            .delay(function(d,i){return(i*3)})
            .duration(2000)
            .attr("cx", function (d) {
                return x(d.boy);
            })
            .attr("cy", function (d) {
                return y(d.girl);
            })
            .attr("r", 7)
            .style("fill", "#69b3a2")
            .style("opacity",0.5)




        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width/2 + margin.left)
            .attr("y", height + margin.top + 20)
            .text("HE");

        // Y axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -margin.top - height/2 + 20)
            .text("SHE");

        svg.append('g').selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .transition()
            .delay(function(d,i){return(i*3)})
            .duration(2000)
            .attr("x", function (d) {
                return x(d.boy);
            })
            .attr("y", function (d) {
                return y(d.girl);
            })
            .text(function (d, i) {
                console.log(i)
                if (border.includes(d.word)) {
                    return d.word;
                } else {
                    return ""
                }
            })
            .style("font-size", "15px")
            .style("stroke", "#808080")
    })
}
