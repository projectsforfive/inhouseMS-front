'use client';

// React Imports
import type { ReactNode } from 'react';

// MUI Components
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';

// Type Imports
import type { Mode } from '@core/types';

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant';
import Image from 'next/image';

type ImageObj = {
  src: string;
  alt?: string;
  className?: string;
  height?: number;
  width?: number;
};

type IllustrationsProp = {
  image1?: ReactNode | ImageObj;
  image2?: ReactNode | ImageObj;
  maskImg?: ReactNode | ImageObj;
  mode?: Mode;
};

// Styled Components
const MaskImg = styled('img')({
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
});

const Illustrations = (props: IllustrationsProp) => {
  // Props
  const { image1, image2, maskImg, mode } = props;

  // Vars
  const darkImg = '/images/pages/misc-mask-dark.png';
  const lightImg = '/images/pages/misc-mask-light.png';

  // Hook
  const theme = useTheme();
  const hidden = useMediaQuery(theme.breakpoints.down('md'));
  const maskBackground = useImageVariant(mode as Mode, lightImg, darkImg);

  function isImageObj(obj: any): obj is ImageObj {
    return obj && typeof obj === 'object' && 'src' in obj;
  }

  if (!hidden) {
    return (
      <>
        {/* Render Image 1 */}
        {typeof image1 === 'undefined' || isImageObj(image1) ? (
          <Image
            alt={isImageObj(image1) ? image1.alt || 'Image 1' : 'tree-1'}
            src={isImageObj(image1) ? image1.src : '/images/illustrations/objects/tree-1.png'}
            className={isImageObj(image1) ? image1.className : 'absolute inline-start-0 block-end-0'}
            width={isImageObj(image1) ? image1.width || 200 : 200} // Fallback width
            height={isImageObj(image1) ? image1.height || 200 : 200} // Fallback height
          />
        ) : (
          image1
        )}

        {/* Render Mask Image */}
        {typeof maskImg === 'undefined' || isImageObj(maskImg) ? (
          <MaskImg
            alt={isImageObj(maskImg) ? maskImg.alt || 'mask' : 'mask'}
            src={isImageObj(maskImg) ? maskImg.src : maskBackground}
            className={isImageObj(maskImg) ? maskImg.className : ''}
            // MaskImg is a styled img and doesn't require width/height props.
          />
        ) : (
          maskImg
        )}

        {/* Render Image 2 */}
        {typeof image2 === 'undefined' || isImageObj(image2) ? (
          <Image
            alt={isImageObj(image2) ? image2.alt || 'Image 2' : 'tree-2'}
            src={isImageObj(image2) ? image2.src : '/images/illustrations/objects/tree-2.png'}
            className={isImageObj(image2) ? image2.className : 'absolute inline-end-0 block-end-0'}
            width={isImageObj(image2) ? image2.width || 200 : 200} // Fallback width
            height={isImageObj(image2) ? image2.height || 200 : 200} // Fallback height
          />
        ) : (
          image2
        )}
      </>
    );
  } else {
    return null;
  }
};

export default Illustrations;
