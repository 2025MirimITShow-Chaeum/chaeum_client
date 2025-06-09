// 시간 계산 유틸

// 10분 단위 시간 슬롯 144개 생성 (6:00 ~ 다음날 5:50)
export const generateTimeSlots = () => {
  const slots = [];
  const start = new Date();
  start.setHours(6, 0, 0, 0); // 6시 기준

  for (let i = 0; i < 144; i++) {
    const time = new Date(start.getTime() + i * 10 * 60 * 1000);
    slots.push(time);
  }

  return slots;
};

// 주어진 시간 → 10분 단위 인덱스로 변환 (0~143)
export const getSlotIndex = (date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const totalMinutes = (hour - 6) * 60 + minute;
  return Math.floor(totalMinutes / 10);
};

