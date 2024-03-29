export default function Locations({ initialState, onLocationClick }) {
    this.state = initialState;
    this.$target = document.getElementById('locations');
    this.innerState = {
        initialized: false, // 초기 렌더링 여부
        page: 0, // 현재 페이지
        elementsPerPage: 10, // 페이지 당 출력할 리스트 개수
        maxPage: 0 // 최대 페이지 수
    };
    this.onLocationClick = onLocationClick;

    this.setState = (nextState) => {
        this.state = nextState;
        this.innerState = {
            ...this.innerState,
            page: 0,
            maxPage: this.getMaxPage()
        };

        this.render();
    }

    // 최대 페이지를 갱신하는 함수
    this.getMaxPage = () => {
        if (this.state.length === 0) return 0; // 없는 경우 0

        return Math.floor((this.state.length - 1) / this.innerState.elementsPerPage);
    }

    // 현재 페이지에 출력할 장소들의 정보를 따로 추출하는 함수
    this.getPageList = () => {
        const startIndex = this.innerState.page * this.innerState.elementsPerPage;
        const endBoundary = startIndex + this.innerState.elementsPerPage;

        // 추출된 페이지 정보들
        const pagelist = this.state.slice(startIndex, endBoundary);

        // 인덱스와 함께 보내준다
        return pagelist.map((element, i) => ({ index: startIndex + i, data: element }));
    }

    // 받아온 페이지 목록을 li 엘리먼트로 변환하는 함수
    this.getListElements = () => {
        const list = this.getPageList();

        return list.map((element) => (
            `<li data-index=${element.index} class="location">${element.data.vt_acmdfclty_nm}</li>`
        )).join("");
    }

    // 페이지 관련 요소를 만드는 함수
    this.getPageElements = () => {
        let elements = [];

        // 이전 버튼
        if (this.innerState.page > 0)
            elements.push(`<span id="prevclicker">◀ 이전</span>`);

        // 페이지
        const page = `<span> [${this.innerState.page + 1} / ${this.innerState.maxPage + 1}] </span>`;
        elements.push(page);

        // 다음 버튼
        if (this.innerState.page < this.innerState.maxPage)
            elements.push(`<span id="nextclicker">다음 ▶</span>`);

        return elements.join("");
    }

    // 특정 페이지를 그리는 함수
    this.renderPage = (nextPage) => {
        this.innerState = {
            ...this.innerState,
            page: nextPage
        };
        this.render();
    }

    this.render = () => {
        // 초기에는 다르게 표기
        if (!this.innerState.initialized) {
            this.innerState = { ...this.innerState, initialized: true };
            this.$target.innerHTML = `<h2>필터 적용 시 옥외 대피 장소 목록 출력</h2>`;
            return;
        }

        // 현재 페이지에 해당하는 정보 받아온다
        this.$target.innerHTML = `
        <h2>옥외 대피 장소 목록</h2>
        <h3>(장소 클릭 시 지도에 위치가 표시됩니다)</h3>
        <ul>
        ${this.getListElements()}
        </ul>
        <div>
        ${this.getPageElements()}
        </div>
        `
    }

    // 장소 클릭에 대한 이벤트 핸들러
    this.$target.addEventListener('click', (e) => {
        const pressed = e.target.closest('.location');
        if (pressed) {
            const { index } = pressed.dataset;
            // index는 문자열 형태이므로 숫자로 바꿔준다
            const location = this.state[parseInt(index)];
            this.onLocationClick(location);
        }
    })

    // 페이지 넘김 버튼에 대한 이벤트 핸들러
    this.$target.addEventListener('click', (e) => {
        // 누른 이전 버튼이나 다음 버튼
        const prev = e.target.closest('#prevclicker'), next = e.target.closest('#nextclicker');

        // 이전 버튼을 누른 경우
        if (prev) {
            const nextPage = (this.innerState.page > 0) ? this.innerState.page - 1 : 0;
            this.renderPage(nextPage);
            return;
        }

        // 다음 버튼을 누른 경우
        if (next) {
            const nextPage = (this.innerState.page < this.innerState.maxPage) ? this.innerState.page + 1 : this.innerState.maxPage;
            this.renderPage(nextPage);
            return;
        }
    })

    this.render();
}