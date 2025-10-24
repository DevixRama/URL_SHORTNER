import urlSchema from "../models/shortUrl.model.js"


export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try {
        const newUrl = new urlSchema({
            short_url: process.env.APP_URL + shortUrl,
            full_url: longUrl
        });
        if (userId) {
            newUrl.user_id = userId;
        }
        return await newUrl.save()
    } catch (err) {
        if (err.code === 11000) {
            throw new Error("Short URL already exists");
        }
        throw new Error(err.message);
    }

}


export const findUrlByShortUrl = async (shortUrl) => {
    return await urlSchema.findOneAndUpdate({ short_url: process.env.APP_URL + shortUrl }, { $inc: { clicks: 1 } });
}


export const getCustomShortUrl = async (slug) => {
    return await urlSchema.findOne({short_url:slug})
}