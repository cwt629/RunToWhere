import Loading from "./Loading.js"
import FilterDiv from "./Filter.js"
import MapDiv from "./Map.js"
import Locations from "./Locations.js"
import { getAllData } from "./utils/api.js"
import { storeByCategory } from "./utils/store.js";

export default function App($app) {
    this.state = {
        dict: {},
        selectedDict: {}
    }
    // 로딩 컴포넌트
    const loading = new Loading();

    // 필터 컴포넌트
    const filter = new FilterDiv({
        initialState: this.state.dict,
        onSubmit: (sido, sigungu) => {
            window.alert(`${sido}의 ${sigungu}가 선택되었습니다`);

            updateFilteredDict(sido, sigungu);
        }
    });

    // 장소 목록 컴포넌트
    const locations = new Locations({
        initialState: this.state.selectedDict
    });

    // 필터 선택 시 부를 상태 갱신 함수
    const updateFilteredDict = (sido, sigungu) => {
        this.state = {
            ...this.state,
            selectedDict: this.state.dict[sido][sigungu]
        };
        // 필터 갱신에 따라, locations 컴포넌트 갱신
        locations.setState(this.state.selectedDict);
    }

    const init = async () => {
        const data = await getAllData();
        console.log("모든 데이터를 받아왔습니다.");
        console.log(data);

        this.state.dict = storeByCategory(data);
        console.log("데이터를 저장했습니다.");
        console.log(this.state.dict);

        // 로딩 끝
        loading.complete();

        // Filter Div 다시 그리기
        filter.setState(this.state.dict);

        // 지도
        //const map = new MapDiv();
    }

    init();
}