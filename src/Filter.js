export default function FilterDiv({ initialState }) {
    this.state = initialState;
    this.$target = document.getElementById('filter');

    // 로딩된 데이터를 바탕으로 필터를 그린다
    this.setState = (nextState) => {
        this.state = nextState;
        this.renderOverall();
    }

    // 로딩된 직후의 필터 그리기
    this.renderOverall = () => {
        const sidos = Object.keys(this.state);
        this.$target.innerHTML = `
        <div id="sido_filter">
        <label>시도 구분</label>
        <select name="sido">
        <option value="default">-----시도 선택-----</option>
        ${generateOptions(sidos)}
        </select>
        </div>
        <div id="sigungu_filter">
        <label>시군구 구분</label>
        <select name="sigungu">
        <option value="default">-----시군구 선택-----</option>
        </select>
        </div>`
    }

    this.init = () => {
        this.$target.innerHTML = `
        <p>로딩 중입니다...</p>
        `;
    }

    this.init();
}

// 각 요소를 select 태그의 option 형태로 반환하는 함수
function generateOptions(options) {
    return options.map((option) => (`
    <option value=${option}>${option}</option>
    `)).join("");
}