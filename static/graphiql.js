const openIn = 'Open GraphiQL';
const closeIn = 'Close GraphiQL';
const minPixel = 1500;
const wrapper = document.querySelector('.wrapper');
const openBt = document.querySelector('#openIframe');
const iframe = document.querySelector('iframe');

openBt.addEventListener('click', toggleIframe);

function toggleIframe() {
    if (iframe.classList.contains('open')) {
        closeIframe();
    } else {
        openIframe();
    }
}

function openIframe() {
    const clientWidth = window.innerWidth || document.body.clientWidth;
    if (clientWidth < minPixel) {
        alert(`need ${minPixel}px-width to open GraphiQL frame :(`);
        return;
    }
    iframe.classList.add('open');
    openBt.textContent = closeIn;
    wrapper.style.width = 'auto';
}

function closeIframe() {
    iframe.classList.remove('open');
    openBt.textContent = openIn;
    wrapper.style.width = '750px';
}
