import jwt from 'jsonwebtoken';

const jwtValidate = (req, res, next) => {
    try {
      if (!req.headers["authorization"]) return res.send("UnAuthorize");
      const token = req.headers["authorization"].replace("Bearer ", "")
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) throw new Error(error)
      })
      next()
    } catch (error) {
      return res.send("forbidden");
    }
}

export default jwtValidate;