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
              <audio id="audioPlayer" src="${audioFile}" controls></audio>
                <button id="videoPlay">Play Video</button>
                <button id="audioPlay">Play Audio</button>
                <button id="videoPause">Pause Video</button>
                <button id="audioPause">Pause Audio</button>`;
  }
  else if (videoFile) {
    player = `<video id="videoPlayer" src="${videoFile}" controls></video>
<button id="videoPlay">Play Video</button>
                <button id="videoPause">Pause Video</button>`;
  } else if (audioFile) {
    player = `<audio id="audioPlayer" src="${audioFile}" controls></audio>
<button id="audioPlay">Play Audio</button>
                <button id="audioPause">Pause Audio</button>`;
  } else {
    player = 'No media file specified.';
  }
  let image;
  if(imgFile){
    image = `<img id="posterImage" src="${imgFile}"></img>`
  }
  let playerbuttons=`  const button6 = document.getElementById('videoPlay');
  button6.addEventListener('click', function(e) {
    const video= document.getElementById('videoPlayer');
    video.play();
  });
  const button9 = document.getElementById('videoPause');
    button9.addEventListener('click', function(e) {
    const video= document.getElementById('videoPlayer');
    video.pause();
    });`
  let audioButtons=`const button7 = document.getElementById('audioPlay');
  button7.addEventListener('click', function(e) {
    const audio= document.getElementById('audioPlayer');
    audio.play();
  });
  const button8 = document.getElementById('audioPause');
  button8.addEventListener('click', function(e) {
    const audio= document.getElementById('audioPlayer');
    audio.pause();
  });`;
  script =`
  let id = 1;
  function deleteRow(o) {
    var p=o.parentNode.parentNode;
        p.parentNode.removeChild(p);
   }
   function upRow(o) {
      var p=o.parentNode.parentNode;
      var prev = p.previousSibling;
      if (prev.previousSibling!=p.parentNode.firstChild){
      console.log(prev);
          p.parentNode.insertBefore(p, prev);
      }else{
       console.log(prev);
          p.parentNode.insertBefore(p, null);
      }
   }
    function downRow(o) {
        var p=o.parentNode.parentNode;
        var next = p.nextSibling;
        if (p!=p.parentNode.lastChild){
            p.parentNode.insertBefore(p, next.nextSibling);
        }
        else{
            p.parentNode.insertBefore(p, p.parentNode.firstChild.nextSibling);
        }
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
    var cellbuttonup = row.insertCell(3);
    var cellbuttondown = row.insertCell(3);
    cellbuttonup.innerHTML = '<button class="moveRowUpButton" type="button" onClick="upRow(this)" >'+ 'Up</button>';
    cellbuttondown.innerHTML = '<button class="moveRowDownButton" type="button" onClick="downRow(this)" >'+ 'Down</button>';
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
    var cellbuttonup = row.insertCell(3);
    var cellbuttondown = row.insertCell(3);
    cellbuttonup.innerHTML = '<button class="moveRowUpButton" type="button" onClick="upRow(this)" >'+ 'Up</button>';
    cellbuttondown.innerHTML = '<button class="moveRowDownButton" type="button" onClick="downRow(this)" >'+ 'Down</button>';
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
    var cellbuttonup = row.insertCell(3);
    var cellbuttondown = row.insertCell(3);
    
    cellbuttonup.innerHTML = '<button class="moveRowUpButton" type="button" onClick="upRow(this)" >'+ 'Up</button>';
    cellbuttondown.innerHTML = '<button class="moveRowDownButton" type="button" onClick="downRow(this)" >'+ 'Down</button>';
    cellbutton.innerHTML = '<button class="removeRowButton" type="button" onClick="deleteRow(this)" >'
    + 'Delete</button>';
  
    cell1.innerHTML = id;
    cell2.innerHTML = image.getAttribute('src');
    cell3.innerHTML = "Image";
    id=id+1;
  });
  `
  if(videoFile){
    script = script + playerbuttons;
  }
  if(audioFile) {
    script = script + audioButtons;
  }
  table=`<table id="playlist_table">
  <tr>
  <th>No.</th>
  <th>URL</th>
  <th>Value</th>
  <th>Action</th>
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
