

import PropTypes from 'prop-types';

const SectionTitle = ({ heading }) => {
    return (
        <div className="mx-auto md:w-4/12 text-center">
            <h2 className="text-orange-500 mb-2 text-2xl">---{heading}---</h2>
        </div>
    );
};

SectionTitle.propTypes = {
    heading: PropTypes.string.isRequired,  // Ensure heading is a string and required
};

export default SectionTitle;