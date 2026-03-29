import { overlay } from "overlay-kit";

import CommingSoon from "@/components/CommingSoon";
import Modal, { MODAL_ANIMATION_DURATION_MS } from "@/components/Modal";

interface ArticleRecommendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ArticleRecommendModal({
  isOpen,
  onClose,
}: ArticleRecommendModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} aria-label="아티클 추천">
      <Modal.Header onClose={onClose} />
      <Modal.Content>
        <div className="-mt-[20px]">
          <CommingSoon showHomeButton={false} />
        </div>
      </Modal.Content>
    </Modal>
  );
}

export const openArticleRecommendModal = () => {
  overlay.open(({ isOpen, close, unmount }) => {
    const handleClose = () => {
      close();
      setTimeout(unmount, MODAL_ANIMATION_DURATION_MS);
    };

    return <ArticleRecommendModal isOpen={isOpen} onClose={handleClose} />;
  });
};
