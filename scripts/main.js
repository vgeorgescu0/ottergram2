var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var NEXT_LINK_SELECTOR = '[data-image-role="next"]';
var PREVIOUS_LINK_SELECTOR = '[data-image-role="previous"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function addNextClickHandler(thumbnails) {
    'use strict';
    var next = document.querySelector(NEXT_LINK_SELECTOR);
    next.addEventListener('click', function () {
        var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
        var url = detailImage.getAttribute('src');
        var index;
        for (var i = 0; i < thumbnails.length; i++){
            if (url == thumbnails[i].getAttribute('data-image-url')){
                index = i;
                break;
            }
        }
        console.log(index);
        if (index + 1 >= thumbnails.length){
            setDetailsFromThumb(thumbnails[0]);
        }
        else{
            setDetailsFromThumb(thumbnails[index+1]);
        }
        showDetails();
    });
}

function addPreviousClickHandler(thumbnails) {
    'use strict';
    var previous = document.querySelector(PREVIOUS_LINK_SELECTOR);
    previous.addEventListener('click', function () {
        var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
        var url = detailImage.getAttribute('src');
        var index;
        for (var i = 0; i < thumbnails.length; i++){
            if (url == thumbnails[i].getAttribute('data-image-url')){
                index = i;
                break;
            }
        }
        console.log(index);
        if (index - 1 < 0){
            setDetailsFromThumb(thumbnails[thumbnails.length - 1]);
        }
        else{
            setDetailsFromThumb(thumbnails[index - 1]);
        }
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    addNextClickHandler(thumbnails);
    addPreviousClickHandler(thumbnails);
}

initializeEvents();