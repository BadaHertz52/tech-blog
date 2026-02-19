import Icon from "@/components/Icon";
import type { CustomIconName } from "@/components/Icon/types";

interface SocialLink {
  name: Exclude<CustomIconName, "bada">;
  href: string;
  label: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "github",
    href: "https://github.com/BadaHertz52",
    label: "GitHub 프로필",
  },
  {
    name: "linkedin",
    href: "https://www.linkedin.com/in/%ED%95%B4%EC%98%81-%EC%86%90-9774a332a/",
    label: "LinkedIn 프로필",
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-bg-white py-2xl">
      <div className="mx-auto max-w-screen-xl">
        {/* 상단 섹션 */}
        <div className="flex flex-col items-center gap-lg text-center align-middle">
          {/* 브랜드 */}
          <div className="flex items-center gap-sm">
            <Icon name="bada" width={28} height={28} />
            <span className="text-xl font-extrabold text-text-primary">
              BADA.DEV
            </span>
          </div>

          {/* 설명 문구 */}
          <p className="max-w-md px-sm text-sm text-text-secondary sm:text-base">
            A space where I share my journey as a developer
          </p>

          {/* 소셜 링크 버튼 */}
          <div className="flex items-center gap-sm">
            {SOCIAL_LINKS.map(({ name, href, label }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-button flex h-10 w-10 cursor-pointer items-center justify-center bg-gray-light text-gray-charcoal"
              >
                <span>
                  <Icon name={name} width={16} height={16} />
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* 구분선 */}
        <hr className="my-lg border-gray-light" />

        {/* 저작권 */}
        <p className="text-center text-xs text-text-secondary">
          © 2026 BADA.DEV. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
