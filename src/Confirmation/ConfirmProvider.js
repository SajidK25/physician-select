import React, { useState, useCallback } from "react";
import ConfirmContext from "./ConfirmContext";
import { ConfirmationDialog } from "./ConfirmationDialog";

const _defaultOptions = {
  title: "Are you sure?",
  description: "",
  confirmationText: "Ok",
  cancellationText: "Cancel",
  dialogProps: {},
  confirmationButtonProps: {},
  cancellationButtonProps: {},
};

export const ConfirmProvider = ({ children, defaultOptions = {} }) => {
  const [options, setOptions] = useState({
    ..._defaultOptions,
    ...defaultOptions,
  });
  const [resolveReject, setResolveReject] = useState([]);
  const [resolve, reject] = resolveReject;

  const confirm = useCallback((options = {}) => {
    return new Promise((resolve, reject) => {
      setOptions({ ..._defaultOptions, ...defaultOptions, ...options });
      setResolveReject([resolve, reject]);
    });
  }, []);

  const handleClose = useCallback(() => {
    setResolveReject([]);
  }, []);

  const handleCancel = useCallback(() => {
    reject();
    handleClose();
  }, [reject, handleClose]);

  const handleConfirm = useCallback(() => {
    resolve();
    handleClose();
  }, [resolve, handleClose]);

  return (
    <>
      <ConfirmContext.Provider value={confirm}>
        {children}
      </ConfirmContext.Provider>
      <ConfirmationDialog
        open={resolveReject.length === 2}
        options={options}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
};
