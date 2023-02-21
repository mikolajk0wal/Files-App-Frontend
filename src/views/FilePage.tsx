import {
  InfoWrapper,
  Paragraph,
  PdfIcon,
  Title,
  Wrapper,
} from "./FilePage.styles";

const FilePage = () => {
  return (
    <Wrapper>
      <PdfIcon alt="Ikona PDF" />
      <InfoWrapper>
        <Title>Coach greg cookbook</Title>
        <Paragraph>Dodany przez: creend</Paragraph>
        <Paragraph>Temat: Gotowanie</Paragraph>
        <Paragraph>Data dodania: 21/02/2023</Paragraph>
        <Paragraph>Rozszerzenie: .pdf</Paragraph>
        <Paragraph>Rozmiar pliku: 4.7 MB</Paragraph>
      </InfoWrapper>
    </Wrapper>
  );
};

export default FilePage;
