
var viz1, viz2, g1, g3, dropDown;

var width;
var height;
var innerWidth;
var innerHeight;

const margin = {top: 40, right: 60, bottom: 120, left: 100};

var teamStats = [];

var stateStats = []
var statesData = []

let i = 0;

document.addEventListener('DOMContentLoaded', function () {


    viz1 = d3.select("#viz1");
    viz2 = d3.select("#viz2");


    width = +viz1.style('width').replace('px', '');
    height = +viz1.style('height').replace('px', '');
    innerWidth = width - margin.left - margin.right;
    innerHeight = height - margin.top - margin.bottom;

    g1 = viz1
        .append('g')
        .attr("id", "g1")
        .attr('transform', `translate(${margin.left},${margin.top + 20})`);

    g3 = viz2
        .append('g')
        .attr("id", "g3")
        .attr('transform', `translate(${margin.left},${margin.top + 20})`);


    Promise.all([
        d3.csv('president_county_candidate.csv'),

    ])
        .then(function (values) {
            stateStats = values[0];
            storeAllData()
            drawViz1()
            drawViz2()

        });


});

function checkAndAdd(stateName){

    for (var i = 0; i < statesData.length; i++){
        if(statesData[i].st === stateName){
            return true;
        }
    }
    return false;

}
function findIndex(stateName){
    for(var j = 0; j < statesData.length; j++){
        if(statesData[j].st === stateName){
            return j;
        }
    }

}
function storeAllData(){

    stateStats.forEach(function (d){

        if(checkAndAdd(d.state)){

            if(d.candidate === "Donald Trump" && d.won === "True") {
                statesData[findIndex(d.state)].Dvote++;
            }
            else if(d.candidate === "Joe Biden" && d.won === "True"){
                statesData[findIndex(d.state)].Jvote++;
            }

        }
        else{
            if(d.candidate === "Donald Trump" && d.won === "True") {
                statesData.push(new Statistic(d.state,1,0))
            }
            else if(d.candidate === "Joe Biden" && d.won === "True"){
                statesData.push(new Statistic(d.state,0,1))
            }
        }
    })
    console.log(statesData);

}
function Statistic(st, Dvote, Jvote) {
    this.st = st;
    this.Dvote = Dvote;
    this.Jvote = Jvote;
}

function mousemove(axis, choice1, choice2) {


    var div = d3.select("body").append('div')
        .attr("class", "tool-tip")
        .style("opacity", 0);

    axis.selectAll("rect")
        .on("click", function (d) {
            drawViz4(choice1, choice2, d["game"])
        })
        .on("mousemove", function (d) {

            d3.select(this)
                .attr('opacity', ".5");

            div.transition()
                .duration(50)
                .style("opacity", 1);

            if (d3.select("#selectBox").property("value") === "field-goals") {

                let number = d["val"] * 100;
                let rounded = Math.round(number * 10) / 10;
                let fixed = rounded.toFixed(1);


                if (d["val"] < 0) {
                    let val = "Field Goal Percentage: " + fixed * -1 + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                } else {

                    let val = "Percentage Made: " + fixed + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                }

            } else if (d3.select("#selectBox").property("value") === "assists") {
                if (d["val"] < 0) {
                    let val = "Assists : " + d["val"] * -1 + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                } else {

                    let val = "Assists : " + d["val"] + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                }
            } else if (d3.select("#selectBox").property("value") === "blocks") {
                if (d["val"] < 0) {
                    let val = "Blocks : " + d["val"] * -1 + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                } else {

                    let val = "Blocks : " + d["val"] + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                }
            } else if (d3.select("#selectBox").property("value") === "steals") {
                if (d["val"] < 0) {
                    let val = "Steals : " + d["val"] * -1 + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                } else {

                    let val = "Steals : " + d["val"] + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                }
            } else if (d3.select("#selectBox").property("value") === "rebounds") {
                if (d["val"] < 0) {
                    let val = "Offensive Rebounds : " + d["val"] * -1 + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                } else {

                    let val = "Offensive Rebounds : " + d["val"] + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                }
            }


        })
        .on('mouseout', function (d, i) {
            d3.select(this)
                .attr('opacity', "1");

            div.transition()
                .duration(50)
                .style("opacity", 0);
        })

        .style("stroke", "black")
        .style("stroke-width", "1px");

}

function AxisLabels(axis) {

    let selection = d3.select("#selectBox").property("value");
    let labelX = "Game Played During The Season";
    let labelY;

    if (selection === "field-goals") {
        labelY = "Field Goal Percent"

    } else if (d3.select("#selectBox").property("value") === "assists") {
        labelY = "Assists Per Game"


    } else if (d3.select("#selectBox").property("value") === "blocks") {
        labelY = "Blocks Per Game"


    } else if (d3.select("#selectBox").property("value") === "steals") {
        labelY = "Steals Per Game"


    } else if (d3.select("#selectBox").property("value") === "rebounds") {
        labelY = "Offensive Rebounds Per Game"

    }


    axis.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('dy', "-40")
        .attr('dx', '-250')
        .style("fill", "gray")
        .style('text-anchor', 'center')
        .text(labelY);


    axis.append('text')
        .attr('transform', `translate(${(innerWidth / 2) - 150},${innerHeight + 40})`)
        .style("fill", "gray")
        .style('text-anchor', 'center')
        .text(labelX);

}

