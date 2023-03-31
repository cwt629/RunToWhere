export default function MapDiv({ initialState }) {
    this.state = initialState;
    this.map = new naver.maps.Map('map');
    this.marker = null;

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
        // 마커에 마우스를 갖다 댔을 때 이름 출력
        this.marker.setTitle(this.state.vt_acmdfclty_nm);
    }

    // state 변경
    this.setState = (nextState) => {
        this.state = nextState;
        this.setMarker();
    }
}