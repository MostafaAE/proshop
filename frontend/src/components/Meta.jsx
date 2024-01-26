import { Helmet } from 'react-helmet-async';
function Meta({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: 'Welcome to ProShop',
  description: 'We sell the best products for cheap',
  keywords: 'electioncs, buy electronics, cheap electronics',
};

export default Meta;
