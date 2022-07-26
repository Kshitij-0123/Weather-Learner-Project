let logo = document.querySelector(".logo")
let original = '\n          <span><i class="fa-solid fa-cloud-bolt"></i></span> Weather pad\n        ';
let modified = '\n          <span><i class="fa-solid fa-cloud-bolt"></i></span>\n        ';

const resizeLogo = (logo, original, modified) => {
    if (window.innerWidth < 551) {
        logo.innerHTML = modified;
        logo.style.marginLeft = "20px"
    }
    else {
        logo.innerHTML = original;
        logo.style.marginLeft = ""
    }
}

resizeLogo(logo, original, modified);

window.addEventListener('resize', () => {
    resizeLogo(logo, original, modified);
})
