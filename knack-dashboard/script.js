$(document).ready(function () {
  // Do something after the document is ready
  // Append a <div> element for the grid container
  var divElement = $('<div class="grid-container">');
  $(".kn-view").append(divElement);
  $.ajax({
    url: "https://api.knack.com/v1/objects/object_14/records",
    type: "GET",
    headers: {
      "X-Knack-Application-Id": "65194a599a04280029f5b2a5", // Replace with your Knack app ID
      "X-Knack-REST-API-Key": "05d99ab4-abfa-4eb2-8050-f11d96198047", // Replace with your Knack API key
    },
    success: function (response) {
      console.log(response);

      let totalFeeCollected = 0;
      for (let i = 0; i < response.records.length; i++) {
        const student = response.records[i];
        if (student.field_131) {
          const feeString = student.field_131;
          const feeValue = parseFloat(feeString.replace(/[^0-9.]/g, ""));
          totalFeeCollected += feeValue;
        }
      }
      let totalAttandance = 0;
      let avgAttandance = 0;
      for (let i = 0; i < response.records.length; i++) {
        const student = response.records[i];
        if (student.field_127) {
          totalAttandance += student.field_127;
        }
      }
      avgAttandance = totalAttandance / response.records.length;
      let maxScore = 0;
      let topScoreres = [];

      for (let i = 0; i < response.records.length; i++) {
        const student = response.records[i];
        if (student.field_130) {
          const marks = student.field_130;
          if (marks > maxScore) {
            maxScore = marks;
            topScoreres = [student];
          } else if (marks === maxScore) {
            topScoreres.push(student);
          }
        }
      }
      let totalMales = 0;
      let totalFemales = 0;
      let totalOthers = 0;
      for (let i = 0; i < response.records.length; i++) {
        const student = response.records[i];
        if (student.field_131) {
          const gender = student.field_122;
          if (gender === "M") {
            totalMales++;
          } else if (gender === "F") {
            totalFemales++;
          } else {
            totalOthers++;
          }
        }
      }
      const items = [
        { name: "Total Students", value: response.records.length },
        { name: "Total Fees Collected", value: "$ " + totalFeeCollected },
        {
          name: "Avg Attandance",
          value: avgAttandance + " %",
        },
        {
          name: "Top Scorer",
          value: topScoreres.map((scorer) => scorer.field_116).join(",<br>"),
        },
        {
          name: "Males",
          value: totalMales,
        },
        {
          name: "Females",
          value: totalFemales,
        },
        {
          name: "Others",
          value: totalOthers,
        },
      ];
      for (const item of items) {
        const itemTitle = item.name;
        const itemValue = item.value;
        const gridItem = $('<div class="grid-item">').html(
          "<h5 class='card-title'>" +
            itemTitle +
            "</h5>" +
            "<p class='card-value'>" +
            itemValue +
            "</p>"
        );
        divElement.append(gridItem);
      }
    },
  });
  // Create grid items
});
