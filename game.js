const movSound = new Audio("move.mp3");
const eatSound = new Audio("eat.mp3");
const winSound = new Audio("win.mp3");
let isWin=false;
const UnicornId = document.getElementById('Unicorn');
const jaiId = document.getElementById('jai');
const gameArea = document.getElementById('gameArea');
let score = 0;

const moveUnicorn = (event) => {
    const key = event.key;
    const step = 10;
    const maxX = gameArea.clientWidth - UnicornId.offsetWidth;
    const maxY = gameArea.clientHeight - UnicornId.offsetHeight;

    // ตำแหน่งปัจจุบัน
    let newTop = UnicornId.offsetTop;
    let newLeft = UnicornId.offsetLeft;

    switch (key) {
        case 'ArrowUp':
        case 'w':
            newTop -= step;
            movSound.currentTime = 0;
            movSound.play();
            break;
        case 'ArrowDown':
        case 's':
            newTop += step;
             movSound.currentTime = 0;
            movSound.play();
            break;
        case 'ArrowLeft':
        case 'a':
            newLeft -= step;
             movSound.currentTime = 0;
            movSound.play();
            break;
        case 'ArrowRight':
        case 'd':
            newLeft += step;
             movSound.currentTime = 0;
            movSound.play();
            break;
        case ' ':
            jaiJump();
            break;
    }

    // ป้องกันออกนอกขอบ
    if (newTop < 0) newTop = 0;
    if (newLeft < 0) newLeft = 0;
    if (newTop > maxY) newTop = maxY;
    if (newLeft > maxX) newLeft = maxX;

    UnicornId.style.top = `${newTop}px`;
    UnicornId.style.left = `${newLeft}px`;

    eatjai();
};

// ให้หัวใจสุ่มตำแหน่งในกรอบเท่านั้น
function jaiJump() {
    const maxX = gameArea.clientWidth - jaiId.offsetWidth;
    const maxY = gameArea.clientHeight - jaiId.offsetHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    jaiId.style.left = `${randomX}px`;
    jaiId.style.top = `${randomY}px`;
}

// ตรวจจับการชน
function eatjai() {
    const UnicornArea = UnicornId.getBoundingClientRect();
    const jaiArea = jaiId.getBoundingClientRect();

    if (
        UnicornArea.x < jaiArea.x + jaiArea.width &&
        UnicornArea.x + UnicornArea.width > jaiArea.x &&
        UnicornArea.y < jaiArea.y + jaiArea.height &&
        UnicornArea.y + UnicornArea.height > jaiArea.y
    ) {
        score++;
        document.getElementById('score').innerText = score;
        eatSound.play();
        jaiJump();
        UnicornId.style.fontSize = `${score + 25}px`;
        checkWin();
    }
}
function checkWin() {
    if (score >= 5 && !isWin) {
        isWin = true;
        
        // 🔹 สร้างกล่องรวม (ไว้ใส่รูป + ข้อความ)
        winSound.play();
        const winBox = document.createElement("div");
        winBox.style.position = "absolute";
        winBox.style.top = "50%";
        winBox.style.left = "50%";
        winBox.style.transform = "translate(-50%, -50%)";
        winBox.style.textAlign = "center";

        // 🔹 รูป
        const winImg = document.createElement("img");
        winImg.src = "pp.png";
        winImg.style.width = "200px";

        // 🔹 ข้อความ
        const text = document.createElement("h2");
        text.innerText = "🎉ເຢ້!!!!!ນີ້ຄືລາງວັນຄົນໂສດ🎉 ";
        text.style.color = "red";

        // 🔹 เอาทั้งหมดรวมกัน
        winBox.appendChild(winImg);
        winBox.appendChild(text);

        gameArea.appendChild(winBox);
    }
}

document.addEventListener('keydown', moveUnicorn);

// หัวใจย้ายทุก 10 วิ
setInterval(jaiJump, 10000);