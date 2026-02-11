import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, canonicalUrl }) => {
    return (
        <Helmet defer={false}>
            <title>{title} | GKCE CSE Dept</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        </Helmet>
    );
};

export default SEO;
