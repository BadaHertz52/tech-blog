import type { Meta, StoryObj } from "@storybook/react";
import { overlay, OverlayProvider } from "overlay-kit";

import Button from "@/components/Button";
import Modal from "./index";

const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <OverlayProvider>
        <Story />
      </OverlayProvider>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<Meta>;

// Alert 모달: 제목 + 닫기 버튼 + 안내 메시지
export const Alert: Story = {
  render: () => {
    const handleOpen = () => {
      overlay.open(({ isOpen, close, unmount }) => {
        const handleClose = () => {
          close();
          setTimeout(unmount, 300);
        };

        return (
          <Modal isOpen={isOpen} onClose={handleClose} aria-label="알림">
            <Modal.Header title="알림" onClose={handleClose} />
            <Modal.Content>
              <div className="flex flex-col items-center gap-4 px-6 pb-6 pt-2">
                <p className="text-center text-base text-text-primary">
                  작업이 완료되었습니다.
                </p>
                <Button onClick={handleClose}>확인</Button>
              </div>
            </Modal.Content>
          </Modal>
        );
      });
    };

    return <Button onClick={handleOpen}>Alert 모달 열기</Button>;
  },
};

// Confirm 모달: 제목 + 확인/취소 버튼 (X 버튼 없음)
export const Confirm: Story = {
  render: () => {
    const handleOpen = () => {
      overlay.open(({ isOpen, close, unmount }) => {
        const handleClose = () => {
          close();
          setTimeout(unmount, 300);
        };

        const handleConfirm = () => {
          alert("삭제되었습니다.");
          handleClose();
        };

        return (
          <Modal isOpen={isOpen} onClose={handleClose} aria-label="확인">
            <Modal.Header title="삭제 확인" />
            <Modal.Content>
              <div className="flex flex-col items-center gap-4 px-6 pb-6 pt-2">
                <p className="text-center text-base text-text-primary">
                  정말 삭제하시겠습니까?
                  <br />
                  이 작업은 되돌릴 수 없습니다.
                </p>
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={handleClose}>
                    취소
                  </Button>
                  <Button variant="primary" onClick={handleConfirm}>
                    삭제
                  </Button>
                </div>
              </div>
            </Modal.Content>
          </Modal>
        );
      });
    };

    return <Button onClick={handleOpen}>Confirm 모달 열기</Button>;
  },
};

// Content 모달: 제목 없이 자유로운 콘텐츠
export const Content: Story = {
  render: () => {
    const handleOpen = () => {
      overlay.open(({ isOpen, close, unmount }) => {
        const handleClose = () => {
          close();
          setTimeout(unmount, 300);
        };

        return (
          <Modal isOpen={isOpen} onClose={handleClose} aria-label="콘텐츠">
            <Modal.Header onClose={handleClose} />
            <Modal.Content>
              <div className="flex flex-col gap-4 px-6 pb-6">
                <h2 className="text-h3-mobile font-extrabold">제목 영역</h2>
                <p className="text-base text-text-secondary">
                  자유롭게 콘텐츠를 넣을 수 있는 모달입니다.
                  <br />
                  이미지, 폼, 리스트 등 어떤 내용도 담을 수 있습니다.
                </p>
                <Button variant="secondary" onClick={handleClose}>
                  닫기
                </Button>
              </div>
            </Modal.Content>
          </Modal>
        );
      });
    };

    return <Button onClick={handleOpen}>Content 모달 열기</Button>;
  },
};
