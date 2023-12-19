export const checkAuthorization = function (req, res, next) {
    const password=req.body.password
    if (password==="1234") {
     next()
    }  
     else{
       res.status(403).send("ugursuz giris")
     }
    }