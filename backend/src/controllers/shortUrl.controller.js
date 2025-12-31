import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/shortUrl.service.js";
import { findUrlByShortUrl } from "../dao/shortUrl.js";
import wrapAsync from "../utils/tryCatch.js";
import { verifyToken } from "../utils/helper.js";
import { findUserById } from "../dao/user.dao.js";


export const createShortUrl = async (req, res) => {

  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (token) {
      const decoded = verifyToken(token);
      const user = await findUserById(decoded.id);
      req.user = user
    }
  } catch (err) {
   throw new Error("User not logged in");
  }

  const { url, slug } = req.body;
  const user = req.user;
  

  let shortUrl;
  if (user) {
    shortUrl = await createShortUrlWithUser(url, user._id, slug);
  } else {
    shortUrl = await createShortUrlWithoutUser(url);
  }

  res.status(200).json({ success: true, shortUrl: process.env.APP_URL + shortUrl });
}


export const directToLongUrl = wrapAsync(async (req, res) => {
  const { id } = req.params
  const url = await findUrlByShortUrl(id);
  if (url) {
    res.redirect(url.full_url)
  } else {
    res.status(404).send("Not found")
  }
})
