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
        <select id="sido_selection" name="sido">
        <option value="default">-----시도 선택-----</option>
        ${generateOptions(sidos)}
        </select>
        </div>
        <div id="sigungu_filter">
        <label>시군구 구분</label>
        <select id="sigungu_selection" name="sigungu">
        <option value="default">-----시군구 선택-----</option>
        </select>
        </div>`

        // 시도 선택 selection 시 이벤트 추가
        document.getElementById("sido_selection").addEventListener('change', () => {
            this.handleSidoSelection();
        })
    }

    this.init = () => {
        this.$target.innerHTML = `
        <p>로딩 중입니다...</p>
        `;
    }

    // 시군구 부분을 다시 그리는 함수
    this.renderSigungu = (sido) => {
        // 해당 시도 명이 존재하지 않으면, default를 고른 경우!
        const sigungu = (Object.keys(this.state).includes(sido)) ? Object.keys(this.state[sido]) : [];

        const $sgg = document.getElementById("sigungu_filter");
        $sgg.innerHTML = `
        <label>시군구 구분</label>
        <select id="sigungu_selection" name="sigungu">
        <option value="default">-----시군구 선택-----</option>
        ${generateOptions(sigungu)}
        </select>
        `;
    }

    // 시도 선택 시 불릴 함수
    this.handleSidoSelection = () => {
        const sido = document.getElementById('sido_selection').value;

        this.renderSigungu(sido);
    }

    this.init();
}

// 각 요소를 select 태그의 option 형태로 반환하는 함수
function generateOptions(options) {
    return options.map((option) => (`
    <option value=${option}>${option}</option>
    `)).join("");
}