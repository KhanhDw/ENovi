import { InjectionToken } from '@angular/core';

export interface ImageConfig {
  disableImageSizeWarning: boolean;
  disableImageLazyLoadWarning: boolean;
}

export const IMAGE_CONFIG = new InjectionToken<ImageConfig>('IMAGE_CONFIG');
