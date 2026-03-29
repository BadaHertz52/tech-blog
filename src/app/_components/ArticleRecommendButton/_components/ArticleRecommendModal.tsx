import { overlay } from "overlay-kit";

import CommingSoon from "@/components/CommingSoon";
import Modal from "@/components/Modal";

function ArticleRecommendModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
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
      setTimeout(unmount, 300);
    };

    return <ArticleRecommendModal isOpen={isOpen} onClose={handleClose} />;
  });
};
