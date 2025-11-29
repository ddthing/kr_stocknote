import React, { useState, useMemo } from 'react';
import { Search, ArrowLeft, ChevronRight, PieChart, Battery, Zap, Car, Pill, Smartphone, Clapperboard, Bot, Cpu, Layers, Shield, Anchor, Globe, Coins, BookOpen, Star, PenTool, Sparkles } from 'lucide-react';

// --- Custom Color Palette (Refined Notebook Theme) ---
const PALETTE = {
  ink: '#374151',         // Dark Gray Text
  pencil: '#9CA3AF',      // Lighter Gray
  redPen: '#EF4444',      // Soft Red
  bluePen: '#3B82F6',     // Soft Blue
  highlighter: '#FEF08A', // Soft Yellow Highlighter
  highlighterBlue: '#E0F2FE', // Soft Blue Highlighter
  paper: '#FDFBF7',       // Warm Paper
  line: '#E5E7EB',        // Lighter Notebook Line
  margin: '#FECACA',      // Softer Margin Line Pink
};

// --- Mock Data (Sorted Alphabetically, ETF Last) ---
const SECTOR_DATA = [
  {
    id: 'battery',
    name: '2차전지',
    icon: <Battery className="w-5 h-5" />,
    description: '전기차의 심장인 배터리와 핵심 소재 산업',
    stocks: [
      { category: '셀 제조 (Cell)', name: 'LG에너지솔루션', code: '373220', isLeader: true, summary: '글로벌 배터리 점유율 최상위권, 다양한 고객사 확보' },
      { category: '셀 제조 (Cell)', name: '삼성SDI', code: '006400', summary: '각형 배터리 강자, 전고체 배터리 기술 개발 선도' },
      { category: '셀 제조 (Cell)', name: 'SK이노베이션', code: '096770', summary: 'SK온의 모회사, 파우치형 배터리 및 에너지 사업' },
      { category: '소재 (양극재/음극재)', name: '에코프로비엠', code: '247540', isLeader: true, summary: '하이니켈 양극재 글로벌 1위 기술력 보유' },
      { category: '소재 (양극재/음극재)', name: '포스코퓨처엠', code: '003670', summary: '양극재와 음극재를 동시에 생산하는 유일한 기업' },
      { category: '소재 (양극재/음극재)', name: '엘앤에프', code: '066970', summary: 'NCMA 양극재 기술력 우수, 테슬라 공급망' },
      { category: '소재 (양극재/음극재)', name: '코스모신소재', code: '005070', summary: 'MLCC용 필름 및 NCM 양극재 제조' },
      { category: '소재 (기타)', name: '대주전자재료', code: '078600', summary: '충전 속도 향상을 위한 실리콘 음극재 기술 보유' },
      { category: '소재 (기타)', name: '나노신소재', code: '121600', summary: 'CNT(탄소나노튜브) 도전재 독보적 기술력' },
      { category: '소재 (기타)', name: '엔켐', code: '348370', summary: '배터리 4대 소재 중 하나인 전해액 글로벌 기업' },
      { category: '원자재/지주사', name: 'POSCO홀딩스', code: '005490', summary: '리튬/니켈 등 2차전지 소재 밸류체인 수직계열화' },
      { category: '원자재/지주사', name: '에코프로', code: '086520', summary: '에코프로비엠 등 자회사를 거느린 지주사' },
      { category: '원자재/지주사', name: '금양', code: '001570', summary: '발포제 기업에서 콩고/몽골 리튬 광산 개발로 전환' },
      { category: '장비/부품', name: 'PNT', code: '137400', summary: '롤투롤 기술 기반 전극 공정 장비 제조' },
      { category: '장비/부품', name: 'WCP', code: '393890', summary: '2차전지 분리막 제조 전문 기업' },
      { category: '장비/부품', name: '윤성에프앤씨', code: '372170', summary: '배터리 믹싱 장비 전문, 전극 공정 전 단계' },
      { category: '리사이클링', name: '성일하이텍', code: '365340', summary: '국내 폐배터리 리사이클링(재활용) 선두 주자' },
      { category: '리사이클링', name: '새빗켐', code: '107600', summary: '폐전지 재활용을 통한 전구체 복합액 제조' },
    ]
  },
  {
    id: 'ai_sw',
    name: 'AI 솔루션',
    icon: <Cpu className="w-5 h-5" />,
    description: '생성형 AI 기술과 소프트웨어 서비스 기업',
    stocks: [
      { category: '플랫폼/서비스', name: '솔트룩스', code: '304100', isLeader: true, summary: 'AI 챗봇 및 빅데이터 분석 플랫폼 루시아(Luxia) 개발' },
      { category: '플랫폼/서비스', name: '마음AI', code: '377480', summary: '다양한 AI 엔진과 응용 서비스 제공' },
      { category: '플랫폼/서비스', name: '폴라리스오피스', code: '041020', summary: '클라우드 오피스 소프트웨어에 생성형 AI 접목' },
      { category: '플랫폼/서비스', name: '이스트소프트', code: '047560', summary: '알집/알약 개발사, AI 휴먼(버추얼 휴먼) 사업 확장' },
      { category: '기술/엔진', name: '코난테크놀로지', code: '402030', summary: '자연어 처리 및 영상 인식 AI 기술 보유' },
      { category: '기술/엔진', name: '셀바스AI', code: '108860', summary: '음성인식/합성 등 음성 AI 기술 국내 선두' },
      { category: '의료 AI', name: '루닛', code: '328130', summary: '암 진단 AI 솔루션, 글로벌 의료 시장 진출' },
      { category: '의료 AI', name: '뷰노', code: '338220', summary: '의료 영상 분석 및 생체 신호 분석 AI' },
      { category: '의료 AI', name: '제이엘케이', code: '322510', summary: '뇌졸중 등 뇌 질환 분석 AI 솔루션 전문' },
      { category: '의료 AI', name: '딥노이드', code: '315640', summary: '의료 AI 및 산업용 AI(보안 검색 등) 솔루션' },
    ]
  },
  {
    id: 'robot',
    name: '로봇',
    icon: <Bot className="w-5 h-5" />,
    description: '제조업 자동화와 미래형 서비스 로봇 기술',
    stocks: [
      { category: '협동/서비스 로봇', name: '두산로보틱스', code: '454910', isLeader: true, summary: '글로벌 Top tier 협동로봇 제조사' },
      { category: '협동/서비스 로봇', name: '레인보우로보틱스', code: '277810', isLeader: true, summary: '삼성전자가 투자한 휴머노이드 및 협동로봇 기업' },
      { category: '협동/서비스 로봇', name: '엔젤로보틱스', code: '455900', summary: 'LG전자가 투자한 웨어러블(입는) 로봇 전문' },
      { category: '협동/서비스 로봇', name: '로보티즈', code: '108490', summary: '자율주행 배송 로봇 및 액추에이터 제조' },
      { category: '산업용/자동화', name: '티로보틱스', code: '117730', summary: '반도체/디스플레이용 진공 이송 로봇 및 물류 로봇' },
      { category: '산업용/자동화', name: '유진로봇', code: '056080', summary: '청소 로봇 및 물류 이송 자율주행 기술 보유' },
      { category: '산업용/자동화', name: '로보스타', code: '090360', summary: 'LG전자 계열, 산업용 제조 로봇 전문' },
      { category: '산업용/자동화', name: '에브리봇', code: '270660', summary: '국내 물걸레 로봇청소기 점유율 1위' },
      { category: '핵심 부품 (감속기)', name: 'SPG', code: '058610', summary: '정밀 제어용 감속기 및 모터 전문 제조' },
      { category: '핵심 부품 (감속기)', name: 'SBB테크', code: '389500', summary: '로봇 관절용 하모닉 감속기 국산화' },
      { category: '핵심 부품 (감속기)', name: 'RS오토메이션', code: '140670', summary: '로봇 모션 제어기 및 드라이브 제조' },
      { category: '핵심 부품 (감속기)', name: '해성티피씨', code: '059270', summary: '승강기 및 로봇용 감속기 전문 기업' },
    ]
  },
  {
    id: 'bio',
    name: '바이오/제약',
    icon: <Pill className="w-5 h-5" />,
    description: '신약 개발 능력과 바이오 의약품 생산 기지',
    stocks: [
      { category: 'CDMO/바이오시밀러', name: '삼성바이오로직스', code: '207940', isLeader: true, summary: '세계 최대 규모의 바이오 의약품 위탁생산(CDMO)' },
      { category: 'CDMO/바이오시밀러', name: '셀트리온', code: '068270', summary: '램시마, 짐펜트라 등 바이오시밀러 글로벌 강자' },
      { category: 'CDMO/바이오시밀러', name: 'SK바이오사이언스', code: '302440', summary: '백신 개발 및 위탁생산 전문 기업' },
      { category: '신약 개발', name: '유한양행', code: '000100', summary: '폐암 신약 렉라자 FDA 승인, 오픈 이노베이션' },
      { category: '신약 개발', name: '알테오젠', code: '196170', summary: '피하주사(SC) 제형 변경 플랫폼 기술 수출' },
      { category: '신약 개발', name: 'HLB', code: '028300', summary: '간암 신약 리보세라닙 FDA 허가 추진' },
      { category: '신약 개발', name: '한미약품', code: '128940', summary: '비만 치료제 등 다양한 신약 파이프라인 보유' },
      { category: '신약 개발', name: '레고켐바이오', code: '141080', summary: 'ADC(항체-약물 접합체) 플랫폼 기술 강자' },
      { category: '신약 개발', name: 'ABL바이오', code: '298380', summary: '이중항체 플랫폼 기반 면역항암제 개발' },
      { category: '신약 개발', name: 'SK바이오팜', code: '326030', summary: '뇌전증 신약 엑스코프리 미국 직판' },
      { category: '미용/의료기기', name: '클래시스', code: '214150', summary: 'HIFU(초음파) 리프팅 기기 슈링크 제조' },
      { category: '미용/의료기기', name: '파마리서치', code: '214450', summary: 'PDRN/PN 기반 리쥬란 힐러, 의약품 제조' },
    ]
  },
  {
    id: 'semicon',
    name: '반도체',
    icon: <Smartphone className="w-5 h-5" />,
    description: '전자 기기의 두뇌이자 한국 수출 1위 핵심 산업',
    stocks: [
      { category: '대장주 (IDM)', name: '삼성전자', code: '005930', isLeader: true, summary: '글로벌 메모리 1위, 파운드리/스마트폰 종합 반도체 기업' },
      { category: '대장주 (IDM)', name: 'SK하이닉스', code: '000660', isLeader: true, summary: 'HBM 시장 주도, 엔비디아 공급망의 핵심 메모리 강자' },
      { category: '소부장 (장비)', name: '한미반도체', code: '042700', summary: 'HBM 필수 공정 장비인 TC본더 글로벌 1위' },
      { category: '소부장 (장비)', name: 'HPSP', code: '403870', summary: '세계 유일 고압 수소 어닐링 장비 독점 기업' },
      { category: '소부장 (장비)', name: '원익IPS', code: '240810', summary: '삼성전자 핵심 협력사, 증착 장비 국산화 선두' },
      { category: '소부장 (장비)', name: '주성엔지니어링', code: '036930', summary: 'ALD(원자층증착) 장비 기술력 보유, 글로벌 고객사 확대' },
      { category: '소부장 (장비)', name: '이오테크닉스', code: '039030', summary: '레이저 응용 장비 국내 1위, 반도체 마킹/커팅' },
      { category: '소부장 (장비)', name: '파크시스템스', code: '140860', summary: '원자현미경(AFM) 세계적인 기술력 보유 기업' },
      { category: '소부장 (장비)', name: '테스', code: '095610', summary: '반도체 전공정 핵심 장비인 PE-CVD 제조' },
      { category: '소부장 (장비)', name: '피에스케이', code: '319660', summary: '반도체 PR Strip(감광액 제거) 장비 글로벌 1위' },
      { category: '소부장 (소재/부품)', name: '리노공업', code: '058470', summary: '반도체 검사용 핀/소켓 분야의 압도적 기술력' },
      { category: '소부장 (소재/부품)', name: '동진쎄미켐', code: '005290', summary: '포토레지스트(감광액) 국산화 성공, 전자재료 전문' },
      { category: '소부장 (소재/부품)', name: '솔브레인', code: '357780', summary: '반도체 식각액, 세정액 등 핵심 화학 소재 공급' },
      { category: '소부장 (소재/부품)', name: 'ISC', code: '095340', summary: '실리콘 러버 소켓 글로벌 점유율 1위 기업' },
      { category: '소부장 (소재/부품)', name: '티에스이', code: '131290', summary: '반도체 및 디스플레이 검사 장비와 소모품 제조' },
      { category: '소부장 (소재/부품)', name: '하나마이크론', code: '067310', summary: '반도체 후공정(OSAT) 전문, 패키징 및 테스트' },
      { category: '시스템/팹리스', name: 'DB하이텍', code: '000990', summary: '8인치 파운드리 전문, 전력반도체(PMIC) 강자' },
      { category: '시스템/팹리스', name: '가온칩스', code: '393500', summary: '삼성 파운드리 디자인 솔루션 파트너(DSP)' },
      { category: '시스템/팹리스', name: '칩스앤미디어', code: '094360', summary: '비디오 IP(설계자산) 전문 팹리스 기업' },
      { category: '시스템/팹리스', name: '오픈엣지테크놀로지', code: '394280', summary: 'AI 반도체용 NPU IP 및 메모리 시스템 IP 보유' },
    ]
  },
  {
    id: 'defense',
    name: '방위산업',
    icon: <Shield className="w-5 h-5" />,
    description: '자주국방을 넘어 글로벌로 뻗어가는 K-방산',
    stocks: [
      { category: '체계 종합', name: '한화에어로스페이스', code: '012450', isLeader: true, summary: 'K9 자주포, 천무 등 지상 방산 및 항공우주 엔진' },
      { category: '체계 종합', name: 'LIG넥스원', code: '079550', summary: '천궁-II 등 유도무기(미사일) 체계 전문' },
      { category: '체계 종합', name: '현대로템', code: '064350', summary: 'K2 흑표 전차 제조 및 철도 차량 사업' },
      { category: '체계 종합', name: '한국항공우주', code: '047810', summary: 'FA-50 경공격기, KF-21 전투기 등 항공기 제작' },
      { category: '체계 종합', name: '한화시스템', code: '272210', summary: '방산 전자(레이더, 통신) 및 ICT 시스템 통합' },
      { category: '부품/소재', name: '풍산', code: '103140', summary: '각종 탄약 및 신동(구리) 제품 제조' },
      { category: '부품/소재', name: '아이쓰리시스템', code: '214430', summary: '적외선 영상 센서 제조, 야간 투시경 핵심 부품' },
      { category: '부품/소재', name: '빅텍', code: '065450', summary: '전자전 시스템 방향탐지장치 등 제조' },
      { category: '부품/소재', name: '휴니드', code: '005870', summary: '전술 통신 장비 및 항공 전자 장비' },
    ]
  },
  {
    id: 'ent',
    name: '엔터테인먼트',
    icon: <Clapperboard className="w-5 h-5" />,
    description: '세계가 주목하는 K-POP과 콘텐츠 산업',
    stocks: [
      { category: '기획사', name: '하이브', code: '352820', isLeader: true, summary: 'BTS, 뉴진스 등 멀티 레이블 체제 구축' },
      { category: '기획사', name: 'JYP Ent.', code: '035900', summary: '트와이스, 스트레이키즈 등 글로벌 아티스트 보유' },
      { category: '기획사', name: '에스엠', code: '041510', summary: 'NCT, 에스파 등 K-POP 원조 기획사' },
      { category: '기획사', name: '와이지엔터테인먼트', code: '122870', summary: '블랙핑크, 베이비몬스터 등 힙합 베이스 강점' },
      { category: '기획사', name: '큐브엔터', code: '182360', summary: '(여자)아이들 등 아티스트 보유 및 콘텐츠 제작' },
      { category: '플랫폼/제작', name: '디어유', code: '376300', summary: '팬덤 메신저 버블(Bubble) 운영' },
      { category: '플랫폼/제작', name: '스튜디오드래곤', code: '253450', summary: '도깨비, 더 글로리 등 프리미엄 드라마 제작' },
      { category: '플랫폼/제작', name: 'CJ ENM', code: '035760', summary: '방송, 영화, 음악 등 종합 콘텐츠 기업' },
    ]
  },
  {
    id: 'glass',
    name: '유리기판',
    icon: <Layers className="w-5 h-5" />,
    description: '고성능 AI 반도체를 위한 차세대 패키징 기술',
    stocks: [
      { category: '핵심 기술', name: 'SKC', code: '011790', isLeader: true, summary: '자회사 앱솔릭스를 통해 유리기판 상용화 선도' },
      { category: '핵심 기술', name: '켐트로닉스', code: '089010', summary: '유리기판용 식각(Etching) 기술력 보유' },
      { category: '장비/공정', name: '필옵틱스', code: '161580', summary: '유리기판 절단 및 가공용 레이저 장비 공급' },
      { category: '장비/공정', name: '와이씨켐', code: '112290', summary: '유리기판용 특수 화학 소재(박리액 등) 개발' },
      { category: '장비/공정', name: 'HB테크놀러지', code: '078150', summary: '유리기판 검사 장비 전문 업체' },
      { category: '장비/공정', name: '제이앤티씨', code: '204270', summary: '3D 커버글라스 기술 바탕으로 유리기판 진출' },
      { category: '장비/공정', name: '기가비스', code: '420770', summary: '반도체 기판 광학 검사 장비(AOI) 전문' },
    ]
  },
  {
    id: 'internet',
    name: '인터넷/플랫폼/게임',
    icon: <Globe className="w-5 h-5" />,
    description: '국민 메신저와 포털, 그리고 글로벌 게임 산업',
    stocks: [
      { category: '플랫폼', name: 'NAVER', code: '035420', isLeader: true, summary: '검색, 커머스, 웹툰 등 국내 1위 인터넷 플랫폼' },
      { category: '플랫폼', name: '카카오', code: '035720', summary: '카카오톡 기반 광고, 모빌리티, 페이 등 생활 밀착형' },
      { category: '플랫폼', name: '아프리카TV(SOOP)', code: '067160', summary: '국내 1위 라이브 스트리밍 플랫폼, 글로벌 진출' },
      { category: '핀테크', name: '카카오뱅크', code: '323410', summary: '모바일 전용 인터넷 전문 은행' },
      { category: '핀테크', name: '카카오페이', code: '377300', summary: '간편결제 및 금융 플랫폼 서비스' },
      { category: '솔루션', name: '카페24', code: '042000', summary: '전자상거래(쇼핑몰) 구축 솔루션 플랫폼' },
      { category: '게임', name: '크래프톤', code: '259960', summary: '배틀그라운드 IP 보유, 글로벌 게임사' },
      { category: '게임', name: '엔씨소프트', code: '036570', summary: '리니지 시리즈 등 MMORPG 명가' },
      { category: '게임', name: '넷마블', code: '251270', summary: '모바일 게임 퍼블리싱 및 개발 강자' },
      { category: '게임', name: '펄어비스', code: '263750', summary: '검은사막 IP 및 자체 엔진 기술력 보유' },
      { category: '게임', name: '위메이드', code: '112040', summary: '미르의 전설 IP, 블록체인 게임 사업' },
    ]
  },
  {
    id: 'auto',
    name: '자동차',
    icon: <Car className="w-5 h-5" />,
    description: '글로벌 경쟁력을 갖춘 완성차 및 부품 제조',
    stocks: [
      { category: '완성차', name: '현대차', code: '005380', isLeader: true, summary: '글로벌 Top 3 완성차 업체, 전기차/수소차 선도' },
      { category: '완성차', name: '기아', code: '000270', summary: '디자인 경영과 SUV 경쟁력으로 글로벌 점유율 확대' },
      { category: '부품', name: '현대모비스', code: '012330', summary: '현대차그룹 핵심 부품사, 전동화/자율주행 부품' },
      { category: '부품', name: 'HL만도', code: '204320', summary: '제동/조향/현가장치 전문, 자율주행 ADAS 기술 보유' },
      { category: '부품', name: '현대위아', code: '011210', summary: '자동차 엔진, 공작기계, 방산 등 복합 기계 제조' },
      { category: '부품', name: '한온시스템', code: '018880', summary: '글로벌 자동차 열관리 시스템 전문 기업' },
      { category: '부품', name: '성우하이텍', code: '015750', summary: '차체 부품 및 배터리 케이스(BSA) 제조' },
      { category: '부품', name: '에스엘', code: '005850', summary: '자동차 램프(헤드램프) 분야 글로벌 경쟁력' },
      { category: '부품', name: '화신', code: '010690', summary: '자동차 섀시 및 차체 부품 전문 생산' },
      { category: '부품', name: '서연이화', code: '200880', summary: '자동차 내장재 및 시트 등 인테리어 부품' },
      { category: '타이어', name: '한국타이어앤테크놀로지', code: '161390', summary: '글로벌 타이어 제조사, 전기차 전용 타이어(iON) 강세' },
      { category: '타이어', name: '금호타이어', code: '073240', summary: '국내 대표 타이어 제조사, 해외 공장 증설' },
    ]
  },
  {
    id: 'electric',
    name: '전력설비/전선',
    icon: <Zap className="w-5 h-5" />,
    description: 'AI 데이터센터와 노후 전력망 교체의 수혜주',
    stocks: [
      { category: '변압기/전력기기', name: 'HD현대일렉트릭', code: '267260', isLeader: true, summary: '북미/중동 전력망 호황 최대 수혜, 변압기 대장주' },
      { category: '변압기/전력기기', name: '효성중공업', code: '298040', summary: '초고압 변압기 및 차단기 경쟁력 보유, 중공업 강자' },
      { category: '변압기/전력기기', name: 'LS ELECTRIC', code: '010120', summary: '국내 전력기기 1위, 배전반 및 자동화 기기 주력' },
      { category: '변압기/전력기기', name: '일진전기', code: '103590', summary: '초고압 케이블과 변압기를 동시에 생산하는 기업' },
      { category: '변압기/전력기기', name: '제룡전기', code: '033100', summary: '미국 수출 비중 높은 소형 변압기 전문 업체' },
      { category: '전선/케이블', name: '대한전선', code: '001440', summary: '초고압 케이블 및 통신 케이블 주요 생산' },
      { category: '전선/케이블', name: '가온전선', code: '000500', summary: 'LS그룹 계열사, 중저압 전선 및 케이블 주력' },
      { category: '전선/케이블', name: 'LS', code: '006260', summary: 'LS전선, LS ELECTRIC 등을 거느린 전력망 지주사' },
      { category: '전선/케이블', name: 'LS에코에너지', code: '229640', summary: '베트남 전력 케이블 시장 점유율 1위 기업' },
      { category: '전선/케이블', name: '대원전선', code: '006340', summary: '전력 및 통신 케이블, 자동차 전선 제조' },
    ]
  },
  {
    id: 'ship',
    name: '조선/해운',
    icon: <Anchor className="w-5 h-5" />,
    description: '글로벌 물동량 증가와 친환경 선박 교체 사이클',
    stocks: [
      { category: '지주/중간지주', name: 'HD한국조선해양', code: '009540', isLeader: true, summary: 'HD현대 조선 부문 중간지주사, 압도적 수주 잔고' },
      { category: '대형 조선사', name: 'HD현대중공업', code: '329180', isLeader: true, summary: '세계 최대 조선사, LNG선 및 친환경 선박 선도' },
      { category: '대형 조선사', name: '삼성중공업', code: '010140', summary: 'LNG 운반선 및 FLNG(해양플랜트) 분야 강점' },
      { category: '대형 조선사', name: '한화오션', code: '042660', summary: '구 대우조선해양, 방산(잠수함) 및 상선 건조 능력 보유' },
      { category: '대형 조선사', name: 'HD현대미포', code: '010620', summary: '중형 선박(PC선) 세계 점유율 1위 조선사' },
      { category: '기자재/엔진', name: '한화엔진', code: '042670', summary: '선박용 저속엔진 세계 2위, 친환경 엔진 개발' },
      { category: '기자재/엔진', name: '한국카본', code: '017960', summary: 'LNG 선박용 보냉재(단열재) 핵심 제조업체' },
      { category: '기자재/엔진', name: '동성화인텍', code: '033500', summary: '초저온 보냉재 전문, LNG선 필수 자재 공급' },
      { category: '기자재/엔진', name: '성광벤드', code: '014620', summary: '석유화학/조선 플랜트용 관이음쇠(피팅) 제조' },
      { category: '기자재/엔진', name: '태광', code: '023160', summary: '산업용 배관 자재 및 피팅 전문 기업' },
      { category: '해운', name: 'HMM', code: '011200', summary: '국내 최대 컨테이너 선사, 글로벌 해운 동맹 소속' },
      { category: '해운', name: '팬오션', code: '028670', summary: '하림그룹 계열, 건화물(벌크) 운송 주력 선사' },
    ]
  },
  {
    id: 'cosmetics',
    name: '화장품/뷰티',
    icon: <Sparkles className="w-5 h-5" />,
    description: 'K-뷰티의 글로벌 확산과 인디 브랜드 전성시대',
    stocks: [
      { category: '대장주 (ODM)', name: '코스맥스', code: '192820', isLeader: true, summary: '글로벌 1위 화장품 ODM, 전 세계 600여 개 브랜드 공급' },
      { category: '대장주 (ODM)', name: '한국콜마', code: '161890', isLeader: true, summary: '자외선 차단제 기술력 독보적, 글로벌 ODM 기업' },
      { category: '대장주 (브랜드)', name: '아모레퍼시픽', code: '090430', summary: '설화수, 라네즈, 이니스프리 등 K-뷰티 대표주자' },
      { category: '대장주 (브랜드)', name: 'LG생활건강', code: '051900', summary: '후, 숨 등 럭셔리 브랜드와 생활용품, 음료 사업 영위' },
      { category: '유통/플랫폼', name: '실리콘투', code: '257720', summary: 'K-뷰티 글로벌 유통 플랫폼, 인디 브랜드 수출 교두보' },
      { category: '인디/수출', name: '브이티', code: '018290', summary: '리들샷 제품으로 다이소/올리브영 품절 대란 주인공' },
      { category: '인디/수출', name: '에이피알', code: '278470', summary: '메디큐브 에이지알 등 홈 뷰티 디바이스 시장 선도' },
      { category: '인디/수출', name: '클리오', code: '237880', summary: '색조 화장품 강자, 구달 등 기초 라인업 확장' },
      { category: '인디/수출', name: '아이패밀리에스씨', code: '114840', summary: '색조 브랜드 롬앤(rom&nd)의 글로벌 인기' },
      { category: '인디/수출', name: '마녀공장', code: '439090', summary: '클렌징 오일 등 자연주의 기초 화장품 강세' },
      { category: '색조 ODM', name: '씨앤씨인터내셔널', code: '352480', summary: '글로벌 명품 브랜드 립 제품 등 포인트 메이크업 전문' },
      { category: '용기/부자재', name: '펌텍코리아', code: '251970', summary: '화장품 용기 및 펌프 제조, 인디 브랜드 수혜' },
    ]
  },
  {
    id: 'etf',
    name: 'ETF 추천',
    icon: <Coins className="w-5 h-5" />,
    description: '유망 테마의 대장주들을 한 번에 담는 투자법',
    stocks: [
      { category: '반도체 (국내 소부장)', name: 'KODEX AI반도체핵심장비', code: '465350', summary: '국내 AI 반도체 장비 핵심 기업 집중 투자' },
      { category: '반도체 (국내 소부장)', name: 'SOL 반도체소부장Fn', code: '454950', summary: '삼성/하이닉스 외 소부장 기업 비중 확대' },
      { category: '반도체 (국내 액티브)', name: 'TIMEPOLIO K-반도체액티브', code: '476830', summary: '펀드매니저가 적극적으로 종목을 운용하는 액티브 ETF' },
      { category: '반도체 (미국/글로벌)', name: 'TIGER 미국필라델피아반도체나스닥', code: '381180', summary: '미국 주요 반도체 기업(엔비디아 등)에 투자' },
      { category: '반도체 (미국/글로벌)', name: 'ACE 글로벌반도체TOP4 Plus', code: '446640', summary: '메모리, 비메모리, 장비 분야 글로벌 1위 4개사 집중' },
      { category: '2차전지 (핵심 소재)', name: 'KODEX 2차전지핵심소재10 Fn', code: '454320', summary: '양극재 등 2차전지 소재 Top 10 기업 투자' },
      { category: '2차전지 (테마)', name: 'TIGER 2차전지테마', code: '305540', summary: '2차전지 밸류체인 전반에 분산 투자' },
      { category: '2차전지 (액티브)', name: 'ACE 2차전지&친환경차액티브', code: '457960', summary: '2차전지와 전기차 관련주 동시 투자' },
      { category: '로봇 & AI', name: 'KODEX K-로봇액티브', code: '445270', summary: '국내 주요 로봇 기업에 액티브하게 투자' },
      { category: '로봇 & AI', name: 'TIGER 글로벌AI액티브', code: '466840', summary: '글로벌 AI 하드웨어 및 소프트웨어 기업 투자' },
      { category: '로봇 & AI', name: 'KBSTAR AI&로봇', code: '469240', summary: 'AI와 로봇 산업 융합 테마 투자' },
      { category: '바이오 (액티브)', name: 'TIMEPOLIO K-바이오액티브', code: '461580', summary: '변동성 높은 바이오 장세에 대응하는 액티브 전략' },
      { category: '바이오 (액티브)', name: 'KoAct 바이오헬스케어액티브', code: '463660', summary: '삼성액티브자산운용의 바이오 전문 ETF' },
      { category: '바이오 (종합)', name: 'TIGER 헬스케어', code: '143860', summary: '국내 헬스케어 대표 지수 추종' },
      { category: '화장품/뷰티', name: 'TIGER 화장품', code: '228790', summary: '아모레퍼시픽, LG생활건강 등 국내 주요 화장품 기업 투자' },
      { category: '화장품/뷰티', name: 'HANARO K-뷰티', code: '396680', summary: '화장품 제조 및 의료 미용 기기 관련주 분산 투자' },
      { category: '배당/월배당', name: 'SOL 미국배당다우존스', code: '446720', summary: '한국판 SCHD, 배당 성장과 월배당 매력' },
      { category: '배당/월배당', name: 'TIGER 미국배당+7%프리미엄', code: '458760', summary: '커버드콜 전략으로 추가 배당 수익 추구' },
      { category: '배당/월배당', name: 'ACE 미국30년국채액티브(H)', code: '453850', summary: '미국 장기채 투자 및 월배당 지급' },
      { category: '지수추종', name: 'KODEX 200', code: '069500', summary: '코스피 200 지수를 추종하는 국가대표 ETF' },
      { category: '지수추종', name: 'TIGER 미국나스닥100', code: '133690', summary: '미국 기술주 중심 나스닥 100 지수 투자' },
      { category: '지수추종', name: 'ACE 미국S&P500', code: '360200', summary: '미국 우량주 500개 기업(S&P500)에 분산 투자' },
    ]
  },
];

