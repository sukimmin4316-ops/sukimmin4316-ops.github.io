const sound = document.getElementById("click-sound");
const chars = document.querySelectorAll(".bounce-char");

const objects = [];

chars.forEach(char => {
  objects.push({
    el: char,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() * 4) - 2,
    vy: (Math.random() * 4) - 2
  });

  char.addEventListener("click", () => {
    char.src = "C_Speaki.png";

    sound.currentTime = 0;
  sound.play();

    setTimeout(() => {
      char.src = "B_Speaki.png";
    }, 9000);
  });
});

function animate() {
  const stageWidth = window.innerWidth;
  const stageHeight = window.innerHeight;

  objects.forEach(obj => {
    const charWidth = obj.el.offsetWidth;
    const charHeight = obj.el.offsetHeight;

    obj.x += obj.vx;
    obj.y += obj.vy;

    if (obj.x <= 0 || obj.x + charWidth >= stageWidth) {
      obj.vx *= -1;
    }

    if (obj.y <= 0 || obj.y + charHeight >= stageHeight) {
      obj.vy *= -1;
    }
  });

  
  for (let i = 0; i < objects.length; i++) {
  for (let j = i + 1; j < objects.length; j++) {
    const a = objects[i];
    const b = objects[j];

    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const minDist = a.el.offsetWidth / 2 + b.el.offsetWidth / 2;

    if (distance < minDist) {
      const overlap = minDist - distance;
      const safeDistance = distance || 1;

      const nx = dx / safeDistance;
      const ny = dy / safeDistance;

      a.x += nx * (overlap / 2);
      a.y += ny * (overlap / 2);
      b.x -= nx * (overlap / 2);
      b.y -= ny * (overlap / 2);

      a.vx *= -1;
      a.vy *= -1;
      b.vx *= -1;
      b.vy *= -1;
    }
  }
}

  
  objects.forEach(obj => {
    obj.el.style.left = obj.x + "px";
    obj.el.style.top = obj.y + "px";
  });

  requestAnimationFrame(animate);
}

animate();