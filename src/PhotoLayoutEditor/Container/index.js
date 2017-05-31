import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import * as actionCore from '../actions/core';

//import Body from './Body';
import Side from './Side';
//import Cropper from './Cropper';


class Container extends React.Component {

	static defaultProps = {

	};

	constructor(props)
	{
		super();
	}

	componentDidMount()
	{
		const { props } = this;

		props.dispatch(actionCore.setting(props.preference || {}));
	}

	render()
	{
		const { props } = this;

		// check Setting
		if (!props.setting) return null;

		return (
			<div className={classNames('ple-editor', {
				'side-active': props.tree.side.layout.visible
			})}>
				<div className="ple-wrap">
					{/*<Body/>*/}
					<Side/>
					{/*{props.tree.cropper.visible ? ( <Cropper/> ) : null}*/}
				</div>
			</div>
		);
	}

}


export default connect((state) => {
	return Object.assign({}, state, {});
})(Container);