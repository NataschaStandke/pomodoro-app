declare module "*.mp3" {
  const src: string;
  export default src;
}

interface ElectronAPI {
  closeApp: () => void;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}
