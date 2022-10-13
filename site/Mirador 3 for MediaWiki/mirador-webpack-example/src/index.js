import Mirador from 'mirador/dist/es/src/index';
import { miradorImageToolsPlugin } from 'mirador-image-tools';
import imageCropperPlugin from 'mirador-imagecropper/es';

const getManifest = document.getElementById('miradorframe').getAttribute('data-manifest-url');

const config = {
  id: 'miradorframe',
  windows: [{
    imageToolsEnabled: true,
    imageToolsOpen: true,
    imageCropper: {
      active: true,
      enabled: true
    },
    manifestId: getManifest,
  }],
  theme: {
    palette: {
      primary: {
        main: '#1967d2',
      },
    },
  },
};

Mirador.viewer(config, [
  ...miradorImageToolsPlugin,
  ...imageCropperPlugin
]);
