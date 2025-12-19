/**
 *	File Name			: main.js
 *	File Description	: 메인 스크립트
 *
 *	Date				Author					Description
 *	--------------------------------------------------------------
 *	2025. 12. 19.		김지성					 최초 작성
 */

// 체크박스 미니 카드 클릭 시 배경색 변경
document.querySelectorAll(".chk-mini-card").forEach(function(card) {
	card.addEventListener("click", function() {
		const chkBox = this.querySelector(".chk-box");

		chkBox.checked = !chkBox.checked;
		if (chkBox.checked) {
			this.style.backgroundColor = "#6096ba";
			this.style.color = "white";
		} else {
			this.style.backgroundColor = "white";
			this.style.color = "black";
		}
	});
});

// 커스텀 프로그레스 바
const bar = document.querySelector(".progress-bar");
const handle = document.querySelector(".progress-handle");
const count = document.querySelector(".progress-count");
const fill = document.querySelector(".progress");

const MIN = bar.getBoundingClientRect().left;
const MAX = bar.getBoundingClientRect().left + bar.getBoundingClientRect().width;

const maxCnt = 20;
const totalWidth = MAX - MIN;
const spaceWidth = totalWidth / (maxCnt - 1);
const marginLeft = getComputedStyle(document.querySelector(".progress-bar-container")).marginLeft.replace("px", "");

const handleGap = MIN - spaceWidth;

let isDragging = false;
let value = 0;

function updateUI(val) {
	value = Math.min(MAX, Math.max(MIN, val));
	handle.style.left = Math.ceil((value - MIN) / spaceWidth) * spaceWidth + MIN - marginLeft + "px";
	count.style.left = Math.ceil((value - MIN) / spaceWidth) * spaceWidth + MIN - marginLeft + "px";
	count.textContent = Math.ceil((value - MIN) / spaceWidth) + 1;
	fill.style.width = Math.ceil((value - MIN) / spaceWidth) * spaceWidth + "px";
}

function positionToValue(clientX) {
	const rect = bar.getBoundingClientRect();
	const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
	const ratio = x / rect.width;
	return Math.round(ratio * (MAX - 1)) + 1;
}

handle.addEventListener("mousedown", () => {
	isDragging = true;
	handle.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
	if (!isDragging) return;
	updateUI(positionToValue(e.clientX));
});

document.addEventListener("mouseup", () => {
	isDragging = false;
	handle.style.cursor = "grab";
});

/* 모바일 터치 */
handle.addEventListener("touchstart", () => {
	isDragging = true;
});

document.addEventListener("touchmove", (e) => {
	if (!isDragging) return;
	updateUI(positionToValue(e.touches[0].clientX));
});

document.addEventListener("touchend", () => {
	isDragging = false;
});

updateUI(MIN);