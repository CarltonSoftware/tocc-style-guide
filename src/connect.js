import { connect } from 'react-redux';
import * as Actions from './actions';

const mapStateToProps = state => ({
 ...state
});

export default connect(mapStateToProps, {...Actions});