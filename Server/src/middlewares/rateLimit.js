import rateLimit from "../configs/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await rateLimit.limit(req.ip)
        if(!success){
            return res.status(429).json({ message: "Rate limit exceeded" });
        }

        next()
        
    } catch (error) {
        console.log("Error applying rate limit", error);
        res.status(500).json({ message: "Internal server error" });
        next(error)
    }
}

export default rateLimiter