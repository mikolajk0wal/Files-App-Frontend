import { useHistory } from 'react-router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const useModal = () => {
  const history = useHistory();

  return async (
    text: string,
    icon: SweetAlertIcon,
    confirm: boolean,
    redirectUrl?: string
  ) => {
    let isConfirmed = false;
    await MySwal.fire({
      title: <p>{text}</p>,
      icon: icon,
      showCancelButton: confirm,
      cancelButtonText: 'Nie',
      confirmButtonText: confirm ? 'Tak' : 'OK',
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
