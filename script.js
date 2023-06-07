const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'PaXCc2alRNX8Pob9vLvFa1LxTlvEmpobSoEhrefVeXk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create Elements For Links & Photos, Add to DOM
function displayPhotos(){
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        //Create <img> for Photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
//Create Elements For Links & Photos, Add to DOM

// get photos fron api 
async function getPhotos() {
    try{
        const responce = await fetch(apiUrl);
         photosArray = await responce.json();
         displayPhotos();
    } catch (error) {
        // Catch an error
    }

}
// On load
getPhotos();