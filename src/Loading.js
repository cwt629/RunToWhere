export default function Loading() {
    this.$target = document.getElementById("loading");
    this.$target.innerHTML = `
    <h3>데이터 로딩중입니다. 잠시만 기다려주세요.</h3>
    `
    this.sec = 0; // 로딩 시간(초)

    this.showLoading = setInterval(() => {
        this.sec++;
        this.$target.innerHTML = `
        <h3>데이터 로딩중입니다. 잠시만 기다려주세요${getDotsBySecond(this.sec)}</h3>
        `
    }, 1000)

    // 로딩이 종료된 뒤 불리는 함수
    this.complete = () => {
        clearInterval(this.showLoading);
        this.$target.style.display = 'none';
    }
}

// 시간 초에 따라 출력할 점 문자열을 반환하는 함수
function getDotsBySecond(sec) {
    let dots = "";

    // 점 개수
    const quantity = sec % 3 + 1;
    for (let i = 0; i < quantity; i++) dots += ".";

    return dots;
}