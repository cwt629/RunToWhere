export function autoScrollByID(id) {
    // 이동할 top 위치를 받아온다
    const location = document.getElementById(id).offsetTop;
    window.scrollTo({ top: location, behavior: 'smooth' }); // smooth하게 올라가기
}