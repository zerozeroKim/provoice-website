/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 'customer'로 설정된 빌드는 디자인 시스템 문서를 노출하지 않는 고객용 사이트로 렌더링됩니다. */
  readonly VITE_SITE_MODE?: 'customer';
  /** VER 1(main/production) · VER 2(dev/preview) 배포를 구분해 VersionSwitcher가 현재 버전을 표시합니다. */
  readonly VITE_SITE_VERSION?: 'v1' | 'v2';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
