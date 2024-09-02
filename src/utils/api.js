//const BASE = "https://apis.data.go.kr/1741000/EmergencyAssemblyArea_Earthquake2/getArea1List";
const BASE = "https://apis.data.go.kr/1741000/EmergencyAssemblyArea_Earthquake5"; // 변경된 url
const ENC_KEY = "t%2BaPlQWgYTpT%2FIe4h2Ew%2FDfmCh3lHWaleDh311A5XZPa3DWZ3uiXuJ6se8aI4oO188kaRL6xO11aHuCw3VPtfw%3D%3D";
const MAX_NUM_OF_ROWS = 1000;

export async function getAllData() {
    // 첫 데이터 받아오기
    const firstData = await getData(1);

    // 전체 개수 받아오기
    const totalCount = firstData.EarthquakeOutdoorsShelter[0].head[0].totalCount;

    // 최대 페이지 수
    const totalPage = Math.ceil(totalCount / MAX_NUM_OF_ROWS);

    // 모든 데이터
    let results = [...extractData(firstData)];

    for (let page = 2; page <= totalPage; page++) {
        const response = await getData(page);
        results = [...results, ...extractData(response)];
    }

    return results;
}

export async function getData(page = 1) {
    const sendingData = {
        ServiceKey: ENC_KEY,
        type: "json",
        pageNo: page,
        numOfRows: MAX_NUM_OF_ROWS
    };

    const url = `${BASE}?${getQuery(sendingData)}`; // 쿼리문과 함께 url 받아옴

    const response = await fetch(url);
    // 호출 오류인 경우
    if (!response.ok) {
        const errorMessage = `API 호출에 실패하였습니다.\n에러 코드:${response.status}`;
        window.alert(errorMessage);
        throw new Error(errorMessage);
    }

    const result = await response.json();

    return result;
}

// 받아온 데이터에서 각 지역 정보에 해당하는 부분만 추출해 반환하는 함수
function extractData(data) {
    return data.EarthquakeOutdoorsShelter[1].row;
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