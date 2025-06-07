import PropTypes from 'prop-types';

export const metadata = {
  title: 'AcrossTheHorizon - Smithy',
  icons: {
    icon: '/images/AcrossTheHorizon.png',
  },
};

export default function HallLayout({ children }) {
  return <div>{children}</div>;
}

HallLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
