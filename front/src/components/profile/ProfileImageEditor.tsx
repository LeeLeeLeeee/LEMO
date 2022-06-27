/* eslint-disable import/order */
/* eslint-disable no-param-reassign */
import {
    ChangeEventHandler,
    useCallback,
    useRef,
    useState,
    WheelEventHandler,
} from 'react';

import styled from '@emotion/styled';
import ReactCrop, {
    centerCrop,
    Crop,
    makeAspectCrop,
    PixelCrop,
} from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';
import tw from 'twin.macro';

import CircleImage from '../common/CircleImage';
import Modal from '../common/modal/Modal';
import ContainerFlex from '../common/ContainerFlex';
import Button from '../common/button/Button';

type ProfileImageType = {
    file?: Blob;
    previewLink?: string;
};

interface Props {
    defaultImagePath?: string;
    setUploadedFile?: React.Dispatch<ProfileImageType>;
}

const EditAbleProfileImage = styled.span`
    cursor: pointer;
    border-radius: 100px;
`;

const HiddenInputFile = styled.input`
    visibility: hidden;
    width: 0px;
    height: 0px;
    position: absolute;
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${tw`rounded-sm shadow-md`}
`;

const ZOOM_SPEED = 0.1;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5;

function centerAspectCrop(mediaWidth: number, mediaHeight: number) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: 'px',
                width: 100,
                height: 100,
            },
            1,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

async function canvasPreview(
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    crop: PixelCrop,
    scale = 1
) {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('No 2d context');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;
    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = 'high';

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;

    ctx.save();
    ctx.translate(-cropX, -cropY);
    ctx.translate(centerX, centerY);
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight
    );
    ctx.restore();
}

function ProfileImageEditor(props: Props) {
    const { defaultImagePath, setUploadedFile } = props;
    const fileInputElement = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [imgSrc, setImgSrc] = useState<any>(undefined);
    const [scale, setScale] = useState(1);
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [completedImage, setCompletedImage] = useState<ProfileImageType>({
        file: undefined,
        previewLink: defaultImagePath,
    });
    const [crop, setCrop] = useState<Crop>();

    const resetCompletedImage = useCallback(() => {
        setCompletedImage({
            file: undefined,
            previewLink: undefined,
        });
        if (setUploadedFile) {
            setUploadedFile({
                file: undefined,
                previewLink: undefined,
            });
        }
    }, []);

    const handleImageUploadClick = useCallback(() => {
        fileInputElement.current?.click();
        resetCompletedImage();
    }, []);

    const handleFileUpload: ChangeEventHandler<HTMLInputElement> = useCallback(
        (e) => {
            if (e.target === null) return;
            if (!e.target.files) return;

            const file = e.target.files[0];

            if (file === undefined) return;

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImgSrc(reader.result?.toString());
            };
        },
        []
    );

    const handleImageLoad = useCallback(
        (e: React.SyntheticEvent<HTMLImageElement>) => {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height));
        },
        []
    );

    const handleWheelChange: WheelEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            if (event.deltaY < 0) {
                if (scale <= MIN_ZOOM) return;
                setScale((value) => +(value - ZOOM_SPEED).toFixed(1));
                return;
            }
            if (scale >= MAX_ZOOM) return;
            setScale((value) => +(value + ZOOM_SPEED).toFixed(1));
        },
        [scale]
    );

    const handleCropedImageSaveClick = useCallback(async () => {
        if (imgRef.current === null || completedCrop === undefined) return;

        const canvas = document.createElement('canvas');
        canvasPreview(imgRef.current, canvas, completedCrop, scale);

        const convertCanvasToProfileFile = new Promise<Blob>(
            (resolve, reject) => {
                try {
                    canvas.toBlob((blob) => {
                        if (blob === null) throw new Error('blob error');
                        resolve(blob);
                    });
                } catch (error) {
                    reject(error);
                }
            }
        );
        const blobFile = await convertCanvasToProfileFile;

        const convertFileToDataUrl = new Promise<string>((resolve, reject) => {
            try {
                const reader = new FileReader();
                reader.readAsDataURL(blobFile);
                reader.onload = () => {
                    resolve(reader.result?.toString() || '');
                };
            } catch (error) {
                reject(error);
            }
        });
        const previewLink = await convertFileToDataUrl;
        setCompletedImage({
            file: blobFile,
            previewLink,
        });
        if (setUploadedFile) {
            setUploadedFile({
                file: blobFile,
                previewLink,
            });
        }
        setImgSrc(undefined);
    }, [completedCrop]);

    if (completedImage.previewLink) {
        return (
            <>
                <EditAbleProfileImage onClick={handleImageUploadClick}>
                    <CircleImage imagePath={completedImage.previewLink} />
                </EditAbleProfileImage>
                <HiddenInputFile
                    accept="image/*"
                    type="file"
                    onChange={handleFileUpload}
                    ref={fileInputElement}
                />
            </>
        );
    }

    return (
        <>
            <EditAbleProfileImage onClick={handleImageUploadClick}>
                <CircleImage />
            </EditAbleProfileImage>
            <HiddenInputFile
                accept="image/*"
                type="file"
                onChange={handleFileUpload}
                ref={fileInputElement}
            />
            <Modal
                dialogID="profile-image-editor"
                size="large"
                title="이미지 설정"
                visible={!!imgSrc}
                handleClose={() => setImgSrc(undefined)}
            >
                <ContainerFlex
                    $direction="column"
                    $justify="center"
                    $items="center"
                >
                    <ContainerFlex
                        onWheel={handleWheelChange}
                        style={{ width: '100%' }}
                        $isStretch
                        $justify="center"
                        $items="center"
                        $direction="column"
                        $padding={4}
                        $gap={2}
                    >
                        <ImageWrapper>
                            <ReactCrop
                                minHeight={100}
                                maxHeight={150}
                                crop={crop}
                                aspect={1}
                                keepSelection
                                onChange={(c) => setCrop(c)}
                                onComplete={(c) => setCompletedCrop(c)}
                                style={{ maxHeight: '300px' }}
                            >
                                <img
                                    src={imgSrc}
                                    ref={imgRef}
                                    style={{
                                        transform: `scale(${scale})`,
                                        objectFit: 'contain',
                                    }}
                                    alt="image"
                                    onLoad={handleImageLoad}
                                />
                            </ReactCrop>
                        </ImageWrapper>
                        <Button
                            onClick={handleCropedImageSaveClick}
                            style={{ width: '100%' }}
                        >
                            저장
                        </Button>
                    </ContainerFlex>
                </ContainerFlex>
            </Modal>
        </>
    );
}

export default ProfileImageEditor;
