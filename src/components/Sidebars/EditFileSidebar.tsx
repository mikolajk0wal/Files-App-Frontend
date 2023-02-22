import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import {
  CloseIcon,
  EditCloseButton,
  FormWrapper,
  HeadingWrapper,
  StyledInput,
  SubmitButton,
  Title,
} from "./Sidebar.styles";
import { FormErrorMessage } from "../FormErrorMessage/FormErrorMessage";
import { useContext } from "react";
import { UIContext } from "../../context/UIContext";
import { useEditFileMutation } from "../../services/files";
import useModal from "../../hooks/useModal";

const EditFileSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Tytuł musi posiadać min. 2 znaki!")
    .max(50, "Tytuł może posiadać max. 50 znaków!")
    .required("Tytuł jest wymagany"),
  subject: Yup.string()
    .min(2, "Temat musi posiadać min. 6 znaków!")
    .max(50, "Temat może posiadać max. 50 znaków!")
    .required("Temat jest wymagany"),
});

interface FormikValues {
  title: string;
  subject: string;
}

const EditFileSidebar = () => {
  const { editFileSidebar, sortType, sortBy } = useContext(UIContext);
  const { initialData } = editFileSidebar;
  const isOnFilePage = window.location.pathname.split("/")[1] === "file";

  const [editFile] = useEditFileMutation();
  const showModal = useModal();

  return (
    <Formik
      initialValues={{
        title: initialData.title,
        subject: initialData.subject,
      }}
      enableReinitialize={true}
      validationSchema={EditFileSchema}
      onSubmit={async (
        { subject, title }: FormikValues,
        { resetForm }: FormikHelpers<FormikValues>
      ) => {
        editFile({
          title,
          subject,
          id: editFileSidebar.initialData.fileId,
          sortType,
          sortBy,
        })
          .unwrap()
          .then((payload) => {
            showModal({
              text: "Edytowano plik!",
              icon: "success",
              confirm: false,
              redirectUrl: isOnFilePage ? `/file/${payload.slug}` : undefined,
            });
          })
          .catch((err) => {
            const message = err?.data?.message
              ? err.data.message
              : "Błąd przy edycji pliku";
            showModal({ text: message, icon: "error", confirm: false });
          });
        editFileSidebar.setOpened(false);
      }}
    >
      <Form autoComplete="off">
        <FormWrapper opened={editFileSidebar.opened}>
          <HeadingWrapper>
            <Title>Edytuj plik</Title>
            <EditCloseButton
              aria-label="Close Sidebar"
              clicked={true}
              type="button"
              onClick={() => editFileSidebar.setOpened(false)}
            >
              <CloseIcon alt="Close Icon" />
            </EditCloseButton>
          </HeadingWrapper>

          <Field
            placeholder="Tytuł"
            name="title"
            id="edit-title"
            as={StyledInput}
          />
          <ErrorMessage name="title" component={FormErrorMessage} />
          <Field
            placeholder="Przedmiot"
            name="subject"
            id="edit-subject"
            as={StyledInput}
          />
          <ErrorMessage name="subject" component={FormErrorMessage} />

          <SubmitButton type="submit" aria-label="Edit File">
            Edytuj
          </SubmitButton>
        </FormWrapper>
      </Form>
    </Formik>
  );
};

export default EditFileSidebar;