const App = () => {
  const [selectedSector, setSelectedSector] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 검색 필터링
  const filteredSectors = useMemo(() => {
    return SECTOR_DATA.filter(sector => 
      sector.name.includes(searchTerm) || 
      sector.stocks.some(stock => stock.name.includes(searchTerm))
    );
  }, [searchTerm]);

  // 상세 화면 그룹화 로직
  const groupedStocks = useMemo(() => {
    if (!selectedSector) return {};
    return selectedSector.stocks.reduce((acc, stock) => {
      const cat = stock.category || '기타';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(stock);
      return acc;
    }, {});
  }, [selectedSector]);

  // --- Functions Restored ---
  const handleSectorClick = (sector) => {
    setSelectedSector(sector);
  };

  const handleBack = () => {
    setSelectedSector(null);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen font-sans" 
         style={{ 
           backgroundColor: PALETTE.paper, 
           color: PALETTE.ink,
           fontFamily: '"Noto Sans KR", sans-serif' // 고딕 폰트 적용
         }}>
      
      {/* Google Font Embed - Noto Sans KR */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
        
        /* Notebook Line Pattern */
        .notebook-bg {
          background-image: 
            linear-gradient(90deg, transparent 39px, ${PALETTE.margin} 39px, ${PALETTE.margin} 41px, transparent 41px),
            linear-gradient(${PALETTE.line} 1px, transparent 1px);
          background-size: 100% 100%, 100% 2rem; /* Line height 2rem */
          background-attachment: local;
        }
        
        /* Input Style */
        .search-input::placeholder {
          color: ${PALETTE.pencil};
          opacity: 0.7;
        }
        
        /* Custom Scrollbar for Note feel */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: ${PALETTE.pencil};
          border-radius: 4px;
          opacity: 0.3;
        }
      `}</style>

      {/* --- Header Area (Note Title) --- */}
      <header className="sticky top-0 z-10 pt-6 pb-2 px-6 transition-all bg-[#FDFBF7]/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-3xl mx-auto flex items-end justify-between pb-2">
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => setSelectedSector(null)}
          >
            <div className="p-2 border border-slate-400 rounded-lg transform -rotate-2 group-hover:rotate-0 transition-transform bg-white">
              <PieChart className="w-6 h-6 text-slate-600" strokeWidth={2.0} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800" style={{ textDecorationColor: PALETTE.highlighter }}>
                <span className="relative z-10">동학개미 컨닝노트</span>
                <span className="absolute bottom-1 left-0 w-full h-3 -z-0 opacity-50 transform -skew-x-12" style={{ backgroundColor: PALETTE.highlighter }}></span>
              </h1>
            </div>
          </div>
          
          {/* Search Bar */}
          {!selectedSector && (
            <div className="relative hidden sm:block w-64">
              <input 
                type="text" 
                placeholder="찾고 싶은 종목은?" 
                className="search-input w-full pl-10 pr-4 py-2 bg-transparent border-b border-slate-400 text-base focus:outline-none focus:border-slate-600 transition-colors"
                style={{ fontFamily: '"Noto Sans KR", sans-serif' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-2 top-2.5 w-5 h-5 text-slate-400" />
            </div>
          )}
        </div>
      </header>

      {/* --- Main Notebook Content --- */}
      <main className="notebook-bg min-h-[calc(100vh-80px)] max-w-3xl mx-auto px-6 py-8 relative">
        
        {/* --- Main Dashboard View --- */}
        {!selectedSector ? (
          <div className="animate-fade-in-up pl-4 sm:pl-12"> {/* Padding for Margin Line */}
            <div className="mb-10">
              <div className="inline-block relative mb-2">
                <h2 className="text-2xl font-bold text-slate-800 relative z-10">국내 주식시장에는 순환매가 있다.</h2>
                <div className="absolute bottom-1 left-0 w-full h-4 bg-yellow-100 -z-0 opacity-60 transform -rotate-1"></div>
              </div>
              <p className="text-lg text-slate-500 mt-2 flex items-center gap-2">
                <PenTool className="w-4 h-4" />
                햇내기 동학개미도 순환매에 끼고 싶어요.
              </p>
            </div>
            
            {/* Mobile Search */}
            <div className="relative mb-8 sm:hidden">
              <input 
                type="text" 
                placeholder="찾고 싶은 종목 써보기..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-base focus:outline-none focus:border-slate-500 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            </div>

            {filteredSectors.length === 0 ? (
               <div className="text-center py-20 text-slate-400 text-lg">
                 그런 종목은 제 노트에 없네요... <br/>다시 찾아볼까요?
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSectors.map((sector) => (
                  <div
                    key={sector.id}
                    onClick={() => handleSectorClick(sector)}
                    className="group relative cursor-pointer"
                  >
                    {/* Dark Gray Box Effect (was black) */}
                    <div className="absolute inset-0 bg-white border border-slate-400 rounded-lg transform translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                    <div className="relative bg-white border border-slate-400 rounded-lg p-5 hover:-translate-y-1 transition-transform h-full flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <div className="p-2 rounded-full border border-slate-200 bg-slate-50 text-slate-600">
                            {sector.icon}
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors" />
                        </div>
                        
                        <h3 className="text-lg font-bold text-slate-700 mb-1 group-hover:text-blue-600 transition-colors">
                          {sector.name}
                        </h3>
                        <p className="text-xs text-slate-500 leading-snug">
                          {sector.description}
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-dashed border-slate-200 flex items-center gap-2">
                         <span className="text-xs font-bold text-white bg-slate-400 px-2 py-0.5 rounded-sm">
                           {sector.stocks.length}개 종목
                         </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* --- Detail View (Page Flip Effect) --- */
          <div className="animate-fade-in-right pl-4 sm:pl-12">
            <button 
              onClick={handleBack}
              className="group flex items-center text-slate-500 hover:text-slate-800 transition-colors mb-6 gap-2"
            >
              <div className="p-1 border border-slate-400 rounded-full group-hover:border-slate-600">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="text-base font-bold">앞 장으로 넘기기</span>
            </button>

            {/* Note Page Container */}
            <div className="bg-white border border-slate-300 rounded-sm shadow-sm p-1 sm:p-2 relative">
              {/* Top Tape Effect */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-100/50 rotate-1 border-l border-r border-white/50 backdrop-blur-sm"></div>

              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="border-b-2 border-double border-slate-200 pb-6 mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-600">
                      {selectedSector.icon}
                    </span>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                      Sector Analysis
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-3 relative inline-block">
                    {selectedSector.name}
                    <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-100 -z-10 opacity-50"></span>
                  </h2>
                  <p className="text-base text-slate-600 font-medium">
                    " {selectedSector.description} "
                  </p>
                </div>

                {/* Stock List by Category */}
                <div className="space-y-10">
                  {Object.entries(groupedStocks).map(([category, stocks]) => (
                    <div key={category}>
                      {/* Category Title with Highlighter */}
                      <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <h3 className="text-lg font-bold text-slate-800 relative z-0 inline-block px-1">
                          {category}
                          <span className="absolute bottom-0 left-0 w-full h-2 bg-yellow-200 -z-10 transform -rotate-1"></span>
                        </h3>
                      </div>
                      
                      {/* List Items */}
                      <div className="space-y-3">
                        {stocks.map((stock) => (
                          <div 
                            key={stock.code}
                            className="flex items-center justify-between p-3 border-b border-slate-100 hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                {/* Checkbox removed */}
                                
                                <span className="text-lg font-bold text-slate-800 relative">
                                   {stock.name}
                                   {stock.isLeader && (
                                      <span className="absolute bottom-1 left-0 w-full h-3 -z-10 opacity-70 transform -skew-x-12" style={{ backgroundColor: PALETTE.highlighter }}></span>
                                   )}
                                </span>
                                
                                {/* New Leader Badge Style: Text in Box */}
                                {stock.isLeader && (
                                  <span className="ml-2 text-[10px] px-1.5 py-0.5 border border-red-400 text-red-500 font-bold bg-transparent rounded-sm self-center">
                                      대장주
                                  </span>
                                )}
                              </div>
                              
                              {/* 1-Line Summary */}
                              <span className="text-xs text-slate-500 mt-1 pl-6">
                                {stock.summary}
                              </span>
                            </div>
                            
                            <div className="flex items-center self-start mt-1">
                               <span className="text-xs font-mono text-slate-400 tracking-wider">
                                  {stock.code}
                                </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Footer Note */}
                <div className="mt-12 pt-6 border-t border-dashed border-slate-300 text-center">
                   <p className="text-slate-400 text-xs font-medium flex items-center justify-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      오늘 공부 끝! 내일도 파이팅하자.
                   </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
```eof
