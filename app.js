const express = require("express")
const https = require("https")
const bodyParser =  require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.get("/" ,(req, res) =>{

    res.sendFile(__dirname + "/index.html")
    

})

app.post("/", (req,res) =>{
 
    const query = req.body.cityName
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=f33c290fdd3d16e7760911d10fa453ec&units=metric"

    https.get(url, (response) =>{
        console.log(response.statusCode)

    response.on("data", (data) =>{
        const weathreData =JSON.parse(data)
        const temp = weathreData.main.temp
        const weatherDesc = weathreData.weather[0].description
        const icon = weathreData.weather[0].icon
        const imgUrl = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
        res.write("<p>temp of " + query + "</p>"+ temp + "<p>&#8451</p>")
        res.write("<p>Description </p>" + weatherDesc)
        res.write("<img src=" + imgUrl + ">")
        res.send()
    })
})

})

app.listen(4000, () => {
    console.log("Server started")
  })

 