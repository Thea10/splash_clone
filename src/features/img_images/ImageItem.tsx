import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Link,
  Tooltip,
  makeStyles,
  DialogActions,
} from "@material-ui/core";
import {
  ArrowDownwardRounded,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  CloseOutlined,
  LinkOutlined,
  ThumbUpAlt,
  Visibility,
} from "@material-ui/icons";
import React, { useState } from "react";
import mainStyle from "../../App.module.css";
import imgStyle from "./Images.module.css";

const imageDialogStyle = makeStyles(() => ({
  dialog: {
    "& .MuiPaper-root": {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
    "& .MuiDialogTitle-root": {
      padding: 0,
      "& .MuiIconButton-root": {
        color: "#f0f0f0",
        backgroundColor: "transparent",
      },
    },

    "& .MuiDialogActions-root": {
      justifyContent: "space-between",
      "& .MuiIconButton-root": {
        backgroundColor: "#f0f0f0",
        padding: "5px",
      },

      " & .MuiSvgIcon-root": {
        fontSize: "2rem",
      },
    },
  },
}));
interface singleImageProps {
  currentImage: any;
  index: number;
  imageList: Array<any>;
}

function ImageItem({ currentImage, index, imageList }: singleImageProps) {
  const dialogStyle = imageDialogStyle();
  const [imageToDisplay, setImageToDisplay] = useState(currentImage);
  const [imgIndex, setimgIndex] = useState(index);
  const [imgOpen, setimgOpen] = useState(false);
  let { alt_description, likes, links, urls, user } = currentImage;

  const handleClose = () => {
    setimgOpen(false);
  };
  const handleOpen = () => {
    setimgOpen(true);
  };

  const previousImage = () => {
    setImageToDisplay(imageList[imgIndex - 1]);
    setimgIndex(imgIndex - 1);
  };
  const nextImage = () => {
    setImageToDisplay(imageList[imgIndex + 1]);
    setimgIndex(imgIndex + 1);
  };

  return (
    <div className={`${mainStyle.card} ${imgStyle.image_holder}`}>
      <img
        className={`${imgStyle.main_img}`}
        src={urls.small}
        srcSet={`${urls.thumb} 200w, ${urls.small} 400w, ${urls.regular} 1080w `}
        sizes="(max-width: 500px) 200px,  400px"
        alt={alt_description}
      />

      <div className={`${imgStyle.img_info}`}>
        <div className={`${imgStyle.user_info}`}>
          <img
            className={`${imgStyle.user_img}`}
            src={user.profile_image.small}
            alt="user-img"
          />
          <span>
            {user.first_name} {user.last_name}
          </span>
        </div>

        <Tooltip title={`${likes} likes`}>
          <ThumbUpAlt />
        </Tooltip>

        <Tooltip title="Portfolio">
          <Link href={user.portfolio_url}>
            <LinkOutlined />
          </Link>
        </Tooltip>

        <div className={`${imgStyle.img_actions}`}>
          <Tooltip title="Download">
            <Link href={links.download}>
              <IconButton>
                <ArrowDownwardRounded />
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip title="View">
            <IconButton
              className={`${imgStyle.zoom_cursor}`}
              onClick={handleOpen}
            >
              <Visibility />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <Dialog
        className={dialogStyle.dialog}
        open={imgOpen}
        maxWidth="xl"
        onClose={handleClose}
      >
        <DialogTitle>
          <Tooltip title="Close">
            <IconButton onClick={handleClose}>
              <CloseOutlined />
            </IconButton>
          </Tooltip>
        </DialogTitle>

        <DialogContent>
          <img
            src={imageToDisplay.urls.regular}
            srcSet={`${imageToDisplay.urls.small} 400w, ${imageToDisplay.urls.regular} 1080w `}
            sizes="(max-width: 500px) 300px, (max-width: 767px)  400px, (max-width: 992px) 500px, (max-width: 1440px) 650px, 900px"
            alt={alt_description}
          />
        </DialogContent>
        <DialogActions>
          <IconButton disabled={imgIndex === 0} onClick={previousImage}>
            <Tooltip title="Previous">
              <ChevronLeftOutlined />
            </Tooltip>
          </IconButton>

          <IconButton
            disabled={imgIndex === imageList.length - 1}
            onClick={nextImage}
          >
            <Tooltip title="Next">
              <ChevronRightOutlined />
            </Tooltip>
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ImageItem;
