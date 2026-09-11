/** 실제 음원이 연결되기 전 재생·다운로드 흐름을 검증하기 위한 짧은 데모 WAV입니다. */
export function createDemoAudio(seed = 0, duration = 2.4) {
  const sampleRate = 8000;
  const sampleCount = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + sampleCount * 2);
  const view = new DataView(buffer);
  const write = (offset: number, value: string) => [...value].forEach((char, index) => view.setUint8(offset + index, char.charCodeAt(0)));

  write(0, 'RIFF');
  view.setUint32(4, 36 + sampleCount * 2, true);
  write(8, 'WAVE');
  write(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  write(36, 'data');
  view.setUint32(40, sampleCount * 2, true);

  const baseFrequency = 165 + (seed % 7) * 22;
  for (let index = 0; index < sampleCount; index += 1) {
    const time = index / sampleRate;
    const envelope = Math.min(1, time * 6) * Math.min(1, (duration - time) * 5);
    const phrase = Math.sin(time * Math.PI * 2 * baseFrequency)
      + Math.sin(time * Math.PI * 2 * baseFrequency * 1.5) * .26
      + Math.sin(time * Math.PI * 2 * (baseFrequency + Math.sin(time * 5) * 8)) * .16;
    view.setInt16(44 + index * 2, Math.max(-1, Math.min(1, phrase * envelope * .24)) * 0x7fff, true);
  }

  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let index = 0; index < bytes.length; index += 1) binary += String.fromCharCode(bytes[index]);
  return `data:audio/wav;base64,${btoa(binary)}`;
}
