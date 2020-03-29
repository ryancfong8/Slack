import React from 'react';
import ClickOutsideWrapper from './click_outsider_wrapper';

const Modal = ({ className, onClose, footer, body, header, modalSize = 'modal-lg' }) => {
  const renderClose = () => (
    <button type="button" className="close" onClick={e => onClose()} data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">
        <i className="fa fa-times" aria-hidden="true"></i>
      </span>
    </button>
  );

  return (
    <div className={className || ''}>
      <div className="modal-backdrop fade show" />
      <div className="modal fade show d-block" id="Modal" role="dialog" tabIndex="-1">
        <div className={`modal-dialog ${modalSize}`}>
          <ClickOutsideWrapper onClickOutside={onClose}>
            <div className="modal-content">
              {header && (
                <div className="modal-header">
                  {header}
                  {renderClose()}
                </div>
              )}
              {body && (
                <div className="modal-body">
                  {!header && renderClose()}
                  {body}
                </div>
              )}
              {footer && <div className="modal-footer">{footer}</div>}
            </div>
          </ClickOutsideWrapper>
        </div>
      </div>
    </div>
  );
};

export default Modal;
