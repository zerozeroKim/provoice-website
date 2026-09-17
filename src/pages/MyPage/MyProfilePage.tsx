import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button, Chip, Footer, GNB, TextField, ToggleGroup } from '@/design-system';
import { isLoggedIn } from '@/lib/mockAuth';
import { AVATAR_POOL, getMyProfile, saveMyProfile, type MyProfile } from '@/lib/mockProfile';
import styles from './MyProfilePage.module.css';

const languageOptions = ['한국어', '영어', '일본어', '중국어', '스페인어', '아랍어'];
const categoryOptions = ['내레이션', '광고', '캐릭터', '게임', '키즈', '더빙', '오디오북', '다큐'];
const toneOptions = ['자신감', '친근한', '차분한', '진중한', '귀여운', '밝은', '섹시한', '드라마틱'];

function toggleInList(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function MyProfilePage() {
  const [profile, setProfile] = useState<MyProfile>(getMyProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) window.location.hash = '#login';
  }, []);

  useEffect(() => {
    if (!saved) return;
    const timer = window.setTimeout(() => setSaved(false), 2400);
    return () => window.clearTimeout(timer);
  }, [saved]);

  if (!isLoggedIn()) return null;

  const update = <K extends keyof MyProfile>(key: K, value: MyProfile[K]) => {
    setProfile((current) => ({ ...current, [key]: value }));
  };

  const cycleAvatar = () => {
    const nextIndex = (AVATAR_POOL.indexOf(profile.avatarSrc) + 1) % AVATAR_POOL.length;
    update('avatarSrc', AVATAR_POOL[nextIndex]);
  };

  const handleSubmit = () => {
    saveMyProfile(profile);
    setSaved(true);
  };

  return (
    <main className={styles.page}>
      <GNB />
      <div className={styles.content}>
        <div className={styles.card}>
          <span className={styles.eyebrow}>MY PAGE</span>
          <h1 className={styles.title}>프로필 수정</h1>
          <p className={styles.description}>성우 프로필에 표시되는 정보를 관리하세요. 수정한 내용은 저장 후 바로 반영됩니다.</p>

          <div className={styles.avatarRow}>
            <span className={styles.avatar}><img src={profile.avatarSrc} alt="내 프로필 사진" /></span>
            <button type="button" className={styles.avatarButton} onClick={cycleAvatar}><RefreshCw size={14} /> 사진 변경</button>
          </div>

          <div className={styles.form}>
            <div>
              <span className={styles.fieldLabel}>이름</span>
              <TextField label="이름" hideLabel value={profile.name} onChange={(event) => update('name', event.target.value)} />
            </div>

            <div>
              <span className={styles.fieldLabel}>연락처</span>
              <TextField label="연락처" hideLabel type="tel" value={profile.phone} onChange={(event) => update('phone', event.target.value)} />
            </div>

            <div>
              <span className={styles.fieldLabel}>성별</span>
              <ToggleGroup options={['남성', '여성'] as const} value={profile.gender} onChange={(value) => update('gender', value)} ariaLabel="성별" />
            </div>

            <div>
              <span className={styles.fieldLabel}>언어</span>
              <div className={styles.chipRow}>
                {languageOptions.map((option) => (
                  <Chip key={option} selected={profile.languages.includes(option)} onClick={() => update('languages', toggleInList(profile.languages, option))}>{option}</Chip>
                ))}
              </div>
            </div>

            <div>
              <span className={styles.fieldLabel}>카테고리</span>
              <div className={styles.chipRow}>
                {categoryOptions.map((option) => (
                  <Chip key={option} selected={profile.categories.includes(option)} onClick={() => update('categories', toggleInList(profile.categories, option))}>{option}</Chip>
                ))}
              </div>
            </div>

            <div>
              <span className={styles.fieldLabel}>톤</span>
              <div className={styles.chipRow}>
                {toneOptions.map((option) => (
                  <Chip key={option} selected={profile.tones.includes(option)} onClick={() => update('tones', toggleInList(profile.tones, option))}>{option}</Chip>
                ))}
              </div>
            </div>

            <div>
              <span className={styles.fieldLabel}>자기소개</span>
              <textarea className={styles.textarea} value={profile.bio} onChange={(event) => update('bio', event.target.value)} placeholder="자기소개를 입력해 주세요" />
            </div>

            <div className={styles.footerRow}>
              {saved && <span className={styles.savedNote}>저장되었습니다</span>}
              <Button size="md" onClick={handleSubmit}>저장하기</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
