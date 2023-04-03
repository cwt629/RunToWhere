export default function MapDiv({ initialState }) {
    this.state = initialState;
    this.locationText = document.querySelector('#mapdiv>h3'); // 현재 선택을 보여줌
    this.map = new naver.maps.Map('map'); // 지도 표시
    this.marker = null;

    // 선택한 장소의 이름을 지도 위에 표시해주는 함수
    this.displayName = () => {
        const name = this.state?.vt_acmdfclty_nm;
        this.locationText.innerText = `선택한 위치: ${(name) ? name : "지정되지 않음"}`;
    }

    // 현 state 위치에 마커를 찍고, 위치를 해당 위치로 옮기는 함수
    this.setMarker = () => {
        // 기존 마커가 있으면 삭제해준다
        if (this.marker) {
            this.marker.setMap(null);
        }

        const [latitude, longitude] = [parseFloat(this.state.ycord), parseFloat(this.state.xcord)];
        const center = new naver.maps.LatLng(latitude, longitude);

        // 센터 이동
        this.map.setCenter(center);
        // 마커 찍기
        this.marker = new naver.maps.Marker({
            position: center,
            map: this.map
        });
        // zoom
        this.map.setZoom(16, false);
        // 마커에 마우스를 갖다 댔을 때 이름 출력
        this.marker.setTitle(this.state.vt_acmdfclty_nm);
    }

    // state 변경
    this.setState = (nextState) => {
        this.state = nextState;
        this.displayName();
        this.setMarker();
    }
}