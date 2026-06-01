// 네이버 블로그 탭 정의 + /api/blog 실패 시 보여줄 정적 fallback 데이터
// (로컬 열람·서버 다운·RSS 차단 대비)
export const BLOGS = {
  nusussakjaba: {
    url: 'https://m.blog.naver.com/nusussakjaba',
    label: '누수싹잡아',
    tabLabel: '누수싹잡아 · 현장 기록',
    fallback: [
      {
        title: '천안 아파트 화장실 천장 누수, 윗집 보일러 분배기 정밀탐지 사례',
        date: '2026.05.12',
        desc: '윗집 보일러 분배기에서 미세누수가 발생해 아랫집 천장까지 번진 사례입니다. 음파탐지로 정확한 지점을 특정한 뒤 최소 타공으로 분배기 교체를 진행했습니다.',
        thumb: '/images/work-02.jpg',
        link: 'https://m.blog.naver.com/nusussakjaba',
      },
      {
        title: '아산 빌라 베란다 외벽 균열 누수, 배면차수 시공으로 해결',
        date: '2026.05.10',
        desc: '베란다 외벽 균열로 우수가 유입되어 실내 벽지에 곰팡이가 생긴 현장. 우레탄 약제 주입 방식의 배면차수 시공으로 근본 해결했습니다.',
        thumb: '/images/work-04.jpg',
        link: 'https://m.blog.naver.com/nusussakjaba',
      },
      {
        title: '당진 원룸 싱크대 하부장 PB관 누수, 핀포인트 교체',
        date: '2026.05.08',
        desc: '오래된 PB관 연결부에서 미세누수가 발생한 원룸 사례. 하부장만 살짝 분해하고 누수 지점만 부분 교체하여 비용과 시간을 모두 절약했습니다.',
        thumb: '/images/work-03.jpg',
        link: 'https://m.blog.naver.com/nusussakjaba',
      },
      {
        title: '서산 단독주택 보일러실 분배기 누수, 보험처리 진단보고서 작성',
        date: '2026.05.06',
        desc: '보일러실 분배기 누수로 손해보험 청구가 필요했던 현장. 진단보고서, 견적서, 작업 전후 사진까지 보험사 양식에 맞춰 일체 제공했습니다.',
        thumb: '/images/work-02.jpg',
        link: 'https://m.blog.naver.com/nusussakjaba',
      },
      {
        title: '대전 아파트 욕실 미세누수, DS-9000 음파탐지로 위치 특정',
        date: '2026.05.04',
        desc: '바닥이 미세하게 울렁거리는 증상으로 타업체에서 원인을 찾지 못했던 현장. DS-9000 음파탐지기로 정확한 지점을 잡아 최소 시공 마감.',
        thumb: '/images/work-08.jpg',
        link: 'https://m.blog.naver.com/nusussakjaba',
      },
      {
        title: '세종 상가 화장실 천장 누수, 비파괴 우레탄 차수 시공',
        date: '2026.05.02',
        desc: '상가 화장실 천장에서 윗층 배수관 누수가 발생한 사례. 천장 일부만 개구하여 슬리브 부분에 우레탄 차수재를 주입해 깔끔하게 마감했습니다.',
        thumb: '/images/work-10.jpg',
        link: 'https://m.blog.naver.com/nusussakjaba',
      },
    ],
  },
  abbiok: {
    url: 'https://m.blog.naver.com/abbiok',
    label: '진도누수',
    tabLabel: '진도누수 · 사례 아카이브',
    fallback: [
      {
        title: '아파트 윗집 누수 보험처리 절차 정리 — 어떻게 진행되나요?',
        date: '2026.05.11',
        desc: '윗집 누수로 피해를 입었을 때 가장 많이 받는 질문이 보험처리 절차입니다. 진단보고서부터 손해사정, 청구까지 단계별로 정리했습니다.',
        thumb: '/images/work-05.jpg',
        link: 'https://m.blog.naver.com/abbiok',
      },
      {
        title: '비파괴 누수 시공이 가능한 경우 vs 안 되는 경우',
        date: '2026.05.09',
        desc: '모든 누수가 비파괴 시공으로 해결되지는 않습니다. 약제 주입이 효과적인 환경과 부분 교체가 필요한 환경의 차이를 사례 사진과 함께 정리.',
        thumb: '/images/work-09.jpg',
        link: 'https://m.blog.naver.com/abbiok',
      },
      {
        title: '단독주택 지중 배관 누수, 어떻게 찾고 어떻게 고치나',
        date: '2026.05.07',
        desc: '지하에 매설된 배관에서 발생하는 누수는 외관만 봐서는 절대 찾을 수 없습니다. 음파·압력 테스트를 조합한 진단 방법을 상세 설명.',
        thumb: '/images/work-01.jpg',
        link: 'https://m.blog.naver.com/abbiok',
      },
      {
        title: '공장 외벽 누수 — 생산라인 정지 없이 야간 시공한 사례',
        date: '2026.05.05',
        desc: '24시간 가동 공장에서 외벽 누수가 발생했지만 라인을 멈출 수 없는 상황. 야간 시간대에 분할 작업으로 생산 차질 없이 해결한 케이스.',
        thumb: '/images/work-04.jpg',
        link: 'https://m.blog.naver.com/abbiok',
      },
      {
        title: '욕실 바닥 난방관 미세누수, 타일 한 장만 들고 끝낸 시공',
        date: '2026.05.03',
        desc: '욕실 바닥 난방관 누수를 음파탐지로 정확히 특정한 뒤, 타일 한 장만 들어내고 부분 교체로 마무리한 비파괴 시공 사례입니다.',
        thumb: '/images/work-09.jpg',
        link: 'https://m.blog.naver.com/abbiok',
      },
      {
        title: '누수 발견 즉시 해야 할 응급조치 4가지',
        date: '2026.05.01',
        desc: '전문가 출동 전까지 피해를 최소화하는 방법. 분기밸브 차단, 누전 차단기, 사진 기록, 보험사 연락 — 알아두면 비용을 줄일 수 있습니다.',
        thumb: '/images/work-10.jpg',
        link: 'https://m.blog.naver.com/abbiok',
      },
    ],
  },
}
