import PropTypes from 'prop-types';

function PrograssBars({ progress, bgColour = 'var(--color-secondary-btn)' }) {
  const parentStyle = {
    width: '100%',
    backgroundColor: 'var(--color-white)',
    borderRadius: '8px',
    margin: '0 0',
    height: '24px',
    overflow: 'hidden',
  };

  const childStyle = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: bgColour,
    borderRadius: '8px',
    transition: 'width 0.5s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  };

  const progressTextStyle = {
    padding: '0 8px',
    color: 'var(--color-white)',
    fontWeight: 500,
    fontSize: 'var(--text-small)',
  };

  return (
    <div style={parentStyle}>
      <div style={childStyle}>
        <span style={progressTextStyle}>{`${progress}%`}</span>
      </div>
    </div>
  );
}

PrograssBars.propTypes = {
  progress: PropTypes.number.isRequired,
  bgColour: PropTypes.string,
};

export default PrograssBars;
