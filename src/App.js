import FilterDiv from "./Filter.js"
import MapDiv from "./Map.js"
import { getAllData } from "./utils/api.js"
import { storeByCategory } from "./utils/store.js";

export default function App($app) {
    this.dict = {}; // 데이터가 모두 저장되기 전까지는 null로 비워준다
    const filter = new FilterDiv({ initialState: this.dict });

    const init = async () => {
        const data = await getAllData();
        console.log("모든 데이터를 받아왔습니다.");
        console.log(data);

        this.dict = storeByCategory(data);
        console.log("데이터를 저장했습니다.");
        console.log(this.dict);

        // Filter Div 다시 그리기
        filter.setState(this.dict);

        // 지도
        //const map = new MapDiv();
    }

    init();
}