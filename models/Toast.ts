import { AnyObject } from 'react-native-toast-message';

export interface IToastOptions {
  type: 'success' | 'error' | 'info' | null;
  position?: 'top' | 'bottom';
  text1?: string;
  text2?: string;
  visibilityTime?: number;
  autoHide?: boolean;
  topOffset?: number;
  bottomOffset?: number;
  props?: AnyObject;
  onShow?: () => void;
  onHide?: () => void;
  onPress?: () => void;
}
