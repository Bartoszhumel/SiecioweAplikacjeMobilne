const express = require('express')

const app = express()

app.get('/', (req, res) => {
    video= req.getParameter("videoFile")
    audio = req.getParameter("audioFile")
    const video1 = document.createElement('video');
    video1.src = video;
    res.send(<video>  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"></source> type="video/mp4"</video>)

})

app.listen(4080)

