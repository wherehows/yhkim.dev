import styled from '@emotion/styled';
import { CONTENT_LEFT_MARGIN_WIDTH, CONTENT_WIDTH } from '@utils/const';
import CustomLink from './CustomLink';
import ViewCounter from './ViewCounter';

interface ContentProps {
  pathname?: string;
  documents?: MarkdownDocument[];
  selectedDocument?: string | null;
}

const Content = ({ documents, selectedDocument, pathname }: ContentProps) => {
  if (typeof document === 'undefined') return <></>;

  return (
    <Wrapper>
      {selectedDocument && pathname ? (
        <>
          <ViewCounter pathname={pathname} />
          <MarkdownRenderer
            dangerouslySetInnerHTML={{ __html: selectedDocument }}
          />
        </>
      ) : (
        <DocumentList>
          {documents?.map(({ html, title, date, slug }: MarkdownDocument) => (
            <DocumentItem key={slug}>
              <Button to={slug}>
                <Title>{title}</Title>
                <PostDate dateTime={date.toString()}>
                  {formatDate(date)}
                </PostDate>
                <Description>{changeMarkdownToTextContent(html)}</Description>
              </Button>
            </DocumentItem>
          ))}
        </DocumentList>
      )}
    </Wrapper>
  );
};

export default Content;

const Wrapper = styled('div')(() => ({
  diplay: 'flex',
  marginLeft: CONTENT_LEFT_MARGIN_WIDTH,
  width: CONTENT_WIDTH,
  height: '100%',
}));

const DocumentItem = styled('li')(() => ({
  listStyleType: 'none',
  marginBottom: '2rem',
}));

const MarkdownRenderer = styled('div')(() => ({
  width: '100%',
  fontSize: '1rem',
  a: {
    color: 'var(--colors-primary)',
    textDecoration: 'none',
    fontWeight: 'bold',
  },

  'a:visited': {
    color: 'var(--colors-primary)',
    fontWieght: 'bold',
  },
}));

const Button = styled(CustomLink)(() => ({
  backgroundColor: 'transparent',
  border: 'none',
  width: '100%',
  padding: 0,
  cursor: 'pointer',
  outline: 'none',
}));

const Title = styled('h2')(() => ({
  textAlign: 'left',
  width: '100%',
  margin: 0,
  fontSize: '1.4rem',
  // color: 'var(--colors-primary)',
}));

const PostDate = styled('time')(() => ({
  fontSize: '0.9rem',
  textAlign: 'left',
  width: '100%',
  marginBottom: '0.4rem',
}));

const Description = styled('div')(() => ({
  display: 'inline-block',
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'normal',
  lineHeight: 1.2,
  height: '3.6rem',
  textAlign: 'left',
  wordWrap: 'break-word',
  webkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
}));

const DocumentList = styled('ul')(() => ({
  padding: 0,
  margin: 0,
}));

const changeMarkdownToTextContent = (html: MarkdownDocument['html']) => {
  const dummyTag = document.createElement('span');
  dummyTag.innerHTML = html;
  return dummyTag.textContent || dummyTag.innerText;
};

const formatDate = (date: MarkdownDocument['date']) => {
  const sArray = date.toString().split('-');
  return `${sArray[0].slice(2, 4)}년 ${sArray[1]}월 ${sArray[2]}일`;
};
