var express = require('express');
const url = require('url');


var app = express();


app.get('/', (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const videoFile = queryObject.videoFile;
  const audioFile = queryObject.audioFile;
  const imgFile = queryObject.imgFile;
  let player;
  
  if(videoFile&&audioFile)
  {
    player = `<video id="videoPlayer" src="${videoFile}" controls></video>
              <audio id="audioPlayer" src="${audioFile}" controls></audio>`;
  }
  else if (videoFile) {
    player = `<video id="videoPlayer" src="${videoFile}" controls></video>`;
  } else if (audioFile) {
    player = `<audio id="audioPlayer" src="${audioFile}" controls></audio>`;
  } else {
    player = 'No media file specified.';
  }
  let image;
  if(imgFile){
    image = `<img id="posterImage" src="${imgFile}"></img>`
  }

  script =`
  let id = 1;
  function deleteRow(o) {
    var p=o.parentNode.parentNode;
        p.parentNode.removeChild(p);
   }
  const button1 = document.getElementById('videoCancel');
  button1.addEventListener('click', function(e) {
    const video = document.getElementById('videoPlayer');
    video.setAttribute('src','cancel.mp4')
  });
  const button2 = document.getElementById('audioCancel');
  button2.addEventListener('click', function(e) {
    const audio = document.getElementById('audioPlayer');
    audio.setAttribute('src','cancel.mp3')
  });
  const button3 = document.getElementById('audioAdd');
  button3.addEventListener('click', function(e) {
    const audio = document.getElementById('audioPlayer');
    var tableRow = document.getElementById("playlist_table");
    var row = tableRow.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cellbutton = row.insertCell(3);
    cellbutton.innerHTML = '<button class="removeRowButton" type="button" onClick="deleteRow(this)" >'
    + 'Delete</button>';
    cell1.innerHTML = id;
    cell2.innerHTML = audio.getAttribute('src');
    cell3.innerHTML = "Audio";
    id=id+1;
  });
  const button4 = document.getElementById('videoAdd');
  button4.addEventListener('click', function(e) {
    const video = document.getElementById('videoPlayer');
    var tableRow = document.getElementById("playlist_table");
    var row = tableRow.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cellbutton = row.insertCell(3);
    cellbutton.innerHTML = '<button class="removeRowButton" type="button" onClick="deleteRow(this)" >'
    + 'Delete</button>';
    cell1.innerHTML = id;
    cell2.innerHTML = video.getAttribute('src');
    cell3.innerHTML = "Video";
    id=id+1;
  });
  const button5 = document.getElementById('imgAdd');
  button5.addEventListener('click', function(e) {
    const image = document.getElementById('posterImage');
    var tableRow = document.getElementById("playlist_table");
    var row = tableRow.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cellbutton = row.insertCell(3);
    cellbutton.innerHTML = '<button class="removeRowButton" type="button" onClick="deleteRow(this)" >'
    + 'Delete</button>';
    cell1.innerHTML = id;
    cell2.innerHTML = image.getAttribute('src');
    cell3.innerHTML = "Image";
    id=id+1;
  });
  `
  table=`<table id="playlist_table">
  <tr>
  <td>No.</td>
  <td>URL</td>
  <td>Value</td>
  <td>Action</td>
  </tr>
  </table>
  <br>`

  const html = `
    <html>
      <head>
        <title>Hello World Player</title>
      </head>
      <body>
        ${player}
        ${image}
        ${table}
        <button id="videoCancel">Video Cancel</button>
        <button id="videoAdd">Click to add Video</button>
        <button id="audioCancel">Audio Cancel</button>
        <button id="audioAdd">Click to add Audio</button>
        <button id="imgAdd">Click to add Image</button>


      </body>
      <script>
        ${script}
      </script>
    </html>
  `;

  res.send(html);
});

app.listen(4080)
