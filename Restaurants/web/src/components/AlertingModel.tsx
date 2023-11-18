import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

type AlertingModalProp = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  content: React.ReactNode;
};

const style = {
  position: "absolute",
  top: "50%",
  right: "50%",
  transform: "translate(50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: "24",
  p: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  outline: "none",
};

export default function AlertingModal({
  isOpen,
  setIsOpen,
  content,
}: AlertingModalProp) {
  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          className="font-bold"
        >
          提醒您
        </Typography>
        <Typography className="my-8 text-lg" id="modal-modal-description">
          {content}
        </Typography>
        <Button
          onClick={() => setIsOpen(false)}
          className="m-2 rounded-full bg-[#f4b63d] px-4 font-bold text-black hover:bg-[#f4b63d]"
        >
          我知道了
        </Button>
      </Box>
    </Modal>
  );
}
