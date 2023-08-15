const axios = require("axios");
const cheerio = require("cheerio");
const router = require("express").Router();

const Product = require("../models/productModel");
const authMiddleware = require("../middleware/authMiddleware");

// @route - /api/scrape
// return payload as scraped data

router.post("/", authMiddleware, async (req, res) => {
  const { url } = req.body;

  const user = req.user;

  if (!user) {
    return res.send({ success: false, msg: "User not logged in" });
  }

  if (!url) {
    return res.send({ success: false, msg: "URL not provided" });
  }

  if (user.scrapedUrls.includes(url)) {
    return res.send({ success: false, msg: "URL already scraped" });
  }

  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      return res
        .status(500)
        .json({ success: false, msg: "Failed to fetch the URL" });
    }

    const $ = cheerio.load(response.data);

    const title = $("span.B_NuCI").text();
    const price = $("div._30jeq3._16Jk6d").text();

    const descriptionTag = $("div._2o-xpa");
    const description = descriptionTag.text() || null;

    const reviewsTag = $("span._2_R_DZ");
    const reviews_count = parseInt(reviewsTag.text()) || 0;

    const ratingsTag = $("div._3LWZlK");
    const ratings = ratingsTag.text() || null;

    const media_count = $("div._3ZvwxG").length;

    const product = new Product({
      user: user._id,
      title,
      price,
      description,
      reviews_count,
      ratings,
      media_count,
    });

    await product.save();

    user.scrapedUrls.push(url);
    await user.save();

    res.send({
      success: true,
      msg: "URL scraped successfully",
      payload: product,
    });
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        msg: "Internal server error",
      });
    }
  }
});

module.exports = router;
