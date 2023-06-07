const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'PaXCc2alRNX8Pob9vLvFa1LxTlvEmpobSoEhrefVeXk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// check if all images were loaded 
function imageLoaded(){
    console.log('image loaded');
    imagesLoaded++;
    if(imagesLoaded=== totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready = ', ready);
    }
}
// helper function to set attributes on DOM Elements 

function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}
// Create Elements For Links & Photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('totalImages ', totalImages);

    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target:'_blank',
        });
        //Create <img> for Photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // event listener, check when each is finished loading 
        img.addEventListener('load', imageLoaded);

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
// Check to see if scrolling near to the bottom of the page, and load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }

});
// On load
getPhotos();