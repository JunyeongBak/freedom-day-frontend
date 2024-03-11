module.exports = {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        // (숫자|함수) 루트 요소의 폰트 사이즈를 나타내거나, 입력 매개변수에 따라 루트 요소의 폰트 사이즈를 반환합니다.
        rootValue: 37.5,
        // 모든 속성에 대해 '*' 와일드카드를 사용하여 활성화합니다.
        propList: ['*'],
        // 미디어 쿼리 내에서 px를 변환할 수 있도록 합니다.
        mediaQuery: true,
        // '.norem'으로 시작하는 클래스를 필터링하여 rem으로의 변환을 하지 않습니다.
        selectorBlackList: ['.norem'] 
      },
    },
  };
  