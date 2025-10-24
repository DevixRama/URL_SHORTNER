import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl, getCustomShortUrl } from "../dao/shortUrl.js";

export const createShortUrlWithoutUser = async (url) => {

    try {
        const shortUrl = await generateNanoId(7)
        await saveShortUrl(shortUrl, url);
        return shortUrl;
    } catch (error) {
        throw new Error(error.message);
    }

}

export const createShortUrlWithUser = async (url, userId, slug = null) => {

    const shortUrl = slug || await generateNanoId(7)

    const exists = await getCustomShortUrl(shortUrl)

    if (exists) throw new Error("This custom Url already exists")

    await saveShortUrl(shortUrl, url, userId);

    return shortUrl;

}