const axios = require('axios');
const cheerio = require('cheerio');

async function getImgurAlbumImages(albumUrl) {
  try {
    const response = await axios.get(albumUrl);
    const $ = cheerio.load(response.data);
    const imageLinks = [];

    $('a.image-list-link').each((index, element) => {
      const imageUrl = $(element).attr('href');
      imageLinks.push(imageUrl);
    });

    return imageLinks;
  } catch (error) {
    console.error('Error occurred while fetching the album:', error);
    return [];
  }
}

async function main() {
    const albumUrl = 'https://imgur.com/a/SCXH4'; // Replace ALBUM_ID with the actual album ID
    const imageLinks = await getImgurAlbumImages(albumUrl);
    console.log(imageLinks);
}

main()
