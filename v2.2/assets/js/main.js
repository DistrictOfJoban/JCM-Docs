const sections = [];

for(let elem of document.querySelectorAll(".jcm-custom-wrapper section")) {
    if(elem.id) {
        sections.push(elem);
    }
}

window.addEventListener('scroll', () => {
    updateScrollProperty();
});

function updateScrollProperty() {
    let bottom = window.innerHeight;

    for(let elem of sections) {
        let rect = elem.getBoundingClientRect();
        let elemTop = rect.top;
        let elemBottom = rect.bottom;

        document.body.style.setProperty(`--scrollprg-${elem.id}`, clamp((bottom-elemTop) / (elemBottom - elemTop)));
    }
    document.body.style.setProperty('--scroll', (window.scrollY / 4));
}

updateScrollProperty();

/* PIDS */
const PIDS_SWITCH_FREQ_MS = 1500;
const pidsContent = document.getElementsByClassName("content");
let pidsIndex = 0;

setInterval(() => {
    pidsContent[pidsIndex].classList.add("active");

    let nowIdx = pidsIndex;

    setTimeout(() => {
        for(let i = 0; i < pidsContent.length; i++) {
            if(i != nowIdx) pidsContent[i].classList.remove("active");
        }
    }, 250);

    pidsIndex = (pidsIndex + 1) % pidsContent.length;
}, PIDS_SWITCH_FREQ_MS);

function clamp(val) {
    return Math.min(1, Math.max(0, val));
}