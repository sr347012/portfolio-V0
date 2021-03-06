
    //   var testDataRelative = [
    //     {times: 
    //     [{"starting_time": 1230692272000, "ending_time": 1299898672000}]},
    //     {times: 
    //     [{"starting_time": 1299898672000, "ending_time": 1405133872000}]},
    //     {times: 
    //     [{"starting_time": 1405133872000, "ending_time": 1459393072000}]},
    //     {times: 
    //     [{"starting_time": 1459393072000, "ending_time": 1617159472000}]},
    //     {times: 
    //     [{"starting_time": 1617159472000, "ending_time": 1661914672000}]},
    //   ];
    //   function timelineRelativeTime() {
    //     //This solution is for relative time is from
    //     //http://stackoverflow.com/questions/11286872/how-do-i-make-a-custom-axis-formatter-for-hours-minutes-in-d3-js
    //     var chart = d3.timelines()
    //     .itemHeight(50)
    //     .colors( d3.scaleOrdinal().range(['#14CFAE','#11b599','#1C6A5D','#002525','#000000']) )
    //       .tickFormat({
    //         format: function(d) { return d3.timeFormat("%Y")(d) },
    //         tickTime: d3.timeYears,
    //         tickInterval: 17,
    //         tickSize: 20,
    //       });
    //       var barwidth = window.innerWidth;
    //     var svg = d3.select("#timelineRelativeTime").append("svg").attr("width", barwidth)
    //       .datum(testDataRelative).call(chart);
    //   }
const canvas = document.getElementById('canvas1');

const ctx1 = canvas.getContext('2d');
canvas.width = window.innerWidth;
// canvas.height = '200';
// console.log(ctx1);
ctx1.globalAlpha = 1;
var hrz_btn_clicked = false;
var vrt_btn_clicked = false;

// console.log(canvas.width, canvas.height);
var mouse = {
    x : undefined,
    y: undefined
}

window.addEventListener('mousemove' ,function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY
})
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 10;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    draw() {
        ctx1.beginPath();
        ctx1.arc(this.x,this.y,this.radius, 0, Math.PI * 2, false);
        ctx1.fillStyle = 'white';
        ctx1.stroke();
        ctx1.fill();
    }

    update() {
        // if(hrz_btn_clicked) this.speedY = 0;
        // if(vrt_btn_clicked) this.speedX = 0;
        // if ( hrz_btn_clicked && vrt_btn_clicked) {
        //     this.speedX = 0;
        //     this.speedY = 0;
        // }
        // if ( !hrz_btn_clicked && !vrt_btn_clicked) {
        //     this.speedX = Math.random() * 3 ;;
        //     this.speedY = Math.random() * 3 ;
        // }

        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if(this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

        // if (mouse.x !== undefined) this.x = mouse.x + this.speedX ;
        // if (mouse.y !== undefined) this.y = mouse.y + this.speedY;
    }
}

var particlesArray = [];

for (let i = 0; i < 50; i++) {
    particlesArray.push(new Particle);
}
function horizontal() {
    hrz_btn_clicked = !(hrz_btn_clicked);
    if(hrz_btn_clicked) document.getElementById("ctx1-btn-hrz").style.background='#002525';
    if(!hrz_btn_clicked) document.getElementById("ctx1-btn-hrz").style.background='#ffffff';
}
function vertical() {
    vrt_btn_clicked = !(vrt_btn_clicked);
     if (vrt_btn_clicked) document.getElementById("ctx1-btn-vrt").style.background='#002525';
     if(!vrt_btn_clicked) document.getElementById("ctx1-btn-vrt").style.background='#ffffff';
}

function animate() {
    // ctx1.clearRect(0,0,canvas.width, canvas.height);
    ctx1.fillStyle= 'rgba(0,37,37,0.2)'
    ctx1.fillRect(0,0,canvas.width, canvas.height)
    requestAnimationFrame(animate);

    for (let index = 0; index < particlesArray.length; index++) {
        // const element = array[index];
        // console.log(particlesArray[index]);
        particlesArray[index].update();
        particlesArray[index].draw();


    }
}

animate();
// timelineRelativeTime();
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
// particlesJS.load('particles-js', 'assets/particles.json', function() {
//     console.log('callback - particles.js config loaded');
//   });
  