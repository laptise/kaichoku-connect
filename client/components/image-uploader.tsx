/* eslint-disable @next/next/no-img-element */
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button, DialogContent, InputLabel, Paper, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "next/image";
import * as React from "react";
import { forwardRef, RefObject, useContext, useImperativeHandle, useRef, useState } from "react";
import ReactCrop, { centerCrop, Crop, makeAspectCrop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { $fileServer } from "../axios";
import { AuthContext } from "../pages/_app";
import { canvasPreview } from "./canvas-preview";
import { useDebounceEffect } from "./use-debuce-effect";
const emails = ["username@gmail.com", "user02@gmail.com"];

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

enum ModalStep {
  PickAndCrop,
  Review,
}
export type ModalForwards = {
  openModal: () => void;
};
const ImageUploaderModal: React.ForwardRefRenderFunction<ModalForwards, { ref: RefObject<ModalForwards> }> = ({}, ref) => {
  const [open, setOpen] = useState(false);
  useImperativeHandle(ref, () => ({
    openModal() {
      setOpen(true);
    },
  }));
  const [auth] = useContext(AuthContext).authState;
  const [imgSrc, setImgSrc] = useState("");
  const [reviewImgSrc, setReviewImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(1);
  const [step, setStep] = useState(ModalStep.PickAndCrop);

  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (value: string) => {};

  const submitImage = async () => {
    await $fileServer.put(`/user/${auth!.userId}/profileImage`, { type: "image/png", data: reviewImgSrc });
  };

  useDebounceEffect(
    async () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate);
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  const generate = () => {
    const img = previewCanvasRef.current?.toDataURL("image/png");
    setStep(ModalStep.Review);
    setReviewImgSrc(img!);
  };

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () => setImgSrc(reader!.result!.toString() || ""));
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>????????????????????????</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Paper elevation={2} style={{ background: "black", padding: 10, borderRadius: 10 }}>
            <Stack alignItems={"center"} justifyContent="center" style={{ height: 500, width: 500 }}>
              {step === ModalStep.PickAndCrop ? (
                <>
                  <input id="selectImageFile" type="file" style={{ display: "none" }} accept="image/*" onChange={onSelectFile} />
                  {Boolean(imgSrc) && (
                    <ReactCrop
                      style={{ height: "fit-content", width: "fit-content" }}
                      crop={crop}
                      onChange={(_, percentCrop) => setCrop(percentCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={aspect}
                    >
                      <img
                        ref={imgRef}
                        alt="Crop me"
                        src={imgSrc}
                        style={{ transform: `scale(${scale}) rotate(${rotate}deg)`, maxWidth: 480, maxHeight: 480 }}
                        onLoad={onImageLoad}
                      />
                    </ReactCrop>
                  )}
                  <div>
                    {Boolean(completedCrop) && (
                      <canvas
                        ref={previewCanvasRef}
                        style={{
                          border: "1px solid black",
                          objectFit: "contain",
                          width: completedCrop!.width,
                          height: completedCrop!.height,
                          display: "none",
                        }}
                      />
                    )}
                  </div>
                </>
              ) : (
                <Image src={reviewImgSrc} alt="image" width={400} height={400} />
              )}
            </Stack>
          </Paper>

          <Stack direction="row">
            <Button variant="contained">
              <InputLabel htmlFor="selectImageFile" style={{ all: "unset", display: "flex", alignItems: "center" }}>
                <AddPhotoAlternateIcon sx={{ mr: 1 }} />
                ????????????
              </InputLabel>
            </Button>
            {step === ModalStep.PickAndCrop ? (
              <>
                <Button variant="outlined" color="error">
                  ???????????????
                </Button>
                <Button variant="outlined" color="success" onClick={() => generate()}>
                  ??????
                </Button>
              </>
            ) : (
              <>
                <Button variant="outlined" color="error" onClick={() => setStep(ModalStep.PickAndCrop)}>
                  ??????
                </Button>
                <Button variant="outlined" color="success" onClick={() => submitImage()}>
                  ??????
                </Button>
              </>
            )}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default forwardRef(ImageUploaderModal);
