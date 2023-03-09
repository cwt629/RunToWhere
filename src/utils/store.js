// 받은 데이터를 시도별, 시군구별로 분류하여 딕셔너리로 저장하는 함수
export function storeByCategory(data) {
    let dict = {};

    data.forEach((info) => {
        // 시도 이름이 없는 경우 만들어주기
        if (!Object.keys(dict).includes(info.ctprvn_nm)) {
            dict[info.ctprvn_nm] = {};
        }
        // 그 시도명에 해당 시군구 이름이 없는 경우 만들어주기
        if (!Object.keys(dict[info.ctprvn_nm]).includes(info.sgg_nm)) {
            dict[info.ctprvn_nm][info.sgg_nm] = [];
        }

        // 저장해주기
        dict[info.ctprvn_nm][info.sgg_nm].push(info);
    })

    return dict;
}