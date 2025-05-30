import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataFile = path.join(__dirname, 'data.json')

const port = 5500;

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname))
if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, '[]', 'utf-8');
  }

app.get('/data', (req, res) => {
    fs.readFile(dataFile, 'utf-8', (error, data) => {
        if (error){
            return res.status(500)
        }
        const JSONdata = JSON.parse(data)
        res.json(JSONdata)
    })

})

app.post('/post', (req, res) => {
    const {desc, likes} = req.body
    const newPost = {
      desc, likes
    }
    const posts = JSON.parse(fs.readFileSync(dataFile, 'utf-8'))
    posts.unshift(newPost)
    fs.writeFileSync(dataFile, JSON.stringify(posts, null, 2), 'utf-8')
    res.status(201).send({ message: "Post created" });
})

app.listen(port, () => {
    console.log(`The app is running at http://localhost:${port}`);
})
