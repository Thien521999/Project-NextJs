module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["https://api-meme-zendvn-01.herokuapp.com/public/images"],
    loader: "imgix",
    path: "https://example.com/myaccount/",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
