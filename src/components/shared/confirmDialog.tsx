import { Dialog } from '@yamada-ui/react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function ConfirmDialog({ isOpen, onClose, onSave }: ConfirmDialogProps) {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        header="削除確認"
        cancel="キャンセル"
        onCancel={onClose}
        success="削除する"
        onSuccess={onSave}
      >
        削除しますか？
      </Dialog>
    </>
  );
}
