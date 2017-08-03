
var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

$.ajax({
    url: "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json",
    type: 'GET',
    dataType: 'json',
    success: function(data) {

        //base temp
        var baseTemp = data.baseTemperature;

        ///set margins
        var margin = {top: 60, right: 20, bottom: 20, left:60};
        var height = 500 - margin.top - margin.bottom;
        var width = 900 - margin.right - margin.left;

        //Add months for Y axis scale as date objects
        var firstMonth = new Date(0);
        firstMonth.setHours(24);
        firstMonth.setYear(1969);
        firstMonth.setMonth(11);

        var lastMonth = new Date(0);
        lastMonth.setHours(24);
        lastMonth.setMonth(11);

        //Add years for X scale as date objects
        var firstYear = new Date(0);
        firstYear.setHours(24);
        firstYear.setYear(data.monthlyVariance[0].year);
        firstYear.setMonth(data.monthlyVariance[0].month-1);

        var lastYear = new Date(0);
        lastYear.setHours(24);
        lastYear.setYear(2015);
        lastYear.setMonth(11);

        var numYears = data.monthlyVariance.length/12;
        var barHeight = height/12;
        var barWidth = width/numYears;
        //come back to this.
        var test2 = barHeight/2;

        //canvas
        var svg = d3.select("#chartContainer")
            .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append('g')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var yAxisScale = d3.scaleTime()
            .domain([lastMonth, firstMonth])
            .range([height, 0]);

        var xScale = d3.scaleTime()
            .domain([firstYear, lastYear])
            .range([0, 825]);

        var axisVertical = d3.axisLeft(yAxisScale)
            .tickSize(0)
            .tickSizeOuter(0)
            .tickFormat(d3.timeFormat("%B"));
        var axisHorizontal = d3.axisBottom(xScale).ticks(20).tickSizeOuter(0);

        var tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .html('ok');

        //axes
        svg.append('g')
            .attr("class", "yAxis")
            .attr('transform', 'translate(0,' + -test2 + ')')
            .call(axisVertical);

        svg.append('g')
            .attr("class", "xAxis")
            .attr('transform', 'translate(0,' + height + ')')
            .call(axisHorizontal);

        var blocks = svg.selectAll("rect")
            .data(data.monthlyVariance)
            .enter()
            .append("rect")
            .attr("class", function(d) {
                //assign classes based on Temperature
                var temp = d.variance + baseTemp;
                switch (true) {
                    case (temp <= 3): return "temp0";
                        break;
                    case (temp > 3) && (temp <= 4): return "temp3 bar";
                        break;
                    case (temp > 4) && (temp <= 5): return "temp4 bar";
                        break;
                    case (temp > 5) && (temp <= 6): return "temp5 bar";
                        break;
                    case (temp > 6) && (temp <= 7): return "temp6 bar";
                        break;
                    case (temp > 7) && (temp <= 8): return "temp7 bar";
                        break;
                    case (temp > 8) && (temp <= 9): return "temp8 bar";
                        break;
                    case (temp > 9) && (temp <= 10): return "temp9 bar";
                        break;
                    case (temp > 10) && (temp <= 11): return "temp10 bar";
                        break;
                    case (temp > 11) && (temp <= 12): return "temp11 bar";
                        break;
                    case (temp > 12): return "temp12";
                        break;
                    default: return "bar";
                }
            })
            .attr("height", barHeight)
            .attr("width", barWidth)
            .attr("x", function(d) {return barWidth*(d.year-1753)})
            .attr("y", function(d) {return barHeight * (d.month-1)})
            .on('mouseover', function(d) {
                var temp = Math.round((baseTemp+d.variance)*1000)/1000;
                return tooltip
                .html("<div class='toolText'>" + months[d.month-1] + " - " + d.year  +
                    "<br>" + temp + " &deg;C </div>")
                .style("visibility", "visible");})
            .on("mousemove", function(){return tooltip.style("top",
                (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
            .on('mouseout', function() {return tooltip.style("visibility", "hidden");});

        //cover up end of axis
        svg.append('rect')
            .attr("height", 50)
            .attr("width", 60)
            .attr("class", "coverUp")
            .attr("x", -50)
            .attr("y", -50);

        //add key
        svg.append('rect')
            .attr("height", 20)
            .attr("width", 30)
            .attr("class", "temp0")
            .attr("x", width-330)
            .attr("y", -40);
        svg.append('rect')
            .attr("height", 20)
            .attr("width", 30)
            .attr("class", "temp3")
            .attr("x", width-300)
            .attr("y", -40);
        svg.append('rect')
            .attr("height", 20)
            .attr("width", 30)
            .attr("class", "temp4")
            .attr("x", width-270)
            .attr("y", -40);
        svg.append('rect')
            .attr("height", 20)
            .attr("width", 30)
            .attr("class", "temp5")
            .attr("x", width-240)
            .attr("y", -40);
        svg.append('rect')
            .attr("height", 20)
            .attr("width", 30)
            .attr("class", "temp6")
            .attr("x", width-210)
            .attr("y", -40);
        svg.append('rect')
            .attr("height", 20)
            .attr("width", 30)
            .attr("class", "temp7")
            .attr("x", width-180)
            .attr("y", -40);
        svg.append('rect')
            .attr("height", 20)
            .attr("width", 30)
            .attr("class", "temp8")
            .attr("x", width-150)
            .attr("y", -40);
        svg.append('rect')
            .attr("height", 20)
            .attr("width", 30)
            .attr("class", "temp9")
            .attr("x", width-120)
            .attr("y", -40);
        svg.append('rect')
            .attr("height", 20)
            .attr("width", 30)
            .attr("class", "temp10")
            .attr("x", width-90)
            .attr("y", -40);
        svg.append('rect')
            .attr("height", 20)
            .attr("width", 30)
            .attr("class", "temp11")
            .attr("x", width-60)
            .attr("y", -40);
        svg.append('rect')
            .attr("height", 20)
            .attr("width", 30)
            .attr("class", "temp12")
            .attr("x", width-30)
            .attr("y", -40);

    },
    error: function() {
        alert('error');
    }
});