function drawViz1() {


    g1.select("#axis-g").remove();

    let axis = g1.append("g").attr("id", "axis-g");

    console.log(statesData)

    var yScale = d3.scaleLinear()
        .domain([345, 0])
        .range([0, 345]);

    var yAxisScale = d3.scaleLinear()
        .domain([0, 345])
        .range([innerHeight, 0]);

    var xScale = d3.scaleLinear()
        .range([0, innerWidth])
        .domain([0, statesData.length]);

    axis
        .selectAll("rect")
        .data(statesData)
        .enter()
        .append("rect")
        .attr("x", function (d, i) { // moves bars left and right
            i++;
            return +(i *13 - 12);
        })
        .attr("y", function (d, i) { // moves bars up or down
            return yScale(0);
        })
        // .attr("height", function (d) {
        //     return yScale(0);
        // })
        .attr("width", 8.5)
        .style("fill", "red")

    axis
        .selectAll("rect")
        .transition()
        .duration(100)
        .attr("y", function (d, i) { // moves bars up or down
            return 345 - Math.max(0, yScale(d.Dvote));
        })
        .attr("height", function (d) {
            return Math.abs(yScale(d.Dvote));
        })
        .delay(function (d, i) {
            return (i * 10)
        })
        .style("stroke", "black")
        .style("stroke-width", "1px");

    var yAxis = d3.axisLeft(yScale)

        .tickSize(-innerWidth);


    axis.append("g").call(yAxis)
        .attr("stroke", "#777")
        .attr("stroke-dasharray", "2,2")
        .attr("transform", "translate(0," + 0 + ")");


    var xAxis = d3.axisBottom(xScale);/*.tickFormat("");remove tick label*/

    axis.append("g").call(xAxis)
        .attr("transform", "translate(0," + (innerHeight+5) + ")");

    axis.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('dy', "-40")
        .attr('dx', '-350')
        .style("fill", "gray")
        .style('text-anchor', 'center')
        .style("font-size", "larger")
        .style("font-weight", " 500")
        .text("Votes From All Counties In Each State");


    axis.append('text')
        .attr('transform', `translate(${(innerWidth / 2) - 100},${innerHeight + 40})`)
        .style("fill", "gray")
        .style('text-anchor', 'center')
        .style("font-size", "larger")
        .style("font-weight", " 500")
        .text("All 52 States");

    axis.append("text")
        .attr("transform", `translate(${(innerWidth / 2) - 50},${-5})`)
        .style("fill", "gray")
        .style('text-anchor', 'center')
        .style("font-size", "larger")
        .style("font-weight", " 500")
        .text("Donald Trump's Votes");

}

function drawViz2() {


    g1.select("#axis-g1").remove();

    let axis = g3.append("g").attr("id", "axis-g1");

    var yScale = d3.scaleLinear()
        .domain([0, 345])
        .range([innerHeight, 0]);

    var xScale = d3.scaleLinear()
        .range([0, innerWidth])
        .domain([0, statesData.length]);

    axis
        .selectAll("rect")
        .data(statesData)
        .enter()
        .append("rect")
        .attr("x", function (d, i) { // moves bars left and right
            i++;
            return +(i *13 - 12);
        })
        .attr("y", function (d, i) { // moves bars up or down
            return yScale(0);
        })
        // .attr("height", function (d) {
        //     return yScale(0);
        // })
        .attr("width", 8.5)
        .style("fill", "blue")

    axis
        .selectAll("rect")
        .transition()
        .duration(100)
        .attr("y", function (d, i) { // moves bars up or down
            return 345 - Math.max(0, yScale(d.Jvote));
        })
        .attr("height", function (d) {
            console.log(Math.abs(yScale(d.Jvote)));
            return Math.abs(yScale(d.Jvote));
        })
        .delay(function (d, i) {
            return (i * 10)
        })
        .style("stroke", "black")
        .style("stroke-width", "1px");

    var yAxis = d3.axisLeft(yScale)

        .tickSize(-innerWidth);


    axis.append("g").call(yAxis)
        .attr("stroke", "#777")
        .attr("stroke-dasharray", "2,2")
        .attr("transform", "translate(0," + 0 + ")");


    var xAxis = d3.axisBottom(xScale);/*.tickFormat("");remove tick label*/

    axis.append("g").call(xAxis)
        .attr("transform", "translate(0," + (innerHeight+5) + ")");


    axis.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('dy', "-40")
        .attr('dx', '-350')
        .style("fill", "gray")
        .style('text-anchor', 'center')
        .style("font-size", "larger")
        .style("font-weight", " 500")
        .text("Votes From All Counties In Each State");


    axis.append('text')
        .attr('transform', `translate(${(innerWidth / 2) - 100},${innerHeight + 40})`)
        .style("fill", "gray")
        .style('text-anchor', 'center')
        .style("font-size", "larger")
        .style("font-weight", " 500")
        .text("All 52 States");

    axis.append("text")
        .attr("transform", `translate(${(innerWidth / 2) - 50},${-5})`)
        .style("fill", "gray")
        .style('text-anchor', 'center')
        .style("font-size", "larger")
        .style("font-weight", " 500")
        .text("Joe Biden's Votes");


}

function splitTeamData(sData) {
    var res = [];
    sData.forEach(function (d) {
        Object.keys(d).forEach(function (k) {
            // console.log(k + ' - ' + d[k]);
            if (attTrack.includes(k)) {
                var circ = {att: k, Opp: d.Opp, att_val: d[k]};
                res.push(circ);
            }
        });
    });
    // console.log(res);
    return res;
}