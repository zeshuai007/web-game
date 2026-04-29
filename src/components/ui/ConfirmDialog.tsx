import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  content?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  loading?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onConfirm,
  onCancel,
  title = '请确认',
  content,
  confirmText = '确认',
  cancelText = '取消',
  danger = false,
  loading = false,
}) => {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} style={{ color: danger ? '#f87171' : 'var(--color-gold)' }} />
          {title}
        </div>
      }
      width={380}
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onCancel} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant={danger ? 'danger' : 'gold'}
            size="sm"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
        {content ?? '此操作不可撤销，道友确认继续？'}
      </p>
    </Modal>
  );
};

export default ConfirmDialog;
