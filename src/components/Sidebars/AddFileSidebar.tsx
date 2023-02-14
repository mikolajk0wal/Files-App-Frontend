import React, { useContext, useState } from "react";
import { UIContext } from "../../context/UIContext";
import FileInput from "../FileInput/FileInput";
import {
  FormWrapper,
  StyledInput,
  Title,
  CloseButton,
  CloseIcon,
  HeadingWrapper,
  SubmitButton,
} from "./Sidebar.styles";
import * as Yup from "yup";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { FormErrorMessage } from "../FormErrorMessage/FormErrorMessage";

import useModal from "../../hooks/useModal";
import { useAddFileMutation } from "../../services/files";
import { useHistory } from "react-router";

const AddFileSchema = Yup.object().shape({
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
  file?: File;
}

const AddFileSidebar: React.FC = () => {
  const { sortType, addFileSidebarOpened, closeAddFileSidebar } =
    useContext(UIContext);
  const [file, setFile] = useState<File | null>(null);

  const [addFile] = useAddFileMutation();

  const history = useHistory();

  const showModal = useModal();

  return (
    <Formik
      initialValues={{
        title: "",
        subject: "",
      }}
      validationSchema={AddFileSchema}
      onSubmit={async (
        { subject, title }: FormikValues,
        { resetForm }: FormikHelpers<FormikValues>
      ) => {
        if (!file) {
          showModal({
            text: "Nie załączono pliku",
            icon: "error",
            confirm: false,
          });
          return;
        }
        addFile({
          file,
          subject,
          title,
          sortType,
        })
          .unwrap()
          .then((payload) => {
            showModal({
              text: "Dodano plik!",
              icon: "success",
              confirm: false,
            });
            payload.type && history.push(`/${payload.type}`);
          })
          .catch((err) => {
            const message = err?.data?.message
              ? err.data.message
              : "Błąd przy dodawaniu pliku";
            showModal({ text: message, icon: "error", confirm: false });
          });
        resetForm();
        setFile(null);
      }}
    >
      <Form autoComplete="off">
        <FormWrapper opened={addFileSidebarOpened}>
          <HeadingWrapper>
            <Title>Dodaj plik</Title>
            <CloseButton
              aria-label="Close Sidebar"
              clicked={true}
              type="button"
              onClick={closeAddFileSidebar}
            >
              <CloseIcon alt="Close Icon" />
            </CloseButton>
          </HeadingWrapper>

          <Field
            placeholder="Tytuł"
            name="title"
            id="add-title"
            as={StyledInput}
          />
          <ErrorMessage name="title" component={FormErrorMessage} />
          <Field
            placeholder="Przedmiot"
            name="subject"
            id="add-subject"
            as={StyledInput}
          />
          <ErrorMessage name="subject" component={FormErrorMessage} />

          <FileInput setFile={setFile} file={file} />
          <SubmitButton type="submit" aria-label="Add File">
            Dodaj
          </SubmitButton>
        </FormWrapper>
      </Form>
    </Formik>
  );
};

export default AddFileSidebar;
