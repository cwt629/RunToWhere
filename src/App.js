import { getAllData } from "./utils/api.js"

export default function App($app) {
    const init = async () => {
        const data = await getAllData();
        console.log("모든 데이터를 받아왔습니다.");
        console.log(data);
    }

    init();
}