var socket = io("/");
var ctx = document.getElementById("dataChart").getContext("2d");
ctx.width = 10;
ctx.height = 10;

var originalCalculateXLabelRotation =
  Chart.Scale.prototype.calculateXLabelRotation;
var speed = 500;
var prevData = 0;
var myChart = new Chart(ctx, {
  type: "line",
  filled: false,
  data: {
    labels: [],
    datasets: [
      {
        label: "Data Recived From Twitter API (in KB/s)",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    animation: {
      duration: speed * 1.5,
      easing: "easeOutQuart",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          labelString: "Time",
        },
      ],
    },
  },
});

function addData(label, data) {
  if (data == undefined) data = 10;
  myChart.data.labels.push(label);
  if (myChart.data.labels.length > 10) {
    myChart.data.labels.shift();
  }
  myChart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
    if (dataset.data.length > 10) {
      dataset.data.shift();
    }
  });
  myChart.update();
}

setInterval(() => {
  data = fetch("http://localhost:3000/data").then((res) =>
    res.json().then((data) => {
      d = new Date();
      label = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      console.log(data);
      console.log(typeof data.data);
      addData(label, data.data - prevData);
      prevData = data.data;
    })
  );
}, 1000);
