/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
// import 'prismjs/themes/prism-tomorrow.css';
import 'firebase/compat/database';
import './src/global.css';
import ClientOnlyVisibleWrapper from './src/components/ClientOnlyVisibleWrapper';

export const wrapPageElement = ({ element }) => {
  return <ClientOnlyVisibleWrapper>{element}</ClientOnlyVisibleWrapper>;
};
