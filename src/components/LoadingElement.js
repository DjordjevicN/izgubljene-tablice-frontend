import React from 'react';
import { connect } from 'react-redux'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
function LoadingElement(props) {
    return (
        <>
            {props.loading && <div className='loadingWrapper'>
                <div className="loadingContent">
                    <AiOutlineLoading3Quarters className='loadingIcon' />
                </div>

            </div>}

        </>

    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading
    }
}
export default connect(mapStateToProps, null)(LoadingElement);
