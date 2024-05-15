# 1. 레이아웃을 지정
## 1-1. NavBar.vue, HomePage.vue, LoanDetail.vue 등..

# 2. css 스타일 등은 F_Loan.vue F_LoanDetails.vue 등에서 지정

# 3. 대출기간 계산
- 2024년은 윤년 초일 산입 말일 불산입 365일
- 2023년은 평년 초일 산입 말일 불산입 364일
- 컴퓨터는 microsecond 백만 분의 1초
- console.log(new Date('2024-01-01 00:00:00').getTime());
  - 1704034800000
- console.log(new Date('2024-01-01 23:59:59').getTime());
  - 1704121199000
- console.log(new Date('2024-01-02 00:00:00').getTime());
  - 1704121200000