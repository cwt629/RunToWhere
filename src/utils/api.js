const BASE = "http://apis.data.go.kr/1741000/EmergencyAssemblyArea_Earthquake2/getArea1List";
const ENC_KEY = "t%2BaPlQWgYTpT%2FIe4h2Ew%2FDfmCh3lHWaleDh311A5XZPa3DWZ3uiXuJ6se8aI4oO188kaRL6xO11aHuCw3VPtfw%3D%3D";

export async function getData() {
    const sendingData = {
        ServiceKey: ENC_KEY,
        type: "json",
        pageNo: 1,
        numOfRows: 1000
    };

    const url = `${BASE}?${getQuery(sendingData)}`; // 쿼리문과 함께 url 받아옴

    const response = await fetch(url);
    const result = await response.json();
    console.log(result);

    return result;
}

// sendingData를 쿼리형식으로 변형하는 함수
function getQuery(sendingData) {
    let queries = []; // 쿼리 임시 저장 배열

    for (let key in sendingData) {
        let query = `${key}=${sendingData[key]}`;
        queries.push(query);
    }

    // 하나의 쿼리문으로 연결
    return queries.join("&");
}