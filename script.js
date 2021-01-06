// UNSPLASH API
const imageContainer = document.getElementById("image-container")
const count = 5;
const apiKey = '3xYNuY11giWbdQgLkhxANUGDSmyASV0PhAEY-TmTXCA';
const apiUrl = `https://api.unsplash.com/photos/random//?client_id=${apiKey}&count=${count}`;
const loader = document.getElementById("loader")
const last = document.getElementById("last")

let ready = false
let photosArray = [];
let imagesLoaded = 0;
let totalImages = 0;

// check if all images were loaded 

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready)
    }
}

//helper function
function setAttributes(element, attributes){
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    };
};


// create elemets for links, photos and add to DOM

function  displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length
    console.log("total images", totalImages)
    // run function for each object in photos Array
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        //Event Listeer, check when each is loaded
        img.addEventListener('load', imageLoaded)
        // append img inside a 
        item.append(img)
        imageContainer.appendChild(item)
    });
}


// Get photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // catch error here

    }
}

// check to see if crrolling near bottom of page, load more photos

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false
        getPhotos();
    }
})

// On Load 

getPhotos();