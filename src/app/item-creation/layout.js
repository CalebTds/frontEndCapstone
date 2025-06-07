import PropTypes from 'prop-types';

export const metadata = {
  title: 'AcrossTheHorizon - Smithy',
  icons: {
    icon: '/images/AcrossTheHorizon.png',
  },
};

export default function SmithyLayout({ children }) {
  return <div>{children}</div>;
}

SmithyLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
