let selecters = document.querySelectorAll('.selecter');
let shape = $$('#shape')
let box = $$('#box')
let points = 4;

selecters.forEach(el => {
    el.addEventListener('mousedown', mouseD)
    el.addEventListener('touchstart', mouseD)
})

document.querySelectorAll('#dimension input').forEach(ele => {
    ele.oninput = () => setSize()
})

$$('#pointChange').addEventListener('click', (e) => {
    points = e.target.checked ? 8 : 4;
    document.querySelectorAll('.selecter').forEach(el => el.style.display = 'none')
    document.querySelectorAll('.selecter.pt_' + points).forEach(el => el.style.display = 'block')
    setBorder()
})

function mouseD() {
    event.target.classList.add('active')
    document.addEventListener('mousemove', mouseM)
    document.addEventListener('mouseup', mouseU)
    document.addEventListener('touchmove', mouseM)
    document.addEventListener('touchend', mouseU)
    document.body.style.setProperty('user-select', 'none')
}

function mouseM() {
    let e, vt, hz, w, h, bdr;
    e = event.type == "touchmove" ? event.touches[0] : event
    el = document.querySelector('.active')

    vt = e.clientY - el.parentElement.offsetTop
    hz = e.clientX - el.parentElement.offsetLeft
    w = shape.offsetWidth
    h = shape.offsetHeight
    vt = vt < 0 ? 0 : vt
    vt = vt > h ? h : vt
    hz = hz < 0 ? 0 : hz
    hz = hz > w ? w : hz

    if (el.classList.contains("hr"))
        el.style.left = (hz / w * 100).toFixed() + '%';

    if (el.classList.contains("vt"))
        el.style.top = (vt / h * 100).toFixed() + '%';

    setBorder()

}

function mouseU() {
    document.removeEventListener('mousemove', mouseM)
    document.removeEventListener('mouseup', mouseU)
    document.removeEventListener('touchmove', mouseM)
    document.removeEventListener('touchend', mouseU)
    document.querySelector('.active').classList.remove('active')
    document.body.style.removeProperty('user-select')
}


function setBorder() {
    w = shape.offsetWidth
    h = shape.offsetHeight
    if (points == 4) {
        l = ($$('#left').offsetTop / h * 100).toFixed()
        r = ($$('#right').offsetTop / h * 100).toFixed()
        t = ($$('#top').offsetLeft / w * 100).toFixed()
        b = ($$('#bottom').offsetLeft / w * 100).toFixed()
        bdr = `${t}% ${100 - t}% ${100 - b}% ${b}% / ${l}% ${r}% ${100 - r}%  ${100 - l}% `;

    } else {
        let tl = ($$('#topLeft').offsetLeft / w * 100).toFixed()
        let tr = ($$('#topRight').offsetLeft / w * 100).toFixed()
        let rt = ($$('#rightTop').offsetTop / h * 100).toFixed()
        let rb = ($$('#rightBottom').offsetTop / h * 100).toFixed()
        let bl = ($$('#bottomLeft').offsetLeft / w * 100).toFixed()
        let br = ($$('#bottomRight').offsetLeft / w * 100).toFixed()
        let lt = ($$('#leftTop').offsetTop / h * 100).toFixed()
        let lb = ($$('#leftBottom').offsetTop / h * 100).toFixed()
        bdr = `${tl}% ${100 - tr}% ${100 - br}% ${bl}% / ${lt}% ${rt}% ${100 - rb}%  ${100 - lb}% `;
    }

    shape.style.borderRadius = bdr;
    $$('#code').innerText = bdr;
} setBorder()


function setSize() {
    box.style.width = $$('#width').value + 'px';
    box.style.height = $$('#height').value + 'px';
}

$$('#copy').onclick = e => {
    // navigator.clipboard.writeText(e.target.parentElement.innerText.replace('copy',''))
    navigator.clipboard.writeText(e.target.previousElementSibling.innerText)
}
$$('#customSize').onclick = () => {
    $$('#dimension').classList.toggle('visible');
    setSize()
}
function $$(s) {
    return document.querySelector(s)
}

$$('#width').value = box.offsetWidth;
$$('#height').value = box.offsetHeight;