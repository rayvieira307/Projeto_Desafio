import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal} role="dialog" aria-labelledby="modal-title" aria-modal="true">
        <article className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose} aria-label="Fechar Modal">&times;</button>
          <section className={styles.modalBody}>{children}</section>
        </article>
      </div>
    </div>
  );
};

export default Modal;
