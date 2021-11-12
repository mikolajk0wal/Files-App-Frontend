import React, { useContext, useState } from 'react';
import { UIContext } from '../../context/UIContext';
import { Button } from '../Button/Button';
import FileInput from '../FileInput/FileInput';
import Select from 'react-select';
import {
  FormWrapper,
  StyledInput,
  selectStyles,
  Title,
} from './AddFileSidebar.styles';
import * as Yup from 'yup';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import { FormErrorMessage } from '../FormErrorMessage/FormErrorMessage';

import useModal from '../../hooks/useModal';
import { FileType } from '../../types/FileType';
import { useAddFileMutation } from '../../services/files';

const selectOptions = [
  { value: 'pdf', label: 'Plik PDF' },
  { value: 'img', label: 'Plik IMG' },
  { value: 'pptx', label: 'Plik Power Point' },
];

const AddFileSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Tytuł musi posiadać min. 2 znaki!')
    .max(50, 'Tytuł może posiadać max. 50 znaków!')
    .required('Tytuł jest wymagany'),
  subject: Yup.string()
    .min(2, 'Temat musi posiadać min. 6 znaków!')
    .max(50, 'Temat może posiadać max. 50 znaków!')
    .required('Temat jest wymagany'),
});

interface FormikValues {
  title: string;
  subject: string;
  file?: File;
}

const AddFileSidebar: React.FC = () => {
  const { sortType } = useContext(UIContext);
  const [fileType, setFileType] = useState<FileType>('pdf');
  const [file, setFile] = useState<File | null>(null);

  const [addFile] = useAddFileMutation();

  const showModal = useModal();

  let acceptInputFile = '';

  if (fileType === 'pdf') {
    acceptInputFile = '.pdf';
  } else if (fileType === 'img') {
    acceptInputFile = 'image/*';
  } else if (fileType === 'pptx') {
    acceptInputFile = '.pptx, .ppt';
  }

  const { addFileSidebarOpened } = useContext(UIContext);

  return (
    <Formik
      initialValues={{
        title: '',
        subject: '',
      }}
      validationSchema={AddFileSchema}
      onSubmit={async (
        { subject, title }: FormikValues,
        { resetForm }: FormikHelpers<FormikValues>
      ) => {
        if (!file) {
          showModal('Nie załączono pliku', 'error', false);
          return;
        }
        addFile({
          file,
          subject,
          title,
          type: fileType,
          sortType,
        })
          .unwrap()
          .then((payload) => {
            showModal('Dodano plik!', 'success', false);
          })
          .catch((err) => {
            const message = err?.data?.message
              ? err.data.message
              : 'Błąd przy dodawaniu pliku';
            showModal(message, 'error', false);
          });
        resetForm();
        setFile(null);
      }}
    >
      <Form autoComplete="off">
        <FormWrapper opened={addFileSidebarOpened}>
          <Title>Dodaj plik</Title>
          <Field placeholder="Tytuł" name="title" id="title" as={StyledInput} />
          <ErrorMessage name="title" component={FormErrorMessage} />
          <Field
            placeholder="Przedmiot"
            name="subject"
            id="subject"
            as={StyledInput}
          />
          <ErrorMessage name="subject" component={FormErrorMessage} />
          <Select
            options={selectOptions}
            styles={selectStyles}
            id="filetype"
            name="filetype"
            defaultValue={{ label: 'Plik PDF', value: 'pdf' }}
            isSearchable={false}
            onChange={(data) => {
              if (data?.value) {
                setFileType(data.value as FileType);
              }
            }}
          />
          <FileInput accept={acceptInputFile} setFile={setFile} file={file} />
          <Button type="submit" aria-label="Add File">
            Dodaj
          </Button>
        </FormWrapper>
      </Form>
    </Formik>
  );
};

export default AddFileSidebar;
