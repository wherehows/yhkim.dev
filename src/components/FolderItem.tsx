import styled from '@emotion/styled';
import CustomLink from './CustomLink';
import Typography from './Typography';

interface FolderItemProps {
  documentCount: number;
  categoryName: string;
}

const FolderItem = ({ documentCount, categoryName }: FolderItemProps) => {
  return (
    <Wrapper>
      <DocumentList>
        <LinkButton to={`/${categoryName}`}>{categoryName}</LinkButton>{' '}
        <Typography
          as="span"
          variant="label"
          style={{
            color: 'var(--colors-grey-03)',
          }}
        >
          __ {documentCount} posts
        </Typography>
      </DocumentList>
    </Wrapper>
  );
};

export default FolderItem;

const Wrapper = styled('li')(() => ({
  listStyleType: 'none',
  padding: '0',
  margin: '0',
}));

const DocumentList = styled('ul')(() => ({
  padding: 0,
  margin: '0.14rem 0 0 0',
}));

const LinkButton = styled(CustomLink)(({ theme }) => ({
  ...theme.typography.body,
  cursor: 'pointer',

  '&:hover': {
    fontWeight: 600,
  },
}));
