
const moveSound = new Audio("move.mp3");
const eatSound = new Audio("eat.mp3");
const winSound = new Audio("win.mp3");
let isGameEnd=false;
let isWin=false;
const UnicornId = document.getElementById('Unicorn');
const jaiId = document.getElementById('jai');
const gameArea = document.getElementById('gameArea');
let score = 0;

const moveUnicorn = (event) => {
    if(isGameEnd) return;
    const key = event.key;
    const step = 50;
    const maxX = gameArea.clientWidth - UnicornId.offsetWidth;
    const maxY = gameArea.clientHeight - UnicornId.offsetHeight;

    // ตำแหน่งปัจจุบัน
    let newTop = UnicornId.offsetTop;
    let newLeft = UnicornId.offsetLeft;

    switch (key) {
        case 'ArrowUp':
        case 'w':
            newTop -= step;
            moveSound.currentTime = 0;
            moveSound.play();
            break;
        case 'ArrowDown':
        case 's':
            newTop += step;
             moveSound.currentTime = 0;
            moveSound.play();
            break;
        case 'ArrowLeft':
        case 'a':
            newLeft -= step;
             moveSound.currentTime = 0;
            moveSound.play();
            break;
        case 'ArrowRight':
        case 'd':
            newLeft += step;
             moveSound.currentTime = 0;
            moveSound.play();
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
    if (score >= 20 && !isWin) {
        isWin = true;
        isGameEnd=true;
        
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
        const btn = document.createElement("button");
        btn.innerText="ເລ່ນອີກກກກ";
        btn.style.fontSize="20px";
        btn.style.padding="10px";
        btn.onclick=()=>location.reload();

        // 🔹 เอาทั้งหมดรวมกัน
        winBox.appendChild(winImg);
        winBox.appendChild(text);
        winBox.appendChild(btn);

        gameArea.appendChild(winBox);
    }
}
function move(dir) {
    if(isGameEnd) return;
    const step = 50;

    const maxX = gameArea.clientWidth - UnicornId.offsetWidth;
    const maxY = gameArea.clientHeight - UnicornId.offsetHeight;

    let newTop = UnicornId.offsetTop;
    let newLeft = UnicornId.offsetLeft;
 if (dir === "up" || dir === "down" || dir === "left" || dir === "right") {
        moveSound.currentTime = 0;
        moveSound.play();
    }
    if (dir === "up") newTop -= step;
    if (dir === "down") newTop += step;
    if (dir === "left") newLeft -= step;
    if (dir === "right") newLeft += step;
    if (dir === "jump") {
        jaiJump();
        return;
    }

    // กันออกขอบ
    if (newTop < 0) newTop = 0;
    if (newLeft < 0) newLeft = 0;
    if (newTop > maxY) newTop = maxY;
    if (newLeft > maxX) newLeft = maxX;

    UnicornId.style.top = newTop + "px";
    UnicornId.style.left = newLeft + "px";

    eatjai();
}

document.addEventListener('keydown', moveUnicorn);

// หัวใจย้ายทุก 10 วิ
setInterval(jaiJump, 10000);
