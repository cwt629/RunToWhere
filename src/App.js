import Loading from "./Loading.js"
import FilterDiv from "./Filter.js"
import MapDiv from "./Map.js"
import { getAllData } from "./utils/api.js"
import { storeByCategory } from "./utils/store.js";

export default function App($app) {
    this.state = {
        dict: {},
        selectedDict: {}
    }
    const loading = new Loading();
    const filter = new FilterDiv({
        initialState: this.state.dict,
        onSubmit: (sido, sigungu) => {
            window.alert(`${sido}의 ${sigungu}가 선택되었습니다`);
        }
    });

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