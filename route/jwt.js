import jwt from 'jsonwebtoken';

async function routes (fastify, options) {

    fastify.get("/xcrfstoken", (req, res, next) => {

        const apiKey = req.headers["x-api-key"];
        
        if(apiKey== process.env.X_API_KEY){
            let jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;     
            let data = {
            time: Date(),
            userId: 12,
            }
       const token = jwt.sign(data, jwtSecretKey,{ expiresIn: "3m", algorithm: "HS256" });

          var d = {
                "token":token
            }
            res.send(d);
        }else{
            res.send("forbidden");
        }
    
    });

}
  
export default routes;


