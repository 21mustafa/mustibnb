const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader')
const multer = require('multer');
const fs = require('fs');

const PlaceModel = require('./models/Place')
const UserModel = require('./models/User');

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173'
}))

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'fds8gg54iti24ghhrgt8wyr8gwh5hu21'

mongoose.connect('mongodb+srv://blog:HZUz2rVUYVlULLxh@cluster0.rtsrtjf.mongodb.net/?retryWrites=true&w=majority')

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body
    try {
        const user = await UserModel.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        })
        res.json(user)
    } catch(e) {
        console.log(e)
        res.status(422).json(e)
    }
    
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await UserModel.findOne({email,})

        if (user) {
            const passOk = bcrypt.compareSync(password, user.password)
            if (passOk) {
                jwt.sign({
                    email: user.email,
                    id: user._id
                }, jwtSecret, {}, (err, token) => {
                    if (err) throw err

                    res.cookie('token', token).json({
                        name: user.name,
                        email: user.email
                    })

                })
            } else {
                res.status(401).json('Wrong password')
            }
        } else {
            res.status(404).json('User cannot be found')
        }
    } catch(e) {
        console.log(e)
        res.status(422).json(e)
    }
    
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if(token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            const {name, email, _id} = await UserModel.findById(userData.id)
            res.json({name, email, _id})
        })
    } else {
        res.json(null)
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})

app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body
    const newName = 'photo-' + Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName
    })
    res.json(newName)
})

const photosMiddleware = multer({dest: 'uploads/'})
app.post('/upload', photosMiddleware.array('photos', 100) ,(req, res) => {
    const files = req.files
    const uploadedFiles = []
    for (let file of files) {
        const fileNameParts = file.originalname.split('.')
        const extension = fileNameParts[fileNameParts.length - 1]
        const newPath = file.path + '.' + extension
        fs.renameSync(file.path, newPath)
        uploadedFiles.push(newPath.replace('uploads/', ''))
    }
    res.json(uploadedFiles)
})

app.post('/places', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err
        const {
            title, 
            address, 
            photos, 
            description, 
            perks, 
            extraInfo, 
            checkIn, 
            checkOut, 
            maxGuests,
            price
        } = req.body
        const placeDoc = await PlaceModel.create({
            owner:  userData.id,
            title,
            address,
            checkIn,
            checkOut,
            description,
            extraInfo,
            maxGuests,
            perks,
            photos,
            price
         })
         res.json(placeDoc)
    })

})

app.get('/user-places', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err
        const {id} = userData;
        res.json(await PlaceModel.find({owner: id}))
    })
})

app.get('/places/:id', async (req, res) => {
    const {id} = req.params
    res.json(await PlaceModel.findById(id))
})

app.put('/places', async (req, res) => {
    const {token} = req.cookies
    const {
        id,
        title, 
        address, 
        photos, 
        description, 
        perks, 
        extraInfo, 
        checkIn, 
        checkOut, 
        maxGuests,
        price
    } = req.body
    

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err
        const placeDoc = await PlaceModel.findById(id)
        
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, 
                address, 
                photos, 
                description, 
                perks, 
                extraInfo, 
                checkIn, 
                checkOut, 
                maxGuests,
                price
            })
            await placeDoc.save()
            res.json('ok')
        } else {
            res.statusCode(404).json('cannot update the doc')
        }
    })
})

app.get('/places', async (req, res) => {
    res.json(await PlaceModel.find())
})

app.listen(4000)