const path = require('path');
const fs = require('fs');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@/components': path.resolve(__dirname, './src/components'),
        '@/utils': path.resolve(__dirname, './src/utils'),
        '@/assets': path.resolve(__dirname, './src/assets'),
        '@/types': path.resolve(__dirname, './src/types'),
        '@/hooks': path.resolve(__dirname, './src/hooks'),
      },
    },
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type SanityMemo {
      publishedAt: Date!
      title: String!
      _updatedAt: Date!
      content: String!
      slug: Slug
      tags: [Tag!]!
      debts: [Debt!]!
    }

    type SanityPosts {
      publishedAt: Date!
      title: String!
      _updatedAt: Date!
      content: String!
      slug: Slug!
      tags: [Tag!]!
      debts: [Debt!]!
    }

    type Slug {
      _key: String
      _type: String
      current: String!
      source: String
    }

    type Tag {
      _key: String!
      _type: String!
      label: String!
      value: String!
    }

    type Debt {
      _key: String!
      _type: String!
      label: String!
      value: String!
    }
  `);
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const PostDetail = path.resolve(`src/templates/PostDetail.tsx`);
  const List = path.resolve('src/templates/List.tsx');

  const result = await graphql(`
    {
      allSanityPosts {
        nodes {
          tags {
            value
          }
          slug {
            current
          }
        }
      }
    }
  `);

  const quoteResult = await graphql(`
    {
      allSanityQuote {
        nodes {
          author
          quote
          isBook
        }
      }
    }
  `);

  if (result.errors || quoteResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
  }

  const quotePath = path.resolve(__dirname, 'src/assets/quote.json');
  fs.writeFileSync(
    quotePath,
    JSON.stringify({ quotes: quoteResult.data.allSanityQuote.nodes }),
  );

  createPage({
    path: '/',
    component: List,
  });

  const visitedTagInformation = {};

  result.data.allSanityPosts.nodes.forEach(({ tags, slug: { current } }) => {
    const { value } = tags[0];

    if (!(value in visitedTagInformation)) {
      visitedTagInformation[value] = value;

      createPage({
        path: `/${value}`,
        component: List,
        context: {
          value,
        },
      });
    }

    createPage({
      path: current,
      component: PostDetail,
      context: {
        current,
      },
    });
  });
};
