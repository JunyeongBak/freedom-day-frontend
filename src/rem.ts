// rem 등비적응 설정 파일(모바일환경을 위해)
// 기준 크기
const baseSize = 37.5
// 이 값은 postcss.config.js 파일 내의 rootValue와 일치해야 함
// rem 설정 함수
function setRem() {
  // 현재 페이지 너비에 대한 375 너비의 스케일 비율, 필요에 따라 수정 가능. 일반적인 디자인 시안은 너비가 750이므로 (디자인 시안을 받은 후에 이를 수정할 수 있음).
  const scale = document.documentElement.clientWidth / 375
  // 페이지 루트 노드의 폰트 크기 설정 (“Math.min(scale, 2)”는 최대 확대 비율이 2임을 의미, 실제 비즈니스 요구에 따라 조정 가능)
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
// 초기화
setRem()
// 창 크기 변경 시 rem 재설정
window.onresize = function () {
  console.log("실행되었습니다")
  setRem()
}

export {}
