import express from 'express'
import jwt from 'jsonwebtoken'

const privateKey="ddjbshs@12"


const app = express()
const port = 3000
app.use(express.json())


const users=[
  {
    name:"Nura",
    password:"1234",
    role:"user"
},
{
  name:"Mata",
  password:"mata234",
  role:"user"
},
{
  name:"mehi",
  password:"mehi123",
  role:"admin"
}

]




app.post('/login',async (req, res) => {
  //ad ve sifre aliram
  const {name,password}=req.body
  //userin var olub olmadigini tapiram
  const user = users.find(x=>x.name===name)
  if (!user) {
  res.status(404).send("user not found")
  }
//parol eynidirmi yoxla 
if (user.password!==password) {
  res.status(403).send("password is wrong")
}

jwt.sign({ name: name }, privateKey, async function(err, token) {
  if (err) {
  res.status(400).send("token cant generate")
  }
  console.log(token);
  res.send(token)
});

  
})

app.get('/', (req, res) => {
  const token=req.headers.authorization
  let decoded
  if (!token) {
    res.status(403).send("you dont have access")
  }
 
    try {
      const decoded = jwt.verify(token, privateKey);
    } catch (error) {
      res.status(403).send(error.message)
    }
  
  res.status(200).send(users)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})