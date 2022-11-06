import { useHistory } from "react-router";
import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export interface ShowModalProps {
  text: string;
  icon: SweetAlertIcon;
  confirm: boolean;
  redirectUrl?: string;
  cancelText?: string;
  confirmText?: string;
}

const useModal = () => {
  const history = useHistory();

  return async ({
    text,
    icon,
    confirm,
    redirectUrl,
    confirmText,
    cancelText,
  }: ShowModalProps) => {
    let isConfirmed = false;
    await MySwal.fire({
      title: <p>{text}</p>,
      icon: icon,
      showCancelButton: confirm,
      cancelButtonText: cancelText ? cancelText : "NIE",
      confirmButtonText: confirm
        ? `${confirmText ? confirmText : "TAK"}`
        : "OK",
      allowEnterKey: true,
    })
      .then((result) => {
        isConfirmed = result.isConfirmed;
      })
      .then(() => {
        if (redirectUrl) {
          history.push(redirectUrl);
        }
      })
      .finally(() => {
        Promise.resolve(isConfirmed);
      });
    return isConfirmed;
  };
};

export default useModal;
