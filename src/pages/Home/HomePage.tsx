import { useState } from 'react';
import { Badge, Box, Button, Card, Checkbox, FormField, Input, Modal, Select, Stack, Text } from '../../design-system';
import styles from './HomePage.module.css';

export function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.container}>
          <Stack gap="1.25rem" align="flex-start">
            <Badge>DESIGN SYSTEM STARTER</Badge>
            <h1>작게 시작하고,<br />일관되게 확장하세요.</h1>
            <Text size="lg" tone="muted" style={{ maxWidth: '42rem' }}>
              React, TypeScript, CSS Modules로 만든 바로 실행 가능한 디자인 시스템 예제입니다.
            </Text>
            <Stack direction="row" gap=".75rem" wrap="wrap">
              <Button size="lg" onClick={() => setModalOpen(true)}>모달 열기</Button>
              <Button size="lg" variant="secondary">둘러보기</Button>
            </Stack>
          </Stack>
        </div>
      </section>

      <section className={styles.container}>
        <div className={styles.grid}>
          <Card>
            <Stack gap="1rem">
              <Box><Badge tone="success">Components</Badge></Box>
              <Text as="h2" size="xl" weight={700}>회원 정보</Text>
              <FormField label="이름" htmlFor="name" hint="화면에 표시할 이름입니다.">
                <Input id="name" placeholder="홍길동" aria-describedby="name-description" />
              </FormField>
              <FormField label="관심 분야" htmlFor="category">
                <Select id="category" defaultValue="design">
                  <option value="design">디자인</option>
                  <option value="frontend">프론트엔드</option>
                  <option value="product">프로덕트</option>
                </Select>
              </FormField>
              <Checkbox label="새 소식을 이메일로 받기" defaultChecked />
              <Button>저장하기</Button>
            </Stack>
          </Card>

          <Card>
            <Stack gap="1rem">
              <Badge tone="neutral">Architecture</Badge>
              <Text as="h2" size="xl" weight={700}>확장하기 쉬운 4단계</Text>
              {[
                ['01', 'Tokens', '색상, 간격, 글꼴 같은 기본 규칙'],
                ['02', 'Primitives', 'Box, Stack, Text 같은 기초 UI'],
                ['03', 'Components', '버튼과 입력창 같은 재사용 요소'],
                ['04', 'Patterns', '여러 요소를 조합한 화면 패턴'],
              ].map(([number, title, description]) => (
                <div className={styles.item} key={number}>
                  <span>{number}</span><div><strong>{title}</strong><p>{description}</p></div>
                </div>
              ))}
            </Stack>
          </Card>
        </div>
      </section>

      <Modal open={modalOpen} title="디자인 시스템 준비 완료" onClose={() => setModalOpen(false)}>
        <Stack gap="1rem">
          <Text tone="muted">이 모달도 디자인 시스템 컴포넌트로 만들어졌습니다. ESC 키나 바깥 영역을 눌러 닫을 수 있어요.</Text>
          <Button onClick={() => setModalOpen(false)}>확인</Button>
        </Stack>
      </Modal>
    </main>
  );
}
